import { StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LockLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='lockKeys'
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='sign-up'
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

export default LockLayout