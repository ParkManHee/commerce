import {Module} from '@nestjs/common';
import {OptionsController} from './options.controller';
import {OptionsService} from './options.service';
import {CustomRepositoryModule} from 'src/decorator/custom-repository.decorator.module';
import {ItemsRepository} from 'src/repositories/item.repository';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      ItemsRepository,
      ItemOptionsRepository,
    ]),
  ],
  controllers: [OptionsController],
  providers: [
    {
      provide: 'optionsService',
      useClass: OptionsService,
    },
  ],
})
export class OptionsModule {}
