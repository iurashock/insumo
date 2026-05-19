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

    return entries.filter((entry) => {
      // TYPE
      if (
        !filters.transactionType.all_options &&
        !filters.transactionType.pickedOptions?.includes(entry.categoryType)
      )
        return false;

      // WALLET
      if (
        !filters.transactionWallet.all_options &&
        !filters.transactionWallet.pickedOptions?.includes(entry.walletId)
      )
        return false;

      // CATEGORY
      if (
        !filters.transactionCategories.all_options &&
        !filters.transactionCategories.pickedOptions?.includes(entry.categoryId)
      )
        return false;

      // SEARCH
      if (filters.transactionSearch) {
        const q = filters.transactionSearch.toLowerCase();
        if (
          !entry.comment?.toLowerCase().includes(q) &&
          !entry.amount.toString().includes(q)
        )
          return false;
      }

      // INTERVAL
      if (choice !== 'all_time' && start && end) {
        const entryDate = new Date(entry.entryDate);
        const intervalEnd = new Date(end);
        intervalEnd.setHours(23, 59, 59, 999);

        if (entryDate < start || entryDate > intervalEnd) return false;
      }

      return true;
    });
  },
);

type Section = {
  title: string;
  runningTotal: number;
  data: Entry[];
};

// export const selectGroupedEntries = createSelector(
//   [selectFilteredEntries, selectFilters],
//   (entries, filters): Section[] => {
//     // 1️⃣ Sort the FLAT list first
//     const sortedEntries = [...entries].sort((a, b) => {
//       switch (filters.transactionSortingChoice) {
//         case 'newest':
//           return (
//             new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
//           );

//         case 'oldest':
//           return (
//             new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
//           );

//         case 'most_expensive':
//           return Math.abs(b.amount) - Math.abs(a.amount);

//         case 'least_expensive':
//           return Math.abs(a.amount) - Math.abs(b.amount);

//         default:
//           return 0;
//       }
//     });

//     // 2️⃣ Group AFTER sorting (order is preserved!)
//     const grouped = sortedEntries.reduce(
//       (acc, entry) => {
//         if (!acc[entry.entryDate]) {
//           acc[entry.entryDate] = {
//             title: entry.entryDate,
//             runningTotal: 0,
//             data: [],
//           };
//         }

//         acc[entry.entryDate].data.push(entry);
//         acc[entry.entryDate].runningTotal += entry.amount;

//         return acc;
//       },
//       {} as Record<string, Section>,
//     );

//     // 3️⃣ Object.values keeps insertion order
//     return Object.values(grouped);
//   },
// );

export const selectGroupedEntries = createSelector(
  [selectFilteredEntries, selectFilters],
  (entries, filters): Section[] => {
    const isAmountSort =
      filters.transactionSortingChoice === 'most_expensive' ||
      filters.transactionSortingChoice === 'least_expensive';

    /* ===============================
       DATE-BASED SORTING
       =============================== */
    if (!isAmountSort) {
      const sortedByDate = [...entries].sort((a, b) =>
        filters.transactionSortingChoice === 'newest'
          ? new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
          : new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
      );

      const grouped = sortedByDate.reduce(
        (acc, entry) => {
          if (!acc[entry.entryDate]) {
            acc[entry.entryDate] = {
              title: entry.entryDate,
              runningTotal: 0,
              data: [],
            };
          }
          acc[entry.entryDate].data.push(entry);
          acc[entry.entryDate].runningTotal += entry.amount;
          return acc;
        },
        {} as Record<string, Section>,
      );

      return Object.values(grouped);
    }

    /* ===============================
       AMOUNT-BASED SORTING
       =============================== */
    const grouped = entries.reduce(
      (acc, entry) => {
        if (!acc[entry.entryDate]) {
          acc[entry.entryDate] = {
            title: entry.entryDate,
            runningTotal: 0,
            data: [],
          };
        }
        acc[entry.entryDate].data.push(entry);
        acc[entry.entryDate].runningTotal += entry.amount;
        return acc;
      },
      {} as Record<string, Section>,
    );

    let sections = Object.values(grouped);

    // ✅ Sort sections by daily total
    sections.sort((a, b) =>
      filters.transactionSortingChoice === 'most_expensive'
        ? b.runningTotal - a.runningTotal
        : a.runningTotal - b.runningTotal,
    );

    // ✅ Keep entries inside each section date-ordered
    sections.forEach((section) => {
      section.data.sort(
        (a, b) =>
          new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime(),
      );
    });

    return sections;
  },
);
