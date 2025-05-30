import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entity/submission.entity/submission.entity';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';

@Module({
    imports:[TypeOrmModule.forFeature([Submission])],
    controllers:[SubmissionController],
    providers:[SubmissionService],
    exports:[SubmissionService]
})
export class SubmissionModule {}
