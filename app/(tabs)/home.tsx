import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images, icons} from '../../constants'
import {FromField} from '../../components/FromField'
import {CustomButton} from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getUser } from '../../lib/services/secureStore'

const Home = () => {

  const [name,setName] = useState("Felhasználó");

  useEffect(() => {
    const fetchKeys = async () => {
      const user = await getUser();

      if (user.name) setName(user.name)
        
      setIsLoading(false);
    };

    fetchKeys();
  }, []);

  const [isLoading,setIsLoading] = useState(true);

  return (
        <SafeAreaView className='bg-tertiary h-full'>
          <ScrollView>
            <View className='w-full min-h-[85vh] px-4 my-6'>
              <Image
                source={images.qlockgreen}
                resizeMode='contain'
                className='w-[200px] h-[100px]'
              />
              <Text className='text-primary text-2xl font-pbold'>Üdvözlünk {name}!</Text>
              <View className='flex-row'>

                <TouchableOpacity onPress={() => {router.push('/(tabs)/key')}} className='w-[49%] h-60 mr-[2%] bg-primary rounded-3xl'>
                    <View className='flex-row w-full'>
                      <Image
                        source={icons.key}
                        className='w-[20%] max-h-10 ml-[4%] mt-[4%]'
                      />
                      <Text className='ml-4 mt-4 font-psemibold'>Birtokolt kulcsok</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {router.push('/(tabs)/lock')}} className='w-[49%] h-60 bg-secondary rounded-3xl'>
                    <View className='flex-row w-full'>
                      <Image
                          source={icons.lock}
                          className='w-[20%] max-h-11 ml-[4%] mt-[4%]'
                        />
                        <Text className='ml-4 mt-4 font-psemibold'>Birtokolt zárak</Text>
                    </View>
                </TouchableOpacity>

              </View>

              <TouchableOpacity className='mt-2 w-full h-[15%] bg-secondary rounded-3xl flex-row items-center'>
                <Image
                  source={icons.lock}
                  className='w-24 h-24 ml-4'
                />
                <Text className='ml-5 font-psemibold text-2xl'>Zár regisztrálása</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className='mt-2 w-full h-[15%] bg-primary rounded-3xl flex-row items-center'>
                <Image
                  source={icons.key}
                  className='w-24 h-24 ml-5'
                />
                <View className='justify-center items-center'>
                  <Text className='font-psemibold text-xl'>Jelenleg kiválasztott kulcs:</Text>
                  <Text className='text-xl'>Test</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className='mt-2 w-full h-[15%] bg-secondary rounded-3xl flex-row items-center'>
                <Image
                  source={icons.log}
                  className='w-20 h-20 ml-4'
                />
                <Text className='ml-5 font-psemibold text-2xl'>Naplók megtekintése</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </SafeAreaView>
      )
}

export default Home

function getUserKeys(id: any) {
  throw new Error('Function not implemented.')
}
