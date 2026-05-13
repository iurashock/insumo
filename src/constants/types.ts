import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type SETTINGS_STATUS = 'idle' | 'loading' | 'error';
export type SETTINGS_CURRENCY = 'RON' | 'EUR' | 'USD';
export type SETTINGS_LANGUAGE = 'en' | 'ro';

export type INTERVAL_PICK_OPTIONS =
  | 'current_week'
  | 'last_two_weeks'
  | 'current_month'
  | 'last_three_months'
  | 'current_year'
  | 'all_time'
  | 'custom';

export type IntervalRange = {
  choice: INTERVAL_PICK_OPTIONS;
  start: Date | null;
  end: Date | null;
};

export type Category = {
  id: string;
  type: 'income' | 'expense' | 'saving' | 'transfer' | 'missing';
  name: string;
  color: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;

  isDeleted?: boolean;
};

export type Entry = {
  id: string;

  categoryId: string;
  categoryType: 'income' | 'expense' | 'saving' | 'transfer' | 'missing';
  categoryName?: string;

  walletId: string; // initiator
  recipientWalletId?: string;

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
