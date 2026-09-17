import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JobMasterModule } from './job-master/job-master.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'practice',
      autoLoadEntities: true,
      migrations: ['src/migrations/*.ts'],
    }),
    UserModule,
    JobMasterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
