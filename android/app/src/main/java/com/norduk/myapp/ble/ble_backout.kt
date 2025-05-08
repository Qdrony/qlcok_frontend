/*
package com.norduk.myapp.ble

import android.bluetooth.le.AdvertiseCallback
import android.bluetooth.le.AdvertiseData
import android.bluetooth.le.AdvertiseSettings
import android.bluetooth.le.BluetoothLeAdvertiser
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import android.os.ParcelUuid
import android.util.Log
import com.facebook.react.bridge.*

import java.util.*

class BleAdvertiserModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var advertiser: BluetoothLeAdvertiser? = null

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
        //val serviceUuid = ParcelUuid(UUID.fromString("0000180D-0000-1000-8000-00805f9b34fb"))
        //val advertiseData = AdvertiseData.Builder()
            //.addServiceData(serviceUuid, payload)
            //.setIncludeDeviceName(true)
            //.build()

        val advertiseData = AdvertiseData.Builder()
            .addManufacturerData(0x004C, payload)
            .setIncludeDeviceName(true)
            .build()

        val settings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setConnectable(false)
            .build()

        advertiser?.startAdvertising(settings, advertiseData, object : AdvertiseCallback() {
            override fun onStartSuccess(settingsInEffect: AdvertiseSettings) {
                super.onStartSuccess(settingsInEffect)
                Log.d("BLE", "Broadcast started: $userId:$keyId")
                promise.resolve("Broadcast started")
            }

            override fun onStartFailure(errorCode: Int) {
                super.onStartFailure(errorCode)
                Log.e("BLE", "Broadcast failed: $errorCode")
                promise.reject("ADVERTISING_FAILED", "Failed to start: $errorCode")
            }
        })
    }

    @ReactMethod
    fun stopBroadcast(promise: Promise) {
        advertiser?.stopAdvertising(object : AdvertiseCallback() {})
        advertiser = null
        promise.resolve("Broadcast stopped")
    }
}
*/