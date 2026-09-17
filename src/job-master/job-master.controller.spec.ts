import { Test, TestingModule } from '@nestjs/testing';
import { JobMasterController } from './job-master.controller';
import { JobMasterService } from './job-master.service';

describe('JobMasterController', () => {
  let controller: JobMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobMasterController],
      providers: [JobMasterService],
    }).compile();

    controller = module.get<JobMasterController>(JobMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
