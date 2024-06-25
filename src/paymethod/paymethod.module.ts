import { Module } from '@nestjs/common';
import { PaymethodController } from './paymethod.controller';
import { PaymethodService } from './paymethod.service';
import { CustomRepositoryModule } from 'src/decorator/custom-repository.decorator.module';
import { PayMethodRepository } from 'src/repositories/pay.method.repository';
import { UsersRepository } from 'src/repositories/users.repository';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      PayMethodRepository,
      UsersRepository
    ]),
  ],
  controllers: [PaymethodController],
  providers: [
    {
      provide: 'paymethodService',
      useClass:PaymethodService
}]
})
export class PaymethodModule {}
