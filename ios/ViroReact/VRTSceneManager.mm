//
//  VRTSceneManager.m
//  React
//
//  Created by Vik Advani on 11/3/15.
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
//


#import <React/RCTConvert.h>
#import <React/RCTUIManager.h>
#import <React/RCTBridge.h>

#include "VRTScene.h"
#include "VRTSceneShadowView.h"
#import "VRTSceneManager.h"
#import "VRTCamera.h"

#import <PhantomKit/PhantomKit.h>

@implementation VRTSceneManager {
  
}

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onHoverPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClickPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFusePhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(timeToFuse, float)
RCT_EXPORT_VIEW_PROPERTY(canHover, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canClick, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canFuse, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canDrag, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onPinchPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRotatePhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(canPinch, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canRotate, BOOL)
RCT_EXPORT_VIEW_PROPERTY(soundRoom, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onPlatformUpdatePhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(physicsWorld, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(postProcessEffects, NSArray<NSString *>)
RCT_EXPORT_VIEW_PROPERTY(ignoreEventHandling, BOOL)
RCT_EXPORT_VIEW_PROPERTY(dragType, NSString)
RCT_EXPORT_VIEW_PROPERTY(dragPlane, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(canCameraTransformUpdate, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onCameraTransformUpdatePhantom, RCTDirectEventBlock)

- (VRTView *)view
{
    return [[VRTScene alloc] initWithBridge:self.bridge];
}

- (VRTSceneShadowView *)shadowView
{
    return [VRTSceneShadowView new];
}

@end
