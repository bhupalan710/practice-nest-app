import { PartialType } from '@nestjs/mapped-types';
import { CreateJobMasterDto } from './create-job-master.dto';

export class UpdateJobMasterDto extends PartialType(CreateJobMasterDto) {}
