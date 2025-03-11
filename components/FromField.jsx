import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'

export const FromField = ({title, value, placeholder, handleChangeText, otherStyles,keyboardType}) => {

  const [showPassword,setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles} px-5`}>
      <Text className='text-base text-black font-bold px-2'>{title}</Text>
      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100
        rounded-2xl focus:border-primary items-center flex-row'>
          <TextInput
            className='flex-1 text-tertiary font-semibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={(title === 'Password' || title === 'Password Again') && !showPassword}
          />

          {(title === 'Password' || title === 'Password Again') && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
               <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6'
               resizeMode='contain'
               />
            </TouchableOpacity>
          )}
      </View>
    </View>
  )
}

export default FromField