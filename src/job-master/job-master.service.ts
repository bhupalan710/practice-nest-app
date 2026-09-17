import { Injectable } from '@nestjs/common';
import { CreateJobMasterDto } from './dto/create-job-master.dto';
import { UpdateJobMasterDto } from './dto/update-job-master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobMaster } from './entities/job-master.entity';
import { EntityManager, Not, Repository } from 'typeorm';

@Injectable()
export class JobMasterService {
  constructor(
    @InjectRepository(JobMaster) private jobMasterRepo: Repository<JobMaster>,
  ) {}
  async create(createJobMasterDto: CreateJobMasterDto) {
    if (!createJobMasterDto.status) return 'Status cannot be false for create';
    const existingJob = await this.jobMasterRepo.findOneBy({
      job_title: createJobMasterDto.job_title,
    });
    if (existingJob) return 'Job already exists';
    const job = await this.jobMasterRepo.create(createJobMasterDto);
    const result = await this.jobMasterRepo.save(job);
    return 'Job created successfully';
  }

  async findAll() {
    const jobs = await this.jobMasterRepo.find();
    return jobs;
  }

  async findOne(id: number) {
    let result = await this.jobMasterRepo.manager
      .createQueryBuilder(JobMaster, 'data')
      .select([
        'data.id',
        'data.job_title',
        'data.department',
        'data.location',
        'data.employment_type',
        'data.salary',
        'data.job_description',
        'data.status',
      ])
      .where('data.id = :id', { id })
      .getRawOne();
    console.log(result);

    return result;
  }

  async update(id: number, updateJobMasterDto: UpdateJobMasterDto) {
    try {
      const job = await this.jobMasterRepo.findOne({ where: { id } });
      if (!job) return 'Job does not exist';

      const existjob = await this.jobMasterRepo.findOne({
        where: {
          id: Not(id),
          department: updateJobMasterDto?.department,
          job_title: updateJobMasterDto?.job_title,
        },
      });

      if (existjob) {
        return 'Job already exists in same department';
      }

      const data = await this?.jobMasterRepo.update(id, updateJobMasterDto);

      if (data) {
        return 'Job updated successfully';
      }
      return 'Failed to update job';
    } catch (error) {
      return `Failed to update job: ${error}`;
    }
  }

  async remove(id: number) {
    try {
      const job = await this.jobMasterRepo.findOne({ where: { id } });
      if (!job) return 'Job does not exist';

      const data = await this?.jobMasterRepo.delete(id);

      if (data) {
        return 'Job deleted successfully';
      }
      return 'Failed to delete job';
    } catch (error) {
      throw error;
    }
  }
}
