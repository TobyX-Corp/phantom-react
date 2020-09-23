# ViroAnimations

The ViroAnimations class is used to create reusable animations that are applied to a ViroReact component. For more information on how animations work, please read our Animation Guide.

## Methods

**static registerAnimations(animations:{[key:string]: any})**

Takes a dictionary object that is a set of key/value pairs. The key being a string representing the animation name. The value being either a list of properties that conforms ViroAnimationProps or an array that represents a chained animation.

## ViroReact Animation Props

## Required props

**duration**	ReactPropTypes.number

The length of the animation in milliseconds. 1000 milliseconds = 1 second

**properties**	ReactPropTypes.shape

A list of properties that represent the final value of the object when the animation completes. On animation start the current value of the components property value will be the start value and will animate to the final value specified here.

List of animatable properties:

|Name|Description|
|:-------------------|:---------------|
|opacity|Opacity of an object. A value of 0 is fully transparent. Anything >= 0 is a range of partially transparency, becoming more opaque when approaching 1 and fully opaque when equal to 1.|
|positionX|Position of object on x-axis.|
|positionY|Position of object on y-axis.|
|positionZ|Position of object on z-axis.|
|rotateX|Rotation of object around x-axis, in degrees.|
|rotateY|Rotation of object around y-axis, in degrees.|
|rotateZ|Rotation of object around z-axis, in degrees.|
|scaleX|Scale value of object on x-axis.|
|scaleY|Scale value of object on y-axis.|
|scaleZ|Scale value of object on z-axis.|
|translateX|Change position of object on x-axis.|
|translateY|Change position of object on y-axis.|
|translateZ|Change position of object on z-axis.|
|color|The color of the light. The default light color is white.|
|material| Material that was created via ViroMaterials.createMaterials() with properties (like diffuseColor) that we wish to animate toward.|

Accepted values for scale, translate, position and rotate properties can be a string or number.

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

Accepted values for scale, translate, position and rotate properties can be a string or number.

Specifying additive values
If you wish to do additive animations, a string value represents the amount to add to the property during the animation. Example: rotateX:"+45".

**easing**	

**properties**	

## Optional props

**delay**	ReactPropTypes.number

The amount to delay the animation when started, specified in milliseconds. Default is 0.

**easing**	ReactPropTypes.string

The pacing of the animation.

Linear: the animation will occur evenly over its duration

EaseIn: the animation will begin slowly and then speed up as it progresses

EaseOut: the animation will begin quickly and then slow as it progresses

EaseInEaseOut: the animation will begin slowly, accelerate through the middle of its duration, and then slow again before completing

Bounce: the animation will begin quickly and overshoot* its final position before settling into its final resting place