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
import { ApiProperty } from '@nestjs/swagger';

export class GithubTopReposQueryDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2020-01-01', description: 'The date of ranking' })
  date: string;

  @IsNotEmpty()
  @IsEnum(Languages)
  @ApiProperty({
    enum: Languages,
    example: Languages.JavaScript,
    description: 'The language of repositories',
  })
  language: Languages;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(TOP_GITHUB_REPOS_LIMIT)
  @ApiProperty({
    example: 10,
    description: 'The number of top repositories to return',
  })
  limit: number;
}
