import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'
import {icons} from '../../constants'


const TabIcon = ({icon,color,name,focused}) => {
  return(
    <View className='items-center justify-center gap-1' style={{marginTop: 15}}>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`text-xs text-center`} style={{color: color}}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#99F05A',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 0,
            borderTopColor: '#232533',
            height: 50,
            justifyContent: 'center',
          }
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='key'
          options={{
            title: 'Kulcsok',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.key}
                color={color}
                name="Kulcs"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='lock'
          options={{
            title: 'Zár',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.lock}
                color={color}
                name="Zár"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='lockProfile'
          options={{
            title: 'LockProfile',
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
    </>
  )}

export default TabsLayout