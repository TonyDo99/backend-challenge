import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as Entities from '../entities/index.entity.js';

import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from '../config/index.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Entities],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
