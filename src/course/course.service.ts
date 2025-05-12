import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CourseRO } from './course.interface';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}
  async createCourse(dto: CreateCourseDto): Promise<CourseRO> {
    let newCourse: CourseEntity = new CourseEntity();
    newCourse.title = dto.title;
    newCourse.description = dto.description;
    newCourse.created = new Date();
    const course = await this.courseRepository.save(newCourse);
    return this.buildCourseRO(course);
  }
  private buildCourseRO(course: CourseEntity): CourseRO {
    const courseRO: CourseRO = {
      id: course.id,
      title: course.title,
      description: course.description,
      createdAt: course.created,
      updatedAt: course.updated,
    };
    return courseRO;
  }
}
