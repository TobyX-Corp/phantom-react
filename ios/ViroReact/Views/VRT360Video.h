//
//  VRT360Video.h
//  React
//
//  Created by Vik Advani on 1/28/16.
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
#import "VRTControl.h"

@interface VRT360Video : VRTControl <VROVideoDelegate>

@property (nonatomic, copy) NSDictionary *source;
@property (nonatomic, assign) BOOL paused;
@property (nonatomic, assign) BOOL loop;
@property (nonatomic, assign) BOOL muted;
@property (nonatomic, assign) float volume;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onBufferStartPhantom;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onBufferEndPhantom;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onFinishPhantom;
@property (nonatomic, copy, nullable) RCTDirectEventBlock onUpdateTimePhantom;
@property (nonatomic, copy) RCTDirectEventBlock onErrorPhantom;
@property (nonatomic, copy, nullable) NSString *stereoMode;

- (instancetype)initWithBridge:(RCTBridge *)bridge;
- (void)seekToTime:(float)time;

@end
