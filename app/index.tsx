import { router } from 'expo-router';
import { Image, View, Text, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants'
import {CustomButton} from '../components/CustomButton'
import { getEmail, getPassword, getUser } from '@/lib/services/secureStore';
import {loginUser} from '../lib/api/auth'
import { PermissionsAndroid, Platform } from 'react-native';



export default function HomeScreen() {

  const loggedIn = async () => {
    const user = await getUser();
    console.log(user);
    
    if(user === null) {
      return;
    }else {
      const email = await getEmail();
      const password = await getPassword();
      const response = await loginUser(email,password);
      if(response.success === true)
      {
        router.push("/(tabs)/home");
      }
    }
  }

  async function requestBlePermissions() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
          ]);
    
          const allGranted = Object.values(granted).every(
            (status) => status === PermissionsAndroid.RESULTS.GRANTED
          );
    
          return allGranted;
        } catch (err) {
          console.warn('Permission error:', err);
          return false;
        }
      }
      return true;
  }

  useEffect(() => {
    requestBlePermissions().then((granted) => {
      if (!granted) {
        console.log("Bluetooth jogosultság szükséges", "Kérlek engedélyezd a BLE működéséhez.");
      }
    });
    loggedIn();
  }, []);

  return (
    <SafeAreaView className='bg-tertiary h-full'>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='w-full items-center justify-center min-h-[85vh] px-4'>
          <Image
            source={images.qlockgreen}
            resizeMode="contain"
            className='min-w-full aspect-[1] max-h-[150]'
          /> 
          <View className="relative mt-2">
            <Text className="text-3xl
            text-primary
            font-bold text-center">Discover Endless
            Possibilities with{' '}
            <Text className="text-secondary-200">QLock</Text>
            </Text>
          </View>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {router.push('/(auth)/sign-in')
            }}
            containerStyles="w-full mt-7"
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar 
        backgroundColor='black'
        barStyle='light-content'
      />
    </SafeAreaView>
  );
}