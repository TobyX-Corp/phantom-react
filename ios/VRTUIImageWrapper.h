//
//  VRTUIImageWrapper.h
//  PhantomReact
//
//  Created by Vik Advani on 3/20/17.
//  Copyright © 2020 TobyX Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTConvert.h>

@interface VRTUIImageWrapper : NSObject
  @property (nonatomic, copy) UIImage *image;
@end

@interface RCTConvert (VRTUIImageWrapper)
  + (VRTUIImageWrapper *)VRTUIImageWrapper:(id)json;
@end


