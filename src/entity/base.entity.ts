import {BaseEntity, Column, Entity} from 'typeorm';

@Entity({
  comment: '',
})
export default class CustomBaseEntity extends BaseEntity {
  @Column({
    name: 'created_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date | string;

  @Column({
    name: 'delete_at',
    type: 'date',
    nullable: true,
    default: null,
  })
  deletedAt: Date | string;

  @Column({
    name: 'last_modified_at',
    type: 'date',
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
