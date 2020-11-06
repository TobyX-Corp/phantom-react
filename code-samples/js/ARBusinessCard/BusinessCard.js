'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ARScene,
  DirectionalLight,
  Box,
  Constants,
  ARTrackingTargets,
  Materials,
  Text,
  Image,
  FlexView,
  ARImageMarker,
  ARObjectMarker,
  AmbientLight,
  ARPlane,
  AnimatedImage,
  Animations,
  Node,
  Object3D,
  Quad
} from 'phantom-react';

export class BusinessCard extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <Text text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      }/>
    )
  }



  getARScene() {
    return (
      <Node>
        <ARImageMarker target={"businessCard"}
          onAnchorFound={
            () => this.setState({
                runAnimation: true
            })}
        >
          <Node key="card">
            <Node
              opacity={0} position={[0, -0.02, 0]}
              animation={{
                name:'animateImage',
                run: this.state.runAnimation
                }}
            >
              <FlexView
                  rotation={[-90, 0, 0]}
                  height={0.03}
                  width={0.05}
                  style={styles.card}
              >
                <FlexView
                  style={styles.cardWrapper}
                >
                  <Image
                    height={0.015}
                    width={0.015}
                    style={styles.image}
                    source={require('./res/avatar.png')}
                  />
                  <Text
                    textClipMode="None"
                    text="Vladimir Novick"
                    scale={[.015, .015, .015]}
                    style={styles.textStyle}
                  />
                </FlexView>
                <FlexView
                  onTouch={() => alert("twitter")}
                  style={styles.subText}
                >
                  <Text
                    width={0.01}
                    height={0.01}
                    textAlign="left"
                    textClipMode="None"
                    text="@VladimirNovick"
                    scale={[.01, .01, .01]}
                    style={styles.textStyle}
                  />
                  <AnimatedImage
                    height={0.01}
                    width={0.01}
                    loop={true}
                    source={require('./res/tweet.gif')}
                  />
                </FlexView>
              </FlexView>
            </Node>
            <Node opacity={0} position={[0, 0, 0]}
              animation={{
                name:'animatePhantom',
                run: this.state.runAnimation
              }}
            >
              <Text text="www.TobyX.com"
                rotation={[-90, 0, 0]}
                scale={[.01, .01, .01]}
                style={styles.textStyle}
              />
            </Node>
          </Node>
        </ARImageMarker>
      </Node>
    )
  }

  render() {
    return (
      <ARScene onTrackingUpdated={this._onInitialized} >
        { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() }
      </ARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == Constants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == Constants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5
  }
});

ARTrackingTargets.createTargets({
  "businessCard" : {
    source : require('./res/business_card.png'),
    orientation : "Up",
    physicalWidth : 0.05 // real world width in meters
  }
});

Materials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  }
});

Animations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0.05,
      opacity: 1.0
    },
      easing:"Bounce",
      duration: 500
  },
  animatePhantom: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing:"Bounce",
    duration: 500
  }
});

module.exports = BusinessCard;
