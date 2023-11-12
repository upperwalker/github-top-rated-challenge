import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GithubTopRepoResult } from './github-top-repos/converters/github-top-repos-output.converter';
import { GithubTopReposQueryDto } from './github-top-repos/dto/github-top-repos-query.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get top rated GitHub repositories by date and language',
  })
  @ApiOkResponse({
    description: 'The found records',
    type: GithubTopRepoResult,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
  })
  @Get('/top-rated-github-repos')
  getTopRatedGithubRepos(
    @Query() query: GithubTopReposQueryDto,
  ): Promise<GithubTopRepoResult[]> {
    const { date, language, limit } = query;
    return this.appService.getTopRatedGithubRepos(date, language, limit);
  }
}
