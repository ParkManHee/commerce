import {Module} from '@nestjs/common';
import {ItemsController} from './items.controller';
import {ItemsService} from './items.service';
import {CustomRepositoryModule} from 'src/decorator/custom-repository.decorator.module';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';
import {ItemsRepository} from 'src/repositories/items.repository';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      ItemsRepository,
      ItemOptionsRepository,
    ]),
  ],
  controllers: [ItemsController],
  providers: [
    {
      provide: 'itemsService',
      useClass: ItemsService,
    },
  ],
})
export class ItemsModule {}
