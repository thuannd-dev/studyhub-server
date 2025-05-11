import { Injectable } from '@nestjs/common';
import { EnrollmentRO } from './enrollment.interface';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentEntity } from './enrollment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}
  // This service will handle the enrollment logic
  async enrollStudent(dto: CreateEnrollmentDto): Promise<EnrollmentRO> {
    let newEnrollment: EnrollmentEntity = new EnrollmentEntity();
    newEnrollment.course.id = dto.courseId;
    newEnrollment.student.id = dto.studentId;
    newEnrollment.enrolledAt = new Date();
    const enrollment = await this.enrollmentRepository.save(newEnrollment);
    await this.enrollmentRepository.save(enrollment);
    return this.buildEnrollmentRO(enrollment);
  }

  private buildEnrollmentRO(enrollment: EnrollmentEntity): EnrollmentRO {
    const enrollmentRO: EnrollmentRO = {
      id: enrollment.id,
      courseId: enrollment.course.id,
      studentId: enrollment.student.id,
      enrolledAt: enrollment.enrolledAt,
    };
    return enrollmentRO;
  }
}
