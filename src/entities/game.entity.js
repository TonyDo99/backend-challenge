import { EntitySchema } from 'typeorm';
import { abstractEntity } from './abstract.entity.js';

export default new EntitySchema({
  name: 'GameSchema',
  tableName: 'tb_game',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true,
    },
    title: {
      type: 'varchar',
      length: 50,
    },
    ...abstractEntity,
  },
  relations: {
    tb_user: {
      target: 'UserSchema',
      type: 'many-to-many',
      joinTable: true,
    },
  },
});
