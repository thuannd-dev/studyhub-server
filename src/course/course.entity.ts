import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @ManyToOne(() => UserEntity, (user) => user.courses)
  user: UserEntity;

  @OneToMany(() => EnrollmentEntity, (e) => e.course)
  enrollments: EnrollmentEntity[];

  //   @OneToMany(() => Lesson, (l) => l.course)
  //   lessons: Lesson[];

  //   @OneToMany(() => Assignment, (a) => a.course)
  //   assignments: Assignment[];
}
