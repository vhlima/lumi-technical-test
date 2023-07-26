import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities:['./infra/entities/**/*.ts'],
  migrations: ['./infra/migrations/*.ts']
});

export const connectPostgres = async () => {
  try {
    await PostgresDataSource.initialize();

    console.log('Postgres connected with success');
  } catch (error) {
    console.error('Error connecting to Postgres: ', error);
  }
};