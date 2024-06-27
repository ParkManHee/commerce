import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base.entity';
import {DB} from 'src/constants/db';
import ItemOptionsEntity from './item.options.entity';
import ItemsEntity from './items.entity';
import {PaymentDetailStatus} from 'src/enums/payment.detail.status';
import PaymentEntity from './payment.entity';

@Entity({
  name: DB.PAYMENT_DETAIL,
  database: DB.DATABASE_NAME,
  comment: '구매 테이블',
})
export default class PaymentDetailEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq?: number;

  @ManyToOne(() => PaymentEntity, payment => payment.seq)
  @JoinColumn({
    name: 'payment_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_PAYMENT_01',
  })
  payment: PaymentEntity | number;

  @ManyToOne(() => ItemsEntity, item => item.seq)
  @JoinColumn({
    name: 'item_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_ITEM_01',
  })
  item: ItemsEntity | number;

  @ManyToOne(() => ItemOptionsEntity, option => option.seq)
  @JoinColumn({
    name: 'option_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_OPTIONS_01',
  })
  option: ItemOptionsEntity | number;

  @Column({
    name: 'request_cnt',
    type: 'int',
    nullable: false,
    default: 0,
  })
  requestCnt: number;

  @Column({
    name: 'current_cnt',
    type: 'int',
    nullable: true,
    default: 0,
  })
  currentCnt: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PaymentDetailStatus,
    nullable: false,
    default: PaymentDetailStatus.PAYMENT,
  })
  status: PaymentDetailStatus;
}
