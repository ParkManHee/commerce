import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import PurchasesEntity from 'src/entity/purchases.entity';
import {Repository} from 'typeorm';

@CustomRepository(PurchasesEntity)
export class PurchasesRepository extends Repository<PurchasesEntity> {}
