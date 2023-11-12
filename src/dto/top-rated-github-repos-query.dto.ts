import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
} from 'class-validator';
import { Languages } from '../languages.enum';

export class TopRatedGithubReposQueryDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsEnum(Languages)
  language: Languages;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;
}
