import {Injectable} from '@nestjs/common';
import {ItemsQueryReqDto} from './dto/items.dto';
import {ItemsRepository} from 'src/repositories/item.repository';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';

@Injectable()
export class ItemsService {
  constructor(
    private readonly itemsRepository: ItemsRepository,
    private readonly itemOptionRepository: ItemOptionsRepository
  ) {}

  async getItemsList(queryParams: ItemsQueryReqDto) {
    await this.itemsRepository.findAllItemsAndOptions(queryParams);
  }
}
