import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import {FromField} from '../../components/FromField'
import {CustomButton} from '../../components/CustomButton'
import { Link } from 'expo-router'

const Home = () => {

  const [profile,setProfile] = useState({
      name: 'Test Elek',
      email: '',
      password: ''
    })

  return (
        <SafeAreaView className='bg-tertiary h-full'>
          <ScrollView>
            <View className='w-full min-h-[85vh] px-4 my-6'>
              <Image
                source={images.qlockgreen}
                resizeMode='contain'
                className='w-[200px] h-[100px]'
              />
              <Text className='text-primary text-2xl font-pbold'>Üdvözlünk {profile.name}!</Text>
              <View className='flex-row'>
                <View className='w-[49%] h-60 mr-[2%] bg-primary rounded-3xl'>

                </View>
                <View className='w-[49%] h-60 bg-secondary rounded-3xl'>

                </View>
              </View>
              <View className='mt-2 w-full h-[15%] bg-secondary rounded-3xl'>
                
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )
}

export default Home