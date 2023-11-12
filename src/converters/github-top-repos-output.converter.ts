export type GithubTopReposResult = {
  rank: number;
  item: string;
  repo_name: string;
  stars: string;
  forks: string;
  language: string;
  repo_url: string;
  username: string;
  issues: string;
  last_commit: string;
  description: string;
}[];

export class GithubTopReposOutputConverter {
  convert(lines: string[], limit: number): GithubTopReposResult {
    return lines.slice(0, limit).map((line) => {
      const [
        rank,
        item,
        repo_name,
        stars,
        forks,
        language,
        repo_url,
        username,
        issues,
        last_commit,
        description,
      ] = line.split(',');

      return {
        rank: Number(rank),
        item,
        repo_name,
        stars,
        forks,
        language,
        repo_url,
        username,
        issues,
        last_commit,
        description,
      };
    });
  }
}
