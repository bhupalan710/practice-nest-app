import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobMasterService } from './job-master.service';
import { CreateJobMasterDto } from './dto/create-job-master.dto';
import { UpdateJobMasterDto } from './dto/update-job-master.dto';

@Controller('job-master')
export class JobMasterController {
  constructor(private readonly jobMasterService: JobMasterService) {}

  @Post('create')
  create(@Body() createJobMasterDto: CreateJobMasterDto) {
    return this.jobMasterService.create(createJobMasterDto);
  }

  @Get()
  findAll() {
    return this.jobMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobMasterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobMasterDto: UpdateJobMasterDto,
  ) {
    return this.jobMasterService.update(+id, updateJobMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobMasterService.remove(+id);
  }
}
