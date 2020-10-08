'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  Scene,
  Text,
  Image360,
} from 'phantom-react';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <Scene>
        <Image360 source={require('./res/guadalupe_360.jpg')} />
        <Text text="Hello World!" width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
      </Scene>
    );
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldScene;
