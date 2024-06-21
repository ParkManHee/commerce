import { BaseEntity, Column, Entity } from 'typeorm';

@Entity({
  comment: '',
})
export default class CustemBaseEntity extends BaseEntity {
  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date | string;

  @Column({
    name: 'blocked_at',
    type: 'datetime',
    nullable: true,
    default: null,
  })
  deletedAt: Date | string;

  @Column({
    name: 'last_modified_at',
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: null,
  })
  lastModifiedAt: Date | string;

  @Column({
    name: 'last_modified_by',
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  lastModifiedBy: number;
}
