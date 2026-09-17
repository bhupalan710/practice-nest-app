import { Test, TestingModule } from '@nestjs/testing';
import { JobMasterService } from './job-master.service';

describe('JobMasterService', () => {
  let service: JobMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobMasterService],
    }).compile();

    service = module.get<JobMasterService>(JobMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
