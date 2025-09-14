import { useEffect, useState } from 'react';
import { getNews } from '../../api/newsApi/NewsApi';
import { Article } from '../../api/newsApi/NewsTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'news_cache';

export const useNewsHook = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadCachedNews = async () => {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        console.log('Using cached news data');
        setNews(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      fetchNews(1, true);
    };

    loadCachedNews();
  }, []);

  const fetchNews = async (pageNumber = 1, refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true); // pull-to-refresh spinner
      } else if (pageNumber === 1) {
        setLoading(true); // first load spinner
      }
      setError(null);
      const response = await getNews({ page: pageNumber });
      if (response.success && response.data?.articles) {
        const newNews =
          refresh || pageNumber === 1
            ? response.data.articles
            : [...news, ...response.data.articles];
        setNews(newNews);
        // Cache the data
        AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newNews));
      } else {
        setError(response.message || 'Failed to fetch news');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchNews(1, true);
  };

  const handleLoadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(nextPage);
    }
  };

  return {
    news,
    loading,
    refreshing,
    error,
    handleRefresh,
    handleLoadMore,
  };
};
