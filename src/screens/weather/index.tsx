import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import { useWeather } from './useWeatherHook';
import CustomButton from '../../components/CustomButton';
import WeatherLoader from '../../components/WeatherLoader';

type Props = BottomTabScreenProps<BottomTabParamList, 'Weather'>;

const WeatherScreen: FC<Props> = ({ navigation, route }: Props) => {
  const { weather, loading, error, lastUpdatedAt, refresh } = useWeather();
  if (loading && !weather) {
    return (
      <View style={styles.container}>
        <WeatherLoader />
      </View>
    );
  }

  if (error && !weather) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <View style={{ height: 12 }} />
        <CustomButton title="Try Again" onPress={refresh} />
      </View>
    );
  }

  const icon = weather?.weather[0]?.icon
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
    : undefined;

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.warn}>{error}</Text> : null}
      {weather ? (
        <View style={styles.container}>
          <Text style={styles.city}>{weather?.name ?? '—'}</Text>

          <View style={styles.row}>
            {icon ? <Image source={{ uri: icon }} style={styles.icon} /> : null}
            <Text style={styles.temp}>
              {Math.round(weather?.main?.temp ?? 0)}°C
            </Text>
          </View>

          <Text style={styles.condition}>
            {weather?.weather?.[0]?.main} • {weather?.weather?.[0]?.description}
          </Text>

          <Text style={styles.meta}>
            Humidity: {weather?.main?.humidity ?? '—'}%
          </Text>

          <View style={{ height: 12 }} />
          <CustomButton title="Refresh" onPress={refresh} />

          {lastUpdatedAt ? (
            <Text style={styles.updated}>
              Updated: {lastUpdatedAt.toLocaleTimeString()}
            </Text>
          ) : null}
        </View>
      ) : (
        <Text>No weather data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 32 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  city: { fontSize: 22, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  temp: { fontSize: 48, fontWeight: '700' },
  condition: { fontSize: 18, marginTop: 8 },
  meta: { fontSize: 16, marginTop: 4, opacity: 0.8 },
  updated: { marginTop: 8, fontSize: 12, opacity: 0.7 },
  error: { fontSize: 16, color: 'red', textAlign: 'center' },
  warn: { color: '#b36b00', marginBottom: 8 },
  icon: { width: 80, height: 80, marginRight: 10 },
});

export default WeatherScreen;
