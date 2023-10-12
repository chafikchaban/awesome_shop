package com.awesome.shop;

import android.content.Context;

import androidx.multidex.MultiDexApplication;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceEventListener;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.soloader.SoLoader;
import com.awesome.shop.modules.InAppUpdatePackage;

import org.wonday.orientation.OrientationActivityLifecycle;

import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication, ReactInstanceEventListener {

  private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {

    @Override public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new InAppUpdatePackage());

      return packages;
    }

    @Override protected String getJSMainModuleName() {
      return "index";
    }

    @Override protected boolean isNewArchEnabled() {
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

    @Override protected Boolean isHermesEnabled() {
      return BuildConfig.IS_HERMES_ENABLED;
    }
  };

  // ReactApplication

  @Override public ReactNativeHost getReactNativeHost() {
    return this.mReactNativeHost;
  }

  @Override public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      DefaultNewArchitectureEntryPoint.load();
    }

    ReactNativeFlipper.init(this, getReactNativeHost().getReactInstanceManager());

    this.registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance());
    this.getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(this);
  }

  @Override
  public void onReactContextInitialized(ReactContext reactContext) {
    DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
  }
}
