import { Category, Entry, INTERVAL_PICK_OPTIONS, User } from './types';

export const ENTRY_LIST_HEADER_MAX_HEIGHT = 200;
export const ENTRY_LIST_HEADER_MIN_HEIGHT = 44;
export const TOP_NAVBAR_HEIGHT = 60;
export const ACCESS_TOKEN_KEY = 'accessToken';
export const USER_ID_KEY = 'userID';
export const SETTINGS_KEY = 'app_settings';
export const ALL_ENTRIES_LIST_KEY = 'all_entries_list';
export const SELECTED_ENTRY_ID_KEY = 'selected_entry_id';

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const WEEKDAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const OPTIONS: {
  value: INTERVAL_PICK_OPTIONS;
  label: string;
}[] = [
  { value: 'current_week', label: 'This Week' },
  { value: 'last_two_weeks', label: 'Last 2 Weeks' },
  { value: 'current_month', label: 'This Month' },
  { value: 'last_three_months', label: 'Last 3 Months' },
  { value: 'current_year', label: 'This Year' },
  { value: 'all_time', label: 'All Time' },
  { value: 'custom', label: 'Custom range' },
];

export const USERS: User[] = [
  {
    userId: 123456,
    name: 'John Smith',
    email: 'john.smith@gmail.com',
    phone: '+40723456789',
    passwordHash: 'pass1',
    createdAt: new Date(2025, 5, 15),
    dateOfBirth: new Date(2001, 2, 20),
    darkMode: true,
    mainCurrency: 'RON',
    language: 'en',
  },
  {
    userId: 987654,
    name: 'Michael Bertoldo',
    email: 'bertoldo@gmail.com',
    phone: '+40722334455',
    passwordHash: 'pass2',
    createdAt: new Date(2025, 10, 15),
    dateOfBirth: new Date(1998, 6, 14),
    darkMode: false,
    mainCurrency: 'EUR',
    language: 'en',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'groc1',
    type: 'expense',
    name: 'Groceries',
    color: '#BF3851',
    icon: 'cart',
    isDeleted: false,
  },
  {
    id: 'home1',
    type: 'expense',
    name: 'Home',
    color: '#3AC2C2',
    icon: 'home',
    isDeleted: false,
  },
  {
    id: 'tran1',
    type: 'expense',
    name: 'Transport',
    color: '#F59E0B',
    icon: 'bus',
    isDeleted: false,
  },
  {
    id: 'fun01',
    type: 'expense',
    name: 'Entertainment',
    color: '#8B5CF6',
    icon: 'movie-open',
    isDeleted: false,
  },
  {
    id: 'heal1',
    type: 'expense',
    name: 'Health',
    color: '#10B981',
    icon: 'heart-pulse',
    isDeleted: false,
  },
  {
    id: 'inc01',
    type: 'income',
    name: 'Salaried Job',
    color: '#2563EB',
    icon: 'cash-plus',
    isDeleted: false,
  },
  {
    id: 'save1',
    type: 'saving',
    name: 'Retirement fund',
    color: '#059669',
    icon: 'piggy-bank',
    isDeleted: false,
  },
  {
    id: 'trsf01',
    type: 'transfer',
    name: 'Transfer',
    color: '#636363',
    icon: 'swap-horizontal',
    isDeleted: false,
  },
];

export const FALLBACK_CATEGORY: Category = {
  id: 'miss0',
  type: 'missing',
  name: 'missing',
  color: 'red',
  icon: 'head-question',
};

export const ENTRIES: Entry[] = [
  {
    id: 'aMs79sQ2',
    categoryId: 'trsf01',
    categoryType: 'transfer',
    categoryName: 'Transfer',
    walletId: 'Main Wallet',
    recipientWalletId: 'Cash Wallet',
    entryDate: '2026-04-29',
    amount: 1400,
    comment: 'ATM withdrawal for living expenses',
  },

  // ----- April 1
  {
    id: 'aZ9F3kQ2',
    categoryId: 'inc01',
    categoryType: 'income',
    categoryName: 'Salaried Job',
    walletId: 'Main Wallet',
    entryDate: '2026-04-01',
    amount: 3200,
    comment: 'Monthly salary deposited from main employer.',
  },
  {
    id: 'M7xP2LQa',
    categoryId: 'groc1',
    categoryType: 'expense',
    categoryName: 'Groceries',
    walletId: 'Main Wallet',
    entryDate: '2026-04-01',
    amount: -145.3,
    comment: 'Weekly grocery shopping at the local supermarket.',
  },
  {
    id: 'R4BzK91e',
    categoryId: 'home1',
    categoryType: 'expense',
    categoryName: 'Home',
    walletId: 'Main Wallet',
    entryDate: '2026-04-01',
    amount: -420,
    comment: 'Paid electricity and maintenance bills for the apartment.',
  },

  // ----- April 2
  {
    id: 'kQ8mF7S2',
    categoryId: 'tran1',
    categoryType: 'expense',
    categoryName: 'Transport',
    walletId: 'Cash',
    entryDate: '2026-04-02',
    amount: -12.5,
    comment: 'Bus tickets and short ride across the city.',
  },
  {
    id: 'Z3T9xA4L',
    categoryId: 'groc1',
    categoryType: 'expense',
    categoryName: 'Groceries',
    walletId: 'Cash',
    entryDate: '2026-04-02',
    amount: -36.9,
    comment: 'Picked up fruits, snacks, and drinks on the way home.',
  },
  {
    id: 'P6E2Rk9W',
    categoryId: 'save1',
    categoryType: 'saving',
    categoryName: 'Retirement fund',
    walletId: 'Savings',
    entryDate: '2026-04-02',
    amount: -500,
    comment: 'Moved part of the salary into long-term savings account.',
  },

  // ----- April 3
  {
    id: 'X5mK3R8A',
    categoryId: 'fun01',
    categoryType: 'expense',
    categoryName: 'Entertainment',
    walletId: 'Main Wallet',
    entryDate: '2026-04-03',
    amount: -55,
    comment: 'Cinema night with friends, tickets and popcorn included.',
  },
  {
    id: 'N8Z6B7xM',
    categoryId: 'heal1',
    categoryType: 'expense',
    categoryName: 'Health',
    walletId: 'Main Wallet',
    entryDate: '2026-04-03',
    amount: -89.99,
    comment: 'Pharmacy visit for supplements and basic medication.',
  },

  // ----- April 4
  {
    id: '4KQe8W2Z',
    categoryId: 'tran1',
    categoryType: 'expense',
    categoryName: 'Transport',
    walletId: 'Main Wallet',
    entryDate: '2026-04-04',
    amount: -25,
    comment: 'Fuel contribution for a shared car ride.',
  },
  {
    id: 'L9mS6E2Q',
    categoryId: 'home1',
    categoryType: 'expense',
    categoryName: 'Home',
    walletId: 'Savings',
    entryDate: '2026-04-04',
    amount: -300,
    comment: 'Emergency home repair fund allocation.',
  },

  // ----- April 5
  {
    id: 'W8ZP4xNQ',
    categoryId: 'fun01',
    categoryType: 'expense',
    categoryName: 'Entertainment',
    walletId: 'Main Wallet',
    entryDate: '2026-04-05',
    amount: -42,
    comment: 'Streaming subscriptions and movie rental fees.',
  },
  {
    id: 'F6A9mKQZ',
    categoryId: 'groc1',
    categoryType: 'expense',
    categoryName: 'Groceries',
    walletId: 'Main Wallet',
    entryDate: '2026-04-05',
    amount: -67.4,
    comment: 'Restocked household food supplies for the week.',
  },

  // ----- April 6
  {
    id: '9PZ2M8A6',
    categoryId: 'inc01',
    categoryType: 'income',
    categoryName: 'Salaried Job',
    walletId: 'Main Wallet',
    entryDate: '2026-04-06',
    amount: 250,
    comment: 'Freelance project payment received via bank transfer.',
  },
  {
    id: 'K7X2m9QZ',
    categoryId: 'heal1',
    categoryType: 'expense',
    categoryName: 'Health',
    walletId: 'Main Wallet',
    entryDate: '2026-04-06',
    amount: -120,
    comment: 'Doctor consultation and basic medical check-up.',
  },
  {
    id: 'RZ5Q8A9m',
    categoryId: 'tran1',
    categoryType: 'expense',
    categoryName: 'Transport',
    walletId: 'Cash',
    entryDate: '2026-04-06',
    amount: -8,
    comment: 'Quick taxi ride due to bad weather.',
  },

  // ----- April 7
  {
    id: 'Q2A7mP9Z',
    categoryId: 'fun01',
    categoryType: 'expense',
    categoryName: 'Entertainment',
    walletId: 'Main Wallet',
    entryDate: '2026-04-07',
    amount: -60,
    comment: 'Dinner out with colleagues after work.',
  },
  {
    id: 'M8Q7X2ZP',
    categoryId: 'home1',
    categoryType: 'expense',
    categoryName: 'Home',
    walletId: 'Main Wallet',
    entryDate: '2026-04-07',
    amount: -95,
    comment: 'Bought small furniture items for the living room.',
  },
  {
    id: '6ZQ8PAM2',
    categoryId: 'groc1',
    categoryType: 'expense',
    categoryName: 'Groceries',
    walletId: 'Cash',
    entryDate: '2026-04-07',
    amount: -22.8,
    comment: 'Late-night snack and drinks from convenience store.',
  },

  // ----- April 8
  {
    id: 'X8M9Q2ZP',
    categoryId: 'inc01',
    categoryType: 'income',
    categoryName: 'Salaried Job',
    walletId: 'Main Wallet',
    entryDate: '2026-04-08',
    amount: 180,
    comment: 'Side gig income from online consulting session.',
  },
  {
    id: 'K7ZP8M2Q',
    categoryId: 'save1',
    categoryType: 'saving',
    categoryName: 'Retirement fund',
    walletId: 'Savings',
    entryDate: '2026-04-08',
    amount: -250,
    comment: 'Transferred extra funds to savings after side income.',
  },

  // ----- April 9
  {
    id: 'Z8A7M2PQ',
    categoryId: 'tran1',
    categoryType: 'expense',
    categoryName: 'Transport',
    walletId: 'Main Wallet',
    entryDate: '2026-04-09',
    amount: -14,
    comment: 'Metro card top-up for daily commute.',
  },
  {
    id: 'Q2Z7PMA8',
    categoryId: 'groc1',
    categoryType: 'expense',
    categoryName: 'Groceries',
    walletId: 'Main Wallet',
    entryDate: '2026-04-09',
    amount: -52.6,
    comment: 'Grocery shopping focused on fresh vegetables and meat.',
  },

  // ----- April 10
  {
    id: 'M9Q7Z2PA',
    categoryId: 'inc01',
    categoryType: 'income',
    categoryName: 'Salaried Job',
    walletId: 'Main Wallet',
    entryDate: '2026-04-10',
    amount: 500,
    comment: 'Performance bonus received for project delivery.',
  },
  {
    id: '8ZQ2MP7A',
    categoryId: 'save1',
    categoryType: 'saving',
    categoryName: 'Retirement fund',
    walletId: 'Savings',
    entryDate: '2026-04-10',
    amount: -700,
    comment: 'Moved bonus money into long-term investment savings.',
  },

  // ----- April 11
  {
    id: 'P8Z7A2QM',
    categoryId: 'fun01',
    categoryType: 'expense',
    categoryName: 'Entertainment',
    walletId: 'Main Wallet',
    entryDate: '2026-04-11',
    amount: -75,
    comment: 'Concert tickets purchased for upcoming live event.',
  },
  {
    id: 'M2Z8Q7PA',
    categoryId: 'heal1',
    categoryType: 'expense',
    categoryName: 'Health',
    walletId: 'Main Wallet',
    entryDate: '2026-04-11',
    amount: -45,
    comment: 'Fitness supplements and vitamins.',
  },

  // ----- April 12
  {
    id: 'Q7M2P8ZA',
    categoryId: 'groc1',
    categoryType: 'expense',
    categoryName: 'Groceries',
    walletId: 'Main Wallet',
    entryDate: '2026-04-12',
    amount: -103.2,
    comment: 'Large grocery run including cleaning supplies.',
  },
  {
    id: 'Z8A2QM7P',
    categoryId: 'tran1',
    categoryType: 'expense',
    categoryName: 'Transport',
    walletId: 'Cash',
    entryDate: '2026-04-12',
    amount: -9,
    comment: 'Short rides using ride-sharing service.',
  },

  // ----- April 13
  {
    id: 'PZ2M7QA8',
    categoryId: 'inc01',
    categoryType: 'income',
    categoryName: 'Salaried Job',
    walletId: 'Main Wallet',
    entryDate: '2026-04-13',
    amount: 120,
    comment: 'Refund received for previously returned purchase.',
  },
  {
    id: '7QZP2M8A',
    categoryId: 'save1',
    categoryType: 'saving',
    categoryName: 'Retirement fund',
    walletId: 'Savings',
    entryDate: '2026-04-13',
    amount: -150,
    comment: 'Automatic weekly savings transfer.',
  },

  // ----- April 14
  {
    id: '8MZQ2P7A',
    categoryId: 'home1',
    categoryType: 'expense',
    categoryName: 'Home',
    walletId: 'Main Wallet',
    entryDate: '2026-04-14',
    amount: -210,
    comment: 'Bought new desk lamp and storage containers.',
  },
  {
    id: 'Q2Z7MP8A',
    categoryId: 'fun01',
    categoryType: 'expense',
    categoryName: 'Entertainment',
    walletId: 'Main Wallet',
    entryDate: '2026-04-14',
    amount: -30,
    comment: 'Online game purchase and in-app content.',
  },

  // ----- April 15
  {
    id: 'MZ8P2QA7',
    categoryId: 'inc01',
    categoryType: 'income',
    categoryName: 'Salaried Job',
    walletId: 'Main Wallet',
    entryDate: '2026-04-15',
    amount: 950,
    comment: 'Final invoice payment for freelance project.',
  },
  {
    id: 'Z7Q2M8PA',
    categoryId: 'save1',
    categoryType: 'saving',
    categoryName: 'Retirement fund',
    walletId: 'Savings',
    entryDate: '2026-04-15',
    amount: -400,
    comment: 'End-of-month savings contribution.',
  },
];
