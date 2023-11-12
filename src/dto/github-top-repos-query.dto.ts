import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
} from 'class-validator';
import { Languages } from '../constants/languages.enum';
import { TOP_GITHUB_REPOS_LIMIT } from '../constants/top-github-repos-limit';

export class GithubTopReposQueryDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsEnum(Languages)
  language: Languages;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(TOP_GITHUB_REPOS_LIMIT)
  limit: number;
}
