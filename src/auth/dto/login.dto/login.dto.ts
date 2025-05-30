import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({ example: 'sandhya@gmail.com' })
  @IsEmail()
  email: string;

    @ApiProperty({ example: 'Pass@123' })
  @IsString()
  password: string;
}