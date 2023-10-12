package com.awesome.shop.modules;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.util.Log;

import androidx.annotation.MainThread;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.tasks.Task;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.InstallStatus;
import com.google.android.play.core.install.model.UpdateAvailability;

@ReactModule(name = InAppUpdateModule.JS_MODULE_NAME)
public class InAppUpdateModule extends ReactContextBaseJavaModule implements ActivityEventListener {

  public static final String JS_MODULE_NAME = "InAppUpdateModule";
  public static int IN_APP_UPDATE_REQUEST_CODE = 42142;
  public static String IN_APP_UPDATE_RESULT_KEY = "in_app_update_result";

  private AppUpdateManager appUpdateManager = null;

  public InAppUpdateModule(ReactApplicationContext context) {
    super(context);

    this.appUpdateManager = AppUpdateManagerFactory.create(context);
    context.addActivityEventListener(this);
  }

  // ReactContextBaseJavaModule

  @Override @NonNull public String getName() {
    return InAppUpdateModule.JS_MODULE_NAME;
  }

  // ActivityEventListener

  @Override public void onNewIntent(Intent intent) {
    // no-op
  }

  @Override public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    if (requestCode != IN_APP_UPDATE_REQUEST_CODE) {
      return;
    }
    this.emitToJS(IN_APP_UPDATE_RESULT_KEY, String.valueOf(resultCode == Activity.RESULT_OK ? InstallStatus.INSTALLED : InstallStatus.CANCELED));
  }

  @ReactMethod public void check(Promise promise) {
    Task<AppUpdateInfo> updateInfoTask = appUpdateManager.getAppUpdateInfo();
    appUpdateManager.getAppUpdateInfo();

    updateInfoTask.addOnSuccessListener(appUpdateInfo -> {
      WritableMap map = Arguments.createMap();

      int availability = appUpdateInfo.updateAvailability();
      map.putInt("status", availability);
      map.putInt("versionCode", appUpdateInfo.availableVersionCode());
      map.putBoolean("isImmediateUpdateAllowed", appUpdateInfo.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE));
      map.putBoolean("isFlexibleUpdateAllowed", appUpdateInfo.isUpdateTypeAllowed(AppUpdateType.FLEXIBLE));

      promise.resolve(map);
    });

    updateInfoTask.addOnFailureListener(err -> promise.reject(InAppUpdateModule.JS_MODULE_NAME, err.toString()));
  }

  @ReactMethod public void install(int type, Promise promise) {
    Task<AppUpdateInfo> updateInfoTask = appUpdateManager.getAppUpdateInfo();

    updateInfoTask.addOnSuccessListener(info -> {
      if (info.updateAvailability() != UpdateAvailability.UPDATE_AVAILABLE) {
        promise.reject(InAppUpdateModule.JS_MODULE_NAME, "Update unavailable, check with InAppUpdateModule#check first");
      } else if (!info.isUpdateTypeAllowed(type)) {
        promise.reject(InAppUpdateModule.JS_MODULE_NAME, "Update type unavailable, check isImmediateUpdateAllowed or isFlexibleUpdateAllowed first");
      } else {
        try {
          appUpdateManager.startUpdateFlowForResult(info, type, this.getCurrentActivity(), InAppUpdateModule.IN_APP_UPDATE_REQUEST_CODE);
          promise.resolve(null);
        } catch (IntentSender.SendIntentException e) {
          promise.reject(InAppUpdateModule.JS_MODULE_NAME, e);
        }
      }
    });

    updateInfoTask.addOnFailureListener(err -> promise.reject("Exception", err.toString()));
  }

  @ReactMethod public void complete() {
    appUpdateManager.completeUpdate();
  }

  @ReactMethod public void addListener(String eventName) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod public void removeListeners(double count) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @MainThread private void emitToJS(String key, String value) {
    ReactContext reactContext = this.getReactApplicationContext();
    if (reactContext == null || !reactContext.hasActiveCatalystInstance()) {
      return;
    }

    try {
      reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(key, value);
    } catch (Exception e) {
      Log.w(InAppUpdateModule.JS_MODULE_NAME, "Error sending Event: " + key, e);
    }
  }
}