import { JobMaster } from 'src/job-master/entities/job-master.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('profile') // This will create a table named 'user'
export class Profile {
  @PrimaryGeneratedColumn()
  id: number; // Auto-increment primary key

  @Column()
  name: string;

  @Column({ unique: true })
  email: string; // Email column, must be unique

  @OneToMany(() => JobMaster, (job) => job.profile)
  jobs: JobMaster[];
}
