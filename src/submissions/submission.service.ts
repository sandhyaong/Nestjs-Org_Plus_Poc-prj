import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Submission } from "./entity/submission.entity/submission.entity";
import { Repository } from "typeorm";
import { SubmissionDto } from "./dto/submission.dto/submission.dto";


@Injectable()
export class SubmissionService {

  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
  ) {}

  async createSubmission(createSubmissionDto: SubmissionDto, userId: string): Promise<Submission> {
    const submission = this.submissionsRepository.create({
      ...createSubmissionDto,
      user: { id: userId },
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.submissionsRepository.save(submission);
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return this.submissionsRepository.find();
  }

  async getSubmissionById(id: string): Promise<Submission | null> {
    return this.submissionsRepository.findOne({where: { id }});
  }
}

