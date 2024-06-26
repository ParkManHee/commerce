import {BadRequestException, Injectable} from '@nestjs/common';
import {PayMethodRepository} from 'src/repositories/pay.method.repository';
import {PayMethodReqDto} from './dto/pay.method.dto';
import {UsersRepository} from 'src/repositories/users.repository';
import {DefaultStatus} from 'src/enums/default.status';
import * as _ from 'lodash';
import dayjs from 'dayjs';

@Injectable()
export class PaymethodService {
  constructor(
    private readonly payMethodRepository: PayMethodRepository,
    private readonly usersRepository: UsersRepository
  ) {}
  async getPayMethod(seq: number) {
    const user = await this.usersRepository.findOne({
      where: {
        seq: seq,
      },
    });
    if (_.isNil(user)) {
      throw new BadRequestException('해당 유저가 존재하지 않습니다.');
    }
    return await this.payMethodRepository.getPayMethod(seq);
  }
  async createPayMethod(seq: number, data: PayMethodReqDto) {
    const user = await this.usersRepository.findOne({
      where: {
        seq: seq,
      },
    });
    if (_.isNil(user)) {
      throw new BadRequestException('해당 유저가 존재하지 않습니다.');
    }

    return await this.payMethodRepository
      .create({
        user: seq,
        ...data,
      })
      .save();
  }
  async deletePayMethod(seq: number) {
    const user = await this.usersRepository.findOne({
      where: {
        seq: seq,
      },
    });
    if (_.isNil(user)) {
      throw new BadRequestException('해당 유저가 존재하지 않습니다.');
    }
    const result = await this.payMethodRepository.update(
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
