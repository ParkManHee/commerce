import {DB} from 'src/constants/db';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base.entity';
import UsersEntity from './users.entity';
import {DefaultStatus} from 'src/enums/default.status';
import {PayType} from 'src/enums/pay.type.enum';

@Entity({
  name: DB.PAYMENT_METHOD,
  database: DB.DATABASE_NAME,
  comment: '결제수단 테이블',
})
// @Index(`FK_USERS_01`, [`user`])
export default class PaymentMethodEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq?: number;

  @ManyToOne(() => UsersEntity, user => user.payments, {
    nullable: false,
  })
  @JoinColumn({
    name: 'user_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_USERS_01',
  })
  user: UsersEntity | number;

  @Column({
    name: 'pay_type',
    type: 'enum',
    enum: PayType,
    nullable: false,
    default: PayType.CREDITCARD,
  })
  payType: PayType;

  @Column({
    name: 'status',
    type: 'enum',
    enum: DefaultStatus,
    nullable: false,
    default: DefaultStatus.ACTIVE,
  })
  status: DefaultStatus;

  @Column( {
    name: 'card_num',
    type: 'varchar',
    length: 19,
    nullable: false,
    default: ''
  })
  cardNum: string;
}
