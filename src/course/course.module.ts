import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMError } from 'typeorm';
import { CourseEntity } from './course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
  // This module will handle the course logic
  // It will be responsible for creating, updating, deleting courses
  // It will also handle the enrollment logic
})
export class CourseModule {}
