package com.norduk.myapp.nfc

import android.nfc.cardemulation.HostApduService
import android.os.Bundle
import android.util.Log
import java.util.*
import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import com.norduk.myapp.nfc.NfcPayloadModule

class MyHostApduService : HostApduService() {

    override fun processCommandApdu(commandApdu: ByteArray?, extras: Bundle?): ByteArray {
        Log.i("NFC", "Kapott APDU: ${commandApdu?.joinToString(" ") { "%02X".format(it) }}")

        val json = """{"userId":"${NfcPayloadModule.userId}","keyId":"${NfcPayloadModule.keyId}"}"""
        val encrypted = encrypt(json, "MySecretKey123456") 

        return encrypted
    }

    override fun onDeactivated(reason: Int) {
        Log.i("NFC", "NFC kapcsolat bontva, ok: $reason")
    }

    private fun encrypt(data: String, key: String): ByteArray {
        val secretKey = SecretKeySpec(key.toByteArray(Charsets.UTF_8), "AES")
        val cipher = Cipher.getInstance("AES/ECB/PKCS5Padding")
        cipher.init(Cipher.ENCRYPT_MODE, secretKey)
        return cipher.doFinal(data.toByteArray(Charsets.UTF_8))
    }
}