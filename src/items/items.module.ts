import {Module} from '@nestjs/common';
import {ItemsController} from './items.controller';
import {ItemsService} from './items.service';
import ItemsEntity from 'src/entity/items.entity';
import ItemOptionsEntity from 'src/entity/item.options.entity';
import {CustomRepositoryModule} from 'src/decorator/custom-repository.decorator.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      ItemsEntity,
      ItemOptionsEntity,
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
