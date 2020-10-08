/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

import { requireNativeComponent, findNodeHandle, View, StyleSheet, Platform } from 'react-native';
import React, { Component } from 'react';
var NativeModules = require('react-native').NativeModules;
var createReactClass = require('create-react-class');
import PropTypes from 'prop-types';
var ControllerModule = require('react-native').NativeModules.VRTControllerModule;
import { checkMisnamedProps } from './Utilities/Props';

var Controller = createReactClass({

  propTypes: {
    ...View.propTypes,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onClickState: PropTypes.func,
    onTouch: PropTypes.func,
    onScroll: PropTypes.func,
    onSwipe: PropTypes.func,
    onControllerStatus: PropTypes.func,
    onDrag: PropTypes.func,
    onPinch: PropTypes.func,
    onRotate: PropTypes.func,
    onFuse: PropTypes.func,
    reticleVisibility: PropTypes.bool,
    controllerVisibility: PropTypes.bool,
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

  _onControllerStatus: function(event: Event) {
    this.props.onControllerStatus && this.props.onControllerStatus(event.nativeEvent.controllerStatus, event.nativeEvent.source);
  },

  _onFuse: function(event: Event){
    this.props.onFuse && this.props.onFuse(event.nativeEvent.source);
  },

  _onPinch: function(event: Event) {
    this.props.onPinch && this.props.onPinch(event.nativeEvent.pinchState, event.nativeEvent.scaleFactor, event.nativeEvent.source);
  },

  _onRotate: function(event: Event) {
    this.props.onRotate && this.props.onRotate(event.nativeEvent.rotateState, event.nativeEvent.rotationFactor, event.nativeEvent.source);
  },

  async getControllerForwardAsync() {
    return await ControllerModule.getForwardVectorAsync(findNodeHandle(this));
  },

  setNativeProps: function(nativeProps) {
    this._component.setNativeProps(nativeProps);
  },

  render: function() {

    // Uncomment this line to check for misnamed props
    //checkMisnamedProps("Controller", this.props);

    return (
      <VRTController
        {...this.props}
        ref={ component => {this._component = component; }}
        canClick={this.props.onClick != undefined || this.props.onClickState != undefined}
        canTouch={this.props.onTouch != undefined}
        canScroll={this.props.onScroll != undefined}
        canSwipe={this.props.onSwipe != undefined}
        canGetControllerStatus={this.props.onControllerStatus != undefined}
        canDrag={this.props.onDrag != undefined}
        canPinch={this.props.onPinch != undefined}
        canRotate={this.props.onRotate != undefined}
        canFuse={this.props.onFuse != undefined}
        onClick={this._onClickState}
        onTouch={this._onTouch}
        onScroll={this._onScroll}
        onSwipe={this._onSwipe}
        onDrag={this._onDrag}
        onPinch={this._onPinch}
        onRotate={this._onRotate}
        onFuse={this._onFuse}
        onControllerStatus={this._onControllerStatus}
      />
    );
  }
});

var VRTController = requireNativeComponent(
  'VRTController', Controller, {
          nativeOnly: {
              canClick: true,
              canTouch: true,
              canScroll: true,
              canSwipe: true,
              canDrag: true,
              canPinch: true,
              canRotate: true,
              canFuse: true,
              canGetControllerStatus: true,
              onClick:true,
              onTouch:true,
              onScroll:true,
              onSwipe:true,
              onControllerStatus:true,
              onDrag:true,
              onPinch:true,
              onRotate:true,
              onFuse:true,
              timeToFuse:true,
            }
      }
);

module.exports = Controller;
