import { Body, Controller, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('sign-up')
  async enrollStudent(@Body() enrollData: CreateEnrollmentDto) {
    return await this.enrollmentService.enrollStudent(enrollData);
  }
}
