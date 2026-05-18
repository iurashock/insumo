import { View, Text, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TimeIntervalSkipButton from './Filters/TimeIntervalSkipButton';
import TimeIntervalPicker from './Filters/TimeIntervalPicker';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';
import { setSelectedIntervalRange } from '@/src/store/slices/data.slice';
import TransactionFilterDropdown from './Filters/TransactionSingleSelectList.web';
import TransactionSingleSelectList from './Filters/TransactionSingleSelectList.web';
import {
  TRANSACTION_SORTING_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/src/constants/constants';
import TransactionSearchBar from './Filters/TransactionSearchBar.web';
import ResetFiltersButton from './Filters/ResetFiltersButton.web';
import TransactionMultipleSelectList from './Filters/TransactionMultipleSelectList.web';

const FunctionalContainer = ({
  onRefresAction,
  filterActive,
  earliestRecordDate,
  latestRecordDate,
}: {
  onRefresAction: () => void;
  filterActive?: string;
  earliestRecordDate: Date;
  latestRecordDate: Date;
}) => {
  const transactionFiltersRef = useRef<HTMLDivElement>(null);
  const intervalGroupRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  // const [categoriesIconName, setCategoriesIconName] = useState('');
  const selectedIntervalRange = useAppSelector(
    (state) => state.data.selectedIntervalRange,
  );
  const userWallets = useAppSelector((state) => state.wallets.items);
  const userCategories = useAppSelector((state) => state.categories.items);

  const handleTimeIntervalSkipForwardAction = (direction: boolean) => {
    const { choice, start, end } = selectedIntervalRange;

    if (!start || !end) return;

    // direction: true = forward, false = backward
    const step = direction ? 1 : -1;

    let startDate: Date;
    let endDate: Date;

    switch (choice) {
      case 'current_month': {
        // shift entire month
        const newMonth = start.getMonth() + step;

        startDate = new Date(start.getFullYear(), newMonth, 1);
        endDate = new Date(start.getFullYear(), newMonth + 1, 0);
        break;
      }

      case 'current_week': {
        // shift by 7 days
        startDate = new Date(start);
        startDate.setDate(start.getDate() + 7 * step);

        endDate = new Date(end);
        endDate.setDate(end.getDate() + 7 * step);
        break;
      }

      case 'last_two_weeks': {
        // shift by 14 days
        startDate = new Date(start);
        startDate.setDate(start.getDate() + 14 * step);

        endDate = new Date(end);
        endDate.setDate(end.getDate() + 14 * step);
        break;
      }

      case 'last_three_months': {
        // shift by 3 months block
        startDate = new Date(
          start.getFullYear(),
          start.getMonth() + 3 * step,
          1,
        );
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 3,
          0,
        );
        break;
      }

      case 'current_year': {
        // shift full year
        startDate = new Date(start.getFullYear() + step, 0, 1);
        endDate = new Date(start.getFullYear() + step, 11, 31);
        break;
      }

      case 'all_time': {
        //  nothing to shift
        return;
      }

      case 'custom': {
        // shift custom range by its own length
        const diff = end.getTime() - start.getTime();

        startDate = new Date(start);
        startDate.setTime(start.getTime() + diff * step);

        endDate = new Date(end);
        endDate.setTime(end.getTime() + diff * step);
        break;
      }

      default:
        return;
    }

    dispatch(
      setSelectedIntervalRange({
        choice,
        start: startDate,
        end: endDate,
      }),
    );
  };

  const handleTransactionWalletFilter = (id: string) => {
    console.log(id);
  };

  return (
    <View className='w-full h-full pt-4 flex flex-column justify-between items-center'>
      <View className='w-full h-[70%] px-4 flex flex-row justify-between items-start'>
        <View className='w-[80%] h-full flex flex-row justify-start items-center'>
          <Text>top content here: add entry</Text>
        </View>
        <Pressable
          onPress={onRefresAction}
          className='flex flex-row justify-center items-center'
        >
          <Text>Refresh data</Text>
          <MaterialCommunityIcons name='refresh' size={24} color={'black'} />
        </Pressable>
      </View>
      <View className='w-full h-[30%] flex flex-row justify-between items-center pb-4 px-4'>
        <div
          // className='w-[29%] h-full border-r border-r-gray-300 flex flex-row justify-between items-center'
          className='flex-1 h-full border-r border-r-gray-300 flex flex-row justify-between items-center'
          ref={transactionFiltersRef}
        >
          <TransactionSingleSelectList
            onClose={() => {}}
            options={TRANSACTION_TYPE_OPTIONS}
            label='Type'
            onSelect={handleTransactionWalletFilter}
          />
          <TransactionFilterDropdown
            onClose={() => {}}
            width={Dimensions.get('window').width * 0.15}
            options={[
              {
                value: 'all_wallets',
                label: 'All wallets',
              },
              ...userWallets.map((wallet) => ({
                value: wallet.walletId,
                label: wallet.name,
              })),
            ]}
            label='Wallet'
            onSelect={handleTransactionWalletFilter}
          />
          <TransactionMultipleSelectList
            onClose={() => {}}
            width={Dimensions.get('window').width * 0.15}
            options={[
              {
                value: 'all_categories',
                label: 'All categories',
              },
              ...userCategories.map((category) => ({
                value: category.id,
                label: category.name,
              })),
            ]}
            label='Choose categories'
            onSelect={handleTransactionWalletFilter}
            showIcons
            iconName={
              `numeric-${userCategories.length < 9 ? userCategories.length + 1 : '9-plus'}-circle-outline` as keyof typeof MaterialCommunityIcons.glyphMap
            }
          />
          <TransactionSingleSelectList
            onClose={() => {}}
            width={100}
            options={TRANSACTION_SORTING_OPTIONS}
            label='Sort'
            onSelect={handleTransactionWalletFilter}
          />
          {/* </div>
        <View className='w-[43%] h-full border-r border-r-gray-300 '> */}
          {/* <Text>search bar</Text> */}
          {/* </View> */}
          <TransactionSearchBar />
          <ResetFiltersButton />
        </div>

        <div
          ref={intervalGroupRef}
          className='w-[21.5%] h-full flex flex-row justify-between items-center'
        >
          <TimeIntervalSkipButton
            left
            onPress={() => handleTimeIntervalSkipForwardAction(false)}
          />
          <TimeIntervalPicker
            anchorGroupRef={intervalGroupRef}
            earliestRecordDate={earliestRecordDate}
            latestRecordDate={latestRecordDate}
          />
          <TimeIntervalSkipButton
            onPress={() => handleTimeIntervalSkipForwardAction(true)}
          />
        </div>
      </View>
    </View>
  );
};

export default FunctionalContainer;
