export const abstractEntity = {
  createdAt: {
    name: 'created_at',
    type: 'timestamp',
    createDate: new Date(),
  },
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    updateDate: new Date(),
  },
  deletedAt: {
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    deleteDate: new Date(),
  },
  updatedBy: {
    name: 'updated_by',
    type: 'varchar',
    nullable: true,
  },
  deletedBy: {
    name: 'deleted_by',
    type: 'varchar',
    nullable: true,
  },
};
