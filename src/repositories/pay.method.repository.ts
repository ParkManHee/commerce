import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PayMethodEntity from 'src/entity/paymethod.entity';
import {Repository} from 'typeorm';

@CustomRepository(PayMethodEntity)
export class PayMethodRepository extends Repository<PayMethodEntity> {
  async getPayMethod(seq: number) {
    const queryBuilder = this.createQueryBuilder(DB.PAYMENT_METHOD);

    queryBuilder.orderBy(`${DB.PAYMENT_METHOD}.seq`, `ASC`);
    return {
      data: await queryBuilder.getMany(),
      totalCount: await queryBuilder.getCount(),
    };
  }
}
