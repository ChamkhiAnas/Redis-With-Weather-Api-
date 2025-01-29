import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis';
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: ''
      }
    }),
    CacheModule.register(
      {
        isGlobal:true,
        ttl:30 * 1000
      }
    ),
  ConfigModule.forRoot({
    isGlobal: true, // Makes the ConfigModule available globally
  }), 

  ThrottlerModule.forRoot([{
    name: 'short',
    ttl: 10000,
    limit: 100,
    // generateKey:(req)=>req.user.id

  }]),  
  WeatherModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
