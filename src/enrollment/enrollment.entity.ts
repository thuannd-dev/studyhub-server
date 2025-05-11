import { CourseEntity } from 'src/course/course.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('enrollment')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.enrollments)
  student: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.enrollments)
  course: CourseEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;
}
