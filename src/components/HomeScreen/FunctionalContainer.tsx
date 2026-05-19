import { View, Text, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TimeIntervalSkipButton from './Filters/TimeIntervalSkipButton';
import TimeIntervalPicker from './Filters/TimeIntervalPicker';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';
import {
  clearFilters,
  setFilters,
  setSelectedIntervalRange,
} from '@/src/store/data/data.slice';
import TransactionSingleSelectList from './Filters/TransactionSingleSelectList.web';
import {
  TRANSACTION_SORTING_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/src/constants/constants';
import TransactionSearchBar from './Filters/TransactionSearchBar.web';
import TransactionMultipleSelectList from './Filters/TransactionMultipleSelectList.web';
import {
  TRANSACTION_MULTIPLE_PICK_OPTIONS,
  TRANSACTION_SORTING_PICK_OPTIONS,
} from '@/src/constants/types';
import FunctionalButton from './Filters/FunctionalButton.web';

const FunctionalContainer = ({
  onRefresAction,
  earliestRecordDate,
  latestRecordDate,
}: {
  onRefresAction: () => void;
  earliestRecordDate: Date;
  latestRecordDate: Date;
}) => {
  const dispatch = useAppDispatch();
  const transactionFiltersRef = useRef<HTMLDivElement>(null);
  const intervalGroupRef = useRef<HTMLDivElement>(null);

  const selectedTypes = useAppSelector<TRANSACTION_MULTIPLE_PICK_OPTIONS>(
    (state) => state.data.filters.transactionType,
  );
  const selectedWallets = useAppSelector<TRANSACTION_MULTIPLE_PICK_OPTIONS>(
    (state) => state.data.filters.transactionWallet,
  );
  const selectedCategories = useAppSelector<TRANSACTION_MULTIPLE_PICK_OPTIONS>(
    (state) => state.data.filters.transactionCategories,
  );
  const selectedSortingOption =
    useAppSelector<TRANSACTION_SORTING_PICK_OPTIONS>(
      (state) => state.data.filters.transactionSortingChoice,
    );
  const searchInput = useAppSelector<string>(
    (state) => state.data.filters.transactionSearch,
  );

  const userWallets = useAppSelector((state) => state.wallets.items);
  const userCategories = useAppSelector((state) => state.categories.items);
  const selectedIntervalRange = useAppSelector(
    (state) => state.data.selectedIntervalRange,
  );

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

  const handleTransactionTypeFilter = (
    selectedTypes: TRANSACTION_MULTIPLE_PICK_OPTIONS,
  ) => {
    dispatch(
      setFilters({
        transactionType: {
          all_options: selectedTypes.all_options,
          pickedOptions: selectedTypes.pickedOptions,
        },
      }),
    );
  };

  const handleTransactionWalletFilter = (
    selectedWallets: TRANSACTION_MULTIPLE_PICK_OPTIONS,
  ) => {
    dispatch(
      setFilters({
        transactionWallet: {
          all_options: selectedWallets.all_options,
          pickedOptions: selectedWallets.pickedOptions,
        },
      }),
    );
  };

  const handleTransactionCategoriesFilter = (
    selectedCategories: TRANSACTION_MULTIPLE_PICK_OPTIONS,
  ) => {
    dispatch(
      setFilters({
        transactionCategories: {
          all_options: selectedCategories.all_options,
          pickedOptions: selectedCategories.pickedOptions,
        },
      }),
    );
  };

  const handleSortingFilter = (id: TRANSACTION_SORTING_PICK_OPTIONS) => {
    dispatch(setFilters({ transactionSortingChoice: id }));
  };

  const handleSearchFilter = (value: string) => {
    console.log('hehe');

    dispatch(setFilters({ transactionSearch: value }));
  };

  const handleResetFilters = () => {
    dispatch(clearFilters());
  };

  const getLabel = (field: string) => {
    if (field === 'type') {
      return !selectedTypes.pickedOptions ||
        selectedTypes.pickedOptions.length === TRANSACTION_TYPE_OPTIONS.length
        ? 'All types'
        : selectedTypes.pickedOptions.length === 0
          ? 'Pick a type'
          : (
              selectedTypes.pickedOptions
                .map(
                  (id) =>
                    TRANSACTION_TYPE_OPTIONS.find((c) => c.id === id)?.label,
                )
                .filter(Boolean) as string[]
            ).join(',');
    }

    if (field === 'wallet') {
      return !selectedWallets.pickedOptions ||
        selectedWallets.pickedOptions.length === userWallets.length
        ? 'All wallets'
        : selectedWallets.pickedOptions.length === 0
          ? 'Pick a wallet'
          : (
              selectedWallets.pickedOptions
                .map((id) => userWallets.find((c) => c.walletId === id)?.name)
                .filter(Boolean) as string[]
            ).join(',');
    }

    return !selectedCategories.pickedOptions ||
      selectedCategories.pickedOptions.length === userCategories.length
      ? 'All categories'
      : selectedCategories.pickedOptions.length === 0
        ? 'Pick a category'
        : (
            selectedCategories.pickedOptions
              .map((id) => userCategories.find((c) => c.id === id)?.name)
              .filter(Boolean) as string[]
          ).join(',');
  };

  return (
    <View className='w-full h-full pt-4 flex flex-column justify-between items-center'>
      <View className='w-full h-[70%] px-4 flex flex-row justify-between items-start'>
        <View className='w-[90%] h-[85%] flex flex-row justify-start items-center border-r border-r-gray-200'>
          <Text>top content here: add entry</Text>
        </View>
        <View className='flex flex-1 flex-col justify-center items-center pl-4'>
          <FunctionalButton onPress={onRefresAction} />
          <FunctionalButton onPress={handleResetFilters} danger />
        </View>
      </View>
      <View className='w-full h-[30%] flex flex-row justify-between items-center pb-4 px-4'>
        <div
          // className='w-[29%] h-full border-r border-r-gray-300 flex flex-row justify-between items-center'
          className='flex-1 h-full flex flex-row justify-between items-center'
          ref={transactionFiltersRef}
        >
          {/* <TransactionSingleSelectList<TRANSACTION_TYPE_PICK_OPTIONS> */}
          <TransactionMultipleSelectList
            width={Dimensions.get('window').width * 0.08}
            value={selectedTypes}
            options={[
              {
                id: 'all_options',
                label: 'All types',
              },
              ...TRANSACTION_TYPE_OPTIONS,
            ]}
            label={getLabel('type')}
            onSelect={handleTransactionTypeFilter}
          />
          <TransactionMultipleSelectList
            value={selectedWallets}
            width={Dimensions.get('window').width * 0.12}
            options={[
              {
                id: 'all_options',
                label: 'All wallets',
              },
              ...userWallets.map((wallet) => ({
                id: wallet.walletId,
                label: wallet.name,
              })),
            ]}
            label={getLabel('wallet')}
            onSelect={handleTransactionWalletFilter}
          />
          <TransactionMultipleSelectList
            value={selectedCategories}
            width={Dimensions.get('window').width * 0.15}
            options={[
              {
                id: 'all_options',
                label: 'All categories',
              },
              ...userCategories.map((category) => ({
                id: category.id,
                label: category.name,
              })),
            ]}
            label={getLabel('category')}
            onSelect={handleTransactionCategoriesFilter}
            showIcons
            iconName={
              `numeric-${selectedCategories.pickedOptions ? (selectedCategories.pickedOptions.length === 0 ? '0' : selectedCategories.pickedOptions.length < 9 ? selectedCategories.pickedOptions.length : '9-plus') : userCategories.length < 9 ? userCategories.length : '9-plus'}-circle-outline` as keyof typeof MaterialCommunityIcons.glyphMap
            }
          />
          <TransactionSingleSelectList<TRANSACTION_SORTING_PICK_OPTIONS>
            value={selectedSortingOption}
            onClose={() => {}}
            width={100}
            options={TRANSACTION_SORTING_OPTIONS}
            label={
              TRANSACTION_SORTING_OPTIONS.find(
                (o) => o.id === selectedSortingOption,
              )?.label ?? 'Sort'
            }
            onSelect={handleSortingFilter}
            showIcons
          />
          <TransactionSearchBar
            value={searchInput}
            onChange={handleSearchFilter}
          />
          {/* <ResetFiltersButton onReset={handleResetFilters} /> */}
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
