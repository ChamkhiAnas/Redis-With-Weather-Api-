import { Inject, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class WeatherService {

  constructor(

    @Inject('CACHE_MANAGER') private  cacheManager:Cache,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  
  ){
    
  }
  
  async GetWeather(){
  }

  async retrieveWeatherFromApi(CreateWeatherDto):Promise<any>{
      

  const {latitude,longitude}=CreateWeatherDto

  const Api_url=this.configService.get("API_URI")
  const Api_key=this.configService.get("API_KEY")

  const fullUrl=Api_url+latitude+","+longitude+"?key="+Api_key

  try {
    const response = await lastValueFrom(
      this.httpService.get(fullUrl, {
      }),
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }




  }
  
  create(createWeatherDto: CreateWeatherDto) {
    return 'This action adds a new weather';
  }

  findAll() {
    return `This action returns all weather`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`;
  }

  update(id: number, updateWeatherDto: UpdateWeatherDto) {
    return `This action updates a #${id} weather`;
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}
