import {BadRequestException, Injectable} from '@nestjs/common';
import {PaymentRepository} from 'src/repositories/payment.repository';
import {PaymentDetailReqDto, PaymentReqDto} from './dto/payment.dto';
import {DataSource, DeepPartial, QueryRunner} from 'typeorm';
import {PaymentDetailRepository} from 'src/repositories/payment.detail.repository';
import {PaymentStatus} from 'src/enums/payment.status';
import {ItemsRepository} from 'src/repositories/items.repository';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';
import {PayMethodRepository} from 'src/repositories/pay.method.repository';
import * as _ from 'lodash';
import {UsersRepository} from 'src/repositories/users.repository';
import {DefaultStatus} from 'src/enums/default.status';
import {PaymentDetailStatus} from 'src/enums/payment.detail.status';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentDetailRepository: PaymentDetailRepository,
    private readonly itemsRepository: ItemsRepository,
    private readonly itemOptionsRepository: ItemOptionsRepository,
    private readonly payMethodRepository: PayMethodRepository,
    private readonly usersRepository: UsersRepository,
    private readonly datasource: DataSource
  ) {}
  async getPayments(seq: number) {
    return await this.paymentRepository.findByUserSeq(seq);
  }
  async createPayment(body: PaymentReqDto) {
    const queryRunner: QueryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.usersRepository.findOne({
        where: {
          seq: body.user,
        },
      });
      if (_.isNil(user)) {
        throw new BadRequestException('유저가 존재하지 않습니다.');
      }
      const payment = this.paymentRepository.create({
        user: body.user,
        payType: body.payType,
        status: PaymentStatus.PAYMENT,
      });
      await queryRunner.manager.save(payment);

      let bulkDetailData = [];
      let updateOption = [];

      await Promise.all(
        body.detail.map(async detail => {
          const item = await this.itemsRepository.findOne({
            where: {
              seq: detail.item,
              status: DefaultStatus.ACTIVE,
              options: {
                seq: detail.option,
                status: DefaultStatus.ACTIVE,
              },
            },
            relations: ['options'],
          });
          if (_.isNil(item)) {
            throw new BadRequestException('해당 상품이 존재하지 않습니다.');
          }
          if (item.options[0].stock - detail.optionCnt < 0) {
            throw new BadRequestException('해당 상품의 수량이 없습니다.');
          }
          item.options[0].stock = item.options[0].stock - detail.optionCnt;
          updateOption.push(item.options[0]);
          bulkDetailData.push(
            this.paymentDetailRepository.create({
              payment: payment.seq,
              item: detail.item,
              option: detail.option,
              requestCnt: detail.optionCnt,
              currentCnt: detail.optionCnt,
              status: PaymentDetailStatus.PAYMENT,
            })
          );
          return;
        })
      );

      await queryRunner.manager.save(bulkDetailData);
      await queryRunner.manager.save(updateOption);

      await queryRunner.commitTransaction();
      return payment;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async returnItem(seq: number, body: PaymentReqDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.usersRepository.findOne({
        where: {
          seq: body.user,
        },
      });
      if (_.isNil(user)) {
        throw new BadRequestException('유저가 존재하지 않습니다.');
      }

      let updateOption = [];
      let updateDetailData = [];
      let bulkDetailData = [];

      await Promise.all(
        body.detail.map(async detail => {
          const payment = await this.paymentRepository.findOne({
            where: {
              seq: seq,
              detail: {
                item: detail.item,
                option: detail.option,
                status: PaymentDetailStatus.PAYMENT,
              },
            },
            relations: ['detail', 'detail.option'],
          });
          if (_.isNil(payment)) {
            throw new BadRequestException('해당 거래내역이 존재하지 않습니다.');
          }
          if (payment.detail[0].currentCnt < detail.optionCnt) {
            throw new BadRequestException('반품 수량이 초과 되었습니다.');
          }
          const option = payment.detail[0].option;
          if (typeof option === 'object') {
            console.log();
            option.stock = option.stock + detail.optionCnt;
            updateOption.push(option);
          }
          payment.detail[0].currentCnt =
            payment.detail[0].currentCnt - detail.optionCnt;
          updateDetailData.push(payment.detail[0]);

          bulkDetailData.push(
            this.paymentDetailRepository.create({
              payment: payment.seq,
              item: detail.item,
              option: detail.option,
              requestCnt: detail.optionCnt,
              status: PaymentDetailStatus.RETURN,
            })
          );
          return;
        })
      );

      await queryRunner.manager.save(bulkDetailData);
      await queryRunner.manager.save(updateOption);
      await queryRunner.manager.save(updateDetailData);

      await queryRunner.commitTransaction();

      return;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return await this.paymentRepository.returnItem(seq, body);
  }
}
