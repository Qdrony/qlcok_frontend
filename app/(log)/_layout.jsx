import { StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const GroupLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='logProfile'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='log'
          options={{
            headerShown: false
          }}
        />
        <StatusBar
          backgroundColor='black'
          barStyle='light-content'
        />  
      </Stack>
    </>
  )
}

export default GroupLayout