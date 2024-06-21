import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendorHistoriesRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
  ) {}
}
