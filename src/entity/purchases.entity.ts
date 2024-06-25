import {DB} from 'src/constants/db';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base.entity';
import ItemOptionsEntity from './item.options.entity';
import UsersEntity from './users.entity';
import PaymentMethodEntity from './paymethod.entity';
import { PurchaseStatus } from 'src/enums/purchase.status';

@Entity({
  name: DB.ITEMS,
  database: DB.DATABASE_NAME,
  comment: '구매 테이블',
})
export default class ItemsEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq?: number;

  @Column({
    name: 'name',
    type: 'number',
    nullable: false,
    default: null,
  })
  user: UsersEntity | number;

  @Column({
    name: 'pay_type',
    type: 'number',
    nullable: false,
    default: null,
  })
  payType: PaymentMethodEntity | number;

  @Column({
    name: 'name',
    type: 'number',
    nullable: false,
    default: null,
  })
  items: ItemsEntity | number;

  @Column( {
    name: 'items_cnt',
    type: 'number',
    nullable: false,
    default: null,
  })
  itemsCnt: number;

  @Column({
    name: 'name',
    type: 'number',
    nullable: false,
    default: null,
  })
  options: ItemOptionsEntity | number;

  @Column( {
    name: 'options_cnt',
    type: 'number',
    nullable: false,
    default: null,
  })
  optionsCnt: number;

  @Column({
    name: 'total_supply_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  totalSupplyPrice: number;

  @Column({
    name: 'total_selling_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  totalSellingPrice: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PurchaseStatus,
    nullable: false,
    default: PurchaseStatus.PAYMENT,
  })
  status: PurchaseStatus;
}
