import { Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const LockCard = ({item, fn}) => {
  return (
    <TouchableOpacity 
      className='w-full h-16 rounded-2xl bg-secondary flex-row items-center gap-x-4 mb-3'
      onPress={fn}
    >
      <Image 
        source={icons.lock}
        resizeMode='contain'
        className='w-10 h-10 ml-2'
      />
      <Text className='text-tertiary'>{item.name}</Text>
      <Text className='text-tertiary'>{item.status}</Text>
      <Text className='text-tertiary'>{item.lockName}</Text>
    </TouchableOpacity>
  )
}

export default LockCard