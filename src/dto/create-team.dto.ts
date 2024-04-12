import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  memberIds: number[];
}
