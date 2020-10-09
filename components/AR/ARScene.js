/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import { requireNativeComponent, findNodeHandle, View } from 'react-native';
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkMisnamedProps } from '../Utilities/Props';

var NativeModules = require('react-native').NativeModules;
var createReactClass = require('create-react-class');
var Constants = require('../Constants');

var ARScene = createReactClass({
  propTypes: {
    ...View.propTypes,
    displayPointCloud: PropTypes.oneOfType([
      PropTypes.shape({
        imageSource : PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            PropTypes.number
          ]),
        imageScale: PropTypes.arrayOf(PropTypes.number),
        maxPoints : PropTypes.number,
      }),
      PropTypes.bool,
    ]),
    ignoreEventHandling: PropTypes.bool,
    anchorDetectionTypes: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    dragType: PropTypes.oneOf(["FixedDistance", "FixedDistanceOrigin", "FixedToWorld", "FixedToPlane"]),
    dragPlane: PropTypes.shape({
      planePoint : PropTypes.arrayOf(PropTypes.number),
      planeNormal : PropTypes.arrayOf(PropTypes.number),
      maxDistance : PropTypes.number
    }),
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onClickState: PropTypes.func,
    onTouch: PropTypes.func,
    onScroll: PropTypes.func,
    onSwipe: PropTypes.func,
    onDrag: PropTypes.func,
    onPinch: PropTypes.func,
    onRotate: PropTypes.func,
    onCameraARHitTest: PropTypes.func,
    onARPointCloudUpdate: PropTypes.func,
    onCameraTransformUpdate: PropTypes.func,
    onFuse: PropTypes.oneOfType([
      PropTypes.shape({
        callback: PropTypes.func.isRequired,
        timeToFuse: PropTypes.number
      }),
      PropTypes.func
    ]),
    onTrackingUpdated: PropTypes.func,
    onPlatformUpdate: PropTypes.func,
    onAmbientLightUpdate: PropTypes.func,
    onAnchorFound: PropTypes.func,
    onAnchorUpdated: PropTypes.func,
    onAnchorRemoved: PropTypes.func,
    /**
     * Describes the acoustic properties of the room around the user
     */
    soundRoom: PropTypes.shape({
      // The x, y and z dimensions of the room
      size: PropTypes.arrayOf(PropTypes.number).isRequired,
      wallMaterial: PropTypes.string,
      ceilingMaterial: PropTypes.string,
      floorMaterial: PropTypes.string,
    }),
    physicsWorld: PropTypes.shape({
      gravity: PropTypes.arrayOf(PropTypes.number).isRequired,
      drawBounds: PropTypes.bool,
    }),
    postProcessEffects: PropTypes.arrayOf(PropTypes.string),

    /**
     * ##### DEPRECATION WARNING - this prop may be removed in future releases #####
     */
    onTrackingInitialized: PropTypes.func,
  },

  _onHover: function(event: Event) {
    this.props.onHover && this.props.onHover(event.nativeEvent.isHovering, event.nativeEvent.position, event.nativeEvent.source);
  },

  _onClick: function(event: Event) {
    this.props.onClick && this.props.onClick(event.nativeEvent.position, event.nativeEvent.source);
  },

  _onClickState: function(event: Event) {
    this.props.onClickState && this.props.onClickState(event.nativeEvent.clickState, event.nativeEvent.position, event.nativeEvent.source);
    let CLICKED = 3; // Value representation of Clicked ClickState within EventDelegateJni.
    if (event.nativeEvent.clickState == CLICKED){
        this._onClick(event)
    }
  },

  _onTouch: function(event: Event) {
    this.props.onTouch && this.props.onTouch(event.nativeEvent.touchState, event.nativeEvent.touchPos, event.nativeEvent.source);
  },

  _onScroll: function(event: Event) {
    this.props.onScroll && this.props.onScroll(event.nativeEvent.scrollPos, event.nativeEvent.source);
  },

  _onSwipe: function(event: Event) {
    this.props.onSwipe && this.props.onSwipe(event.nativeEvent.swipeState, event.nativeEvent.source);
  },

  _onPinch: function(event: Event) {
    this.props.onPinch && this.props.onPinch(event.nativeEvent.pinchState, event.nativeEvent.scaleFactor, event.nativeEvent.source);
  },

  _onRotate: function(event: Event) {
    this.props.onRotate && this.props.onRotate(event.nativeEvent.rotateState, event.nativeEvent.rotationFactor, event.nativeEvent.source);
  },

  _onCameraARHitTest: function(event: Event) {
    var hitTestEventObj = {
      hitTestResults: event.nativeEvent.hitTestResults,
      cameraOrientation: {
        position: [event.nativeEvent.cameraOrientation[0], event.nativeEvent.cameraOrientation[1], event.nativeEvent.cameraOrientation[2]],
        rotation: [event.nativeEvent.cameraOrientation[3], event.nativeEvent.cameraOrientation[4], event.nativeEvent.cameraOrientation[5]],
        forward: [event.nativeEvent.cameraOrientation[6], event.nativeEvent.cameraOrientation[7], event.nativeEvent.cameraOrientation[8]],
        up: [event.nativeEvent.cameraOrientation[9], event.nativeEvent.cameraOrientation[10], event.nativeEvent.cameraOrientation[11]]
      }
    };
    this.props.onCameraARHitTest && this.props.onCameraARHitTest(hitTestEventObj);
  },

  _onARPointCloudUpdate: function(event: Event) {
    this.props.onARPointCloudUpdate && this.props.onARPointCloudUpdate(event.nativeEvent.pointCloud);
  },

  _onCameraTransformUpdate: function(event: Event) {
    var cameraTransform = {
      // ** DEPRECATION WARNING ** The cameraTransform key will be deprecated in a future release, 
      cameraTransform: {
        position: [event.nativeEvent.cameraTransform[0], event.nativeEvent.cameraTransform[1], event.nativeEvent.cameraTransform[2]],
        rotation: [event.nativeEvent.cameraTransform[3], event.nativeEvent.cameraTransform[4], event.nativeEvent.cameraTransform[5]],
        forward: [event.nativeEvent.cameraTransform[6], event.nativeEvent.cameraTransform[7], event.nativeEvent.cameraTransform[8]],
        up: [event.nativeEvent.cameraTransform[9], event.nativeEvent.cameraTransform[10], event.nativeEvent.cameraTransform[11]]
      },
      position: [event.nativeEvent.cameraTransform[0], event.nativeEvent.cameraTransform[1], event.nativeEvent.cameraTransform[2]],
      rotation: [event.nativeEvent.cameraTransform[3], event.nativeEvent.cameraTransform[4], event.nativeEvent.cameraTransform[5]],
      forward: [event.nativeEvent.cameraTransform[6], event.nativeEvent.cameraTransform[7], event.nativeEvent.cameraTransform[8]],
      up: [event.nativeEvent.cameraTransform[9], event.nativeEvent.cameraTransform[10], event.nativeEvent.cameraTransform[11]]
    };
    this.props.onCameraTransformUpdate && this.props.onCameraTransformUpdate(cameraTransform);
  },

  _onDrag: function(event: Event) {
      this.props.onDrag && this.props.onDrag(event.nativeEvent.dragToPos, event.nativeEvent.source);
  },

  _onFuse: function(event: Event){
    if (this.props.onFuse){
      if (typeof this.props.onFuse === 'function'){
        this.props.onFuse(event.nativeEvent.source);
      } else if (this.props.onFuse != undefined && this.props.onFuse.callback != undefined){
        this.props.onFuse.callback(event.nativeEvent.source);
      }
    }
  },

  _onPlatformUpdate: function(event: Event) {
    this.props.onPlatformUpdate && this.props.onPlatformUpdate(event.nativeEvent.platformInfo);
  },

  // TODO PHANTOM-3172: Remove in favor of deprecating onTrackingInitialized
  componentDidMount :function(){
    this.onTrackingFirstInitialized = false;
  },

  _onTrackingUpdated: function(event: Event){
    if (this.props.onTrackingUpdated){
      this.props.onTrackingUpdated(event.nativeEvent.state, event.nativeEvent.reason);
    }

    // TODO PHANTOM-3172: Remove in favor of deprecating onTrackingInitialized
    if ((event.nativeEvent.state == Constants.TRACKING_LIMITED ||
         event.nativeEvent.state == Constants.TRACKING_NORMAL) &&
         !this.onTrackingFirstInitialized) {
      this.onTrackingFirstInitialized = true;
      if (this.props.onTrackingInitialized){
        this.props.onTrackingInitialized();
      }
    }
  },

  /**
   * ##### DEPRECATION WARNING - this prop may be removed in future releases #####
   */
  _onTrackingInitialized: function(event: Event) {
    this.props.onTrackingInitialized && this.props.onTrackingInitialized();
  },

  /*
   Gives constant estimates of the ambient light as detected by the camera.

   Returns object w/ "intensity" and "color" keys
   */
  _onAmbientLightUpdate: function(event: Event) {
    this.props.onAmbientLightUpdate && this.props.onAmbientLightUpdate(event.nativeEvent.ambientLightInfo)
  },

  _onAnchorFound: function(event: Event) {
    this.props.onAnchorFound && this.props.onAnchorFound(event.nativeEvent.anchor);
  },

  _onAnchorUpdated: function(event: Event) {
    this.props.onAnchorUpdated && this.props.onAnchorUpdated(event.nativeEvent.anchor);
  },

  _onAnchorRemoved: function(event: Event) {
    this.props.onAnchorRemoved && this.props.onAnchorRemoved(event.nativeEvent.anchor);
  },

  async findCollisionsWithRayAsync(from, to, closest, Tag) {
    return await NativeModules.VRTSceneModule.findCollisionsWithRayAsync(findNodeHandle(this), from, to, closest, Tag);
  },

  async findCollisionsWithShapeAsync(from, to, shapeString, shapeParam, Tag) {
    return await NativeModules.VRTSceneModule.findCollisionsWithShapeAsync(findNodeHandle(this), from, to, shapeString, shapeParam, Tag);
  },

  async performARHitTestWithRay(ray) {
    return await NativeModules.VRTARSceneModule.performARHitTestWithRay(findNodeHandle(this), ray);
  },

  async performARHitTestWithWorldPoints(origin, destination) {
    return await NativeModules.VRTARSceneModule.performARHitTestWithRay(findNodeHandle(this), origin, destination);
  },

  async performARHitTestWithPosition(position) {
    return await NativeModules.VRTARSceneModule.performARHitTestWithPosition(findNodeHandle(this), position);
  },

  async performARHitTestWithPoint(x, y) {
    return await NativeModules.VRTARSceneModule.performARHitTestWithPoint(findNodeHandle(this), x, y);
  },

  /**
   * ##### DEPRECATION WARNING - this prop may be removed in future releases #####
   */
  async getCameraPositionAsync() {
    console.warn("[Phantom] ARScene.getCameraPositionAsync has been DEPRECATED. Please use getCameraOrientationAsync instead.");
    var orientation = await NativeModules.VRTCameraModule.getCameraOrientation(findNodeHandle(this));
    position = [orientation[0], orientation[1], orientation[2]];
    return position;
  },

  async getCameraOrientationAsync(){
    var orientation = await NativeModules.VRTCameraModule.getCameraOrientation(findNodeHandle(this));
    return {
      position: [orientation[0], orientation[1], orientation[2]],
      rotation: [orientation[3], orientation[4], orientation[5]],
      forward: [orientation[6], orientation[7], orientation[8]],
      up: [orientation[9], orientation[10], orientation[11]],
    }
  },

  async getCameraPositionAsync() {
    return await CameraModule.getCameraPosition(findNodeHandle(this));
  },

  getChildContext: function() {
    return {
      cameraDidMount: function(camera) {
        if (camera.props.active) {
          NativeModules.VRTCameraModule.setSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
      }.bind(this),
      cameraWillUnmount: function(camera) {
        if (camera.props.active) {
          NativeModules.VRTCameraModule.removeSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
      }.bind(this),
      cameraDidUpdate: function(camera, active) {
        if (active) {
          NativeModules.VRTCameraModule.setSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
        else {
          NativeModules.VRTCameraModule.removeSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
      }.bind(this),
    };
  },

  render: function() {

    // Uncomment this line to check for misnamed props
    //checkMisnamedProps("ARScene", this.props);

    // Since anchorDetectionTypes can be either a string or an array, convert the string to a 1-element array.
    let anchorDetectionTypes = typeof this.props.anchorDetectionTypes === 'string' ?
        new Array(this.props.anchorDetectionTypes) : this.props.anchorDetectionTypes;

    let timeToFuse = undefined;
    if (this.props.onFuse != undefined && typeof this.props.onFuse === 'object'){
        timeToFuse = this.props.onFuse.timeToFuse;
    }

    let displayPointCloud = false;
    let pointCloudImage = undefined;
    let pointCloudScale = undefined;
    let pointCloudMaxPoints = undefined;
    // parse out displayPointCloud prop
    if (this.props.displayPointCloud) {
      displayPointCloud = true;
      pointCloudImage = resolveAssetSource(this.props.displayPointCloud.imageSource);
      pointCloudScale = this.props.displayPointCloud.imageScale;
      pointCloudMaxPoints = this.props.displayPointCloud.maxPoints;
    }

    if (this.props.onTrackingInitialized && !this.onTrackingFirstInitialized){
      console.warn("[Phantom] ARScene.onTrackingInitialized() has been DEPRECATED. Please use onTrackingUpdated() instead.");
    }

    return (
      <VRTARScene
        {...this.props}
        canHover={this.props.onHover != undefined}
        canClick={this.props.onClick != undefined || this.props.onClickState != undefined}
        canTouch={this.props.onTouch != undefined}
        canScroll={this.props.onScroll != undefined}
        canSwipe={this.props.onSwipe != undefined}
        canDrag={this.props.onDrag != undefined}
        canPinch={this.props.onPinch != undefined}
        canRotate={this.props.onRotate != undefined}
        canFuse={this.props.onFuse != undefined}
        canCameraARHitTest={this.props.onCameraARHitTest != undefined}
        canARPointCloudUpdate={this.props.onARPointCloudUpdate != undefined}
        canCameraTransformUpdate={this.props.onCameraTransformUpdate != undefined}
        onHover={this._onHover}
        onClick={this._onClickState}
        onTouch={this._onTouch}
        onScroll={this._onScroll}
        onSwipe={this._onSwipe}
        onDrag={this._onDrag}
        onPinch={this._onPinch}
        onRotate={this._onRotate}
        onFuse={this._onFuse}
        onCameraARHitTest={this._onCameraARHitTest}
        onARPointCloudUpdate={this._onARPointCloudUpdate}
        onCameraTransformUpdate={this._onCameraTransformUpdate}
        onPlatformUpdate={this._onPlatformUpdate}
        onTrackingUpdated={this._onTrackingUpdated}
        onAmbientLightUpdate={this._onAmbientLightUpdate}
        onAnchorFound={this._onAnchorFound}
        onAnchorUpdated={this._onAnchorUpdated}
        onAnchorRemoved={this._onAnchorRemoved}
        timeToFuse={timeToFuse}
        anchorDetectionTypes={anchorDetectionTypes}
        displayPointCloud={displayPointCloud}
        pointCloudImage={pointCloudImage}
        pointCloudScale={pointCloudScale}
        pointCloudMaxPoints={pointCloudMaxPoints}
        />
    );
  },
});

ARScene.childContextTypes = {
  cameraDidMount: PropTypes.func,
  cameraWillUnmount: PropTypes.func,
  cameraDidUpdate: PropTypes.func,
};

var VRTARScene = requireNativeComponent(
  'VRTARScene', ARScene, {
      nativeOnly: {
          canHover: true,
          canClick: true,
          canTouch: true,
          canScroll: true,
          canSwipe: true,
          canDrag: true,
          canPinch: true,
          canRotate: true,
          canFuse: true,
          canCameraARHitTest: true,
          canARPointCloudUpdate: true,
          canCameraTransformUpdate: true,
          onHover: true,
          onClick: true,
          onTouch: true,
          onScroll: true,
          onSwipe: true,
          onDrag:true,
          onPinch:true,
          onRotate:true,
          onFuse:true,
          onPlatformUpdate: true,
          onTrackingInitialized: true,
          onTrackingUpdated:true,
          onAmbientLightUpdate: true,
          onAnchorFound: true,
          onAnchorUpdated: true,
          onAnchorRemoved:true,
          onCameraARHitTest: true,
          onARPointCloudUpdate: true,
          onCameraTransformUpdate: true,
          timeToFuse:true,
          pointCloudImage:true,
          pointCloudScale:true,
          pointCloudMaxPoints:true,
      }
  }
);

module.exports = ARScene;
