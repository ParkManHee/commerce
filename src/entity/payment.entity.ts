import {DB} from 'src/constants/db';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base.entity';
import UsersEntity from './users.entity';
import PayMethodEntity from './paymethod.entity';
import {PaymentStatus} from 'src/enums/payment.status';
import PaymentDetailEntity from './payment.detail.entity';

@Entity({
  name: DB.PAYMENT,
  database: DB.DATABASE_NAME,
  comment: '구매 테이블',
})
export default class PaymentEntity extends CustomBaseEntity {
  @OneToMany(() => PaymentDetailEntity, detail => detail.payment)
  detail: PaymentDetailEntity[];

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq: number;

  @ManyToOne(() => UsersEntity, user => user.seq)
  @JoinColumn({
    name: 'user_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_USERS_01',
  })
  user: UsersEntity | number;

  @ManyToOne(() => PayMethodEntity, payType => payType.seq)
  @JoinColumn({
    name: 'pay_type_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_PAYTYPE_01',
  })
  payType: PayMethodEntity | number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PaymentStatus,
    nullable: false,
    default: PaymentStatus.PAYMENT,
  })
  status: PaymentStatus;
}
