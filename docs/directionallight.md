# DirectionalLight

A light object that emits a directional light, much like the sun. See our Lighting and Material Guide for more information on lights in a scene.

Example use:

```JavaScript
{/* A directional light coming from directly above */}
<DirectionalLight
    color="#ffffff"
    direction={[0, -1, 0]}
 />
```

## Props

## Required Props

**direction**	PropTypes.arrayOf(PropTypes.number)

A 3D unit vector, specified as [x, y, z] that represents the direction the light is facing. Values for each axis can be from -1 to 1.

Example:
direction={[1, 0, 0]}

The above would make the light direction be towards positive x. So if an object was positioned at [0,0,0] the light would hit it from it's left side.

## Optional Props

**castsShadow**	PropTypes.bool

True if this light should cast shadows.

**color**	ColorPropType

The color of the light. The default light color is white.

Valid color formats are:

'#f0f' (#rgb)

'#f0fc' (#rgba)

'#ff00ff' (#rrggbb)

'#ff00ff00' (#rrggbbaa)

'rgb(255, 255, 255)'

'rgba(255, 255, 255, 1.0)'

'hsl(360, 100%, 100%)'

'hsla(360, 100%, 100%, 1.0)'

'transparent'

'red'

* 0xff00ff00 (0xrrggbbaa)

**influenceBitMask**	PropTypes.number

This property is used to make lights apply to specific nodes. Lights and nodes in the scene can be assigned bit-masks to determine how each light influences each node.

During rendering, Phantom compares each light's influenceBitMask with each node's lightReceivingBitMask and shadowCastingBitMask. The bit-masks are compared using a bitwise AND operation:

If (influenceBitMask & lightReceivingBitMask) != 0, then the light will illuminate the node (and the node will receive shadows cast from objects occluding the light).

If (influenceBitMask & shadowCastingBitMask) != 0, then the node will cast shadows from the light.

The default mask is 0x1.

**intensity**	PropTypes.number

The brightness of the light. Set to 1000 for normal intensity. The intensity is simply divided by 1000 and multiplied by the light's color.

Lower intensities will decrease the brightness of the light, and higher intensities will increase the brightness of the light.

The default intensity is 1000.

**shadowBias**	PropTypes.number

The amount of bias to apply to the Z coordinate when performing the shadow depth comparison. This reduces shadow acne, but large biases can cause "peter panning".

The default value is 0.005.

**shadowFarZ**	PropTypes.number

The far clipping plane to use when rendering shadows. Shadows are only cast by and on surfaces closer than this plane.

This value defines the units away the far clipping plane is from the shadowOrthographicPosition in the direction of the light.

The shadow bounds constructed from this property, shadowNearZ, and shadowOrthographicSize should be kept as tight as possible to maximize the resolution of shadows.

The default value is 20.

**shadowNearZ**	PropTypes.number

The near clipping plane to use when rendering shadows. Shadows are only cast by and on surfaces further away than this plane.

This value defines the units away the near clipping plane is from the shadowOrthographicPosition in the direction of the light.

The shadow bounds constructed from this property, shadowFarZ, and shadowOrthographicSize should be kept as tight as possible to maximize the resolution of shadows.

The default value is 0.1.

**shadowOrthographicSize**	PropTypes.number

The orthographic size determines the width and height of the area, centered at shadowOrthographicPosition, that should be rendered to the shadow map.

A larger value means more of the scene will be shadowed, but at lower resolution.

The shadow bounds constructed from this property, shadowFarZ, and shadowOrthographicSize should be kept as tight as possible to maximize the resolution of shadows.

The default value is 20.

**shadowOrthographicPosition**	PropTypes.arrayOf(PropTypes.number)

The center of the shadow map created by this directional light. Although directional lights have no center, the shadow map must have a center.

**shadowMapSize**	PropTypes.number

The size of the shadow map used to cast shadows for this light.

Shadows are created by rendering the silhouettes of scene geometry onto a 2D image from the point of view of the light, then projecting that image onto the final view.

Larger shadow maps result in higher resolution shadows, but can have a higher memory and performance cost. Smaller shadow maps are faster but result in pixelated edges.

The default value is 1024.

**shadowOpacity**	PropTypes.number

The opacity of the shadow. 1.0 creates a pitch black shadow.

**temperature**	PropTypes.number

The temperature of the light, in Kelvin. Phantom will derive a hue from this temperature and multiply it by the light's color. To model a physical light with a known temperature, you can leave the color of this Light set to (1.0, 1.0, 1.0) and set its temperature only.

The default value for temperature is 6500K, which represents pure white light.

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