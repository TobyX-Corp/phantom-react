/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Camera
 * @flow
 */
'use strict';

import { requireNativeComponent, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
var createReactClass = require('create-react-class');
import { checkMisnamedProps } from './Utilities/Props';

var Camera = createReactClass({
  propTypes: {
    ...View.propTypes,
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    active: PropTypes.bool.isRequired,
    animation: PropTypes.shape({
      name: PropTypes.string,
      delay: PropTypes.number,
      loop: PropTypes.bool,
      onStart: PropTypes.func,
      onFinish: PropTypes.func,
      run: PropTypes.bool,
      interruptible: PropTypes.bool,
    }),
    fieldOfView: PropTypes.number,
  },

  componentDidMount() {
    this.context.cameraDidMount(this);
  },

  componentWillUnmount() {
    this.context.cameraWillUnmount(this);
  },

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.active != this.props.active) {
      this.context.cameraDidUpdate(this, this.props.active);
    }
  },

  setNativeProps: function(nativeProps) {
    this._component.setNativeProps(nativeProps);
  },

  _onAnimationStart: function(event: Event) {
    this.props.animation && this.props.animation.onStart && this.props.animation.onStart();
  },

  _onAnimationFinish: function(event: Event) {
    this.props.animation && this.props.animation.onFinish && this.props.animation.onFinish();
  },

  render: function() {
    // Uncomment this to check props
    //checkMisnamedProps("Camera", this.props);

    return (
      <VRTCamera
        ref={ component => {this._component = component; }}
        {...this.props}
        onAnimationStart={this._onAnimationStart}
        onAnimationFinish={this._onAnimationFinish}
      />
    );
  },
});

Camera.contextTypes = {
  cameraDidMount: PropTypes.func,
  cameraWillUnmount: PropTypes.func,
  cameraDidUpdate: PropTypes.func,
};

var VRTCamera = requireNativeComponent(
  'VRTCamera',
  Camera, {
    nativeOnly: {
      scale:[1,1,1],
      materials:[],
      visible: true,
      canHover: true,
      canClick: true,
      canTouch: true,
      canScroll: true,
      canSwipe: true,
      canDrag: true,
      canPinch: true,
      canRotate: true,
      onPinch: true,
      onRotate: true,
      onHover:true,
      onClick:true,
      onTouch:true,
      onScroll:true,
      onSwipe:true,
      onDrag:true,
      transformBehaviors:true,
      canFuse: true,
      onFuse:true,
      timeToFuse:true,
      tag: true,
      scalePivot: true,
      rotationPivot: true,
      canCollide:true,
      onCollision:true,
      onNativeTransformDelegate:true,
      hasTransformDelegate:true,
      physicsBody:true,
      dragType: true,
      onAnimationStart:true,
      onAnimationFinish:true,
      ignoreEventHandling:true,
      dragPlane:true,
      renderingOrder:true,
    }
});

module.exports = Camera;
