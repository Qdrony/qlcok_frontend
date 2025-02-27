import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import {FromField} from '../../components/FromField'
import {CustomButton} from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
  const [from,setForm] = useState({
      email: '',
      password: '',
      passwordAgain: '',
      name: '',
    })
    const [isSumbitting,setSubmitting] = useState(false)
  
    const sumbit = () => {
      
    }
  
    return (
      <SafeAreaView className='bg-tertiary h-full'>
        <ScrollView>
          <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
            <Image
              source={images.qlockgreen}
              resizeMode='contain'
              className='w-[200px] h-[100px]'
            />
            <View className='w-full bg-primary rounded-2xl h-[58%]'>
            <FromField
              title="Email"
              value={from.email}
              otherStyles="mt-7"
              handleChangeText={(e) => setForm({
                ...from, email: e
              })}
            />
            <FromField
              title="Password"
              value={from.password}
              otherStyles="mt-7"
              handleChangeText={(e) => setForm({
                ...from, password: e
              })}
            />
            <FromField
              title="Password Again"
              value={from.passwordAgain}
              otherStyles="mt-7"
              handleChangeText={(e) => setForm({
                ...from, passwordAgain: e
              })}
            />
            <FromField
              title="Name"
              value={from.name}
              otherStyles="mt-7"
              handleChangeText={(e) => setForm({
                ...from, name: e
              })}
            />
            </View>
            
            <CustomButton 
              title="Regisztrálás"
              handlePress={sumbit}
              containerStyles="mt-7"
              isLoading={isSumbitting}
            />
  
            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-primary text-lg font-pregular'>
                Van már fiókod?
              </Text>
              <Link href="/(tabs)/home" className='text-secondary font-pregular text-lg'>Belépés</Link>
            </View>
  
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

export default SignUp