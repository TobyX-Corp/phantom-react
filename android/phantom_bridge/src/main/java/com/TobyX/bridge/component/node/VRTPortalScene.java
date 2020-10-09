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

package com.TobyX.bridge.component.node;

import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.TobyX.core.Node;
import com.TobyX.core.Portal;
import com.TobyX.core.PortalScene;
import com.TobyX.bridge.utility.PhantomEvents;

import java.lang.ref.WeakReference;

public class VRTPortalScene extends VRTNode  {
    private PortalScene mPortalScene;
    private static class PortalDelegate implements PortalScene.EntryListener  {

        private WeakReference<VRTPortalScene> mPortalScene;

        public PortalDelegate(VRTPortalScene portalScene) {
            mPortalScene = new WeakReference<VRTPortalScene>(portalScene);
        }
        @Override
        public void onPortalEnter(PortalScene portal) {
            VRTPortalScene portalScene = mPortalScene.get();
            if (portalScene == null || portalScene.isTornDown()) {
                return;
            }
            portalScene.onPortalEnter();
        }

        @Override
        public void onPortalExit(PortalScene portal) {
            VRTPortalScene portalScene = mPortalScene.get();
            if (portalScene == null || portalScene.isTornDown()) {
                return;
            }
            portalScene.onPortalExit();
        }
    }

    protected Node createNodeJni() {
        mPortalScene = new PortalScene();
        mPortalScene.setEntryListener(new PortalDelegate(this));
        return mPortalScene;
    }

    @Override
    public void addView(View child, int index) {
             if(child instanceof VRTPortal) {
                 VRTPortal portal = (VRTPortal)child;
                 mPortalScene.setPortalEntrance((Portal)portal.getNodeJni());
             }
        super.addView(child, index);
    }

    public void setPassable(boolean passable) {
        mPortalScene.setPassable(passable);
    }

    private void onPortalExit() {
        mReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                PhantomEvents.ON_PORTAL_EXIT,
                null);
    }

    private void onPortalEnter() {
        mReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                PhantomEvents.ON_PORTAL_ENTER,
                null);
    }

    public VRTPortalScene(ReactContext context) {
        super(context);
    }


}
