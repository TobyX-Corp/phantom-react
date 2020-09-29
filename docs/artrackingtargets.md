# ARTrackingTargets

ARTrackingTargets contain the information required for AR tracking components such as ARImageMarker to work properly.

Before using an AR tracking component, a ARTrackingTarget should be created and referenced by name in the component itself.

Components that use ARTrackingTargets:

ARImageMarker

Example use:

```JavaScript
ARTrackingTargets.createTargets({
  "ben" : {
    source : require('./res/ben.jpg'),
    orientation : "Up",
    physicalWidth : 0.157 // real world width in meters
  },
  "targetOne" : {
    source : require('./res/targetOne.jpg'),
    orientation : "Up",
    physicalWidth : 0.25 // real world width in meters
  }
});
```

## Methods

**static createTargets(targets:{[key:string]: any})**

This function creates the targets specified by the given targets object with the properties specified below under Image Target Properties.

**static deleteTarget(targetName)**

This function takes the name of one registered target and deletes it.

## Types of Targets

## Image Targets

Image targets should be used with ARImageMarkers and they specify the properties of a given image.

## Object Targets

Object targets should be used with ARObjectMarker and they specify the properties of a given object.

## Properties

**source**	PropTypes.oneOfType( [PropTypes.shape( {uri: PropTypes.string} ), PropTypes.number] )

The source of the image to find.

**orientation**	PropTypes.oneOf(['Up', 'Down', 'Left', 'Right'])

Determines the orientation of the source image.

**physicalWidth**	PropTypes.number

The width of the image in the real world in meters.

**type**	PropTypes.oneOf(['Image', 'Object'])

Determines the type of tracking target.