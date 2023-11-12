import { ApiProperty } from '@nestjs/swagger';
import { Languages } from '../constants/languages.enum';

export class GithubTopRepoResult {
  @ApiProperty({ example: 1, description: 'The rank of repository' })
  rank: number;

  @ApiProperty({ example: 'repo', description: 'The name of project' })
  item: string;

  @ApiProperty({ example: 'repo', description: 'The name of repository' })
  repo_name: string;

  @ApiProperty({ example: 100, description: 'The number of stars' })
  stars: number;

  @ApiProperty({ example: 100, description: 'The number of forks' })
  forks: number;

  @ApiProperty({
    enum: Languages,
    example: Languages.TypeScript,
  })
  language: string;

  @ApiProperty({ example: 'repo_url', description: 'The url of repository' })
  repo_url: string;

  @ApiProperty({ example: 'user', description: 'The name of user' })
  username: string;

  @ApiProperty({ example: 100, description: 'The number of issues' })
  issues: number;

  @ApiProperty({
    example: '2020-01-01',
    description: 'The date of last commit',
  })
  last_commit: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'The description of repository',
  })
  description: string;
}

export class GithubTopReposOutputConverter {
  convert(lines: string[], limit: number): GithubTopRepoResult[] {
    return lines.slice(0, limit).map((line) => {
      const [
        rank,
        item,
        repo_name,
        stars,
        forks,
        language,
        repo_url,
        username,
        issues,
        last_commit,
        description,
      ] = line.split(',');

      return {
        rank: Number(rank),
        item,
        repo_name,
        stars: Number(stars),
        forks: Number(forks),
        language,
        repo_url,
        username,
        issues: Number(issues),
        last_commit,
        description,
      };
    });
  }
}
