import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import {FromField} from '../../components/FromField'
import {CustomButton} from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import {loginUser} from '../../lib/api/auth' 

const SignIn = () => {

  const [from,setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting,setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true);
    const response = await loginUser(from.email,from.password);
    if(response.success === true)
    {
      router.push("/(tabs)/home");
    }
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
          <View className='w-full bg-primary rounded-2xl h-[30%]'>
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
          </View>
          
          <CustomButton 
            title="Bejelentkezés"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-primary text-lg font-pregular'>
              Nincs még fiókod?
            </Text>
            <Link href="/(auth)/sign-up" className='text-secondary font-pregular text-lg'>Regisztrálás</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn