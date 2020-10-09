/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ARCamera
 * @flow
 */
'use strict';

import { requireNativeComponent, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
var createReactClass = require('create-react-class');
import { checkMisnamedProps } from '../Utilities/Props';
var Camera = require('../Camera');
var ARCamera = createReactClass({
  propTypes: {
    ...View.propTypes,
  },


  render: function() {
    // Uncomment this to check props
    return (
      <Camera
        ref={ component => {this._component = component; }}
        {...this.props} active={true}
      />
    );
  },
});

module.exports = ARCamera;
