import createClient from '../client';
import { ApiResponse } from '../apiResponses';
import { API_BASE_NEWS_URL, NEWS_API_KEY } from '../apiConstants';
import { NewsRequest, NewsResponse } from './NewsTypes';

const newsClient = createClient(API_BASE_NEWS_URL);

export const getNews = async ({
  page = 1,
  pageSize = 10,
}: NewsRequest): Promise<ApiResponse<NewsResponse>> => {
  try {
    //in axios we can pass params as an object directly 
    //     const params = new URLSearchParams({
    //     q: query,
    //     page: (page || 1).toString(),
    //     pageSize: (pageSize || 10).toString(),
    //     apiKey: NEWS_API_KEY
    //     ...extraParams - need to check later
    //   });
    const params = {
      page: page || 1,
      pageSize: pageSize || 10,
      apiKey: NEWS_API_KEY,
      country: 'us',
    };

    const fullUrl = newsClient.getUri({
      url: '/top-headlines',
      params,
    });

    console.log('Final Request URL:', fullUrl);
    const response = await newsClient.get('/top-headlines', { params });
    console.log('Login API success:', response.data);
    return {
      success: true,
      data: response.data, // contains token
    };
  } catch (error: any) {
    console.log('News API error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch news',
    };
  }
};
