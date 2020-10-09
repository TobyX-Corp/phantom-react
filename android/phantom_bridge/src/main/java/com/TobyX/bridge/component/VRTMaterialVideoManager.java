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

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.TobyX.bridge.component.node.control.VRTVideoSurface;
import com.TobyX.bridge.utility.PhantomCommands;
import com.TobyX.bridge.utility.PhantomEvents;

import java.util.Map;
import android.util.Log;

/**
 * Created by vadvani on 3/12/18.
 */

public class VRTMaterialVideoManager extends VRTViewGroupManager<VRTMaterialVideo> {

    public VRTMaterialVideoManager(ReactApplicationContext context) {
        super(context);
    }

    @Override
    protected VRTMaterialVideo createViewInstance(ThemedReactContext reactContext) {
        return new VRTMaterialVideo(reactContext);
    }
    @Override
    public String getName() {
        return "VRTMaterialVideo";
    }

    @ReactProp(name = "material")
    public void setMaterial(VRTMaterialVideo view, String material) { view.setMaterial(material);}

    @ReactProp(name = "paused", defaultBoolean = true)
    public void setPaused(VRTMaterialVideo view, boolean paused) {
        view.setPaused(paused);
    }

    @ReactProp(name = "loop", defaultBoolean = false)
    public void setLoop(VRTMaterialVideo view, boolean loop) {
        view.setLoop(loop);
    }

    @ReactProp(name = "muted", defaultBoolean = false)
    public void setMuted(VRTMaterialVideo view, boolean muted) {
        view.setMuted(muted);
    }

    @ReactProp(name = "volume", defaultFloat = 1f)
    public void setVolume(VRTMaterialVideo view, float volume) {
        view.setVolume(volume);
    }


    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                PhantomEvents.ON_BUFFER_START, MapBuilder.of("registrationName", PhantomEvents.ON_BUFFER_START),
                PhantomEvents.ON_BUFFER_END, MapBuilder.of("registrationName", PhantomEvents.ON_BUFFER_END),
                PhantomEvents.ON_FINISH, MapBuilder.of("registrationName", PhantomEvents.ON_FINISH),
                PhantomEvents.ON_UPDATE_TIME, MapBuilder.of("registrationName", PhantomEvents.ON_UPDATE_TIME),
                PhantomEvents.ON_ERROR, MapBuilder.of("registrationName", PhantomEvents.ON_ERROR)
        );
    }

    @Override
    public void receiveCommand(VRTMaterialVideo video, int commandType, @Nullable ReadableArray args) {
        switch (commandType) {
            case PhantomCommands.SEEK_TO_TIME_INDEX:
                video.seekToTime((float) args.getDouble(0));
                break;
            case PhantomCommands.PAUSE_INDEX:
                video.setPaused(true);
                break;
            default:
                throw new IllegalArgumentException("Unsupported command " + commandType
                        + " received by" + getClass().getSimpleName());
        }
    }

    @Override
    public Map<String,Integer> getCommandsMap() {
        return MapBuilder.of(PhantomCommands.SEEK_TO_TIME_NAME, PhantomCommands.SEEK_TO_TIME_INDEX, PhantomCommands.PAUSE, PhantomCommands.PAUSE_INDEX);
    }
}

