import React, { useRef } from 'react';
import { View, Text, SectionList } from 'react-native';

import EntryListItem from '../../components/HomeScreen/EntryListItem';
import EntryListSeparator from '../../components/HomeScreen/EntryListSeparator';

import { TOP_NAVBAR_HEIGHT } from '../../constants/constants';
import FooterBar from '../../components/FooterBar';
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks';
import { setSelectedEntryId } from '@/src/store/slices/data.slice';
import DetailsCard from '@/src/components/HomeScreen/DetailsCard';

export default function IndexWebScreen() {
  const listRef = useRef<SectionList<any>>(null);
  const dispatch = useAppDispatch();
  const { selectedEntryId, allEntriesList } = useAppSelector(
    (state) => state.data,
  );

  const sections = Object.values(
    // ENTRIES.reduce(
    allEntriesList.reduce(
      (acc, entry) => {
        if (!acc[entry.entryDate]) {
          acc[entry.entryDate] = {
            title: entry.entryDate,
            data: [],
          };
        }
        acc[entry.entryDate].data.push(entry);
        return acc;
      },
      {} as Record<string, { title: string; data: typeof allEntriesList }>, // ENTRIES }>,
    ),
  ).sort((a, b) => new Date(b.title).getTime() - new Date(a.title).getTime());

  const handleItemSelected = (id: string) => {
    console.log(id);
    dispatch(setSelectedEntryId(id));
  };

  return (
    <View
      className='w-full min-h-screen max-h-[100vh] flex flex-col items-center px-6 '
      style={{ paddingTop: TOP_NAVBAR_HEIGHT + 24 }}
    >
      <View className='w-full min-h-[20%] flex justify-center items-center rounded-2xl p-5 bg-white shadow-md'>
        <Text>top content here: add entry + filters</Text>
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
                <EntryListSeparator date={section.title} />
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
          {/* {selectedEntryId ? <DetailsCard /> : <Text>No item selected</Text>} */}
          <DetailsCard />
        </View>
      </View>

      <FooterBar />
    </View>
  );
}
