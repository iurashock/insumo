import React, { useRef } from 'react';
import { View, Text, SectionList } from 'react-native';

import EntryListItem from '../../components/HomeScreen/EntryListItem';
import EntryListSeparator from '../../components/HomeScreen/EntryListSeparator';

import { ENTRIES, TOP_NAVBAR_HEIGHT } from '../../constants/constants';
import FooterBar from '../../components/FooterBar';

export default function IndexWebScreen() {
  const listRef = useRef<SectionList<any>>(null);

  const sections = Object.values(
    ENTRIES.reduce(
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
      {} as Record<string, { title: string; data: typeof ENTRIES }>,
    ),
  ).sort((a, b) => new Date(b.title).getTime() - new Date(a.title).getTime());

  return (
    <View
      className='w-full min-h-screen max-h-[100vh] flex flex-col items-center px-6 '
      style={{ paddingTop: TOP_NAVBAR_HEIGHT + 24 }}
    >
      <View className='w-full min-h-[20%] flex justify-center items-center rounded-2xl p-5 bg-white shadow-md'>
        <Text>top content here: add entry + filters</Text>
      </View>

      <View className='flex w-full max-h-[65vh] flex-row justify-between gap-4 py-4'>
        <View className='bg-white rounded-2xl shadow-md p-6 w-[30%] flex justify-center items-center'>
          <Text>left side content here: balance + months view</Text>
        </View>

        <View className='w-[45%] h-[100%] bg-white rounded-2xl shadow-md overflow-hidden'>
          <SectionList
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
                  <EntryListItem {...item} />
                </View>
              );
            }}
            stickySectionHeadersEnabled
          />
        </View>

        <View className='bg-white rounded-2xl shadow-md p-6 flex flex-1 justify-center items-center'>
          <Text>right side content here: edits + details view</Text>
        </View>
      </View>

      <FooterBar />
    </View>
  );
}
