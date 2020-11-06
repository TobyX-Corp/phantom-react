'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  SpotLight,
  DirectionalLight,
  AmbientLight,
  OrbitCamera,
  Scene,
  Object3D,
  Text,
  SkyBox,
  Node,
  Materials,
} from 'phantom-react';

var createReactClass = require('create-react-class');

var MainScene = createReactClass({
  getInitialState() {
    return {

    };
  },

  render: function() {
    return (
     <Scene style={styles.container}>
        <SkyBox source={{nx:require('./res/grid_bg.jpg'),
                             px:require('./res/grid_bg.jpg'),
                             ny:require('./res/grid_bg.jpg'),
                             py:require('./res/grid_bg.jpg'),
                             nz:require('./res/grid_bg.jpg'),
                             pz:require('./res/grid_bg.jpg')}} />
        <OrbitCamera position={[0, 0, -0]} active={true} focalPoint={[0, 0, -1]} />
        <DirectionalLight direction={[0, 0, -1]} color="#ffffff" />

        <AmbientLight color="#aaaaaa" />

         <Node position={[0, 0, -1]} >
            <Object3D source={require('./res/heart.obj')}
                       materials={["heart"]} type="OBJ" />
       </Node>
       <Text text="Heart" position={[0.0, 0.0, -3]} style={styles.textStyle}
                 transformBehaviors={["billboardY"]}/>
     </Scene>
    );
  },
});

var materials = Materials.createMaterials({
   heart: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/Heart_D3.jpg'),
     specularTexture: require('./res/Heart_S2.jpg'),
     writesToDepthBuffer: true,
     readsFromDepthBuffer: true,
   },
});

var styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 18,
    color: '#FFFFFF',
  },
});

module.exports = MainScene;
