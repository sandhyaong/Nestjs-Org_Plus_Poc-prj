import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { RoleAllowed } from 'auth/guards/roles.decorator';
import { SubmissionDto } from './dto/submission.dto/submission.dto';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionsService: SubmissionService) {}

  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard )
  @RoleAllowed('admin')
  async createSubmission(
    @Body() createSubmissionDto: SubmissionDto,
    @Param('userId') userId: string,
  ) {
    return this.submissionsService.createSubmission(createSubmissionDto, userId);
  }

  @Get()
  async getAllSubmissions() {
    return this.submissionsService.getAllSubmissions();
  }

  @Get(':id')
  async getSubmissionById(@Param('id') id: string) {
    return this.submissionsService.getSubmissionById(id);
  }
}

