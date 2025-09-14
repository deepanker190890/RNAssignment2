import { useCallback, useEffect, useMemo, useState } from 'react';
import { getWeather } from '../../api/weather/WeatherApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ensureLocationPermission,
  getCurrentPosition,
} from '../../utils/location';
import { WeatherData } from '../../api/weather/WeatherTypes';

const CACHE_KEY = 'weather_cache';
const CACHE_TS_KEY = 'weather_cache_ts';
const TTL_MS = 15 * 60 * 1000; // 15 minutes

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadCachedWeather = async () => {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      const cachedTsStr = await AsyncStorage.getItem(CACHE_TS_KEY);
      const cachedTs = cachedTsStr ? Number(cachedTsStr) : 0; //timestamp
      const now = Date.now();

      if (cachedData && now - cachedTs < TTL_MS) {
        console.log('Using cached weather data');
        setWeather(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      void fetchWeather(false);
    };

    loadCachedWeather();
  }, []);

  const fetchWeather = useCallback(
    async (refresh = false) => {
      try {
        if (refresh) {
          setRefreshing(true); // pull-to-refresh spinner
        } else {
          setLoading(true); // initial load spinner
        }
        setError(null);

        const hasPermission = await ensureLocationPermission();
        if (!hasPermission) {
          setError('Location permission denied');
          return;
        }

        const position = await getCurrentPosition();
        if (!position) {
          setError('Failed to get current location');
          return;
        }

        const { lat, lon } = position;
        const response = await getWeather(lat, lon);
        if (response.success && response.data) {
          setWeather(response.data);
          // Cache the data with timestamp
          AsyncStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
          AsyncStorage.setItem(CACHE_TS_KEY, Date.now().toString());
        } else {
          setError(response.message || 'Failed to fetch weather');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [weather],
  );

  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    const fetchLastUpdatedAt = async () => {
      const ts = await AsyncStorage.getItem(CACHE_TS_KEY);
      setLastUpdatedAt(ts ? new Date(Number(ts)) : null);
    };
    fetchLastUpdatedAt();
  }, [weather]);

  return {
    weather,
    loading,
    refreshing,
    error,
    lastUpdatedAt,
    refresh: () => fetchWeather(true),
  };
};
