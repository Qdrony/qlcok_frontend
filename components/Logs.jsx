import { View, Text, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons, images } from '../constants'
import SearchInput from './SearchInput'
import EmptyState from './EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLogsFromLock } from '../lib/api/logs';
import LogCard from './LogCard';

const Logs = ({ selectedLockId }) => {

    const [logs,setLogs] = useState(null);

    const fetchLogs = async () => {
        const logs = await getLogsFromLock(selectedLockId);
        if(logs) {
            setLogs(logs);
            console.log(logs);
        }
    }

    useEffect(() => {
        fetchLogs();
    }, []);

  return (
        <FlatList
        className="border-2 rounded-2xl p-2"
            data={logs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <LogCard log={item} />
            )}

            ListHeaderComponent={() => (
                <View className='space-y-6 pb-5'>
                <View className='justify-between items-start flex-row mt-2'>
                    <Text className='text-xl font-psemibold text-primary'>Naplók</Text>
                </View>
                    <SearchInput
                        otherStyles={'bg-primary'}
                        placeholder={"Keresés..."}
                    />
                </View>
            )}
            ListEmptyComponent={() => (
                <EmptyState
                    title="Nincs felhasználó"
                    color="primary"
                />
            )}
            //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
  )
}

export default Logs