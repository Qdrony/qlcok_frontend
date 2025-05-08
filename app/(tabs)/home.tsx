import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images, icons} from '../../constants'
import {FromField} from '../../components/FromField'
import {CustomButton} from '../../components/CustomButton'
import { router } from 'expo-router'
import { getCurrentKey, getUser, deleteToken, deleteUser, deleteEmail, deletePassword, deleteCurrentKey, deleteOfflineKeys } from '../../lib/services/secureStore'
import { useFocusEffect } from '@react-navigation/native'
import useNotificationHandlers, { registerForPushNotificationsAsync } from '@/lib/services/notification';

const Home = () => {

  useNotificationHandlers();

  const [name,setName] = useState("Felhasználó");
  const [currentKey,setCurrentKey] = useState("Nincs kiválasztva");
  const [showAddLockModal, setShowAddLockModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading,setIsLoading] = useState(true);

  const pushToken = async () => {
    await registerForPushNotificationsAsync(userId);
  }

  useFocusEffect(
    useCallback(() => {
      const fetchKeys = async () => {
        const user = await getUser();
        const key = await getCurrentKey();
        if (key) setCurrentKey(key.name);
        if(user.id) setUserId(user.id);
        if (user.name) setName(user.name)
        setIsLoading(false);
      };
      fetchKeys();
      pushToken();
    }, [])
  );

  return (
        <SafeAreaView className='bg-tertiary h-full'>
          <ScrollView>
            <View className='w-full min-h-[85vh] px-4 my-6'>
              <View className='flex-row items-center justify-between'>
                <Image
                  source={images.qlockgreen}
                  resizeMode='contain'
                  className='w-[200px] h-[100px]'
                />
                <TouchableOpacity onPress={() => {
                    deleteUser();
                    deleteEmail();
                    deletePassword();
                    deleteCurrentKey();
                    deleteToken();
                    deleteOfflineKeys();
                    router.push('/(auth)/sign-in');
                  }} 
                  >
                  <Image
                    source={icons.logoutGreen}
                    resizeMode='contain'
                    className='w-10 h-10 mr-2 mt-4'
                  />
                </TouchableOpacity>
              </View>
              <Text className='text-primary text-2xl font-pbold'>Üdvözlünk {name}!</Text>

              <View className='flex-row'>

                <TouchableOpacity onPress={() => {router.push('/(tabs)/key')}} className='w-[49%] h-60 mr-[2%] bg-primary rounded-3xl'>
                    <View className='flex-row w-full'>
                      <Image
                        source={icons.key}
                        className='w-[20%] max-h-10 ml-[4%] mt-[4%]'
                      />
                      <Text className='ml-1 mt-4 font-psemibold text-base'>Birtokolt kulcsok</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {router.push('/(tabs)/lock')}} className='w-[49%] h-60 bg-secondary rounded-3xl'>
                    <View className='flex-row w-full'>
                      <Image
                          source={icons.lock}
                          className='w-[20%] max-h-11 ml-[4%] mt-[4%]'
                        />
                        <Text className='ml-2 mt-4 font-psemibold text-base'>Birtokolt zárak</Text>
                    </View>
                </TouchableOpacity>

              </View>

              <TouchableOpacity onPress={() => setShowAddLockModal(true)} className='mt-2 w-full h-[15%] bg-secondary rounded-3xl flex-row items-center'>
                <Image
                  source={icons.lock}
                  className='w-20 h-20 ml-2'
                />
                <Text className='ml-5 font-psemibold text-2xl'>Zár regisztrálása</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className='mt-2 w-full h-[15%] bg-primary rounded-3xl flex-row items-center'>
                <Image
                  source={icons.key}
                  className='w-20 h-20 ml-2'
                />
                <View className='justify-center items-center'>
                  <Text className='font-psemibold text-xl'>Jelenleg kiválasztott kulcs:</Text>
                  <Text className='text-xl'>{currentKey}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {router.push('/(log)/log')}} className='mt-2 w-full h-[15%] bg-secondary rounded-3xl flex-row items-center'>
                <Image
                  source={icons.log}
                  className='w-20 h-20 ml-2'
                />
                <Text className='ml-2 font-psemibold text-2xl'>Naplók megtekintése</Text>
              </TouchableOpacity>

              <Modal animationType="fade" transparent={true} visible={showAddLockModal}>
                <View className='justify-center items-center flex-1 bg-black/50'>
                  <View className='bg-secondary px-6 py-4 rounded-2xl shadow-lg min-w-[80%] min-h-[30%]'>
                    <Text className="font-psemibold text-2xl">Zár regisztrálása </Text>
                    <FromField 
                      title="" 
                      placeholder="Zár kódja" 
                      value="" 
                      handleChangeText={() => {}} 
                      otherStyles="" 
                      keyboardType="default" 
                    />
                    <CustomButton handlePress={() => {}} title="Regisztrálás" containerStyles={"bg-secondary border-2 mt-10 mb-3"} textStyles={""} isLoading={false}/>
                    <CustomButton handlePress={() => setShowAddLockModal(false)} title="Mégsem" containerStyles={"bg-secondary border-2"} textStyles={""} isLoading={false}/>
                  </View>
                </View>
              </Modal>

            </View>
          </ScrollView>
        </SafeAreaView>
      )
}

export default Home