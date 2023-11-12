import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

export class CacheManagerWrapper {
  private client;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager) {
    this.client = cacheManager?.store?.getClient();

    this.client?.on('error', (error) => {
      console.error(error);
      this.client.quit();
    });
  }

  get<T>(key: string): Promise<T | null> {
    if (!this.isClientReady()) {
      return null;
    }

    return this.cacheManager.get(key);
  }

  set<T>(key: string, value: T): Promise<void> {
    if (!this.isClientReady()) {
      return;
    }

    return this.cacheManager.set(key, value);
  }

  isClientReady(): boolean {
    return this.client != null && this.client.ready;
  }
}
