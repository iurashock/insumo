import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SETTINGS_KEY } from '../constants/constants';
import { SettingsState } from '../store/slices/settings.slice';

export async function setItemInStorage(key: string, value: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
}

export async function getItemFromStorage(key: string) {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

export async function removeItemFromStorage(key: string) {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
    return;
  }
  return SecureStore.deleteItemAsync(key);
}
