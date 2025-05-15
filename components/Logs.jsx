import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import EmptyState from './EmptyState';
import { getLogsFromLock } from '../lib/api/logs';
import LogCard from './LogCard';
import { TouchableOpacity } from 'react-native';
import { exportPdf } from '../lib/services/pdfgenerator';
import DateTimePicker from '@react-native-community/datetimepicker';


const Logs = ({ selectedLockId }) => {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [logs,setLogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase());
        const logDate = new Date(log.time);
        const afterFrom = !fromDate || logDate >= fromDate;
        const beforeTo = !toDate || logDate <= toDate;
        return matchesSearch && afterFrom && beforeTo;
    });
      
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
            data={filteredLogs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <LogCard log={item} />
            )}

            ListHeaderComponent={() => (
                <View className='space-y-6 pb-5'>
                <View className='justify-between items-start flex-row mt-2 mb-3'>
                    <Text className='text-xl font-psemibold text-primary'>Naplók</Text>
                    <TouchableOpacity onPress={() => exportPdf(filteredLogs)} className="bg-primary px-4 py-2 rounded-xl">
                        <Text className="text-black font-psemibold">Exportálás PDF-be</Text>
                    </TouchableOpacity>
                </View>

                <View className="space-y-2 mb-3">
                    <View className="flex-row justify-between">
                        <TouchableOpacity onPress={() => setShowFromPicker(true)} className="bg-primary px-3 py-2 rounded-xl">
                            <Text>📅 Mettől: {fromDate ? fromDate.toLocaleDateString() : '---'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowToPicker(true)} className="bg-primary px-3 py-2 rounded-xl">
                            <Text>📅 Meddig: {toDate ? toDate.toLocaleDateString() : '---'}</Text>
                        </TouchableOpacity>
                    </View>

                    {showFromPicker && (
                        <DateTimePicker
                        value={fromDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowFromPicker(false);
                            if (event.type === 'set') {
                              setFromDate(selectedDate);
                            } else {
                              setFromDate(null);
                            }
                          }}
                        />
                    )}

                    {showToPicker && (
                        <DateTimePicker
                        value={toDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowToPicker(false);
                            if (event.type === 'set') {
                              setToDate(selectedDate);
                            } else {
                              setToDate(null);
                            }
                          }}
                        />
                    )}
                </View>
                    <SearchInput
                        otherStyles={'bg-primary'}
                        placeholder={"Keresés..."}
                        value={searchQuery}
                        handleChangeText={setSearchQuery}
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