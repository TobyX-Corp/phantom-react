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

package com.TobyX.bridge.module;

import android.graphics.Point;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.module.annotations.ReactModule;
import com.TobyX.core.ARHitTestListener;
import com.TobyX.core.ARHitTestResult;
import com.TobyX.core.Renderer;
import com.TobyX.core.Vector;
import com.TobyX.core.ViewARCore;
import com.TobyX.bridge.component.VRTARSceneNavigator;
import com.TobyX.bridge.utility.ARUtils;


@ReactModule(name = "VRTARSceneModule")
public class ARSceneModule extends ReactContextBaseJavaModule {

    public ARSceneModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "VRTARSceneModule";
    }

    @ReactMethod
    public void performARHitTestWithRay(final int viewTag, final ReadableArray ray,
                                        final Promise promise) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                View sceneView = nativeViewHierarchyManager.resolveView(viewTag);
                if (sceneView.getParent() == null || !(sceneView.getParent() instanceof VRTARSceneNavigator)) {
                    throw new IllegalViewOperationException("Invalid view returned when " +
                            "calling performARHitTestWithRay: expected ARSceneNavigator as parent");
                }

                VRTARSceneNavigator arSceneNavigator = (VRTARSceneNavigator) sceneView.getParent();
                ViewARCore arView = arSceneNavigator.getARView();

                if (ray.size() != 3) {
                    promise.resolve(Arguments.createArray());
                    return;
                }

                float[] rayArray = new float[ray.size()];
                rayArray[0] = (float) ray.getDouble(0);
                rayArray[1] = (float) ray.getDouble(1);
                rayArray[2] = (float) ray.getDouble(2);

                arView.performARHitTestWithRay(new Vector(rayArray), new ARHitTestListener() {
                    @Override
                    public void onHitTestFinished(ARHitTestResult[] arHitTestResults) {
                        WritableArray returnArray = Arguments.createArray();
                        for (ARHitTestResult result : arHitTestResults) {
                            returnArray.pushMap(ARUtils.mapFromARHitTestResult(result));
                        }
                        promise.resolve(returnArray);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void performARHitTestWithWorldPoints(final int viewTag, final ReadableArray origin, final ReadableArray destination,
                                        final Promise promise) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                View sceneView = nativeViewHierarchyManager.resolveView(viewTag);
                if (sceneView.getParent() == null || !(sceneView.getParent() instanceof VRTARSceneNavigator)) {
                    throw new IllegalViewOperationException("Invalid view returned when " +
                            "calling performARHitTestWithRay: expected ARSceneNavigator as parent");
                }

                VRTARSceneNavigator arSceneNavigator = (VRTARSceneNavigator) sceneView.getParent();
                ViewARCore arView = arSceneNavigator.getARView();

                if ((origin.size() != 3) || (destination.size() != 3)) {
                    promise.resolve(Arguments.createArray());
                    return;
                }

                float[] originArray = new float[origin.size()];
                originArray[0] = (float) origin.getDouble(0);
                originArray[1] = (float) origin.getDouble(1);
                originArray[2] = (float) origin.getDouble(2);

                float[] destArray = new float[destination.size()];
                destArray[0] = (float) destination.getDouble(0);
                destArray[1] = (float) destination.getDouble(1);
                destArray[2] = (float) destination.getDouble(2);

                arView.performARHitTestWithRay(new Vector(originArray), new Vector(destArray), new ARHitTestListener() {
                    @Override
                    public void onHitTestFinished(ARHitTestResult[] arHitTestResults) {
                        WritableArray returnArray = Arguments.createArray();
                        for (ARHitTestResult result : arHitTestResults) {
                            returnArray.pushMap(ARUtils.mapFromARHitTestResult(result));
                        }
                        promise.resolve(returnArray);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void performARHitTestWithPosition(final int viewTag, final ReadableArray position,
                                        final Promise promise) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                View sceneView = nativeViewHierarchyManager.resolveView(viewTag);
                if (sceneView.getParent() == null || !(sceneView.getParent() instanceof VRTARSceneNavigator)) {
                    throw new IllegalViewOperationException("Invalid view returned when " +
                            "calling performARHitTestWithPosition: expected ARSceneNavigator as parent");
                }

                VRTARSceneNavigator arSceneNavigator = (VRTARSceneNavigator) sceneView.getParent();
                ViewARCore arView = arSceneNavigator.getARView();

                if (position.size() != 3) {
                    promise.resolve(Arguments.createArray());
                    return;
                }

                float[] positionArray = new float[position.size()];
                positionArray[0] = (float) position.getDouble(0);
                positionArray[1] = (float) position.getDouble(1);
                positionArray[2] = (float) position.getDouble(2);

                arView.performARHitTestWithPosition(new Vector(positionArray), new ARHitTestListener() {
                    @Override
                    public void onHitTestFinished(ARHitTestResult[] arHitTestResults) {
                        WritableArray returnArray = Arguments.createArray();
                        for (ARHitTestResult result : arHitTestResults) {
                            returnArray.pushMap(ARUtils.mapFromARHitTestResult(result));
                        }
                        promise.resolve(returnArray);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void performARHitTestWithPoint(final int viewTag, final int x, final int y,
                                             final Promise promise) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                View sceneView = nativeViewHierarchyManager.resolveView(viewTag);
                if (sceneView.getParent() == null || !(sceneView.getParent() instanceof VRTARSceneNavigator)) {
                    throw new IllegalViewOperationException("Invalid view returned when " +
                            "calling performARHitTestWithPoint: expected ARSceneNavigator as parent");
                }

                VRTARSceneNavigator arSceneNavigator = (VRTARSceneNavigator) sceneView.getParent();
                ViewARCore arView = arSceneNavigator.getARView();

                arView.performARHitTest(new Point(x, y), new ARHitTestListener() {
                    @Override
                    public void onHitTestFinished(ARHitTestResult[] arHitTestResults) {
                        WritableArray returnArray = Arguments.createArray();
                        for (ARHitTestResult result : arHitTestResults) {
                            returnArray.pushMap(ARUtils.mapFromARHitTestResult(result));
                        }
                        promise.resolve(returnArray);
                    }
                });
            }
        });
    }
}
