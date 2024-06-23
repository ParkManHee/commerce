import {DB} from 'src/constants/db';
import {BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import CustomBaseEntity from './base.entity';
import UsersEntity from './users.entity';

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

  @ManyToOne(() => UsersEntity, (user) => user.payments, {
    nullable: false,
  })
  @JoinColumn({
    name: 'user_seq',
    referencedColumnName: 'seq',
    foreignKeyConstraintName: 'FK_USERS_01',
  })
  user: UsersEntity | number;


}
