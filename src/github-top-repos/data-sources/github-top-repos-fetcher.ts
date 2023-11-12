import axios from 'axios';
import { createInterface } from 'readline';
import { TOP_GITHUB_REPOS_DATA_BASEURL } from '../constants/top-github-repos-data-baseurl';
import { TOP_GITHUB_REPOS_LIMIT } from '../constants/top-github-repos-limit';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubTopReposFetcher {
  async fetch(date: string, language: string): Promise<string[]> {
    try {
      const csvUrl = `${TOP_GITHUB_REPOS_DATA_BASEURL}github-ranking-${date}.csv`;
      const response = await axios.get(csvUrl, { responseType: 'stream' });
      const rl = createInterface({
        input: response.data,
        crlfDelay: Infinity,
      });

      const lines = [];

      rl.on('line', (line) => {
        const [, lang] = line.split(',');
        if (lang === language) {
          lines.push(line);
        }

        if (lines.length === TOP_GITHUB_REPOS_LIMIT) {
          rl.close();
        }
      });

      const readlineEndPromise: Promise<string[]> = new Promise((resolve) => {
        rl.on('close', () => resolve(lines));
        rl.on('error', (error) => {
          console.error(`Error reading data stream: ${error.message}`);
          resolve([]);
        });
      });

      return readlineEndPromise;
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return [];
    }
  }
}
