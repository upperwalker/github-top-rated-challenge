import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { CacheManagerWrapper } from './cache-manager-wrapper';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestCacheModule.register<RedisClientOptions>({
      isGlobal: true,
      no_ready_check: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  providers: [CacheManagerWrapper],
  exports: [CacheManagerWrapper],
})
export class CacheModule {}
