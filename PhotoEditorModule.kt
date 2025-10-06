package com.reactnativephotoeditor

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.*
import com.reactnativephotoeditor.activity.PhotoEditorActivity
import com.reactnativephotoeditor.activity.constant.ResponseCode

class PhotoEditorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val EDIT_SUCCESSFUL = 1
    private var promise: Promise? = null

    override fun getName(): String {
        return "PhotoEditor"
    }

    @ReactMethod
    fun open(options: ReadableMap?, promise: Promise) {
        this.promise = promise
        val activity: Activity? = getCurrentActivity() // ✅ Proper way to get the activity
        if (activity == null) {
            promise.reject("ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist")
            return
        }

        val intent = Intent(reactApplicationContext, PhotoEditorActivity::class.java)
        reactApplicationContext.addActivityEventListener(mActivityEventListener)

        val path = options?.getString("path")
        val stickers = options?.getArray("stickers") as? ReadableArray

        intent.putExtra("path", path)
        intent.putExtra("stickers", stickers?.toArrayList())

        activity.startActivityForResult(intent, EDIT_SUCCESSFUL)
    }

    private val mActivityEventListener = object : BaseActivityEventListener() {
        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, intent: Intent?) {
            if (requestCode == EDIT_SUCCESSFUL) {
                when (resultCode) {
                    ResponseCode.RESULT_OK -> {
                        val path = intent?.getStringExtra("path")
                        promise?.resolve("file://$path")
                    }
                    ResponseCode.RESULT_CANCELED -> {
                        promise?.reject("USER_CANCELLED", "User has cancelled", null)
                    }
                    ResponseCode.LOAD_IMAGE_FAILED -> {
                        val path = intent?.getStringExtra("path")
                        promise?.reject("LOAD_IMAGE_FAILED", "Load image failed: $path", null)
                    }
                    else -> {
                        promise?.reject("UNKNOWN_ERROR", "Unknown result code: $resultCode", null)
                    }
                }
            }
        }
    }
}
