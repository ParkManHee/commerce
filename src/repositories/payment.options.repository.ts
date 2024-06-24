import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PaymentMethodEntity from 'src/entity/payment.method.entity';
import {Repository} from 'typeorm';

@CustomRepository(PaymentMethodEntity)
export class PaymentMethodRepository extends Repository<PaymentMethodEntity> {}
