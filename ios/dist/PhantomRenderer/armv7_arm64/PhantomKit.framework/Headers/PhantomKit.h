//
//  PhantomKit.h
//  PhantomKit
//
//  Created by Raj Advani on 12/9/15.
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

#import <UIKit/UIKit.h>

//! Project version number for PhantomKit.
FOUNDATION_EXPORT double PhantomKitVersionNumber;

//! Project version string for PhantomKit.
FOUNDATION_EXPORT const unsigned char PhantomKitVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <PhantomKit/PublicHeader.h>

#import <PhantomKit/VRODefines.h>
#import <PhantomKit/VROOpenGL.h>
#import <PhantomKit/VROSceneController.h>
#import <PhantomKit/VROView.h>
#import <PhantomKit/VROViewMetal.h>
#import <PhantomKit/VROViewScene.h>
#import <PhantomKit/VRORendererConfiguration.h>
#import <PhantomKit/VRORenderDelegate.h>
#import <PhantomKit/VRORenderContext.h>
#import <PhantomKit/VRODriver.h>
#import <PhantomKit/VRORenderParameters.h>
#import <PhantomKit/VROFrameListener.h>
#import <PhantomKit/VROFrameTimer.h>
#import <PhantomKit/VROFrameScheduler.h>
#import <PhantomKit/VROFrameSynchronizer.h>

// Model Loader
#import <PhantomKit/VROOBJLoader.h>
#import <PhantomKit/VROFBXLoader.h>
#import <PhantomKit/VROGLTFLoader.h>
#import <PhantomKit/VROHDRLoader.h>

// Core Scene Graph
#import <PhantomKit/VROScene.h>
#import <PhantomKit/VROSceneDelegateiOS.h>
#import <PhantomKit/VROCamera.h>
#import <PhantomKit/VRONodeCamera.h>
#import <PhantomKit/VROEventDelegateiOS.h>
#import <PhantomKit/VRONode.h>
#import <PhantomKit/VROPortal.h>
#import <PhantomKit/VROPortalFrame.h>
#import <PhantomKit/VROPortalDelegateiOS.h>
#import <PhantomKit/VROGeometry.h>
#import <PhantomKit/VROGeometryElement.h>
#import <PhantomKit/VROGeometrySource.h>
#import <PhantomKit/VROMaterial.h>
#import <PhantomKit/VROMaterialVisual.h>
#import <PhantomKit/VROAnimatedTextureOpenGL.h>
#import <PhantomKit/VROTexture.h>
#import <PhantomKit/VROLight.h>
#import <PhantomKit/VROImage.h>
#import <PhantomKit/VROImageiOS.h>
#import <PhantomKit/VROShaderModifier.h>
#import <PhantomKit/VROShaderProgram.h>
#import <PhantomKit/VROTransaction.h>
#import <PhantomKit/VROHitTestResult.h>
#import <PhantomKit/VROConstraint.h>
#import <PhantomKit/VROBillboardConstraint.h>
#import <PhantomKit/VROTransformConstraint.h>
#import <PhantomKit/VROTransformDelegate.h>
#import <PhantomKit/VROTransformDelegateiOS.h>
#import <PhantomKit/VROTree.h>
#import <PhantomKit/VROParticleEmitter.h>
#import <PhantomKit/VROParticle.h>
#import <PhantomKit/VROParticleModifier.h>

// PostProcess
#import <PhantomKit/VROChoreographer.h>
#import <PhantomKit/VRORenderPass.h>
#import <PhantomKit/VROGaussianBlurRenderPass.h>

// Animation
#import <PhantomKit/VROAnimation.h>
#import <PhantomKit/VROAnimatable.h>
#import <PhantomKit/VROPropertyAnimation.h>
#import <PhantomKit/VROMaterialAnimation.h>
#import <PhantomKit/VROExecutableAnimation.h>
#import <PhantomKit/VROAnimationGroup.h>
#import <PhantomKit/VROAnimationChain.h>
#import <PhantomKit/VROTimingFunction.h>
#import <PhantomKit/VROTimingFunctionBounce.h>
#import <PhantomKit/VROTimingFunctionCubicBezier.h>
#import <PhantomKit/VROTimingFunctionEaseInEaseOut.h>
#import <PhantomKit/VROTimingFunctionEaseIn.h>
#import <PhantomKit/VROTimingFunctionEaseOut.h>
#import <PhantomKit/VROTimingFunctionLinear.h>
#import <PhantomKit/VROTimingFunctionPowerDeceleration.h>
#import <PhantomKit/VROAction.h>
#import <PhantomKit/VROLazyMaterial.h>
#import <PhantomKit/VROMorpher.h>

// UI
#import <PhantomKit/VROReticle.h>
#import <PhantomKit/VROText.h>
#import <PhantomKit/VROTypeface.h>
#import <PhantomKit/VROTypefaceCollection.h>

// Video
#import <PhantomKit/VROVideoSurface.h>
#import <PhantomKit/VROVideoTexture.h>
#import <PhantomKit/VROVideoTextureiOS.h>
#import <PhantomKit/VROVideoDelegateiOS.h>
#import <PhantomKit/VROCameraTexture.h>
#import <PhantomKit/VROCameraTextureiOS.h>

// Audio
#import <PhantomKit/VROAudioPlayer.h>
#import <PhantomKit/VROAudioPlayeriOS.h>
#import <PhantomKit/VROSound.h>
#import <PhantomKit/VROSoundGVR.h>
#import <PhantomKit/VROSoundData.h>
#import <PhantomKit/VROSoundDataGVR.h>
#import <PhantomKit/VROSoundDataDelegate.h>
#import <PhantomKit/VROSoundDelegate.h>
#import <PhantomKit/VROSoundDelegateiOS.h>

// Math
#import <PhantomKit/VROQuaternion.h>
#import <PhantomKit/VROPlane.h>
#import <PhantomKit/VROFrustum.h>
#import <PhantomKit/VROFrustumPlane.h>
#import <PhantomKit/VROFrustumBoxIntersectionMetadata.h>
#import <PhantomKit/VROBoundingBox.h>
#import <PhantomKit/VROVector3f.h>
#import <PhantomKit/VROVector4f.h>
#import <PhantomKit/VROMatrix4f.h>
#import <PhantomKit/VROMath.h>
#import <PhantomKit/VROTriangle.h>

// Shapes
#import <PhantomKit/VROBox.h>
#import <PhantomKit/VROSphere.h>
#import <PhantomKit/VROSurface.h>
#import <PhantomKit/VROPolygon.h>
#import <PhantomKit/VROPolyline.h>
#import <PhantomKit/VROTorusKnot.h>
#import <PhantomKit/VROShapeUtils.h>

// Controller
#import <PhantomKit/VROInputControllerBase.h>
#import <PhantomKit/VROInputControllerCardboardiOS.h>
#import <PhantomKit/VROInputPresenterCardboardiOS.h>
#import <PhantomKit/VROBodyTrackerController.h>

// Util
#import <PhantomKit/VROTime.h>
#import <PhantomKit/VROLog.h>
#import <PhantomKit/VROByteBuffer.h>
#import <PhantomKit/VROImageUtil.h>
#import <PhantomKit/VROData.h>
#import <PhantomKit/VROGeometryUtil.h>
#import <PhantomKit/VROTextureUtil.h>
#import <PhantomKit/VROTaskQueue.h>
#import <PhantomKit/VRODeviceUtil.h>

// Physics
#import <PhantomKit/VROPhysicsShape.h>
#import <PhantomKit/VROPhysicsBody.h>
#import <PhantomKit/VROPhysicsWorld.h>
#import <PhantomKit/VROPhysicsBodyDelegate.h>
#import <PhantomKit/VROPhysicsBodyDelegateiOS.h>

// AR
#import <PhantomKit/VROViewAR.h>
#import <PhantomKit/VROARSession.h>
#import <PhantomKit/VROARSessioniOS.h>
#import <PhantomKit/VROARFrame.h>
#import <PhantomKit/VROARFrameiOS.h>
#import <PhantomKit/VROARFrameInertial.h>
#import <PhantomKit/VROARCamera.h>
#import <PhantomKit/VROARAnchor.h>
#import <PhantomKit/VROARPlaneAnchor.h>
#import <PhantomKit/VROARHitTestResult.h>
#import <PhantomKit/VROARScene.h>
#import <PhantomKit/VROARSceneController.h>
#import <PhantomKit/VROARDeclarativeImageNode.h>
#import <PhantomKit/VROARDeclarativeObjectNode.h>
#import <PhantomKit/VROARDeclarativePlane.h>
#import <PhantomKit/VROARDeclarativeNode.h>
#import <PhantomKit/VROARNodeDelegateiOS.h>
#import <PhantomKit/VROARSceneDelegateiOS.h>
#import <PhantomKit/VROARShadow.h>
#import <PhantomKit/VROARDeclarativeSession.h>
#import <PhantomKit/VROARImageTarget.h>
#import <PhantomKit/VROARImageTargetiOS.h>
#import <PhantomKit/VROARObjectTarget.h>
#import <PhantomKit/VROARObjectTargetiOS.h>

// Test
#import <PhantomKit/VRORendererTest.h>
#import <PhantomKit/VRORendererTestHarness.h>

// Body Tracking
#import <PhantomKit/VROBodyPlayeriOS.h>
#import <PhantomKit/VROBodyTrackeriOS.h>
#import <PhantomKit/VROBodyTrackerYolo.h>
#import <PhantomKit/VROBodyAnimData.h>
#import <PhantomKit/VROPoseFilter.h>
#import <PhantomKit/VROPoseFilterEuro.h>

// OpenCV
//#import <PhantomKit/VROOpenCV.h>


