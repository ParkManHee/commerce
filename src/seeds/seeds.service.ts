import {Injectable} from '@nestjs/common';
import {DefaultStatus} from 'src/enums/default.status';
import {PayType} from 'src/enums/pay.type.enum';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';
import {ItemsRepository} from 'src/repositories/items.repository';
import {PayMethodRepository} from 'src/repositories/pay.method.repository';
import {UsersRepository} from 'src/repositories/users.repository';

@Injectable()
export class SeedsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly itemsRepository: ItemsRepository,
    private readonly itemOptionsRepository: ItemOptionsRepository,
    private readonly payMethodRepository: PayMethodRepository
  ) {}

  async seed(): Promise<void> {
    try {
      await this.usersRepository
        .create({
          name: 'manhee',
          email: 'manhee@gmail.com',
          phone: '010-1111-2222',
          postCode: '',
          address: '',
          addressDetail: '',
          status: DefaultStatus.ACTIVE,
        })
        .save();

      await this.payMethodRepository
        .create({
          user: 1,
          payType: PayType.CREDITCARD,
          status: DefaultStatus.ACTIVE,
          name: '농협',
          cardNum: '1111-2222-3333-4444',
        })
        .save();

      const item = [
        {
          name: 'macbook',
          status: DefaultStatus.ACTIVE,
        },
        {
          name: 'Odyssey',
          status: DefaultStatus.ACTIVE,
        },
      ];

      const createItems = await this.itemsRepository.save(item);

      await Promise.all(
        createItems.map(async item => {
          const options = [
            {
              item: item.seq,
              name: 'red',
              supplyPrice: 1000000,
              sellingPrice: 1200000,
              stock: 10,
              status: DefaultStatus.ACTIVE,
            },
            {
              item: item.seq,
              name: 'blue',
              supplyPrice: 1000000,
              sellingPrice: 1200000,
              stock: 20,
              status: DefaultStatus.ACTIVE,
            },
          ];
          await this.itemOptionsRepository.save(options);
        })
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
