import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';


export async function ensureLocationPermission(): Promise<boolean> {
  const perm =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const status = await check(perm);
  if (status === RESULTS.GRANTED) return true;

  if (status === RESULTS.BLOCKED) {
    openSettings().catch(() => {});
    return false;
  }

  const requested = await request(perm);
  return requested === RESULTS.GRANTED;
}

export function getCurrentPosition(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      err => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}