//
//  VRTPortal.h
//  PhantomReact
//
//  Created by Raj Advani on 8/6/17.
//  Copyright © 2020 TobyX Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "VRTNode.h"

@interface VRTPortalFrame : VRTNode

- (std::shared_ptr<VROPortalFrame>)portalFrame;

@end
