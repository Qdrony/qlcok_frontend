import { StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const GroupLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='lockGroup'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='addGroup'
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