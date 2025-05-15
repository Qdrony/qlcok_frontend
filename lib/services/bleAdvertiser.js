import { NativeModules } from 'react-native';



const { BleAdvertiser } = NativeModules;

export const startBle = async (userId, keyId) => {
  try {
    console.log('Starting BLE broadcast...');
    const result = await BleAdvertiser.startBroadcast(userId, keyId);
    console.log(result);
  } catch (error) {
    console.error('BLE start error:', error);
  }
};

export const stopBle = async () => {
  try {
    const result = await BleAdvertiser.stopBroadcast();
    console.log("✅ BLE leállítva:", result);
  } catch (error) {
    console.error("❌ BLE stop error:", error);
  }
};