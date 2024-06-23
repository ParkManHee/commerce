import {DB} from 'src/constants/db';
import {UsersStatus} from 'src/enums/user.status';
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import CustemBaseEntity from './base.entity';
import PaymentMethodEntity from './payment.method.entity';

@Entity({
  name: DB.USERS,
  database: DB.DATABASE_NAME,
  comment: '유저 테이블',
})
export default class UsersEntity extends CustemBaseEntity {

  @OneToMany(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.user)
  payments: PaymentMethodEntity[];

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq?: number;

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
  /*
    1. 가입하고나서는 STAND_BY
    2. 이메일 인증  -> ACTIVE
   */
  @Column({
    name: 'status',
    type: 'enum',
    enum: UsersStatus,
    nullable: true,
    default: UsersStatus.ACTIVE,
  })
  status: UsersStatus;

  // @Column({
  //   name: "created_at",
  //   type: "datetime",
  //   default: () => "CURRENT_TIMESTAMP",
  //   nullable: false,
  // })
  // createdAt: Date | string;

  // @Column({
  //   name: "blocked_at",
  //   type: "datetime",
  //   nullable: true,
  //   default: null,
  // })
  // deletedAt: Date | string;

  // @Column({
  //   name: "last_modified_at",
  //   type: "datetime",
  //   onUpdate: "CURRENT_TIMESTAMP",
  //   default: null,
  // })
  // lastModifiedAt: Date | string;

  // @Column({
  //   name: "last_modified_by",
  //   type: "int",
  //   unsigned: true,
  //   nullable: true,
  // })
  // lastModifiedBy: number;
}
