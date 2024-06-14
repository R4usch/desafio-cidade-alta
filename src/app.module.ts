import { Module } from '@nestjs/common';
import { EmblemsModule } from './emblems/emblems.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './settings/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: dbConfig.USER,
      host: dbConfig.HOST,
      password: dbConfig.PASSWORD,
      database: dbConfig.NAME,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: false,
    }),
    EmblemsModule,
  ],
})
export class AppModule {}
