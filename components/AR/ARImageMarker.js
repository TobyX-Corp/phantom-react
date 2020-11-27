/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ARImageMarker
 */

'use strict';

import { requireNativeComponent, View, StyleSheet, findNodeHandle, Platform } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkMisnamedProps } from '../Utilities/Props';

var createReactClass = require('create-react-class');

/**
 * Container for Phantom Components anchored to a detected image.
 */
var ARImageMarker = createReactClass({
  propTypes: {
    ...View.propTypes,
    target: PropTypes.string,

    pauseUpdates: PropTypes.bool,
    renderingOrder: PropTypes.number,
    visible: PropTypes.bool,
    opacity: PropTypes.number,
    ignoreEventHandling: PropTypes.bool,
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
    onFuse: PropTypes.oneOfType([
      PropTypes.shape({
        callback: PropTypes.func.isRequired,
        timeToFuse: PropTypes.number
      }),
      PropTypes.func
    ]),
    onCollision: PropTypes.func,
    tag: PropTypes.string,
    onAnchorFound: PropTypes.func,
    onAnchorUpdated: PropTypes.func,
    onAnchorRemoved: PropTypes.func,
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

  _onDrag: function(event: Event) {
      this.props.onDrag
        && this.props.onDrag(event.nativeEvent.dragToPos, event.nativeEvent.source);
  },

  _onPinch: function(event: Event) {
    this.props.onPinch && this.props.onPinch(event.nativeEvent.pinchState, event.nativeEvent.scaleFactor, event.nativeEvent.source);
  },

  _onRotate: function(event: Event) {
    this.props.onRotate && this.props.onRotate(event.nativeEvent.rotateState, event.nativeEvent.rotationFactor, event.nativeEvent.source);
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

  _onCollision: function(event: Event){
    if (this.props.onCollision){
      this.props.onCollision(event.nativeEvent.tag, event.nativeEvent.collidedPoint,
                                                           event.nativeEvent.collidedNormal);
    }
  },

  _onAnchorFound: function(event: Event) {
    if (this.props.onAnchorFound) {
      this.props.onAnchorFound(event.nativeEvent.anchorFoundMap);
    }
  },

  _onAnchorUpdated: function(event: Event) {
    if (this.props.onAnchorUpdated) {
      this.props.onAnchorUpdated(event.nativeEvent.anchorUpdatedMap);
    }
  },

  _onAnchorRemoved: function(event: Event) {
    if (this.props.onAnchorRemoved) {
      this.props.onAnchorRemoved();
    }
  },

  setNativeProps: function(nativeProps) {
    this._component.setNativeProps(nativeProps);
  },

  render: function() {

    // Uncomment this line to check for misnamed props
    //checkMisnamedProps("ARImageMarker", this.props);

    let timeToFuse = undefined;
    if (this.props.onFuse != undefined && typeof this.props.onFuse === 'object'){
        timeToFuse = this.props.onFuse.timeToFuse;
    }

    return (
      <VRTARImageMarker
        {...this.props}
        ref={ component => {this._component = component; }}
        canHover={this.props.onHover != undefined}
        canClick={this.props.onClick != undefined || this.props.onClickState != undefined}
        canTouch={this.props.onTouch != undefined}
        canScroll={this.props.onScroll != undefined}
        canSwipe={this.props.onSwipe != undefined}
        canDrag={this.props.onDrag != undefined}
        canPinch={this.props.onPinch != undefined}
        canRotate={this.props.onRotate != undefined}
        canFuse={this.props.onFuse != undefined}
        onHover={this._onHover}
        onClick={this._onClickState}
        onTouch={this._onTouch}
        onScroll={this._onScroll}
        onSwipe={this._onSwipe}
        onDrag={this._onDrag}
        onPinch={this._onPinch}
        onRotate={this._onRotate}
        onFuse={this._onFuse}
        timeToFuse={timeToFuse}
        canCollide={this.props.onCollision != undefined}
        onCollision={this._onCollision}
        onAnchorFound={this._onAnchorFound}
        onAnchorUpdated={this._onAnchorUpdated}
        onAnchorRemoved={this._onAnchorRemoved}
        />
    );
  }
});


var VRTARImageMarker = requireNativeComponent(
  'VRTARImageMarker', ARImageMarker, {
    nativeOnly: {
      position : [],
      scale : [],
      rotation : [],
      scalePivot : [],
      rotationPivot : [],
      animation : {},
      materials: [],
      physicsBody : {},
      transformBehaviors: [],
      hasTransformDelegate:true,
      canHover: true,
      canClick: true,
      canTouch: true,
      canScroll: true,
      canSwipe: true,
      canDrag: true,
      canPinch: true,
      canRotate: true,
      canFuse: true,
      onHover:true,
      onClick:true,
      onTouch:true,
      onScroll:true,
      onSwipe:true,
      onDrag:true,
      onPinch:true,
      onRotate:true,
      onFuse:true,
      timeToFuse:true,
      canCollide:true,
      onCollision:true,
      onAnchorFound:true,
      onAnchorUpdated:true,
      onAnchorRemoved:true,
    }
  }
);


module.exports = ARImageMarker;
