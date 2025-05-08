package com.norduk.myapp.ble

import android.bluetooth.le.AdvertiseCallback
import android.bluetooth.le.AdvertiseData
import android.bluetooth.le.AdvertiseSettings
import android.bluetooth.le.BluetoothLeAdvertiser
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import android.util.Log
import com.facebook.react.bridge.*

class BleAdvertiserModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var advertiser: BluetoothLeAdvertiser? = null
    private var advertiseCallback: AdvertiseCallback? = null

    override fun getName(): String = "BleAdvertiser"

    @ReactMethod
    fun startBroadcast(userId: Int, keyId: Int, promise: Promise) {
        val bluetoothManager = reactContext.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
        val bluetoothAdapter = bluetoothManager.adapter

        if (bluetoothAdapter == null || !bluetoothAdapter.isEnabled) {
            promise.reject("NO_BLUETOOTH", "Bluetooth not available or disabled")
            return
        }

        advertiser = bluetoothAdapter.bluetoothLeAdvertiser
        if (advertiser == null) {
            promise.reject("NO_ADVERTISER", "BLE advertising not supported")
            return
        }

        val payload = "qlock:$userId:$keyId".toByteArray()
        val advertiseData = AdvertiseData.Builder()
            .addManufacturerData(0x004C, payload)
            .setIncludeDeviceName(true)
            .build()

        val settings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_ULTRA_LOW)
            .setConnectable(false)
            .build()

        advertiseCallback = object : AdvertiseCallback() {
            override fun onStartSuccess(settingsInEffect: AdvertiseSettings) {
                Log.d("BLE", "Broadcast started(kotlin): $userId:$keyId")
                promise.resolve("Broadcast started")
            }

            override fun onStartFailure(errorCode: Int) {
                Log.e("BLE", "Broadcast failed: $errorCode")
                promise.reject("ADVERTISING_FAILED", "Failed to start: $errorCode")
            }
        }

        advertiser?.startAdvertising(settings, advertiseData, advertiseCallback)
    }

    @ReactMethod
    fun stopBroadcast(promise: Promise) {
        if (advertiser != null && advertiseCallback != null) {
            advertiser?.stopAdvertising(advertiseCallback)
            Log.d("BLE", "Broadcast stopped")
        } else {
            Log.w("BLE", "Nothing to stop")
        }
        advertiser = null
        advertiseCallback = null
        promise.resolve("Broadcast stopped")
    }
}
