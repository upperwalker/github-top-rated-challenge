import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GithubTopReposQueryDto } from './dto/github-top-repos-query.dto';
import { GithubTopReposResult } from './converters/github-top-repos-output.converter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/top-rated-github-repos')
  getTopRatedGithubRepos(
    @Query() query: GithubTopReposQueryDto,
  ): Promise<GithubTopReposResult> {
    const { date, language, limit } = query;
    return this.appService.getTopRatedGithubRepos(date, language, limit);
  }
}
