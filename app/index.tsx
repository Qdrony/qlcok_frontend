import { router } from 'expo-router';
import { Image, View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants'
import {CustomButton} from '../components/CustomButton'
import { getUser } from '@/lib/services/secureStore';
import {loginUser} from '../lib/api/auth' 

export default function HomeScreen() {
  const loggedIn = async () => {
    if(getUser() === null) {
      return;
    }else {
      const user = await getUser();
      const response = await loginUser(user.email, user.password);
      if(response.success === true)
      {
        router.push("/(tabs)/home");
      }
    }
    
    
  }

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