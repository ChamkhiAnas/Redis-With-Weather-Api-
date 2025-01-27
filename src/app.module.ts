import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';

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
  
  WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
