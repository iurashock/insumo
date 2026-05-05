import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type SETTINGS_STATUS = 'idle' | 'loading' | 'error';
export type SETTINGS_CURRENCY = 'RON' | 'EUR' | 'USD';
export type SETTINGS_LANGUAGE = 'en' | 'ro';

export type Category = {
  id: number;
  name: string;
  color: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export type Entry = {
  id: string;
  categoryId: number;
  walletId: string;
  entryDate: string;
  comment: string;
  amount: number;
};

export type EntryListButtonProps = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  onPress?: () => void;
};

export type User = {
  userId: number;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: Date;
  dateOfBirth: Date;

  // preferences
  mainCurrency: SETTINGS_CURRENCY;
  language: SETTINGS_LANGUAGE;
  darkMode: true | false;
};
