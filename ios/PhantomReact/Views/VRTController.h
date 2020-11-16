//
//  VRTController.h
//  React
//
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

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import "VRTView.h"


@interface VRTController : VRTView<VROEventDelegateProtocol>

@property (nonatomic, copy, nullable) RCTDirectEventBlock onClickPhantom;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onFusePhantom;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onRotatePhantom;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onPinchPhantom;

@property (nonatomic, assign) BOOL canClick;
@property (nonatomic, assign) BOOL canFuse;
@property (nonatomic, assign) BOOL canRotate;
@property (nonatomic, assign) BOOL canPinch;

- (instancetype) initWithBridge:(RCTBridge *)bridge;
- (void) onClick:(int)source node:(std::shared_ptr<VRONode>)node clickState:(VROEventDelegate::ClickState)clickState;
- (NSArray<NSNumber *> *) getControllerForwardVector;

@end