import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Hero } from '../entities/hero.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'heroes_user',
  password: process.env.DB_PASS || 'heroes_pass',
  database: process.env.DB_NAME || 'heroes_factory',
  entities: [Hero],
  synchronize: true,
  logging: false,
});