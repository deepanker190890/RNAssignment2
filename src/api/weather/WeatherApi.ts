import createClient from '../client';
import { ApiResponse } from '../apiResponses';
import { WeatherData } from './WeatherTypes';
import { API_BASE_WEATHER_URL, WEATHER_API_KEY } from '../apiConstants';

const weatherClient = createClient(API_BASE_WEATHER_URL);


export const getWeather = async (lat:number,lon:number): Promise<ApiResponse<WeatherData>> => {
 try {

    const params = {
      lat,
      lon,
      appid: WEATHER_API_KEY,
      units: 'metric', 
    };

    const fullUrl = weatherClient.getUri({
      url: '',
      params,
    });

    console.log('Final Request URL:', fullUrl);
    const response = await weatherClient.get('', { params });
    console.log('Weather API success:', response.data);
    return {
      success: true,
      data: response.data, // contains weather data
    };

 } catch (error: any) {
     console.log('News API error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch news',
    };

 }
}