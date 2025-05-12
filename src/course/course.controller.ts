import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseRO } from './course.interface';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  async createCourse(@Body() dto: CreateCourseDto): Promise<CourseRO> {
    return await this.courseService.createCourse(dto);
  }
}
