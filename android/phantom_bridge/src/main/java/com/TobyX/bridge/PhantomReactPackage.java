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

package com.TobyX.bridge;

import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.TobyX.bridge.component.VRT3DSceneNavigatorManager;
import com.TobyX.bridge.component.VRTAnimatedComponentManager;
import com.TobyX.bridge.component.VRTControllerManager;
import com.TobyX.bridge.component.VRT360ImageManager;
import com.TobyX.bridge.component.VRTAmbientLightManager;
import com.TobyX.bridge.component.VRTDirectionalLightManager;
import com.TobyX.bridge.component.VRTLightingEnvironmentManager;
import com.TobyX.bridge.component.VRTMaterialVideoManager;
import com.TobyX.bridge.component.VRTOmniLightManager;
import com.TobyX.bridge.component.VRTSkyBoxManager;
import com.TobyX.bridge.component.VRTSoundFieldManager;
import com.TobyX.bridge.component.VRTSoundManager;
import com.TobyX.bridge.component.VRTSpatialSoundManager;
import com.TobyX.bridge.component.VRTSpotLightManager;
import com.TobyX.bridge.component.VRTVRSceneNavigatorManager;
import com.TobyX.bridge.component.node.VRTARImageMarkerManager;
import com.TobyX.bridge.component.node.VRTARObjectMarkerManager;
import com.TobyX.bridge.component.node.VRTARPlaneManager;
import com.TobyX.bridge.component.node.VRTARSceneManager;
import com.TobyX.bridge.component.node.VRTSceneManagerImpl;
import com.TobyX.bridge.component.node.control.VRT3DObjectManager;
import com.TobyX.bridge.component.node.control.VRTAnimatedImageManager;
import com.TobyX.bridge.component.node.control.VRTGeometryManager;
import com.TobyX.bridge.component.node.control.VRTParticleEmitterManager;
import com.TobyX.bridge.component.node.control.VRTPolygonManager;
import com.TobyX.bridge.component.node.control.VRTPolylineManager;
import com.TobyX.bridge.component.node.control.VRTTextManager;
import com.TobyX.bridge.component.VRT360VideoManager;
import com.TobyX.bridge.component.node.VRTCameraManager;
import com.TobyX.bridge.component.node.VRTOrbitCameraManager;
import com.TobyX.bridge.component.node.VRTFlexViewManager;
import com.TobyX.bridge.component.node.VRTNodeManagerImpl;
import com.TobyX.bridge.component.node.control.VRTBoxManager;
import com.TobyX.bridge.component.VRTSceneNavigatorManager;
import com.TobyX.bridge.component.VRTARSceneNavigatorManager;
import com.TobyX.bridge.component.node.control.VRTSphereManager;
import com.TobyX.bridge.component.node.control.VRTImageManager;
import com.TobyX.bridge.component.node.control.VRTQuadManager;
import com.TobyX.bridge.component.node.control.VRTVideoSurfaceManager;
import com.TobyX.bridge.component.node.VRTPortalSceneManager;
import com.TobyX.bridge.component.node.VRTPortalManager;


import com.TobyX.bridge.module.ARSceneModule;
import com.TobyX.bridge.module.ARSceneNavigatorModule;
import com.TobyX.bridge.module.ARTrackingTargetsModule;
import com.TobyX.bridge.module.AnimationManager;
import com.TobyX.bridge.module.CameraModule;
import com.TobyX.bridge.module.ControllerModule;
import com.TobyX.bridge.module.MaterialManager;
import com.TobyX.bridge.module.NodeModule;
import com.TobyX.bridge.module.SceneModule;
import com.TobyX.bridge.module.SceneNavigatorModule;
import com.TobyX.bridge.module.PerfMonitor;
import com.TobyX.bridge.module.SoundModule;
import com.TobyX.bridge.module.VRT3DSceneNavigatorModule;
import com.TobyX.bridge.module.VRTImageModule;

import java.util.Arrays;
import java.util.List;

/**
 * PhantomReactPackage class containing an array of all ViewManagers to be created.
 */
public class PhantomReactPackage implements ReactPackage {
    public static final String ON_EXIT_PHANTOM_BROADCAST ="com.TobyX.bridge.broadcast.OnExit";

    public enum Platform {
        GVR, OVR_MOBILE, AR
    }

    private final Platform mPlatform;

    public PhantomReactPackage(Platform platform) {
        mPlatform = platform;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        Log.e("Manish", "createNativeModules");
        return Arrays.<NativeModule>asList(
                new MaterialManager(reactContext),
                new AnimationManager(reactContext),
                new CameraModule(reactContext),
                new SoundModule(reactContext),
                new SceneNavigatorModule(reactContext),
                new PerfMonitor(reactContext),
                new ControllerModule(reactContext),
                new NodeModule(reactContext),
                new SceneModule(reactContext),
                new VRTImageModule(reactContext),
                new ARSceneModule(reactContext),
                new ARSceneNavigatorModule(reactContext),
                new ARTrackingTargetsModule(reactContext),
                new VRT3DSceneNavigatorModule(reactContext)
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new VRTSceneNavigatorManager(reactContext, mPlatform),
                new VRTVRSceneNavigatorManager(reactContext, mPlatform),
                new VRTSceneManagerImpl(reactContext),
                new VRT3DSceneNavigatorManager(reactContext, mPlatform),
                new VRTBoxManager(reactContext),
                new VRTGeometryManager(reactContext),
                new VRTVideoSurfaceManager(reactContext),
                new VRT360VideoManager(reactContext),
                new VRTNodeManagerImpl(reactContext),
                new VRTCameraManager(reactContext),
                new VRTOrbitCameraManager(reactContext),
                new VRTSphereManager(reactContext),
                new VRTImageManager(reactContext),
                new VRT360ImageManager(reactContext),
                new VRTSkyBoxManager(reactContext),
                new VRTFlexViewManager(reactContext),
                new VRTAnimatedComponentManager(reactContext),
                new VRTQuadManager(reactContext),
                new VRTAnimatedImageManager(reactContext),
                new VRTPolygonManager(reactContext),
                new VRTFlexViewManager(reactContext),
                new VRTDirectionalLightManager(reactContext),
                new VRTAmbientLightManager(reactContext),
                new VRTSpotLightManager(reactContext),
                new VRTOmniLightManager(reactContext),
                new VRTSoundManager(reactContext),
                new VRTSoundFieldManager(reactContext),
                new VRTSpatialSoundManager(reactContext),
                new VRTOmniLightManager(reactContext),
                new VRTTextManager(reactContext),
                new VRT3DObjectManager(reactContext),
                new VRTControllerManager(reactContext),
                new VRTPolylineManager(reactContext),
                new VRTParticleEmitterManager(reactContext),
                new VRTPortalSceneManager(reactContext),
                new VRTPortalManager(reactContext),
                new VRTLightingEnvironmentManager(reactContext),
                new VRTMaterialVideoManager(reactContext),
                // AR Components
                new VRTARSceneNavigatorManager(reactContext),
                new VRTARSceneManager(reactContext),
                new VRTARPlaneManager(reactContext),
                new VRTARImageMarkerManager(reactContext),
                new VRTARObjectMarkerManager(reactContext)
        );
    }
}
