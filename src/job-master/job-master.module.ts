import { Module } from '@nestjs/common';
import { JobMasterService } from './job-master.service';
import { JobMasterController } from './job-master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobMaster } from './entities/job-master.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobMaster])],
  controllers: [JobMasterController],
  providers: [JobMasterService],
})
export class JobMasterModule {}
