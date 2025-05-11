import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { CourseEntity } from 'src/course/course.entity';
import { UserRole } from 'src/common/enums/postgres.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    default: '',
    nullable: true,
  })
  bio: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  //enum
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @OneToMany(() => CourseEntity, (course) => course.user)
  courses: CourseEntity[];

  @OneToMany(() => CourseEntity, (course) => course.enrollments)
  enrollments: CourseEntity[];
}
