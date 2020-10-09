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

import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.TobyX.core.internal.BaseSound;
import com.TobyX.core.Node;
import com.TobyX.core.Sound;
import com.TobyX.core.SoundData;
import com.TobyX.core.SpatialSound;
import com.TobyX.core.Vector;
import com.TobyX.bridge.utility.PhantomEvents;

public class VRTSpatialSound extends VRTBaseSound implements SpatialSound.PlaybackListener {

    private static String DEFAULT_ROLLOFF_MODEL = "None";
    private static float[] DEFAULT_POSITION = {0f,0f,0f};

    private final Node mParentNode;

    protected float[] mPosition = DEFAULT_POSITION;
    protected String mRolloffModel = DEFAULT_ROLLOFF_MODEL;
    protected float mMinDistance = 0f;
    protected float mMaxDistance = 10f;

    public VRTSpatialSound(ReactContext reactContext, Node parentNode) {
        super(reactContext);
        mParentNode = parentNode;
    }

    public void setPosition(float[] position) {
        mPosition = position == null ? DEFAULT_POSITION : position;
    }

    public void setRolloffModel(String rolloffModel) {
        mRolloffModel = rolloffModel == null ? DEFAULT_ROLLOFF_MODEL : rolloffModel ;
    }

    public void setMinDistance(float minDistance) {
        mMinDistance = minDistance;
    }

    public void setMaxDistance(float maxDistance) {
        mMaxDistance = maxDistance;
    }

    @Override
    protected void setNativeProps() {
        super.setNativeProps();
        if (mNativeSound == null) {
            return;
        }

        ((SpatialSound) mNativeSound).setPosition(new Vector(mPosition));
        ((SpatialSound) mNativeSound).setDistanceRolloff(SpatialSound.Rolloff.valueFromString(mRolloffModel), mMinDistance, mMaxDistance);
    }

    @Override
    protected void resetSound() {
        // only set the node if we have to reset the sound (recreate it)
        boolean shouldSetNode = mShouldResetSound;
        super.resetSound();
        if (mNativeSound != null && shouldSetNode) {
            mParentNode.addSound((SpatialSound) mNativeSound);
        }
    }

    @Override
    protected BaseSound getNativeSound(String path) {
        SpatialSound sound = new SpatialSound(mContext, Uri.parse(path), this);
        sound.setPlaybackListener(this);
        return sound;
    }

    @Override
    protected BaseSound getNativeSound(SoundData data) {
        SpatialSound sound = new SpatialSound(data, mContext, this);
        sound.setPlaybackListener(this);
        return sound;
    }

    @Override
    public void onSoundReady(SpatialSound sound) {
        mReady = true;
        if (mNativeSound != null && !mPaused) {
            mNativeSound.play();
        }
    }

    public void onSoundFail(String error) {
        onError(error);
    }
}
