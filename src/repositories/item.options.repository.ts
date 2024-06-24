import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import ItemOptionsEntity from 'src/entity/item.options.entity';
import {Repository} from 'typeorm';

@CustomRepository(ItemOptionsEntity)
export class ItemOptionsRepository extends Repository<ItemOptionsEntity> {}
