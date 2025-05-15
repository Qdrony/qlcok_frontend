import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { useEffect, useRef } from 'react'
import { API_URL } from '@env';
import { stopBle } from './bleAdvertiser';
import { router } from 'expo-router';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function useNotificationHandlers(closeModal) {
  const notificationListener = useRef();
  const responseListener = useRef();

    // 🎯 Ha jön értesítés, amikor az app aktív
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Érkezett értesítés:', notification);
      if(notification.request.content.title === "Warning!" || notification.request.content.title === "Opening attempt!") {
        stopBle();
        closeModal();    
      }
    });

    // 📲 Ha a user rányom az értesítésre (háttérben volt, vagy zárt app)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User kattintott az értesítésre:', response);
      // Például navigálhatsz az adott képernyőre
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
}

export async function sendPushTokenToBackend(token,userId) {
  try {
    const response = await fetch(`http://192.168.0.141:5009/api/notification/register-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token, userId: userId }), 
    });

    const result = await response.json();
  } catch (error) {
    console.error('Hiba a token elküldésekor:', error);
  }
}

export async function registerForPushNotificationsAsync(userId) {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Ha nincs engedély, kérünk egyet
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Nem kaptunk értesítési engedélyt!');
      return;
    }
    
    // Token lekérése
    try {
      const expoToken = await Notifications.getExpoPushTokenAsync();
      token = expoToken.data;
    } catch (error) {
      console.error('Hiba történt a token lekérésekor:', error);
      return;
    }
    
    // TODO: ide jön a backend hívás, ha készen van
  } else {
    alert('Értesítések csak valódi eszközön működnek.');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Alapértelmezett',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  await sendPushTokenToBackend(token,userId);
  console.log('Token elküldve a backendnek:', token);
  return token;
}