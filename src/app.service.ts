import { Injectable } from '@nestjs/common';
import { CacheManagerWrapper } from './core/cache/cache-manager-wrapper';
import {
  GithubTopRepoResult,
  GithubTopReposOutputConverter,
} from './github-top-repos/converters/github-top-repos-output.converter';
import { GithubTopReposFetcher } from './github-top-repos/data-sources/github-top-repos-fetcher';

@Injectable()
export class AppService {
  constructor(
    private readonly fetcher: GithubTopReposFetcher,
    private readonly outputConverter: GithubTopReposOutputConverter,
    private readonly cacheManager: CacheManagerWrapper,
  ) {}
  async getTopRatedGithubRepos(
    date: string,
    language: string,
    limit: number,
  ): Promise<GithubTopRepoResult[]> {
    const cacheKey = date + '-' + language;
    let cached: string[] = await this.cacheManager.get(cacheKey);
    if (!cached) {
      cached = await this.fetcher.fetch(date, language);
      await this.cacheManager.set(cacheKey, cached);
    }

    return this.outputConverter.convert(cached, limit);
  }
}
