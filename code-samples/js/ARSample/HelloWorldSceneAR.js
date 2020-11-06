'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ARScene,
  Text,
  Materials,
  Box,
  Object3D,
  AmbientLight,
  SpotLight,
  ARPlane,
  ARPlaneSelector,
  Quad,
  Node,
  Animations,
  Constants
} from 'phantom-react';

var createReactClass = require('create-react-class');

var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      hasARInitialized : false,
      text : "Initializing AR...",
    };
  },
  render: function() {
    return (
      <ARScene onTrackingUpdated={this._onTrackingUpdated}>

        {/* Text to show whether or not the AR system has initialized yet, see ARScene's onTrackingInitialized*/}
        <Text text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <Box position={[0, -.5, -1]}
          animation={{name: "rotate", run: true, loop: true}}
          scale={[.3, .3, .1]} materials={["grid"]} />

        <AmbientLight color={"#aaaaaa"} influenceBitMask={1} />

        <SpotLight
            innerAngle={5}
            outerAngle={90}
            direction={[0,-1,-.2]}
            position={[0, 3, 1]}
            color="#aaaaaa"
            castsShadow={true}
            />

        {/* Node that contains a light, an object and a surface to catch its shadow
            notice that the dragType is "FixedToWorld" so the object can be dragged
            along real world surfaces and points. */}
        <Node position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Phantom documentation for more info on lights & shadows */}
          <SpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

          <Object3D
              source={require('./res/emoji_smile/emoji_smile.vrx')}
              position={[0, .2, 0]}
              scale={[.2, .2, .2]}
              type="VRX"
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}
            transformBehaviors={['billboardY']}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                       require('./res/emoji_smile/emoji_smile_specular.png'),
                       require('./res/emoji_smile/emoji_smile_normal.png')]}/>

          <Quad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={2} />

        </Node>

        {/* Node that contains a light, an object and a surface to catch its shadow
          notice that the dragType is "FixedToWorld" so the object can be dragged
          along real world surfaces and points. */}
        <Node position={[.5,-.5,-.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Phantom documentation for more info on lights & shadows */}
          <SpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={4}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

          <Object3D
            source={require('./res/object_soccerball/object_soccer_ball.vrx')}
            position={[0, .15, 0]}
            scale={[.3, .3, .3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            transformBehaviors={['billboardY']}
            resources={[require('./res/object_soccerball/object_soccer_ball_diffuse.png'),
                       require('./res/object_soccerball/object_soccer_ball_normal.png'),
                       require('./res/object_soccerball/object_soccer_ball_specular.png')]}/>
          <Quad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} />

        </Node>

      </ARScene>
    );
  },
  _onTrackingUpdated(state, reason) {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    if (!this.state.hasARInitialized && state == Constants.TRACKING_NORMAL) {
      this.setState({
        hasARInitialized : true,
        text : "Hello World!"
      });
    }
  }
});

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

Animations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
