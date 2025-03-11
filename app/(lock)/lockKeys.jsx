import { View, Text, FlatList, Image, RefreshControl, Modal} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import KeyCard from '../../components/KeyCard'
import CustomButton from '../../components/CustomButton'
import { getKeysForLock, getUserKeys } from '../../lib/api/keys'
import { getUser, saveCurrentKey } from '../../lib/services/secureStore'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { getLockById } from '../../lib/api/locks'
import FromField from '../../components/FromField'

const lockKeys = () => {

  const [keys, setKeys] = useState([]);
  const [selectedKey,setSelectedKey] = useState(null);
  const [selectedLock,setSelectedLock] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [remainingUses,setReamininguses] = useState(0);
  const [date,setDate] = useState(new Date());

  const params = useLocalSearchParams();
  const selectedLockId = params.id;

  const modalScreen = (keyId) => {
    const foundKey = keys.find(key => key.id === keyId);
    setSelectedKey(foundKey);
    setModalVisible(true);
  }

  const fetchLock = async () => {
    const lock = await getLockById(selectedLockId);
    const data = await getKeysForLock(selectedLockId)
    if (data) setKeys(data)
    if (lock) setSelectedLock(lock);
            
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLock();
  }, []);

  const [isLoading,setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLock();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-tertiary h-full px-4'>

      <FlatList
        data={keys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <KeyCard item={item} fn={() => modalScreen(item.id)} del={true} delFn={() => console.log("katt")}/>
        )}

        ListHeaderComponent={() => (
          <View className='my-6 space-y-6 pb-5'>
            <View className='justify-between items-start flex-row mb-6'>
              <Image
                source={images.qlockgreen}
                className='h-14 w-36'
                resizeMethod='contain'
              />
              <Text className='text-xl font-psemibold text-primary mt-4'>{selectedLock ? selectedLock.name : "zár"} kulcsai</Text>
            </View>

            <SearchInput
              otherStyles={'bg-primary'}
              placeholder={"Keresés..."}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nincs kulcs jelenleg"
            color="primary"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View className='justify-center items-center flex-1 bg-black/50'>
          <View className='bg-primary px-6 py-4 rounded-2xl shadow-lg min-w-[50%] min-h-[40%]'>
            
            {selectedKey ? (
              <>
                <View className='flex-row items-center'>
                  <Image
                    source={icons.key}
                    className='w-16 h-16'
                    resizeMode='contain'
                  />
                  <Text className='ml-4 font-psemibold text-xl'>{selectedKey.name}</Text>
                </View>

                <Text className='font-psemibold text-xl'>Adatok</Text>                
                <Text className='font-psemibold text-xl'>Használhatóság: {selectedKey.remainingUses === -1 ? 'Állandó' : (selectedKey.remainingUses + 'db')}</Text>
                <FromField
                    placeholder={"adjon meg egy számot"}
                    otherStyles="mt-7"
                    handleChangeText={(e) => setForm({
                        ...from, email: e
                    })}
                />
                <Text className='font-psemibold text-xl'>Lejárati idő: {selectedKey.remainingUses === -1 ? 'Nincs' : (selectedKey.expirationDate)}</Text>
                <Text className='font-psemibold text-xl'>Létrehozás dátuma: {selectedKey.createdAt.slice(0,10)}</Text>
               
                <CustomButton handlePress={() => saveCurrentKey(selectedKey)} title={"Mentés"}/>
                <CustomButton handlePress={() => setModalVisible(false)} title="Bezárás"/>
              </>
            ) : (
              <Text>Betöltés...</Text>
            )}

          </View>
        </View>
      </Modal>


    </SafeAreaView>
  )
}

export default lockKeys