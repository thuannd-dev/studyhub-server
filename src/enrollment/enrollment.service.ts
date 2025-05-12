import { Injectable } from '@nestjs/common';
import { EnrollmentRO } from './enrollment.interface';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentEntity } from './enrollment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  // This service will handle the enrollment logic
  async enrollStudent(dto: CreateEnrollmentDto): Promise<EnrollmentRO> {
    // Check if the course exists
    const course = await this.courseRepository.findOne({
      where: { id: dto.courseId },
    });
    if (!course) {
      throw new Error('Course not found');
    }
    // Check if the student exists
    const student = await this.userRepository.findOne({
      where: { id: dto.studentId },
    });
    if (!student) {
      throw new Error('Student not found');
    }
    let newEnrollment: EnrollmentEntity = new EnrollmentEntity();
    newEnrollment.courseId = dto.courseId;
    newEnrollment.studentId = dto.studentId;
    newEnrollment.enrolledAt = new Date();
    const enrollment = await this.enrollmentRepository.save(newEnrollment);
    return this.buildEnrollmentRO(enrollment);
  }

  private buildEnrollmentRO(enrollment: EnrollmentEntity): EnrollmentRO {
    const enrollmentRO: EnrollmentRO = {
      id: enrollment.id,
      courseId: enrollment.courseId,
      studentId: enrollment.studentId,
      enrolledAt: enrollment.enrolledAt,
    };
    return enrollmentRO;
  }
}
