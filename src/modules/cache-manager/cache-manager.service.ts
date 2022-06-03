import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class CacheManagerService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getValueCache<T>(key: string): Promise<T> {
    return await this.cacheManager.get(this.getKeyCache(key));
  }

  async setCache<T>(
    key: string,
    data: any,
    options: CachingConfig = { ttl: 10 },
  ): Promise<T> {
    console.log(this.getKeyCache(key));
    return await this.cacheManager.set(this.getKeyCache(key), data, options);
  }

  async deleteCache(key: string) {
    await this.cacheManager.del(key);
  }

  async resetAllCache() {
    await this.cacheManager.reset();
  }

  getKeyCache(key: string) {
    return `KEY_CACHE:${key}`;
  }
}
