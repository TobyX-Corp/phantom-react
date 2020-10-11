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

package com.TobyX.bridge.utility;

/**
 * This class contains all the event callbacks that we have. If the names conflict
 * with React Native, it gives us an error, but it's apparently fine if our native
 * components share event names.
 */
public class PhantomEvents {
    public static final String ON_LOAD_START = "onLoadStart";
    public static final String ON_LOAD_END = "onLoadEnd";
    public static final String ON_ERROR = "onError";
    public static final String ON_UPDATE_TIME = "onUpdateTime";
    public static final String ON_START = "onStart";
    public static final String ON_FINISH = "onFinish";
    public static final String ON_ANIMATION_START = "onAnimationStart";
    public static final String ON_ANIMATION_FINISH = "onAnimationFinish";
    public static final String ON_HOVER = "onHover";
    public static final String ON_CLICK = "onClick";
    public static final String ON_TOUCH = "onTouch";
    public static final String ON_SWIPE = "onSwipe";
    public static final String ON_SCROLL = "onScroll";
    public static final String ON_DRAG = "onDrag";
    public static final String ON_PLATFORM_UPDATE = "onPlatformUpdate";
    public static final String ON_CONTROLLER_STATUS = "onControllerStatus";
    public static final String ON_EXIT_PHANTOM = "onExit";
    public static final String ON_FUSE = "onFuse";
    public static final String ON_PINCH = "onPinch";
    public static final String ON_ROTATE = "onRotate";
    public static final String ON_BUFFER_START = "onBufferStart";
    public static final String ON_BUFFER_END = "onBufferEnd";
    public static final String ON_COLLIDED = "onCollision";
    public static final String ON_TRANSFORM_DELEGATE = "onNativeTransformDelegate";
    public static final String ON_TRACKING_UPDATED = "onTrackingUpdated";
    public static final String ON_AMBIENT_LIGHT_UPDATE = "onAmbientLightUpdate";
    public static final String ON_ANCHOR_FOUND = "onAnchorFound";
    public static final String ON_ANCHOR_UPDATED = "onAnchorUpdated";
    public static final String ON_ANCHOR_REMOVED = "onAnchorRemoved";
    public static final String ON_PORTAL_ENTER = "onPortalEnter";
    public static final String ON_PORTAL_EXIT = "onPortalExit";
    public static final String ON_CAMERA_AR_HIT_TEST_PHANTOM = "onCameraARHitTest";
    public static final String ON_AR_POINT_CLOUD_UPDATE = "onARPointCloudUpdate";
    public static final String ON_CAMERA_TRANSFORM_UPDATE = "onCameraTransformUpdate";

}
