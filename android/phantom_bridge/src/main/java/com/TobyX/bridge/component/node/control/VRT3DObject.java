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

package com.TobyX.bridge.component.node.control;

import android.net.Uri;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.TobyX.core.AsyncObject3DListener;
import com.TobyX.core.PhantomContext;
import com.TobyX.core.internal.ExecutableAnimation;
import com.TobyX.core.Material;
import com.TobyX.core.Node;
import com.TobyX.core.Object3D;
import com.TobyX.bridge.utility.PhantomEvents;
import com.TobyX.bridge.utility.Helper;
import com.TobyX.bridge.utility.PhantomLog;

import java.lang.ref.WeakReference;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import android.util.Log;
import android.util.Pair;

public class VRT3DObject extends VRTControl {
    private static final String TAG = PhantomLog.getTag(VRT3DObject.class);

    private static class Object3dAnimation extends NodeAnimation {
        private WeakReference<Node> mNodeWeak;

        public Object3dAnimation(ReactContext context, VRT3DObject parent) {
           super(context, parent);
            mNodeWeak =  new WeakReference<Node>(parent.getNodeJni());
        }

        @Override
        public ExecutableAnimation loadAnimation() {
            Set<String> animationKeys = null;
            if (mNodeWeak.get() != null) {
                animationKeys =  mNodeWeak.get().getAnimationKeys();
            }

            if (mNodeWeak == null || animationKeys.isEmpty()) {
                return super.loadAnimation();
            }

            if (mAnimationName != null) {
                if (animationKeys.contains(mAnimationName) && mNodeWeak.get() != null) {
                    return new ExecutableAnimation(mNodeWeak.get(), mAnimationName);
                }
                else {
                    return super.loadAnimation();
                }
            }
            else {
                return super.loadAnimation();
            }
        }
    }

    private Uri mSource;
    private List<Pair<String, Float>> mMorphTargets;
    private List<String> mResources = null;
    protected boolean mObjLoaded = false;
    private boolean mSourceChanged = false;
    private Object3D.Type mType;

    public VRT3DObject(ReactContext reactContext) {
        super(reactContext);
        mNodeAnimation = new Object3dAnimation(reactContext, this);
        mNodeAnimation.setNode(this);
    }

    @Override
    protected Node createNodeJni() {
        return new Object3D();
    }

    @Override
    public void onTearDown() {
        if (isTornDown()) {
            return;
        }
        super.onTearDown();
    }

    private Object3D getObject3D() {
        return (Object3D) getNodeJni();
    }

    public void setType(String type) {
        if (type == null || type.isEmpty()) {
            throw new IllegalArgumentException("Missing required prop [type] for Object3D");
        }

        mType = Object3D.Type.fromString(type);
    }

    public void setSource(String source) {
        if (source == null || source.trim().isEmpty()) {
            throw new IllegalArgumentException("source is a required prop for Object3D");
        }
        mSource = Helper.parseUri(source, mReactContext);
        mSourceChanged = true;
    }

    public void setAnimation(ReadableMap animation) {
        super.setAnimation(animation);
        updateAnimation();
    }

    public void setResources(List<String> resources) {
        mResources = resources;
    }

    public void setMorphTargets(List<Pair<String, Float>> targets) {
        mMorphTargets = targets;
        if (!mObjLoaded || mMorphTargets == null) {
            return;
        }

        Object3D model = getObject3D();
        Set<String> keys = model.getMorphTargetKeys();
        for (Pair<String, Float> target : targets) {
            if (!keys.contains(target.first)) {
                PhantomLog.warn(TAG, "Unknown MorphTarget: " + target.first + "found!");
                continue;
            }

            model.setMorphTargetWeight(target.first, target.second);
        }
    }

    @Override
    public void setMaterials(List<Material> materials) {
        if (mObjLoaded) {
            super.setMaterials(materials);
        }
        mMaterials = materials;
    }

    @Override
    public void setContext(PhantomContext context) {
        super.setContext(context);
        onPropsSet();
    }

    @Override
    protected void onPropsSet() {
        if (mContext == null || mSource == null || !mSourceChanged) {
            return;
        }

        if (mType == null) {
            throw new IllegalStateException("`type` property not set on Object3D.");
        }

        super.onPropsSet();

        Node nodeJni = getNodeJni();
        if (nodeJni != null && !isTornDown()){
            nodeJni.removeAllChildNodes();
        }

        loadDidStart();

        final WeakReference<VRT3DObject> weakVRTRef = new WeakReference<VRT3DObject>(this);
        AsyncObject3DListener listener = new AsyncObject3DListener() {
            @Override
            public void onObject3DLoaded(Object3D object, Object3D.Type type) {
                if (isTornDown()) {
                    return;
                }

                VRT3DObject vrt3DObject = weakVRTRef.get();
                if (vrt3DObject  == null) {
                    return;
                }

                vrt3DObject.mObjLoaded = true;
                if (mMaterials != null) {
                    // set materials on the node after it's finished loading
                    setMaterials(mMaterials);
                }

                // Set the bitmasks recursively now that the tree is loaded
                object.setLightReceivingBitMask(mLightReceivingBitMask);
                object.setShadowCastingBitMask(mShadowCastingBitMask);
                object.setIgnoreEventHandling(mIgnoreEventHandling);

                vrt3DObject.setMorphTargets(mMorphTargets);
                vrt3DObject.updateAnimation();
                vrt3DObject.loadDidEnd();
            }

            @Override
            public void onObject3DFailed(String error) {
                if (isTornDown()) {
                    return;
                }
                VRT3DObject vrt3dObject = weakVRTRef.get();
                if (vrt3dObject != null) {
                    onError(error);
                }
            }
        };

        // if the source is from resources, then pass in the resources it depends on (if any)
        String scheme = mSource.getScheme();
        if (scheme != null && scheme.equals("res")) {
            Map<String, String> resourceMap = null;
            if (mResources != null) {
                resourceMap = new HashMap<>();
                for (String resource : mResources) {
                    Uri uri = Helper.parseUri(resource, getContext());
                    resourceMap.put(resource, uri.toString());
                }
            }

            // When in release mode, the objects are packaged as resources so we use the
            // resource constructor
            getObject3D().loadModel(mContext, mSource.toString(), mType, listener, resourceMap);
        } else {
            // When in debug mode (not release), the objects are loaded as URLs so we use
            // the URL constructor
            getObject3D().loadModel(mContext, mSource, mType, listener);
        }
        mSourceChanged = false;
    }

    private void loadDidStart() {
        mReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                PhantomEvents.ON_LOAD_START,
                null
        );
    }

    public void loadDidEnd() {
        mReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                PhantomEvents.ON_LOAD_END,
                null
        );
    }

    public void updateAnimation() {
        /*
         If no animation name was specified, then use the first keyframe animation,
         if available.
        */
        if (mNodeAnimation.getAnimationName() == null || mNodeAnimation.getAnimationName().length() == 0) {
            Set<String> animationKeys = getNodeJni().getAnimationKeys();
            if (!animationKeys.isEmpty()) {
                mNodeAnimation.setAnimationName(animationKeys.iterator().next());
            }
        }

        mNodeAnimation.updateAnimation();
    }

}
