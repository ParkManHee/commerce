import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PaymentMethodEntity from 'src/entity/paymethod.entity';
import {Repository} from 'typeorm';

@CustomRepository(PaymentMethodEntity)
export class PaymentMethodRepository extends Repository<PaymentMethodEntity> {}
