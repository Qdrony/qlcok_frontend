import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'

export const SearchInput = ({title, value, placeholder, handleChangeText, otherStyles,keyboardType}) => {

  return (
    <View className={`${otherStyles} rounded-2xl p-2.5`}>
      <View className='border-2 border-black-200 w-full h-16 px-4
        rounded-2xl items-center flex-row'>
            <TextInput
                className='flex-1 text-tertiary font-semibold text-base'
                value={value}
                placeholder={placeholder}
                placeholderTextColor="black"
                onChangeText={handleChangeText}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMethod='contain'
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SearchInput