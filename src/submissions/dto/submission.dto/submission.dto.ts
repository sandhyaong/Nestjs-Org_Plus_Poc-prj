import { IsBoolean, IsEnum, IsString } from "class-validator";

export class SubmissionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['proposal', 'complaint', 'concern'])
  type: string;

  @IsEnum(['private', 'public', 'poll'])
  visibility: string;

  @IsBoolean()
  is_anonymous: boolean;
}
