import { CacheModule, Module } from '@nestjs/common';
import { config } from 'src/@core/config/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheManagerService } from './cache-manager.service';

const { host, port } = config.redis;
export const CACHE_MODULE = () =>
  CacheModule.register({
    store: redisStore,
    port,
    host,
    ttl: 120,
  });

@Module({
  imports: [CACHE_MODULE()],
  controllers: [],
  providers: [CacheManagerService],
  exports: [CacheManagerService, CacheModule],
})
export class CacheManagerModule {}
