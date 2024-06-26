import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PaymentDetailEntity from 'src/entity/payment.detail.entity';
import {Repository} from 'typeorm';

@CustomRepository(PaymentDetailEntity)
export class PaymentDetailRepository extends Repository<PaymentDetailEntity> {}
