/**
 * Copyright (c) 2020-present, TobyX Corp, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ARPlaneSelector
 */

'use strict';

import { requireNativeComponent, View, StyleSheet, findNodeHandle } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkMisnamedProps } from '../Utilities/Props';

var createReactClass = require('create-react-class');

var Materials = require('../Material/Materials');
var ARPlane = require('./ARPlane');
var Quad = require('../Quad');
var Node = require('../Node');

var _maxPlanes = 15;
var _planePrefix = "ARPlaneSelector_Plane_"

/**
 * This component wraps the logic required to enable user selection
 * of an AR plane. This currently only allows for 1 plane to be selected,
 * but could easily be modified to allow for more planes.
 */
var ARPlaneSelector = createReactClass({
  propTypes: {
    ...View.propTypes,
    maxPlanes: PropTypes.number,
    minHeight: PropTypes.number,
    minWidth: PropTypes.number,
    alignment: PropTypes.oneOf(["Horizontal","HorizontalUpward","HorizontalDownward","Vertical"]),
    renderingOrder: PropTypes.number,
    visible: PropTypes.bool,
    opacity: PropTypes.number,
    ignoreEventHandling: PropTypes.bool,
    dragType: PropTypes.oneOf(["FixedDistance", "FixedDistanceOrigin", "FixedToWorld", "FixedToPlane"]),
    dragPlane: PropTypes.shape({
      planePoint : PropTypes.arrayOf(PropTypes.number),
      planeNormal : PropTypes.arrayOf(PropTypes.number),
      maxDistance : PropTypes.number
    }),

    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onClickState: PropTypes.func,
    onTouch: PropTypes.func,
    onScroll: PropTypes.func,
    onSwipe: PropTypes.func,
    onDrag: PropTypes.func,
    onPinch: PropTypes.func,
    onRotate: PropTypes.func,
    onFuse: PropTypes.oneOfType([
      PropTypes.shape({
        callback: PropTypes.func.isRequired,
        timeToFuse: PropTypes.number
      }),
      PropTypes.func
    ]),
    onCollision: PropTypes.func,
    tag: PropTypes.string,
    onAnchorFound: PropTypes.func,
    onAnchorUpdated: PropTypes.func,
    onAnchorRemoved: PropTypes.func,
    onPlaneSelected: PropTypes.func,
  },

  getInitialState: function() {
    return {
      selectedSurface : -1,
      foundARPlanes : []
    }
  },

  render: function() {
    // Uncomment this line to check for misnamed props
    //checkMisnamedProps("ARPlaneSelector", this.props);

    return (
      <Node>
        {this._getARPlanes()}
      </Node>
    );
  },

  _getARPlanes() {
    if (this.state.selectedSurface == -1) {
      let arPlanes = [];
      let numPlanes = this.props.maxPlanes || _maxPlanes;
      for (var i = 0; i < numPlanes; i++) {
        let foundARPlane = this.state.foundARPlanes[i];
        let surfaceWidth = foundARPlane ? foundARPlane.width : 0;
        let surfaceHeight = foundARPlane ? foundARPlane.height : 0;
        let surfacePosition = foundARPlane ? foundARPlane.center : [0,0,0];
        arPlanes.push((
          <ARPlane key={_planePrefix + i}
            minWidth={this.props.minWidth}
            minHeight = {this.props.minHeight}
            alignment = {this.props.alignment}
            onAnchorUpdated={this._onARPlaneUpdated(i)} >
            <Quad materials={"ARPlaneSelector_Translucent"}
              onClick={this._getOnClickSurface(i)}
              position={surfacePosition}
              width={surfaceWidth} height={surfaceHeight}
              rotation={[-90,0,0]} />
          </ARPlane>
        ));
      }
      return arPlanes;
    } else {
      return (
        <ARPlane key={_planePrefix + this.state.selectedSurface}
          {...this.props}>
        </ARPlane>
      );
    }
  },

  _getOnClickSurface(index) {
    return ()=>{
      this.setState({selectedSurface : index});
      this._onPlaneSelected(this.state.foundARPlanes[index]);
    }
  },

  _onARPlaneUpdated(index) {
    return (updateMap)=>{
      this.state.foundARPlanes[index] = updateMap;
      this.setState({
        arPlaneSizes : this.state.arPlaneSizes
      })
    }
  },

  _onPlaneSelected(updateMap) {
    this.props.onPlaneSelected && this.props.onPlaneSelected(updateMap);
  },

  /*
  This function allows the user to reset the surface and select a new plane.
  */
  reset() {
    this.setState({
      selectedSurface : -1
    });
  }

});

Materials.createMaterials({
  ARPlaneSelector_Translucent: {
    lightingModel: "Constant",
    diffuseColor: "#88888888"
  },
});

module.exports = ARPlaneSelector;
