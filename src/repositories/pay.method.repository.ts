import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PayMethodEntity from 'src/entity/paymethod.entity';
import {DefaultStatus} from 'src/enums/default.status';
import {Repository} from 'typeorm';

@CustomRepository(PayMethodEntity)
export class PayMethodRepository extends Repository<PayMethodEntity> {
  async getPayMethod(seq: number) {
    try {
      const queryBuilder = this.createQueryBuilder(DB.PAYMENT_METHOD)
        .where(`${DB.PAYMENT_METHOD}.user_seq = :seq`, {
          seq: seq,
        })
        .andWhere(`${DB.PAYMENT_METHOD}.status = :status`, {
          status: DefaultStatus.ACTIVE,
        });

      const a = await queryBuilder.getMany();
      console.log(a);

      queryBuilder.orderBy(`${DB.PAYMENT_METHOD}.seq`, `ASC`);
      return {
        data: a,
        totalCount: await queryBuilder.getCount(),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
