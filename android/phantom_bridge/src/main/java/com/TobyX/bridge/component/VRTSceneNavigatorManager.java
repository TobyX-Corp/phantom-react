//  Copyright © 2020 TobyX Corp. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining
//  a copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to
//  permit persons to whom the Software is furnished to do so, subject to
//  the following conditions:
//
//  The above copyright notice and this permission notice shall be included
//  in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

package com.TobyX.bridge.component;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.TobyX.bridge.PhantomReactPackage;
import com.TobyX.bridge.utility.PhantomEvents;

import java.util.Map;

/**
 * SceneNavigatorManager for building a {@link VRTVRSceneNavigator}
 * corresponding to the SceneNavigator.js control.
 */
public class VRTSceneNavigatorManager extends VRTViewGroupManager<VRTVRSceneNavigator> {

    private final PhantomReactPackage.Platform mPlatform;

    public VRTSceneNavigatorManager(ReactApplicationContext context,
                                    PhantomReactPackage.Platform platform) {
        super(context);
        mPlatform = platform;
    }

    @Override
    public String getName() {
        return "VRTSceneNavigator";
    }

    @Override
    protected VRTVRSceneNavigator createViewInstance(ThemedReactContext reactContext) {
        return new VRTVRSceneNavigator(reactContext, mPlatform);
    }

    @ReactProp(name = "vrModeEnabled", defaultBoolean = true)
    public void setVrModeEnabled(VRTVRSceneNavigator navigator, boolean vrModeEnabled) {
        navigator.setVrModeEnabled(vrModeEnabled);
    }

    @ReactProp(name = "debug", defaultBoolean = false)
    public void setDebug(VRTVRSceneNavigator navigator, boolean debug) {
        navigator.setDebug(debug);
    }

    @ReactProp(name = "currentSceneIndex")
    public void setCurrentSceneIndex(VRTVRSceneNavigator view, int selectedIndex) {
        view.setCurrentSceneIndex(selectedIndex);
    }

    @Override
    protected void onAfterUpdateTransaction(VRTVRSceneNavigator view) {
        super.onAfterUpdateTransaction(view);
        if (view instanceof VRTVRSceneNavigator) {
            ((VRTVRSceneNavigator) view).onPropsSet();
        }
    }

    @ReactProp(name = "hasOnExitCallback", defaultBoolean = false)
    public void setHasOnExitCallback(VRTVRSceneNavigator navigator, boolean hasOnExitCallback) {
        navigator.setHasOnExitCallback(hasOnExitCallback);
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                PhantomEvents.ON_EXIT_PHANTOM, MapBuilder.of("registrationName", PhantomEvents.ON_EXIT_PHANTOM));
    }
}
