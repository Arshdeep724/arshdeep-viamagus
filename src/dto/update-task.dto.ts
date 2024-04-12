import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  due_date: Date;

  @IsOptional()
  @IsString()
  status: string;
}
