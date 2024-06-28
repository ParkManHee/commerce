import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PaymentEntity from 'src/entity/payment.entity';
import {PaymentReqDto} from 'src/payment/dto/payment.dto';
import {Repository} from 'typeorm';

@CustomRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity> {
  async findByUserSeq(seq: number) {
    const queryBuilder = this.createQueryBuilder(DB.PAYMENT)
      .leftJoinAndSelect(`${DB.PAYMENT}.detail`, DB.PAYMENT_DETAIL)
      .where(`${DB.PAYMENT}.user = :seq`, {
        seq: seq,
      });

    queryBuilder.orderBy(`${DB.PAYMENT}.seq`, 'ASC');

    return {
      data: await queryBuilder.getMany(),
      totalCount: await queryBuilder.getCount(),
    };
  }

  async createPaymentAndDetail(body: PaymentReqDto) {}

  async returnItem(seq: number, body: PaymentReqDto) {}
}
