import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const EmptyState = ({title, color}) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image
            source={color === "primary" ? icons.noResult : icons.noResultYellow}
            className="w-40 h-40 mt-5"
            resizeMode='contain'
        />
        <Text className={`text-${color} font-semibold text-2xl mt-2`}>{title}</Text>
    </View>
  )
}

export default EmptyState