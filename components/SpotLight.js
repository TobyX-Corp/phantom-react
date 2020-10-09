/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SpotLight
 * @flow
 */
'use strict';

import { requireNativeComponent, View, StyleSheet, Platform } from 'react-native';
import React, { Component } from 'react';
var NativeModules = require('react-native').NativeModules;
var createReactClass = require('create-react-class');
import PropTypes from 'prop-types';
import { checkMisnamedProps } from './Utilities/Props';
var ColorPropType = require('react-native').ColorPropType;

/**
 * Used to render a SpotLight
 */
var SpotLight = createReactClass({
  propTypes: {
    ...View.propTypes,
    position: PropTypes.arrayOf(PropTypes.number),
    color: ColorPropType,
    intensity: PropTypes.number,
    temperature: PropTypes.number,
    direction: PropTypes.arrayOf(PropTypes.number).isRequired,
    attenuationStartDistance: PropTypes.number,
    attenuationEndDistance: PropTypes.number,
    innerAngle: PropTypes.number,
    outerAngle : PropTypes.number,
    influenceBitMask: PropTypes.number,

    // Shadow Properties
    castsShadow: PropTypes.bool,
    shadowOpacity: PropTypes.number,
    shadowMapSize: PropTypes.number,
    shadowBias: PropTypes.number,
    shadowNearZ: PropTypes.number,
    shadowFarZ: PropTypes.number,
  },

  setNativeProps: function(nativeProps) {
    this._component.setNativeProps(nativeProps);
  },

  render: function() {
    // Uncomment this line to check for misnamed props
    //checkMisnamedProps("SpotLight", this.props);

    let nativeProps = Object.assign({}, this.props);
    nativeProps.style=[this.props.style];
    nativeProps.color = this.props.color;
    nativeProps.ref = component => {this._component = component; };

    return (
      <VRTSpotLight
        {...nativeProps}
      />
    );
  }
});

var VRTSpotLight = requireNativeComponent(
  'VRTSpotLight',
  SpotLight
);

module.exports = SpotLight;
