import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Entry } from '@/src/constants/types';

const selectAllEntries = (state: RootState) => state.data.allEntriesList;

const selectFilters = (state: RootState) => state.data.filters;

const selectInterval = (state: RootState) => state.data.selectedIntervalRange;

export const selectFilteredEntries = createSelector(
  [selectAllEntries, selectFilters, selectInterval],
  (entries, filters, interval): Entry[] => {
    const { choice, start, end } = interval;

    return entries
      .filter((entry) => {
        /* ---------- TYPE ---------- */
        if (
          !filters.transactionType.all_options &&
          !filters.transactionType.pickedOptions?.includes(entry.categoryType)
        ) {
          return false;
        }

        /* ---------- WALLET ---------- */
        if (
          !filters.transactionWallet.all_options &&
          !filters.transactionWallet.pickedOptions?.includes(entry.walletId)
        ) {
          return false;
        }

        /* ---------- CATEGORY ---------- */
        if (
          !filters.transactionCategories.all_options &&
          !filters.transactionCategories.pickedOptions?.includes(
            entry.categoryId,
          )
        ) {
          return false;
        }

        /* ---------- SEARCH ---------- */
        if (filters.transactionSearch) {
          const q = filters.transactionSearch.toLowerCase();
          if (
            !entry.comment?.toLowerCase().includes(q) &&
            !entry.amount.toString().includes(q)
          ) {
            return false;
          }
        }

        /* ---------- INTERVAL ---------- */
        if (choice !== 'all_time' && start && end) {
          const entryDate = new Date(entry.entryDate);
          const intervalEnd = new Date(end);
          intervalEnd.setHours(23, 59, 59, 999);

          if (entryDate < start || entryDate > intervalEnd) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.transactionSortingChoice) {
          case 'newest':
            return +new Date(b.entryDate) - +new Date(a.entryDate);
          case 'oldest':
            return +new Date(a.entryDate) - +new Date(b.entryDate);
          case 'least_expensive':
            return Math.abs(a.amount) - Math.abs(b.amount);
          case 'most_expensive':
            return Math.abs(b.amount) - Math.abs(a.amount);
          default:
            return 0;
        }
      });
  },
);
