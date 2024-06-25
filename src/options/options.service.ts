import {BadRequestException, Injectable} from '@nestjs/common';
import {DefaultStatus} from 'src/enums/default.status';
import {ItemOptionsRepository} from 'src/repositories/item.options.repository';
import {OptionQueryReqDto, OptionReqDto} from './dto/options.dto';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';

@Injectable()
export class OptionsService {
  constructor(private readonly itemOptionsRepository: ItemOptionsRepository) {}

  async getOptions(seq: number, query: OptionQueryReqDto) {
    return await this.itemOptionsRepository.getOptions(seq, query);
  }

  async findOptionDetail(seq: number) {
    return await this.itemOptionsRepository.findOne({
      where: {
        seq: seq,
        status: DefaultStatus.ACTIVE,
      },
    });
  }

  async createOption(data: OptionReqDto) {
    return await this.itemOptionsRepository
      .create({
        ...data,
      })
      .save();
  }

  async updateOption(seq: number, data: OptionReqDto) {
    const option = await this.itemOptionsRepository.findOne({
      where: {
        seq: seq,
        status: DefaultStatus.ACTIVE,
      },
    });
    if (_.isNil(option)) {
      throw new BadRequestException('해당 상품이 존재하지 않습니다.');
    }
    const result = await this.itemOptionsRepository.update(
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

  async deleteOption(seq: number) {
    const option = await this.itemOptionsRepository.findOne({
      where: {
        seq: seq,
        status: DefaultStatus.ACTIVE,
      },
    });
    if (_.isNil(option)) {
      throw new BadRequestException('해당 상품이 존재하지 않습니다.');
    }
    const result = await this.itemOptionsRepository.update(
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
