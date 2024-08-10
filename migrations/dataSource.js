import { Report } from '../src/reports/report.entity';
import { User } from '../src/users/user.entity';
import { DataSource } from 'typeorm';

export const dbConfig = {
  type: 'sqlite',
  database: 'db.sqlite',
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,
  entities: [],
  migrationsRun: true,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      migrationsRun: true,
      synchronize: true,
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [User, Report],
      migrationsRun: true,
      synchronize: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      database: '',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      migrationsRun: true,
      synchronize: true,
    });
}

const dataSource = new DataSource(dbConfig);

export default dataSource;
