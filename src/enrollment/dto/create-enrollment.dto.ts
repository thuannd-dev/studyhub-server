import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  courseId: number;
}
