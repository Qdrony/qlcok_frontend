import { Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const KeyCard = ({item, fn, del, delFn}) => {
  return (
    <TouchableOpacity 
      className='w-full rounded-2xl bg-primary flex-row items-center px-2 justify-between mb-2'
      onPress={fn}
    >
      <Image 
        source={icons.key}
        resizeMode='contain'
        className='w-10 h-10 ml-2'
      />
      <View className='flex-1 ml-2 my-2'>
        <Text className='text-tertiary'>Kulcs neve: {item.name}</Text>
        <Text className='text-tertiary'>Kulcs státusza: {item.status}</Text>
        <Text className='text-tertiary'>Zár neve: {item.lockName}</Text>
        <Text className='text-tertiary'>Felhasználó: {item.userName}</Text>
        {
          console.log(item)
        }
        
        {(item.startTime === null ? <></> : <Text className='text-tertiary'>Nyitási idő: {item.startTime} - {item.endTime}</Text>)}
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

export default KeyCard