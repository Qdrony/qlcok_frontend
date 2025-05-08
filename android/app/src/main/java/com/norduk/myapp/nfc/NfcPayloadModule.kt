package com.norduk.myapp.nfc

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NfcPayloadModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        var userId: String = ""
        var keyId: String = ""
    }

    override fun getName(): String {
        return "NfcPayloadModule"
    }

    @ReactMethod
    fun setPayload(userId: String, keyId: String) {
        NfcPayloadModule.userId = userId
        NfcPayloadModule.keyId = keyId
    }
}
