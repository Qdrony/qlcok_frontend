import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router, useLocalSearchParams } from 'expo-router'
import Logs from '../../components/Logs'

const logProfile = () => {

  const params = useLocalSearchParams();
  const selectedLockId = params.id;

  return (
    <SafeAreaView className='bg-tertiary h-full'>
        <View className='w-full min-h-[55vh] px-4 my-6 gap-y-2'>
            <Logs selectedLockId={selectedLockId} />
        </View>
    </SafeAreaView>
  )
}

export default logProfile