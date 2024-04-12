import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  due_date: Date;

  @IsNotEmpty()
  @IsString()
  status: string;
}
