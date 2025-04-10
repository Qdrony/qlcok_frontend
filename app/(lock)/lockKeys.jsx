import { View, Text, FlatList, Image, RefreshControl, Modal, Touchable, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import KeyCard from '../../components/KeyCard'
import CustomButton from '../../components/CustomButton'
import { deleteKey, getKeysForLock, getUserKeys, putKeyUpdate } from '../../lib/api/keys'
import { getUser, saveCurrentKey } from '../../lib/services/secureStore'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { getLockById } from '../../lib/api/locks'
import FromField from '../../components/FromField'
import DateTimePicker from '@react-native-community/datetimepicker';
import NumberStepper from '../../components/NumberStepper';

const lockKeys = () => {

  const [keys, setKeys] = useState([]);
  const [selectedKey,setSelectedKey] = useState(null);
  const [selectedLock,setSelectedLock] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [remainingUses,setReamininguses] = useState(0);
  const [date,setDate] = useState("");
  const [show, setShow] = useState(false);

  const params = useLocalSearchParams();
  const selectedLockId = params.id;

  const updateKey = async () => {
    await putKeyUpdate(selectedKey.id,selectedKey.status,date,remainingUses,selectedKey.name);
    setModalVisible(false);
    fetchLock();
  }

  const deleteKeyFn = async (keyId) => {
    await deleteKey(keyId);
    fetchLock();
  }

  const onChange = (event, selectedDate) => {
    setShow(false); 
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

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

  const handleValueChange = (value) => {
    setReamininguses(value)
  };

  return (
    <SafeAreaView className='bg-tertiary h-full px-4'>

      <FlatList
        data={keys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <KeyCard item={item} fn={() => modalScreen(item.id)} del={true} delFn={() => deleteKeyFn(item.id)}/>
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
                <Text className='font-psemibold text-xl'>Lejárati idő: {selectedKey.remainingUses === -1 ? 'Nincs' : (selectedKey.expirationDate)}</Text>
                <Text className='font-psemibold text-xl mb-10'>Létrehozás dátuma: {selectedKey.createdAt.slice(0,10)}</Text>

                <Text className="font-psemibold text-xl">Új lejárati idő: {date ? date.toString().slice(0,24) : "állandó"}</Text>
                <View className="flex-row gap-x-2">
                  <CustomButton title={"Dátum beállítása"} containerStyles={"border-2 w-[50%]"} handlePress={() => setShow(true)}/>
                  <CustomButton title={"Állandó"} containerStyles={"border-2 w-[30%]"} handlePress={() => setDate(null)}/>
                </View>
                {show && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                  />
                )}

                <Text className="font-psemibold text-xl">Új felhasználhatóság: {remainingUses}</Text>
                <NumberStepper initialValue={5} min={-1} max={50} step={1} onValueChange={handleValueChange}/>

                <CustomButton handlePress={() => updateKey()} title={"Mentés"}/>
                <CustomButton handlePress={() => setModalVisible(false)} title="Mégsem"/>
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