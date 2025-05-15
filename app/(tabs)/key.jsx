import { View, Text, FlatList, Image, RefreshControl, Modal} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import KeyCard from '../../components/KeyCard'
import CustomButton from '../../components/CustomButton'
import { getUserKeys } from '../../lib/api/keys'
import { getOfflineKeys, getUser, saveCurrentKey, saveOfflineKeys } from '../../lib/services/secureStore'
import { updateNfcPayload } from '../../lib/services/nfcservicesHCE'
import NetInfo from "@react-native-community/netinfo";
import { startBle, stopBle } from '../../lib/services/bleAdvertiser'

const Key = () => {

  const [keys, setKeys] = useState([]);
  const [name,setName] = useState("Felhasználó");
  const [userId,setUserId] = useState(null);
  const [selectedKey,setSelectedKey] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredKeys = keys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const modalScreen = (keyId) => {
    const foundKey = keys.find(key => key.id === keyId);
    setSelectedKey(foundKey);
    setModalVisible(true);
  }

  const fetchKeys = async () => {
    const user = await getUser();
    const data = await getUserKeys(user.id);
    if (data) setKeys(data)
    await saveOfflineKeys(data);
    if (user.name) setName(user.name)
    if (user.id) setUserId(user.id)
            
    setIsLoading(false);
  };

  const fetchOfflineKeys = async () => {
    const user = await getUser();
    const data = await getOfflineKeys();
    if (data) setKeys(data)
    if (user.name) setName(user.name)
    if (user.id) setUserId(user.id)
  }

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetchKeys();
      } else {
        fetchOfflineKeys();
        console.error('No internet connection, loading offline keys.');
      }
    });
  }, []);

  const [isLoading,setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchKeys();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-tertiary h-full px-4'>

      <FlatList
        data={filteredKeys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <KeyCard item={item} fn={() => modalScreen(item.id)}/>
        )}

        ListHeaderComponent={() => (
          <View className='my-6 space-y-6 pb-5'>
            <View className='justify-between items-start flex-row mb-6'>
              <Image
                source={images.qlockgreen}
                className='h-14 w-36'
                resizeMethod='contain'
              />
              <Text className='text-xl font-psemibold text-primary mt-4'>{name} kulcsai</Text>
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

                <Text className='font-psemibold text-xl'>Adatok:</Text>                
                <Text className='font-psemibold text-xl'>Használhatóság: {selectedKey.remainingUses === -1 ? 'Állandó' : (selectedKey.remainingUses + 'db')}</Text>
                <Text className='font-psemibold text-xl'>Lejárati idő: {selectedKey.expirationDate === null ? 'Nincs' : (selectedKey.expirationDate)}</Text>
                <Text className='font-psemibold text-xl'>Zár neve: {selectedKey.lockName}</Text>
                <Text className='font-psemibold text-xl'>Nyitási idő: {selectedKey.startTime === null ? 'Nincs' : (selectedKey.startTime + " - " + selectedKey.endTime)}</Text>
                <Text className='font-psemibold text-xl'>Létrehozás dátuma: {selectedKey.createdAt.slice(0,10)}</Text>

                <CustomButton handlePress={() => {
                    saveCurrentKey(selectedKey);
                    updateNfcPayload(userId, selectedKey.id); //HCE NFC
                    startBle(userId, selectedKey.id); //Bluetooth hirdetés indítása
                  }} 
                  title={"Kulcs használata"} containerStyles={"border-2 mt-4"}/>
                <CustomButton handlePress={() => {
                    setModalVisible(false)>
                    stopBle(); //Bluetooth hirdetés leállítása
                  }} title="Bezárás" containerStyles={"border-2 mt-2"}/>
                
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

export default Key