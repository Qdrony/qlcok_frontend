import { NativeModules } from 'react-native';

export async function updateNfcPayload(userId, keyId) {
  try {
    if (!userId || !keyId) {
        console.warn('userId vagy keyId hiányzik:', userId, keyId);
        return;
    }

    NativeModules.NfcPayloadModule.setPayload(userId.toString(), keyId.toString());
    console.log('NFC payload átadva a natív oldalnak');
  } catch (err) {
    console.error('Hiba a payload átadásakor:', err);
  }
}
