import { Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const GroupCard = ({item, fn, del, delFn}) => {
  return (
    <TouchableOpacity 
          className='w-full h-16 rounded-2xl bg-primary flex-row items-center px-2 justify-between mb-2'
          onPress={fn}
        >
          <Image 
            source={icons.group}
            resizeMode='contain'
            className='w-10 h-10 ml-2'
          />
          <View className='flex-1 ml-2'>
            <Text className='text-tertiary'>{item.name}</Text>
          </View>
          {del ? (<TouchableOpacity onPress={delFn}>
                    <Image 
                      source={icons.bin}
                      resizeMode='contain'
                      className='w-8 h-8 '
                    />
                  </TouchableOpacity>
          ) : (
              <></>
          )}
    
          
        </TouchableOpacity>
  )
}

export default GroupCard