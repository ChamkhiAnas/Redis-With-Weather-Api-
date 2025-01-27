import { IsLatitude, IsLongitude, IsString } from "class-validator";

export class CreateWeatherDto {


    @IsLatitude()
    latitude:number;

    @IsLongitude()
    longitude:number;
}
