# ViroCamera

A stationary look around camera through which the user views the world. More than 1 camera may be placed within a scene.

Example use:

```JavaScript
<ViroCamera
    position={[0, 0, 0]}
    rotation={[45, 0, 0]}
    active={true}
 />
```

## Props

## Required props

**active**	PropTypes.bool

If true, sets the corresponding camera as the active one from which we render the world. Setting more than one active camera within a scene will result in undefined behavior.

## Optional Props

**animation**	PropTypes.shape({
name: PropTypes.string,
delay: PropTypes.number,
loop: PropTypes.bool,
onStart: PropTypes.func,
onFinish: PropTypes.func,
run: PropTypes.bool,
})

A collection of parameters that determine if this component should animate. For more information on animated components please see our Animation Guide.

**fieldOfView**	PropTypes.number

Set the field of view for this camera, along the major (larger) axis. Field of view is an angle that determines how wide or narrow the camera lens is when rendering the scene.

This value sets the field of view, in degrees, for the major axis. The major axis is the axis with the larger dimension: the X axis in landscape mode, or the Y axis in portrait mode. By specifying the field of view in terms of the major axis, Viro can keep the field of view consistent upon orientation changes, when the major/minor axes swap. The minor axis field of view is automatically computed from the major axis field of view and the viewport.

This value is ignored on VR and AR platforms, where the FOV is fixed by the VR headset or the AR camera. Else, in non-VR (360 mode) the FOV defaults to 90.

**position**	PropTypes.arrayOf(PropTypes.number)

Cartesian position of the camera in 3D world space, specified as [x, y, z].

**rotation**	PropTypes.arrayOf(PropTypes.number)

Cartesian rotation of the camera in 3D world space, specified as [x, y, z].

**rotation**	PropTypes.arrayOf(PropTypes.number)

Put the PropType Description here.

**style**	stylePropType
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
