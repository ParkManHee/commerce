import {DB} from 'src/constants/db';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import CustemBaseEntity from './base.entity';

@Entity({
  name: DB.ITEMS,
  database: DB.DATABASE_NAME,
  comment: '유저 테이블',
})
export default class ItemEntity extends CustemBaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq?: number;

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
}
