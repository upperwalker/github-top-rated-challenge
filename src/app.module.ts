import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubTopReposFetcher } from './data-sources/github-top-repos-fetcher';
import { GithubTopReposOutputConverter } from './converters/github-top-repos-output.converter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GithubTopReposFetcher, GithubTopReposOutputConverter],
})
export class AppModule {}
