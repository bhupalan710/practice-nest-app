import { JobMaster } from 'src/job-master/entities/job-master.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: 'company name' })
  company_name: string;

  @OneToMany(() => JobMaster, (job) => job.company)
  jobs: JobMaster[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: 'company email',
  })
  email: string;

  @Column({ type: 'varchar', length: 100, comment: 'company phone' })
  phone: string;

  @Column({ type: 'varchar', length: 100, comment: 'company address' })
  address: string;

  @Column({ type: 'varchar', length: 100, comment: 'company industry' })
  industry: string;

  @Column({ default: true, comment: 'company status' })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
