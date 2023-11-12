import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TopRatedGithubReposQueryDto } from './dto/top-rated-github-repos-query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/top-rated-github-repos')
  getTopRatedGithubRepos(@Query() query: TopRatedGithubReposQueryDto): void {
    const { date, language, limit } = query;
    return this.appService.getTopRatedGithubRepos(date, language, limit);
  }
}
