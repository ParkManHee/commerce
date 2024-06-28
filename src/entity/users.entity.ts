import {DB} from 'src/constants/db';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import CustemBaseEntity from './base.entity';
import PayMethodEntity from './paymethod.entity';
import PaymentEntity from './payment.entity';
import {DefaultStatus} from 'src/enums/default.status';

@Entity({
  name: DB.USERS,
  database: DB.DATABASE_NAME,
  comment: '유저 테이블',
})
export default class UsersEntity extends CustemBaseEntity {
  @OneToMany(() => PayMethodEntity, paymentMethod => paymentMethod.user)
  payTypes: PayMethodEntity[];

  @OneToMany(() => PaymentEntity, payment => payment.user)
  payment: PaymentEntity[];

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 30,
    nullable: true,
    default: null,
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '유저의 핸드폰 번호. 비가입 유저는 핸드폰 번호가 PK가 됨.',
  })
  phone: string;

  @Column({
    name: 'post_code',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  postCode: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  address: string;

  @Column({
    name: 'address_detail',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  addressDetail: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: DefaultStatus,
    nullable: true,
    default: DefaultStatus.ACTIVE,
  })
  status: DefaultStatus;
}
