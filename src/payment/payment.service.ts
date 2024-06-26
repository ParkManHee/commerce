import {BadRequestException, Injectable} from '@nestjs/common';
import {PaymentRepository} from 'src/repositories/payment.repository';
import {PaymentDetailReqDto, PaymentReqDto} from './dto/payment.dto';
import {DataSource, DeepPartial, QueryRunner} from 'typeorm';
import {PaymentDetailRepository} from 'src/repositories/payment.detail.repository';
import {PaymentStatus} from 'src/enums/payment.status';
import {ItemsRepository} from 'src/repositories/item.repository';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';
import {PayMethodRepository} from 'src/repositories/pay.method.repository';
import * as _ from 'lodash';
import {UsersRepository} from 'src/repositories/users.repository';
import {DefaultStatus} from 'src/enums/default.status';

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
      }
      const payment = this.paymentRepository.create({
        user: body.user,
        payType: body.payType,
        status: PaymentStatus.PAYMENT,
      });
      await queryRunner.manager.save(payment);

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
        console.log(item);
        if (item.options[0].stock - detail.optionCnt < 0) {
          throw new BadRequestException('해당 상품의 수량이 없습니다.');
        }
        item.options[0].stock = item.options[0].stock - detail.optionCnt;

        const paymentDetail = this.paymentDetailRepository.create({
          payment: payment.seq,
          item: detail.item,
          option: detail.option,
          optionCnt: detail.optionCnt,
          status: detail.status,
        });
        await queryRunner.manager.save(paymentDetail);
        await queryRunner.manager.save(item);
      });

      await queryRunner.commitTransaction();
      return null;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async returnItem(seq: number, body: PaymentReqDto) {
    return await this.paymentRepository.returnItem(seq, body);
  }
}
