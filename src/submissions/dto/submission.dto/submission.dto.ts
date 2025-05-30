import { IsBoolean, IsEnum, IsString } from "class-validator";
import { SubmissionEntityType, Visibility } from "submissions/entity/submission.entity/submission.entity";

export class SubmissionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  // @IsEnum(['proposal', 'complaint', 'concern'])
  // SubmissionType: string;

  // @IsEnum(['private', 'public', 'poll'])
  // visibility: string;
  
  @IsEnum(SubmissionEntityType)
  SubmissionEntityType: SubmissionEntityType;

  @IsEnum(Visibility)
  visibility: Visibility;

  @IsBoolean()
  is_anonymous: boolean;
}
