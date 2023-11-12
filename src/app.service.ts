import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTopRatedGithubRepos(date: string, language: string, limit: number): void {
    console.log({
      date,
      language,
      limit,
    });
    // url to retrive
    // https://raw.githubusercontent.com/EvanLi/Github-Ranking/master/Data/github-ranking-[date].csv
  }
}
