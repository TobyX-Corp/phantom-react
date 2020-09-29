# OmniLight

A light object that emits a omni light. See our Lighting and Material Guide for more information on lights in a scene.

Example use:

```JavaScript
<OmniLight
    color="#ffffff"
    attenuationStartDistance={2}
    attenuationEndDistance={6}
    position={[0,-5,5]}
 />
```

## Props

## Optional Props

**attenuationEndDistance**	PropTypes.number

Objects positioned at a distance greater than the attenuation end distance from the lights position will receive no illumination from this light.

The default value is 10.

**attenuationStartDistance**	PropTypes.number

Objects positioned within the attenuation start distance will receive the lights full illumination.

Objects positioned between the start and end distance will receive a proportion of the lights illumination, transitioning from full illumination to no illumination the further out from the lights position the object is.

The default value is 2.

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

Set the intensity of this Light. Set to 1000 for normal intensity. When using physically-based rendering, this value is specified in Lumens. When using non-physical rendering, the intensity is simply divided by 1000 and multiplied by the Light's color.

Lower intensities will decrease the brightness of the light, and higher intensities will increase the brightness of the light.

**position**	PropTypes.arrayOf(PropTypes.number)

Cartesian position of the light in 3D world space, specified as [x, y, z]. Default position is [0,0,0].

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
