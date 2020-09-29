# OrbitCamera

A camera component that allows the user to orbit around a specified focal point. See our Camera Guide for more information on using cameras.

Example use:

```JavaScript
<OrbitCamera
    position={[0, 0, 0]}
    focalPoint={[0,0,-1]}
    active={true}
 />
```

## Props

## Required Props

**active**	PropTypes.bool.isRequired

If true, sets the corresponding camera as the active one from which we render the world. Setting more than one active camera within a scene will result in undefined behavior.

## Optional Props

**fieldOfView**	PropTypes.number

Set the field of view for this camera, along the major (larger) axis. Field of view is an angle that determines how wide or narrow the camera lens is when rendering the scene.

This value sets the field of view, in degrees, for the major axis. The major axis is the axis with the larger dimension: the X axis in landscape mode, or the Y axis in portrait mode. By specifying the field of view in terms of the major axis, Phantom can keep the field of view consistent upon orientation changes, when the major/minor axes swap. The minor axis field of view is automatically computed from the major axis field of view and the viewport.

This value is ignored on VR and AR platforms, where the FOV is fixed by the VR headset or the AR camera. Else, in non-VR (360 mode) the FOV defaults to 90.

**focalPoint**	PropTypes.arrayOf(PropTypes.number)

Cartesian position in 3D world space where the camera focuses on and orbits around. Default position is [0,0,0].

**position**	PropTypes.number

The desired fov for this camera. Default fov is 90.

**text**	PropTypes.string

Put the PropType Description here.

**transformBehaviors**	PropTypes.arrayOf(PropTypes.string)

Put the PropType Description here.

**width**	PropTypes.number

Put the PropType Description here.

**visible**	PropTypes.bool

Put the PropType Description here.

## Methods

**setNativeProps(nativeProps: object)**

A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });