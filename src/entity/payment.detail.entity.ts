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

  @JoinColumn({
    name: 'item_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_ITEM_01',
  })
  item: ItemsEntity | number;

  @JoinColumn({
    name: 'option_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_OPTIONS_01',
  })
  option: ItemOptionsEntity | number;

  @Column({
    name: 'options_cnt',
    type: 'int',
    nullable: false,
    default: null,
  })
  optionCnt: number;

  @Column({
    name: 'selling_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  sellingPrice: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PaymentDetailStatus,
    nullable: false,
    default: PaymentDetailStatus.PAYMENT,
  })
  status: PaymentDetailStatus;
}
