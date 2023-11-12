import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubTopReposFetcher } from './data-sources/github-top-repos-fetcher';
import { GithubTopReposOutputConverter } from './converters/github-top-repos-output.converter';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      no_ready_check: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GithubTopReposFetcher, GithubTopReposOutputConverter],
})
export class AppModule {}
