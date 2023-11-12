import { Inject, Injectable } from '@nestjs/common';
import { GithubTopReposFetcher } from './data-sources/github-top-repos-fetcher';
import {
  GithubTopReposResult,
  GithubTopReposOutputConverter,
} from './converters/github-top-repos-output.converter';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(
    private readonly fetcher: GithubTopReposFetcher,
    private readonly outputConverter: GithubTopReposOutputConverter,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getTopRatedGithubRepos(
    date: string,
    language: string,
    limit: number,
  ): Promise<GithubTopReposResult> {
    const cacheKey = date + '-' + language;
    let cached: string[] = await this.cacheManager.get(cacheKey);
    if (!cached) {
      cached = await this.fetcher.fetch(date, language);
      await this.cacheManager.set(cacheKey, cached);
    }

    return this.outputConverter.convert(cached, limit);
  }
}
