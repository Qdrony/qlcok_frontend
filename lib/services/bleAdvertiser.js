import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { NativeModules } from 'react-native';

const bleManager = new BleManager();


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

export const startBleBroadcast = async (userId, keyId) => {
  const payload = `${userId}:${keyId}`;
  const payloadBytes = Buffer.from(payload, 'utf-8');

  await bleManager.createAdvertiser({
    advertiseMode: 'lowLatency',
    connectable: false,
    includeDeviceName: false,
    serviceUuid: '0000ffe0-0000-1000-8000-00805f9b34fb', // Példa UUID
    manufacturerData: {
      manufacturerId: 0x004C, // Apple ID mint példa
      data: payloadBytes,
    },
  });

  console.log('BLE hirdetés elindítva:', payload);
};

export const stopBleBroadcast = async () => {
  await bleManager.stopAdvertiser();
  console.log('BLE hirdetés leállítva');
};