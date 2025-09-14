export interface WeatherData {
  name: string; // city
  dt: number;   // timestamp
  main: {
    temp: number;
    humidity: number;
  };
  weather: { main: string; description: string; icon: string }[];
}