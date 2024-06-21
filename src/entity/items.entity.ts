import {DB} from "src/constants/db";
import {UsersStatus} from "src/enums/user.status";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import CustemBaseEntity from "./base.entity";

@Entity({
  name: DB.USERS,
  database: DB.DATABASE_NAME,
  comment: "유저 테이블",
})
export default class UsersEntity extends CustemBaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  seq?: number;

  @Column({
    name: "name",
    type: "varchar",
    length: 30,
    nullable: true,
    default: null,
  })
  name: string;

  @Column({
    name: "supply_price",
    type: "number",
    length: 30,
    nullable: true,
    default: 0.0,
  })
  supplyPrice: number;

  @Column({
    name: "selling_price",
    type: "number",
    length: 30,
    nullable: true,
    default: 0.0,
  })
  sellingPrice: number;

  @Column({
    name: "status",
    type: "enum",
    enum: UsersStatus,
    nullable: true,
    default: UsersStatus.ACTIVE,
  })
  status: UsersStatus;
}
