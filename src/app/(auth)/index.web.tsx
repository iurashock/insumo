import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SectionList } from 'react-native';

import EntryListItem from '../../components/HomeScreen/EntryListItem';
import EntryListSeparator from '../../components/HomeScreen/EntryListSeparator';

import { Entry } from '@/src/constants/types';
import { TOP_NAVBAR_HEIGHT } from '../../constants/constants';
import FooterBar from '../../components/FooterBar';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';
import { refreshData, setSelectedEntryId } from '@/src/store/slices/data.slice';
import DetailsCard from '@/src/components/HomeScreen/DetailsCard';
import FunctionalContainer from '@/src/components/HomeScreen/FunctionalContainer';

export default function IndexWebScreen() {
  const dispatch = useAppDispatch();
  const listRef = useRef<SectionList<any>>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [earliestRecordDate, setEarliestRecordDate] = useState(new Date());
  const [latestRecordDate, setLatestRecordDate] = useState(new Date());
  const allEntriesList = useAppSelector((state) => state.data.allEntriesList);
  const {
    choice: selectedIntervalChoice,
    start: selectedIntervalStart,
    end: selectedIntervalEnd,
  } = useAppSelector((state) => state.data.selectedIntervalRange);

  type Section = {
    title: string;
    runningTotal: number;
    data: Entry[];
  };

  const groupAndSortEntriesList = (
    filtered_entries_array: Entry[],
  ): Section[] => {
    return Object.values(
      filtered_entries_array.reduce(
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
      ),
    ).sort((a, b) => new Date(b.title).getTime() - new Date(a.title).getTime());
  };

  useEffect(() => {
    if (
      selectedIntervalChoice === 'all_time' ||
      !selectedIntervalStart ||
      !selectedIntervalEnd
    ) {
      const grouped = groupAndSortEntriesList(allEntriesList);
      setSections(grouped);
      return;
    }

    const filtered_entries_array = allEntriesList.filter((entry) => {
      const entryDate = new Date(entry.entryDate);
      const intervalEndFullDay = new Date(selectedIntervalEnd);
      intervalEndFullDay.setHours(23, 59, 999);

      return (
        entryDate >= selectedIntervalStart && entryDate <= intervalEndFullDay
      );
    });

    const grouped_entries_array = groupAndSortEntriesList(
      filtered_entries_array,
    );
    setSections(grouped_entries_array);
  }, [
    selectedIntervalChoice,
    selectedIntervalStart,
    selectedIntervalEnd,
    allEntriesList,
  ]);

  useEffect(() => {
    if (allEntriesList.length === 0) return;

    const { earliest, latest } = allEntriesList.reduce(
      (acc, entry) => {
        const date = new Date(entry.entryDate);

        if (date < acc.earliest) acc.earliest = date;
        if (date > acc.latest) acc.latest = date;

        return acc;
      },
      {
        earliest: new Date(allEntriesList[0].entryDate),
        latest: new Date(allEntriesList[0].entryDate),
      },
    );

    setEarliestRecordDate(earliest);
    setLatestRecordDate(latest);
  }, [allEntriesList]);

  const handleItemSelected = (id: string) => {
    console.log(id);
    dispatch(setSelectedEntryId(id));
  };

  const handleRefreshAction = () => {
    dispatch(refreshData());
  };

  return (
    <View
      className='w-full min-h-screen max-h-[100vh] flex flex-col items-center px-6 '
      style={{ paddingTop: TOP_NAVBAR_HEIGHT + 24 }}
    >
      <View className='w-full min-h-[20%] flex justify-center items-center rounded-2xl bg-white shadow-md overflow-hidden'>
        <FunctionalContainer
          onRefresAction={handleRefreshAction}
          earliestRecordDate={earliestRecordDate}
          latestRecordDate={latestRecordDate}
        />
      </View>

      <View className='flex w-full max-h-[65vh] min-h-[65vh] flex-row justify-between gap-4 py-4'>
        <View className='bg-white rounded-2xl shadow-md p-6 w-[30%] flex justify-center items-center'>
          <Text>left side content here: balance + months view</Text>
        </View>

        <View className='w-[45%] h-[100%] bg-white rounded-2xl shadow-md overflow-hidden'>
          {allEntriesList.length > 0 ? (
            <SectionList
              ref={listRef}
              sections={sections}
              keyExtractor={(item) => item.id}
              className='flex-1'
              contentContainerClassName='gap-1'
              renderSectionHeader={({ section }) => (
                <EntryListSeparator
                  date={section.title}
                  runningTotal={section.runningTotal}
                />
              )}
              renderItem={({ item }) => {
                return (
                  <View>
                    <EntryListItem
                      id={item.id}
                      categoryId={item.categoryId}
                      walletId={item.walletId}
                      amount={item.amount}
                      comment={item.comment}
                      onPress={handleItemSelected}
                    />
                  </View>
                );
              }}
              stickySectionHeadersEnabled
            />
          ) : (
            <View className='flex flex-1 justify-center items-center'>
              <Text> No data available</Text>
            </View>
          )}
        </View>

        <View className='bg-white rounded-2xl shadow-md flex flex-1 overflow-hidden'>
          <DetailsCard />
        </View>
      </View>

      <FooterBar />
    </View>
  );
}
