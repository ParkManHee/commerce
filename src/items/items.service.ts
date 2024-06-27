import {BadRequestException, Injectable} from '@nestjs/common';
import {ItemsQueryReqDto, ItemsReqDto} from './dto/items.dto';
import {ItemsRepository} from 'src/repositories/items.repository';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import {DefaultStatus} from 'src/enums/default.status';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async getItemsList(query: ItemsQueryReqDto) {
    return await this.itemsRepository.findAllItemsAndOptions(query);
  }
  async getItemsDetail(seq: number) {
    return await this.itemsRepository.findItemsDetail(seq);
  }
  async createItem(data: ItemsReqDto) {
    return await this.itemsRepository.create(data).save();
  }
  async updateItem(seq: number, data: ItemsReqDto) {
    const item = await this.itemsRepository.findOne({
      where: {
        seq: seq,
        status: DefaultStatus.ACTIVE,
      },
    });
    if (_.isNil(item)) {
      throw new BadRequestException('해당 상품이 존재하지 않습니다.');
    }

    const result = await this.itemsRepository.update(
      {
        seq: seq,
      },
      {
        ...data,
      }
    );
    return {
      isSuccess: result.affected === 1 ? true : false,
    };
  }
  async deleteItem(seq: number) {
    const item = await this.itemsRepository.findOne({
      where: {
        seq: seq,
        status: DefaultStatus.ACTIVE,
      },
    });
    if (_.isNil(item)) {
      throw new BadRequestException('해당 상품이 존재하지 않습니다.');
    }
    const result = await this.itemsRepository.update(
      {
        seq: seq,
      },
      {
        deletedAt: dayjs().format(),
        lastModifiedAt: dayjs().format(),
        status: DefaultStatus.DELETE,
      }
    );
    return {
      isSuccess: result.affected === 1 ? true : false,
    };
  }
}
