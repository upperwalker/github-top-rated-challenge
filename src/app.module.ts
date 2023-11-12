import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './core/cache/cache.module';
import { GithubTopReposOutputConverter } from './github-top-repos/converters/github-top-repos-output.converter';
import { GithubTopReposFetcher } from './github-top-repos/data-sources/github-top-repos-fetcher';

@Module({
  imports: [CacheModule],
  controllers: [AppController],
  providers: [AppService, GithubTopReposFetcher, GithubTopReposOutputConverter],
})
export class AppModule {}
