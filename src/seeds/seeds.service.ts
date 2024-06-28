import {Injectable} from '@nestjs/common';
import {DefaultStatus} from 'src/enums/default.status';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';
import {ItemsRepository} from 'src/repositories/items.repository';
import {UsersRepository} from 'src/repositories/users.repository';

@Injectable()
export class SeedsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly itemsRepository: ItemsRepository,
    private readonly itemOptionsRepository: ItemOptionsRepository
  ) {}

  async seed(): Promise<void> {
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
  }
}
