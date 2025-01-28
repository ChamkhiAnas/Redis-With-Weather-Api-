import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './weather/guards/customthrottler.guard';

@Module({
  imports: [
    
    
  CacheModule.register(
    {
      isGlobal:true,
    }
  ),
  ConfigModule.forRoot({
    isGlobal: true, // Makes the ConfigModule available globally
  }), 

  ThrottlerModule.forRoot([{
    name: 'short',
    ttl: 10000,
    limit: 8,
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
