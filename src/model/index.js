import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as Entities from '../entities/index.entity.js';

import rootConfiguration from '../config/index.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: rootConfiguration().DB_HOST,
  port: rootConfiguration().DB_PORT,
  username: rootConfiguration().DB_USERNAME,
  password: rootConfiguration().DB_PASSWORD,
  database: rootConfiguration().DB_DATABASE,
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
