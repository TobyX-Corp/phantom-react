//
//  VRTImageManager.mm
//  React
//
//  Created by Vik Advani on 3/4/16.
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

#import "VRTImageManager.h"
#import "VRTUIImageWrapper.h"
#import "VRTImage.h"

@implementation VRTImageManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(transformBehaviors, NSArray<NSString *>)
RCT_EXPORT_VIEW_PROPERTY(highAccuracyEvents, BOOL)
RCT_EXPORT_VIEW_PROPERTY(position, NSNumberArray)
RCT_EXPORT_VIEW_PROPERTY(width, float)
RCT_EXPORT_VIEW_PROPERTY(height, float)
RCT_EXPORT_VIEW_PROPERTY(rotation, NSNumberArray)
RCT_EXPORT_VIEW_PROPERTY(scale, NSNumberArray)
RCT_EXPORT_VIEW_PROPERTY(rotationPivot, NSNumberArray)
RCT_EXPORT_VIEW_PROPERTY(scalePivot, NSNumberArray)
RCT_EXPORT_VIEW_PROPERTY(stereoMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(materials, NSArray<NSString *>)
RCT_EXPORT_VIEW_PROPERTY(animation, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onAnimationStartPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAnimationFinishPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(resizeMode, VROImageResizeMode)
RCT_EXPORT_VIEW_PROPERTY(imageClipMode, VROImageClipMode)
RCT_EXPORT_VIEW_PROPERTY(onHoverPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClickPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFusePhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDragPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(timeToFuse, float)
RCT_EXPORT_VIEW_PROPERTY(canHover, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canClick, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canFuse, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canDrag, BOOL)
RCT_EXPORT_VIEW_PROPERTY(renderingOrder, int)
RCT_EXPORT_VIEW_PROPERTY(visible, BOOL)
RCT_EXPORT_VIEW_PROPERTY(opacity, float)
RCT_EXPORT_VIEW_PROPERTY(onPinchPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRotatePhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(canPinch, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canRotate, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onLoadStartPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLoadEndPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onErrorPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(source, RCTImageSource)
RCT_EXPORT_VIEW_PROPERTY(placeholderSource, VRTUIImageWrapper)
RCT_EXPORT_VIEW_PROPERTY(mipmap, BOOL)
RCT_EXPORT_VIEW_PROPERTY(format, VROTextureInternalFormat)
RCT_EXPORT_VIEW_PROPERTY(physicsBody, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onCollisionPhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(canCollide, BOOL)
RCT_EXPORT_VIEW_PROPERTY(Tag, NSString)
RCT_EXPORT_VIEW_PROPERTY(onNativeTransformDelegatePhantom, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(hasTransformDelegate, BOOL)
RCT_EXPORT_VIEW_PROPERTY(lightReceivingBitMask, int)
RCT_EXPORT_VIEW_PROPERTY(shadowCastingBitMask, int)
RCT_EXPORT_VIEW_PROPERTY(ignoreEventHandling, BOOL)
RCT_EXPORT_VIEW_PROPERTY(dragType, NSString)
RCT_EXPORT_VIEW_PROPERTY(dragPlane, NSDictionary)
- (VRTImage *)view
{
    return [[VRTImage alloc] initWithBridge:self.bridge];
}

@end
