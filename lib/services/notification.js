import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {   
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission not granted!');
        return null;
    }
    console.log('Permission granted!');
    try {
        const tokenData = await Notifications.getExpoPushTokenAsync();
        console.log('Token:', tokenData);
    } catch (error) {
        console.error('Error getting push token:', error);
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    return token;
}