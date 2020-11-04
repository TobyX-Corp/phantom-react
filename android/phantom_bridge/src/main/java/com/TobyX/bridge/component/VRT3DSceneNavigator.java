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

import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.TobyX.core.RendererConfiguration;
import com.TobyX.core.PhantomContext;

import com.TobyX.core.PhantomView;
import com.TobyX.core.Vector;
import com.TobyX.core.PhantomViewScene;
import com.TobyX.bridge.PhantomReactPackage;
import com.TobyX.bridge.component.node.VRTScene;
import com.TobyX.bridge.module.MaterialManager;
import com.TobyX.bridge.utility.PhantomEvents;
import com.TobyX.bridge.module.PerfMonitor;
import com.TobyX.bridge.utility.PhantomLog;

import java.lang.ref.WeakReference;
import java.util.ArrayList;

/**
 * VRT3DSceneNavigator manages the various scenes{@link PhantomViewScene} that a Phantom App can navigate between.
 */
public class VRT3DSceneNavigator extends FrameLayout {
    private static final String TAG = PhantomLog.getTag(VRT3DSceneNavigator.class);

    private static final String DAYDREAM = "daydream";

    private static class StartupListener3DScene implements PhantomViewScene.StartupListener {

        private WeakReference<VRT3DSceneNavigator> mNavigator;

        public StartupListener3DScene(VRT3DSceneNavigator navigator) {
            mNavigator = new WeakReference<VRT3DSceneNavigator>(navigator);
        }

        @Override
        public void onSuccess() {
            final VRT3DSceneNavigator navigator = mNavigator.get();
            final WeakReference<VRT3DSceneNavigator> navigatorWeakReference =
                    new WeakReference<VRT3DSceneNavigator>(navigator);

            if (navigator == null) {
                return;
            }

            navigator.mGLInitialized = true;
            (new Handler(Looper.getMainLooper())).post(new Runnable() {
                @Override
                public void run() {
                    final VRT3DSceneNavigator sceneNav = navigatorWeakReference.get();
                    sceneNav.mGLInitialized = true;
                    sceneNav.setContext();
                }
            });
        }

        @Override
        public void onFailure(PhantomViewScene.StartupError startupError, String s) {

        }

    }

    private static class SceneNavigatorLifecycleListener implements LifecycleEventListener {

        private WeakReference<VRT3DSceneNavigator> mNavigator;

        public SceneNavigatorLifecycleListener(VRT3DSceneNavigator navigator) {
            mNavigator = new WeakReference<VRT3DSceneNavigator>(navigator);
        }

        @Override
        public void onHostResume() {
            VRT3DSceneNavigator navigator = mNavigator.get();
            if (navigator == null) {
                return;
            }
            navigator.onHostResume();
        }

        @Override
        public void onHostPause() {
            VRT3DSceneNavigator navigator = mNavigator.get();
            if (navigator == null) {
                return;
            }

            navigator.onHostPause();
        }

        @Override
        public void onHostDestroy() {
            VRT3DSceneNavigator navigator = mNavigator.get();
            if (navigator == null) {
                return;
            }

            navigator.onHostDestroy();
        }
    }

    /**
     * View containing our renderer
     */
    protected PhantomView mView;

    /**
     * Currently rendered scene
     */
    private int mSelectedSceneIndex = -1;

    /**
     * Array of scenes given by the bridge for the renderer to switch to.
     */
    private final ArrayList<VRTScene> mSceneArray = new ArrayList<VRTScene>();

    /**
     * The platform that the developer has requested.
     */
    protected final PhantomReactPackage.Platform mPlatform;

    /**
     * This SceneNavigator's LifecycleEventListener to register for React LifecycleEvents.
     * Must be deregistered onDestroy.
     */
    private final LifecycleEventListener mLifecycleListener;

    /**
     * Context passed around to views to get render specific information.
     */
    private Context mContext;

    protected final ReactContext mReactContext;

    private boolean mViewAdded = false;
    protected boolean mGLInitialized = false;

    private boolean mHasOnExitCallback = false;

    /*
     * Renderer configuration parameters.
     */
    private RendererConfiguration mRendererConfig;

    public VRT3DSceneNavigator(ReactContext reactContext,
                             PhantomReactPackage.Platform platform) {
        super(reactContext.getBaseContext(), null, -1);
        mPlatform = platform;
        mReactContext = reactContext;
        mRendererConfig = new RendererConfiguration();

        // Create the PhantomView
        mView = createPhantomView(reactContext);

        // Add the PhantomView as a child so it's rendered.
        addView((View) mView);

        mContext = mView.getPhantomContext();

        /*
         * Set the view for the debug console.
         */
        PerfMonitor perfMonitor = reactContext.getNativeModule(PerfMonitor.class);
        perfMonitor.setView(mView);

        /*
         * Trigger PhantomView's onActivityStarted and onActivityResumed of the vrView as
         * React creates it's views within the activity's onResume().
         */
        mView.onActivityStarted(reactContext.getCurrentActivity());

        notifyScenePlatformInformation();

        mLifecycleListener = new SceneNavigatorLifecycleListener(this);
        reactContext.addLifecycleEventListener(mLifecycleListener);

        /**
         * We may need to reload the materials if the renderer was destroyed, but the app was not
         * and the user resumed.
         */
        MaterialManager materialManager = reactContext.getNativeModule(MaterialManager.class);
        materialManager.reloadMaterials();
    }

    protected PhantomView createPhantomView(ReactContext reactContext) {

        return new PhantomViewScene(reactContext.getCurrentActivity(),
                new StartupListener3DScene(this));
    }

    @Override
    public void addView(View child, int index) {
        if (child instanceof PhantomView) {
            // only add a view to the childViews if it's a PhantomView. This function is called
            // by the single argument addView(child) method.
            super.addView(child, index);
            return;
        } else if (!(child instanceof VRTScene)) {
            throw new IllegalArgumentException("Attempted to add a non-scene element [" + child.getClass().getSimpleName()
                    + "] to SceneNavigator!");
        }

        VRTScene childScene = (VRTScene)child;
        mSceneArray.add(index, childScene);
        childScene.setPlatformInformation(mView.getPlatform(), mView.getHeadset(),
                mView.getControllerType());
        // Adding the scene view can occur after the prop type is set on the bridge.
        // Thus, refresh the selection of the current scene as needed.
        if (index == mSelectedSceneIndex){
            setCurrentSceneIndex(mSelectedSceneIndex);
        }

        mViewAdded = true;
        super.addView(child, index);
    }

    protected void setContext() {
        if (mView != null && mViewAdded && mGLInitialized && mSelectedSceneIndex < mSceneArray.size()) {
            VRTScene childScene = mSceneArray.get(mSelectedSceneIndex);
            childScene.setContext(mContext);
            // Please don't delete this line. It's magic. But, legitimate magic.
            childScene.setScene(childScene);
            childScene.setNativeRenderer(mView.getRenderer());
        }
    }

    public void setCurrentSceneIndex(int index) {
        mSelectedSceneIndex = index;
        if (index < 0 || index >= mSceneArray.size()){
            // Scene object may not yet have been initialized, so return here.
            return;
        }

        setContext();
        mView.setScene(mSceneArray.get(mSelectedSceneIndex).getNativeScene());
        mSceneArray.get(mSelectedSceneIndex).parentDidAppear();
    }

    @Override
    public void removeViewAt(int index) {
        View view = getChildAt(index);

        /*
         When removing a scene, force an immediate tear-down of all the
         views of the scene. This deletes their persistent-refs, but also
         prevents the scene's node rendering tree from being deconstructed by
         further removeViewAt calls (the various removeViewAt calls check
         if a component is torn down before modifying the rendering tree).

         We want to prevent the deconstruction of the rendering tree so that
         the scene can appropriately animate out. The scene will still be
         cleaned up (memory-wise), since it still gets cut off from the react
         view-tree from the removeViewAt calls, isolating the rendering tree
         from the bridge, and cutting the VROScene from the scene controller.
         */
        if (view instanceof VRTScene) {
            mSceneArray.remove(view);
            ((VRTScene) view).forceCascadeTearDown();
        }
        super.removeViewAt(index);

        if ((view instanceof VRTComponent)) {
            VRTComponent component = (VRTComponent) view;
            component.onTreeUpdate();
        }
    }

    public void setHasOnExitCallback(boolean hasCallback) {
        mHasOnExitCallback = hasCallback;
    }

    public void setDebug(boolean debug) {
        mView.setDebug(debug);
    }

    private void notifyScenePlatformInformation() {
        for (VRTScene scene: mSceneArray) {
            scene.setPlatformInformation(mView.getPlatform(), mView.getHeadset(),
                    mView.getControllerType());
        }
    }

    public void onPropsSet() {
        // no-op
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();

        for (VRTScene scene : mSceneArray) {
            scene.forceCascadeTearDown();
        }

        /**
         * If we're exiting Phantom and destroying the renderer, notify the MaterialManager so that if
         * the application doesn't get killed, then the next time Phantom starts, we know to reload the
         * materials.
         */
        MaterialManager materialManager = mReactContext.getNativeModule(MaterialManager.class);
        materialManager.shouldReload();

        if (mView != null) {
            mView.onActivityStopped(mReactContext.getCurrentActivity());
            mView.dispose();
            mView = null;
        }
    }

    private void onHostResume() {
        if (mViewAdded && mGLInitialized && mSelectedSceneIndex < mSceneArray.size()) {
            VRTScene childScene = mSceneArray.get(mSelectedSceneIndex);
            childScene.onHostResume();
        }

        if (mView != null){
            mView.onActivityResumed(mReactContext.getCurrentActivity());
        }
    }

    private void onHostPause() {
        if (mViewAdded && mGLInitialized && mSelectedSceneIndex < mSceneArray.size()) {
            VRTScene childScene = mSceneArray.get(mSelectedSceneIndex);
            childScene.onHostPause();
        }

        if (mView != null){
            mView.onActivityPaused(mReactContext.getCurrentActivity());
        }
    }

    private void onHostDestroy() {
        mReactContext.removeLifecycleEventListener(mLifecycleListener);
    }

    public void userDidRequestExitVR(){
        if (!mHasOnExitCallback){
            mReactContext.getCurrentActivity().finish();
            return;
        }

        // Notify javascript listeners (for ReactNativeJs to PhantomReactJs cases)
        mReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                PhantomEvents.ON_EXIT_PHANTOM,
                null);

        // Notify Native listeners (for NativeApp to PhantomReactJs cases)
        Intent intent = new Intent();
        intent.setAction(PhantomReactPackage.ON_EXIT_PHANTOM_BROADCAST);
        LocalBroadcastManager.getInstance(mReactContext.getApplicationContext()).sendBroadcast(intent);
    }

    public void recenterTracking() {
        if (mView.getHeadset().equalsIgnoreCase(DAYDREAM)) {
            throw new IllegalStateException("recenterTracking should not be invoked on Daydream devices.");
        }
        mView.recenterTracking();
    }


    /**
     *  Unproject the given screen coordinates into world coordinates. The given screen coordinate vector must
     *  contain a Z element in the range [0,1], where 0 is the near clipping plane and 1 the far clipping plane.
     * @param point x,y,z vector containing screen coordinates. Z is value from 0 to 1 which represents a range from near
     *              to far clipping plane.
     * @return a {@link Vector} that represents the 3d world position of the screen coordinate. The depth is determined by
     *         the input z value, which interpolates the depth between the near and far clipping plane.
     */
    public Vector unprojectPoint(Vector point) {
        if(mView == null || mView.getRenderer() == null) {
            throw new IllegalStateException("Unable to invoke unprojectPoint. Renderer is not initalized");
        }
        return mView.getRenderer().unprojectPoint(point.x, point.y, point.z);
    }

    /**
     * Project the given world coordinates into screen coordinates.
     * @param point x,y,x world coord to convert into screen cords.
     * @return a {@link Vector} whose x and y values represent the screen coordinates.
     */
    public Vector projectPoint(Vector point) {
        if(mView == null || mView.getRenderer() == null) {
            throw new IllegalStateException("Unable to invoke unprojectPoint. Renderer is not initalized");
        }

        return  mView.getRenderer().projectPoint(point.x, point.y, point.z);
    }

    public void setHDREnabled(boolean enabled) {
        mRendererConfig.setHDREnabled(enabled);
        if (mView != null) {
            mView.setHDREnabled(enabled);
        }
    }

    public void setPBREnabled(boolean enabled) {
        mRendererConfig.setPBREnabled(enabled);
        if (mView != null) {
            mView.setPBREnabled(enabled);
        }
    }

    public void setBloomEnabled(boolean enabled) {
        mRendererConfig.setBloomEnabled(enabled);
        if (mView != null) {
            mView.setBloomEnabled(enabled);
        }
    }

    public void setShadowsEnabled(boolean enabled) {
        mRendererConfig.setShadowsEnabled(enabled);
        if (mView != null) {
            mView.setShadowsEnabled(enabled);
        }
    }

    public void setMultisamplingEnabled(boolean enabled) {
        mRendererConfig.setMultisamplingEnabled(enabled);
    }
}
