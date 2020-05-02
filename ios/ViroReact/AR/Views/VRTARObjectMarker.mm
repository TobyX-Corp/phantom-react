//
//  VRTARObjectMarker.m
//  ViroReact
//
//  Created by Andy Chu on 8/10/18.
//  Copyright © 2018 Viro Media. All rights reserved.
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

#import "VRTARObjectMarker.h"
#import "VRTARTrackingTargetsModule.h"

@implementation VRTARObjectMarker {
    /*
     Whether or not we need to update the underlying VRONode.
     */
    bool _shouldUpdate;

    /*
     True if we should add the VRONode to the declarativeSession on the next component update. Otherwise,
     we'll just call update.
     */
    bool _needsAddToScene;
}

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    self = [super initWithBridge:bridge];
    if (self) {
        _arNodeDelegate = std::make_shared<VROARNodeDelegateiOS>(self);
        _shouldUpdate = false;
        _needsAddToScene = true;
        
        std::shared_ptr<VROARDeclarativeObjectNode> objectNode = std::dynamic_pointer_cast<VROARDeclarativeObjectNode>([self node]);
        objectNode->setARNodeDelegate(_arNodeDelegate);
    }
    return self;
}

- (std::shared_ptr<VROARDeclarativeSession>)declarativeSession {
    return std::dynamic_pointer_cast<VROARScene>([self scene])->getDeclarativeSession();
}

- (void)setTarget:(NSString *)target {
    _target = target;
    _shouldUpdate = true;
}

- (void)parentDidDisappear {
    if ([self scene]) {
        [self declarativeSession]->removeARNode(std::dynamic_pointer_cast<VROARDeclarativeObjectNode>(self.node));
    }
    [super parentDidDisappear];
}

- (void)setScene:(std::shared_ptr<VROScene>)scene {
    [super setScene:scene];
    
    // If the scene is finally set, then just invoke didSetProps again to fetch the target
    // and add the VROARDeclarativeObjectNode to the VROARScene.
    [self didSetProps:nil];
}

- (void)didSetProps:(NSArray<NSString *> *)changedProps {
    if ([self scene] && _shouldUpdate) {
        [self getARTargetShouldAdd:_needsAddToScene];
        _shouldUpdate = false;
        _needsAddToScene = false; // we should only add on the first invocation of getARTargetShouldAdd, otherwise, just update.
    }
}

- (void)getARTargetShouldAdd:(BOOL)needsAddToScene {
    VRTARTrackingTargetsModule *trackingTargetsModule = [self.bridge moduleForClass:[VRTARTrackingTargetsModule class]];
    VRTARObjectTargetPromise *promise = [trackingTargetsModule getARObjectTargetPromise:_target];
    if (promise) {
        __weak VRTARObjectMarker *weakSelf = self;
        VRTARObjectTargetPromiseCompletion completion = ^(NSString *targetName, std::shared_ptr<VROARObjectTarget> target) {
            // the callback should be posted on the main thread.
            dispatch_async(dispatch_get_main_queue(), ^{
                __strong VRTARObjectMarker *strongSelf = weakSelf;
                // make sure the VRTARObjectMarker is still around and the target hasn't changed since we created the block.
                if (strongSelf && [targetName isEqualToString:strongSelf.target] && target) {
                    std::shared_ptr<VROARDeclarativeObjectNode> objNode = std::dynamic_pointer_cast<VROARDeclarativeObjectNode>(strongSelf.node);
                    std::shared_ptr<VROARObjectTarget> oldTarget = objNode->getObjectTarget();
                    objNode->setObjectTarget(target);
                    std::shared_ptr<VROARScene> arScene = std::dynamic_pointer_cast<VROARScene>(strongSelf.scene);
                    if (arScene) {
                        if (needsAddToScene) {
                            // add the ARNode
                            [strongSelf declarativeSession]->addARNode(objNode);
                        } else {
                            // remove the old ARObjectTarget and update the ARNode
                            [strongSelf declarativeSession]->removeARObjectTarget(oldTarget);
                            [strongSelf declarativeSession]->updateARNode(objNode);
                        }
                        // always add the new ARObjectTarget
                        [strongSelf declarativeSession]->addARObjectTarget(target);
                    }
                }
            });
        };
        [promise wait:completion];
    } else {
        RCTLogError(@"[ViroARObjectMarker] Unable to find object target with name [%@]. Have you created it?", _target);
    }
}


- (std::shared_ptr<VRONode>)createVroNode {
    return std::make_shared<VROARDeclarativeObjectNode>();
}

@end
