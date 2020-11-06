/**
 * Copyright (c) 2020-present, TobyX Corp.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  VRSceneNavigator,
  ARSceneNavigator,
} from 'phantom-react';

var createReactClass = require('create-react-class');

/*
 * TODO: Add your API key below!!
 */
var apiKey = "YOUR_API_KEY_HERE";

var vrScenes = {
    '360PhotoTour': require('./js/360PhotoTour/MainScene'),
    'HumanBody': require('./js/HumanBody/MainScene'),
    'ProductShowcase': require('./js/ProductShowcase/ProductShowcase'),
    'MediaPlayer': require('./js/MediaPlayer/Theatre'),
    'ParticleEmitters': require('./js/ParticleEmitters/ParticleTemplates'),
    'PhysicsSample': require('./js/PhysicsSample/BasicPhysicsSample'),
}

var arScenes = {
  'ARSimpleSample': require('./js/ARSample/HelloWorldSceneAR.js'),
  'ARPhysicsSample': require('./js/ARPhysicsSample/BasicPhysicsSample.js'),
  'ARCarDemo' : require('./js/ARCarDemo/ARCarDemo.js'),
  'ARPosterDemo' : require('./js/ARPosterDemo/ARPosterDemo.js'),
  'BusinessCard' : require('./js/ARBusinessCard/BusinessCard.js'),
}

var showARScene = true;

var CodeSamplesSceneNavigator = createReactClass({
  render: function() {

    if (showARScene) {
      return (
        <ARSceneNavigator
          initialScene={{
            scene: arScenes['ARSimpleSample'],
          }}
          apiKey={apiKey} />
        );
    } else {
      return (
        <VRSceneNavigator
          initialScene={{
            scene: vrScenes['360PhotoTour'],
          }}
          apiKey={apiKey} />
      );

    }
  }
});

// Uncomment the below line to use the ARDrivingCar Demo. Don't forget to set the apiKey variable in ARDrivingCar.js
// CodeSamplesSceneNavigator = require('./js/ARDrivingCarDemo/ARDrivingCar');

module.exports = CodeSamplesSceneNavigator;
