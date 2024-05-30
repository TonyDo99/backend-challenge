import { EntitySchema } from 'typeorm';
import { abstractEntity } from './abstract.entity.js';

export default new EntitySchema({
  name: 'UserSchema',
  tableName: 'tb_user',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true,
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    ...abstractEntity,
  },
});
