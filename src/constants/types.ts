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
  | 'custom'
  | 'clear';

export type TRANSACTION_TYPE_PICK_OPTIONS =
  | 'income'
  | 'expense'
  | 'saving'
  | 'transfer'
  | 'all';

export type TRANSACTION_MULTIPLE_PICK_OPTIONS = {
  all_options: boolean;
  pickedOptions: string[] | null;
};

export type TRANSACTION_SORTING_PICK_OPTIONS =
  | 'newest'
  | 'oldest'
  | 'least_expensive'
  | 'most_expensive';

export type FILTERS = {
  transactionWallet: TRANSACTION_MULTIPLE_PICK_OPTIONS;
  transactionType: TRANSACTION_MULTIPLE_PICK_OPTIONS;
  transactionCategories: TRANSACTION_MULTIPLE_PICK_OPTIONS;
  transactionSortingChoice: TRANSACTION_SORTING_PICK_OPTIONS;
  transactionSearch: string;
};

export type IntervalRange = {
  choice: INTERVAL_PICK_OPTIONS;
  start: Date | null;
  end: Date | null;
};

export type Category = {
  id: string;
  userId: string;
  type: 'income' | 'expense' | 'saving' | 'transfer' | 'missing';
  name: string;
  color: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;

  isDeleted?: boolean;
};

export type Wallet = {
  walletId: string;
  userId: string;
  name: string;
  currency: string;
  createdAt?: Date;
  lastUpdated?: Date;
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
  userId: string;
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
