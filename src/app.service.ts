import { Injectable } from '@nestjs/common';
import { GithubTopReposFetcher } from './data-sources/github-top-repos-fetcher';
import {
  GithubTopReposResult,
  GithubTopReposOutputConverter,
} from './converters/github-top-repos-output.converter';

@Injectable()
export class AppService {
  constructor(
    private readonly fetcher: GithubTopReposFetcher,
    private readonly outputConverter: GithubTopReposOutputConverter,
  ) {}
  async getTopRatedGithubRepos(
    date: string,
    language: string,
    limit: number,
  ): Promise<GithubTopReposResult> {
    const fetched = await this.fetcher.fetch(date, language);

    return this.outputConverter.convert(fetched, limit);
  }
}
