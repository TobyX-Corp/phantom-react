'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ARScene,
  Text,
  Constants,
  Box,
  Materials,
} from 'phantom-react';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
        <ARScene onTrackingUpdated={this._onInitialized} >
          <Text text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          <Box position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} />
        </ARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == Constants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello Sherry!"
      });
    } else if (state == Constants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

Materials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

module.exports = HelloWorldSceneAR;