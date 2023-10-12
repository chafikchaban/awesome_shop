package com.awesome.shop.activities;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    // https://github.com/software-mansion/react-native-screens/issues/17#issuecomment-424704067
    super.onCreate(null);
  }

  @Override public void onConfigurationChanged(Configuration config) {
    super.onConfigurationChanged(config);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", config);
    this.sendBroadcast(intent);
  }

  @Override public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    this.setIntent(intent);
  }

  @Override protected String getMainComponentName() {
    return "awesome shop";
  }

  @Override protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      this.getMainComponentName(),
      DefaultNewArchitectureEntryPoint.getFabricEnabled()
    );
  }
}
