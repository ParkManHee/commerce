import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PayMethodEntity from 'src/entity/paymethod.entity';
import {Repository} from 'typeorm';

@CustomRepository(PayMethodEntity)
export class PayMethodRepository extends Repository<PayMethodEntity> {}
