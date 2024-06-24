import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import UsersEntity from 'src/entity/users.entity';
import {Repository} from 'typeorm';

@CustomRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {}
