import { Profile } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('job_data')
export class JobMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: 'job title' })
  job_title: string;

  @ManyToOne(() => Profile, (profile) => profile.jobs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Column({ type: 'varchar', length: 100, comment: 'Department' })
  department: string;

  @Column({ type: 'varchar', length: 100, comment: 'Location' })
  location: string;

  @Column({ type: 'varchar', length: 100, comment: 'Employment Type' })
  employment_type: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, comment: 'Salary' })
  salary: string;

  @Column({ type: 'varchar', length: 200, comment: 'Job description' })
  job_description: string;

  @Column({ default: true, comment: 'Job status' })
  status: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
