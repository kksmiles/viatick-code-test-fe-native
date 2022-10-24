import { Coord } from "./Coord";
import { Weather } from "./Weather";

export class CurrentWeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: String;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;

  constructor(response: any) {
    this.coord = response.coord;
    this.weather = response.weather;
    this.base = response.base;
    this.main = response.main;
    this.visibility = response.visibility;
    this.wind = response.wind;
    this.clouds = response.clouds;
    this.dt = response.dt;
    this.sys = response.sys;
    this.timezone = response.timezone;
    this.id = response.id;
    this.name = response.name;
    this.cod = response.cod;
  }
}
