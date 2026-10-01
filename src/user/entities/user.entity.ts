import { JobMaster } from 'src/job-master/entities/job-master.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('profile') // This will create a table named 'user'
export class Profile {
  @PrimaryGeneratedColumn()
  id: number; // Auto-increment primary key

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string; // Email column, must be unique

  @Column({ type: 'varchar', length: 20, unique: true })
  password: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => JobMaster, (job) => job.profile)
  jobs: JobMaster[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
