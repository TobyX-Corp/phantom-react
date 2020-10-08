/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AnimatedComponent
 * @flow
 */
'use strict';

import { requireNativeComponent, View, StyleSheet, Platform } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
var createReactClass = require('create-react-class');
import { checkMisnamedProps } from './Utilities/Props';

/**
 * Used to render a AnimatedComponent
 */
var AnimatedComponent = createReactClass({
  propTypes: {
    ...View.propTypes,
    animation: PropTypes.string,
    delay: PropTypes.number,
    loop: PropTypes.bool,
    onStart: PropTypes.func,
    onFinish: PropTypes.func,
    run: PropTypes.bool,
  },

  _onStart: function(event: Event) {
    this.props.onStart && this.props.onStart();
  },

  _onFinish: function(event: Event) {
    this.props.onFinish && this.props.onFinish();
  },

  setNativeProps: function(nativeProps) {
    this._component.setNativeProps(nativeProps);
  },

  render: function() {
    console.warn("<AnimatedComponent> is deprecated, please use each component's 'animation' property");

    // Uncomment this line to check for misnamed props
    //checkMisnamedProps("AnimatedComponent", this.props);

    let nativeProps = Object.assign({}, this.props);
    nativeProps.onAnimationFinish = this._onFinish;
    nativeProps.onAnimationStart = this._onStart;
    nativeProps.ref = component => {this._component = component; };

    return (
      <VRTAnimatedComponent {...nativeProps} />
    );
  }
});


var VRTAnimatedComponent = requireNativeComponent(
  'VRTAnimatedComponent', AnimatedComponent, {
    nativeOnly: { onAnimationStart:true, onAnimationFinish:true }
  }
);

module.exports = AnimatedComponent;
