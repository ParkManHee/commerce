import {DB} from 'src/constants/db';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CustomBaseEntity from './base.entity';
import ItemsEntity from './items.entity';
import {DefaultStatus} from 'src/enums/default.status';

@Entity({
  name: DB.ITEMS_OPTIONS,
  database: DB.DATABASE_NAME,
  comment: '제품 옵션 테이블',
})
// @Index(`FK_ITEMS_OPTIONS_01`, [`item`])
export default class ItemOptionsEntity extends CustomBaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq?: number;

  @ManyToOne(() => ItemsEntity, item => item.options, {
    nullable: false,
  })
  @JoinColumn({
    name: 'item_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_ITEMS_OPTIONS_01',
  })
  item: ItemsEntity | number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 30,
    nullable: true,
    default: null,
  })
  name: string;

  @Column({
    name: 'supply_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0.0,
  })
  supplyPrice: number;

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
    enum: DefaultStatus,
    nullable: false,
    default: DefaultStatus.ACTIVE,
  })
  status: DefaultStatus;

  @Column({
    name: 'stock',
    type: 'int',
    nullable: false,
    default: 10,
  })
  stock: number;
}
