import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './guards/customthrottler.guard';
@UseGuards(ThrottlerGuard)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.retrieveWeatherFromApi(createWeatherDto);
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weatherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
    return this.weatherService.update(+id, updateWeatherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weatherService.remove(+id);
  }
}
