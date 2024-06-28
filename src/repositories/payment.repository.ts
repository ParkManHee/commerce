import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PaymentEntity from 'src/entity/payment.entity';
import {Repository} from 'typeorm';

@CustomRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity> {
  async findByUserSeq(seq: number) {
    try {
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
