import {DB} from 'src/constants/db';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import CustomBaseEntity from './base.entity';
import ItemOptionsEntity from './item.options.entity';
import {DefaultStatus} from 'src/enums/default.status';
import PaymentDetailEntity from './payment.detail.entity';

@Entity({
  name: DB.ITEMS,
  database: DB.DATABASE_NAME,
  comment: '제품 테이블',
})
export default class ItemsEntity extends CustomBaseEntity {
  @OneToMany(() => ItemOptionsEntity, options => options.item)
  options: ItemOptionsEntity[];

  @OneToMany(() => PaymentDetailEntity, detail => detail.item)
  detail: PaymentDetailEntity[];

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
    name: 'status',
    type: 'enum',
    enum: DefaultStatus,
    nullable: false,
    default: DefaultStatus.ACTIVE,
  })
  status: DefaultStatus;
}
