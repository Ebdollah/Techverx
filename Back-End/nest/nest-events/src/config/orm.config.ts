import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "src/events/event.entity";

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
    host: process.env.DB_HOST || 'localhost', // Use environment variables directly here
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'example',
    database: process.env.DB_NAME || 'nest-events',
    entities: [Event],
    autoLoadEntities: true,
    synchronize: true,
    })
  );


