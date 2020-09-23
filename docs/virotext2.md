# ViroText

A component that provides 2D Text functionality.

Example use:

```JavaScript
<ViroText
    text="Hello World"
    textAlign="left"
    textAlignVertical="top"
    textLineBreakMode="justify"
    textClipMode="clipToBounds"
    color="#ff0000"
    width={2} height={2}
    style={{fontFamily:"Arial", fontSize:20, fontWeight:400, fontStyle:"italic", color:"#0000FF"}}
    position={[0,0,-5]}
 />
```

**Typeface**

The typeface to use for text is determined by the fontFamily in its style property. Not all platforms support all font families. If a font family is not supported on a given device, the system will fall back to using that platform's default system font.

The fontFamily string may contain a comma-separated list of typefaces. If so, the best typeface in the list will be chosen for each glyph in the text. For example, if fontFamily is set to "Roboto, NotoSansCJK", then Roboto will be used for all English glyphs and NotoSansCJK will be used for all Chinese, Japanese, and Korean glyphs.

**Style and Weight**

The typeface can be further customized via fontStyle in the style property: set this to "italic" to render the italicized version of the typeface, if available.

Finally, you can use fontWeight in the style property to specify the weight of the font, using numeric values ranging from 100 (ultra-light) to 900 (extra-black). Not all fonts support all weights, in which case Viro will render the nearest supported weight. Commonly supported weights are '400' (regular), and '700' (bold).

**Sizing**

Use the fontSize in the text's style property to size the text. The actual size of text in a scene is determined by three things:

The fontSize property: this determines the size of the font textures used. Increasing fontSize creates bigger, sharper fonts, but uses much more memory. Using too small fontSize will make the text appear blurry.

The scale of the text. Scaling the text can increase text size, but will make the fonts more blurry. Try to avoid scaling fonts where possible.

The distance of the text from the user. We are in 3D space, so the further away text is from the camera, the smaller it will appear. Use trial and error with your headset to discover the correct font sizes.

In general, try to use the smallest fontSize possible that reaches the sharpness desired at the given distance from the camera.

**3D Text**

Set the extrusionDepth of the text to a value greater than zero to enable 3D text. This property specifies the 'depth' of the 3D text in local node coordinates.

If the Text is rendered in 3D (if extrusionDepth > 0), then you can apply three materials to the text: material 0 will represent the front of the Text, material 1 will represent the back of the Text, and material 2 will represent the sides of the Text. You can set the colors of these materials to change the colors of different parts of the Text, or even set different light models on each material. For example:

```JavaScript
// Inside render function

<ViroText fontSize=24
          style={styles.boldFont} position={[0, 0, 0]}
          width={20} height={5} extrusionDepth={8}
          materials={["frontMaterial", "backMaterial", "sideMaterial"]}
          text="Bold 3D Text (white, blue, red)" />
            
...
          
// Outside render function
          
var styles = StyleSheet.create({
    boldFont: {
         color: '#FFFFFF',
         flex: 1,
         textAlignVertical: 'center',
         textAlign: 'center',
         fontWeight: 'bold',
    },
});

ViroMaterials.createMaterials({
    frontMaterial: {
      diffuseColor: '#FFFFFF',
    },
    backMaterial: {
      diffuseColor: '#FF0000',
    },
    sideMaterial: {
      diffuseColor: '#0000FF',
    },
});
```

**Outline and Drop Shadow**

The outerStroke property can be used to render an outline surrounding the text or a drop shadow extending to the bottom right of the text. These are often used to make the text more legible over busy backgrounds. The ``outerStroke``` lets you set the type of stroke (e.g. outline or drop-shadow), the width of the outer stroke, and the stroke's color.

The width of the outer stroke is given in pixels: a width of 2 displays a fairly standard outline or drop shadow.

The example below shows two text components, each with a different stroke:

```JavaScript
// Thick red outline (width 8)
<ViroText fontSize=24
          style={styles.italicFont} position={[0, 4, 0]}
          width={20} height={5}
          outerStroke={{type:"Outline", width:8, color:'#FF0000'}}
          text="Thick red outline" />

// Thin grey drop shadow  
<ViroText fontSize=24
          style={styles.boldFont} position={[0, 3, 0]}
          width={20} height={5}
          outerStroke={{type:"DropShadow", width:2, color:'#444444'}}
          text="Grey drop shadow" />
```

**Bounding Box**

Text is contained within a bounding box defined by its width and height properties. This bounding box is invisible, but determines how the text wraps, aligns, and clips. Note that width and height have no bearing on the size of the text.

## Props

## Optional Props

**PropKey**	PropType
animation	PropTypes.shape({
name: PropTypes.string,
delay: PropTypes.number,
loop: PropTypes.bool,
onStart: PropTypes.func,
onFinish: PropTypes.func,
run: PropTypes.bool,
})

A collection of parameters that determine if this component should animate. For more information on animated components please see our Animation Guide.

**color**	ColorPropType

The color of the text. The default text color is white.

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

**dragPlane**	PropTypes.shape({
planePoint:PropTypes.arrayOf(PropTypes.number),
planeNormal:PropTypes.arrayOf(PropTypes.number),
maxDistance:PropTypes.number
})

When a drag type of "FixedToPlane" is given, dragging is limited to a user defined plane. The dragging behavior is then configured by this property (specified by a point on the plane and its normal vector). You can also limit the maximum distance the dragged object is allowed to travel away from the camera/controller (useful for situations where the user can drag an object towards infinity).

**dragType**	PropTypes.oneOf(["FixedDistance", "FixedToWorld"])

Determines the behavior of drag if onDrag is specified.

|Value|Description|
|:------|:----------:|
|FixedDistance| Dragging is limited to a fixed radius around the user, dragged from the point at which the user has grabbed the geometry containing this draggable node|
|FixedDistanceOrigin| Dragging is limited to a fixed radius around the user, dragged from the point of this node's position in world space.|
|FixedToWorld| Dragging is based on intersection with real world objects. Available only in AR |
|FixedToPlane| Dragging is limited to a fixed plane around the user. The configuration of this plane is defined by the dragPlane property.|

The default value is "FixedDistance".

**extrusionDepth**	PropTypes.number

Set the extrusion depth of the text. Set this to 0 to render 2D Text (e.g. bitmap text). If extrusionDepth is greater than 0, then the Text will be rendered in 3D: it will be vectorized with sides of length extrusionDepth. See above for more details.

**height**	PropTypes.number

The width of the the text in 3D world space. If not in a ViroFlexView the default is set to 1.

**ignoreEventHandling**	PropTypes.bool

When set to true, this control will ignore events and not prevent controls behind it from receiving event callbacks.

The default value is false.

**lightReceivingBitMask**	PropTypes.number

A bit mask that is bitwise and-ed (&) with each light's influenceBitMask. If the result is > 0, then the light will illuminate this object. For more information please see the Lighting and Materials Guide.

**maxLines**	PropTypes.number

The maximum number of lines the text should take. The text will automatically be truncated if it exceeds the maxLines specified.

**onClick**	React.PropTypes.func

Called when an object has been clicked.

Example code:
_onClick(position, source) { // user has clicked the object }

The position parameter represents the position in world coordinates on the object where the click occurred.

For the mapping of sources to controller inputs, see the Events section.

**onClickState**	React.PropTypes.func

Called for each click state an object goes through as it is clicked. Supported click states and their values are the following:

|State Value|Description|
|:------|:----------:|
|1| Click Down: Triggered when the user has performed a click down action while hovering on this control.|
|2| Click Up: Triggered when the user has performed a click up action while hovering on this control.|
|3| Clicked: Triggered when the user has performed both a click down and click up action on this control sequentially, thereby having "Clicked" the object.|

Example code:
_onClickState(stateValue, position, source) { if(stateValue == 1) { // Click Down } else if(stateValue == 2) { // Click Up } else if(stateValue == 3) { // Clicked } }

For the mapping of sources to controller inputs, see the Events section.

**onCollision**	React.PropTypes.func

Called when this component's physics body collides with another component's physics body. Also invoked by ViroScene/ViroARScene's findCollisions... functions.

|Return Value | Description |
|---|---|
|viroTag | the given viroTag (string) of the collided component |
|collidedPoint | an array of numbers representing the position, in world coordinates, of the point of collision|
|collidedNormal | an array representing the normal of the collision in world coordinates. |

**onDrag**	React.PropTypes.func

Called when the view is currently being dragged. The dragToPos parameter provides the current 3D location of the dragged object.

Example code:
_onDrag(dragToPos, source) { // dragtoPos[0]: x position // dragtoPos[1]: y position // dragtoPos[2]: z position }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard iOS

**onFuse**	PropTypes.oneOfType

PropTypes.oneOfType([ React.PropTypes.shape({ callback: React.PropTypes.func.isRequired, timeToFuse: PropTypes.number }), React.PropTypes.func, ])

As shown above, onFuse takes one of the types - either a callback, or a dictionary with a callback and duration.

It is called after the user hovers onto and remains hovered on the control for a certain duration of time, as indicated in timeToFuse that represents the duration of time in milliseconds.

While hovering, the reticle will display a count down animation while fusing towards timeToFuse.

Note that timeToFuse defaults to 2000ms.

For example:
_onFuse(source){ // User has hovered over object for timeToFuse milliseconds }

For the mapping of sources to controller inputs, see the Events section.

**onHover**	React.PropTypes.func

Called when the user hovers on or off the control.

For example:
_onHover(isHovering, position, source) { if(isHovering) { // user is hovering over the box } else { // user is no longer hovering over the box } }

For the mapping of sources to controller inputs, see the Events section.

**onPinch**	React.PropTypes.func

Called when the user performs a pinch gesture on the control. When the pinch starts, the scale factor is set to 1 is relative to the points of the two touch points.

For example:
_onPinch(pinchState, scaleFactor, source) { if(pinchState == 3) { // update scale of obj by multiplying by scaleFactor when pinch ends. return; } //set scale using native props to reflect pinch. }

pinchState can be the following values:

|State Value|Description|
|:------|:----------:|
|1| Pinch Start: Triggered when the user has started a pinch gesture.|
|2| Pinch Move: Triggered when the user has adjusted the pinch, moving both fingers. |
|3| Pinch End: When the user has finishes the pinch gesture and released both touch points. |

This event is only available in AR.

**onRotate**	React.PropTypes.func

Called when the user performs a rotation touch gesture on the control. Rotation factor is returned in degrees.

When setting rotation, the rotation should be relative to it's current rotation, not set to the absolute value of the given rotationFactor.

For example:
_onRotate(rotateState, rotationFactor, source) { if (rotateState == 3) { //set to current rotation - rotationFactor. return; } //update rotation using setNativeProps },

rotateState can be the following values:

|State Value|Description|
|:------|:----------:|
|1| Rotation Start: Triggered when the user has started a rotation gesture.|
|2| Rotation Move: Triggered when the user has adjusted the rotation, moving both fingers. |
|3| Rotation End: When the user has finishes the rotation gesture and released both touch points. |

This event is only available in AR.

**onScroll**	React.PropTypes.func

Called when the user performs a scroll action, while hovering on the control.

For example:
_onScroll(scrollPos, source) { // scrollPos[0]: x scroll position from 0.0 to 1.0. // scrollPos[1]: y scroll position from 0.0 to 1.0. }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS)

**onSwipe**	React.PropTypes.func

Called when the user performs a swipe gesture on the physical controller, while hovering on this control.

For example:
_onSwipe(state, source) { if(state == 1) { // Swiped up } else if(state == 2) { // Swiped down } else if(state == 3) { // Swiped left } else if(state == 4) { // Swiped right } }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS)

**onTouch**	React.PropTypes.func

Called when the user performs a touch action, while hovering on the control. Provides the touch state type, and the x/y coordinate at which this touch event has occurred.

|State Value|Description|
|:------|:----------:|
|1| Touch Down: Triggered when the user makes physical contact with the touch pad on the controller. |
|2| Touch Down Move: Called when the user moves around the touch pad immediately after having performed a Touch Down action. |
|3| Touch Up: Triggered after the user is no longer in physical contact with the touch pad after a Touch Down action. |

For example:
_onTouch(state, touchPos, source) { var touchX = touchPos[0]; var touchY = touchPos[1]; if(state == 1) { // Touch Down } else if(state == 2) { // Touch Down Move } else if(state == 3) { // Touch Up } }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS).

**onTransformUpdate**	PropTypes.func

A function that is invoked when the component moves and provides an array of numbers representing the component's position in world coordinates.

**outerStroke**	PropTypes.shape({
type: PropTypes.oneOf(['None', 'Outline', 'DropShadow']),
width: PropTypes.number,
color: ColorPropType
})

Set an optional outer stroke type, width, and color to use for this text. The outer stroke can be used to render an outline surrounding the text or drop shadow extending to the bottom right of the text. These are often used to make the text more legible over busy backgrounds. The width of the outer stroke is given in pixels: a width of 2 displays a fairly standard outline or drop shadow.

Note that outer strokes do not apply to 3D text (text with extrusion depth greater than zero).

To remove the outer stroke, set the outerStroke to 'None'. In this case the outerStrokeWidth and outerStrokeColor are be ignored.

**physicsBody**	PropTypes.shape({..physics.api..}),

Creates and binds a physics body that is configured with the provided collection of physics properties associated with this control.

For more information on physics components, please see the physics.api.

**position**	PropTypes.arrayOf(PropTypes.number)

Cartesian position of the text in 3D world space, specified as [x, y, z].

**rotation**	PropTypes.arrayOf(PropTypes.number)

The rotation of the text around it's local axis specified as Euler angles [x, y, z]. Units for each angle are specified in degrees.

**rotationPivot**	PropTypes.arrayOf(PropTypes.number)

Cartesian position in [x,y,z] about which rotation is applied relative to the component's position.

**shadowCastingBitMask**	PropTypes.number

A bit mask that is bitwise and-ed (&) with each light's influenceBitMask. If the result is > 0, then this object will cast shadows from the light. For more information please see the Lighting and Materials Guide.

**style**	stylePropType

The style properties define the typeface, style, size, and weight of the font. See 'Style Props' below.

Style properties also determine the position and scale of the component within a ViroFlexView. Please see the UI Controls & Flexbox guide and Styles reference for more information.

**text**	PropTypes.string

The text that should be displayed.

**textAlign**	PropTypes.oneOf(['left', 'right', 'center'])

Horizontal alignment of the text. Aligns with respect to the bounding box of this text defined by width and height. Supported values are left, right, and center.

**textAlignVertical**	PropTypes.oneOf(['top', 'bottom', 'center'])

Vertical alignment of the text. Aligns with respect to the bounding box of this text defined by width and height. Supported values are top, bottom, and center.

**textClipMode**	PropTypes.oneOf(['none', 'clipToBounds'])

Set to clipToBounds to clip this text to its bounding box defined by width and height. If set to none, the text will overrun its bounds if's larger than them.

**textLineBreakMode**	PropTypes.oneOf(['wordwrap','charwrap','justify','none'])

The line break mode to use for text wrapping. We process line breaks against the width of the text.

Set to wordwrap to introduce line breaks only at word boundaries, whenever the next word overruns the width.

Set to charwrap to introduce line breaks whenever the next character overruns the width. This mode may break words in half across lines.

Set to justify to introduce breaks at word boundaries, and add variable internal spacing between words, at the optimal points in the text to reduce the 'raggedness' of the text edges.

**transformBehaviors**	PropTypes.arrayOf(PropTypes.string)

An array of transform constraints that affect the transform of the object. For example, putting the value "billboard" will ensure the box is facing the user as the user rotates their head on any axis. This is useful for icons or text where you'd like the box to always face the user at a particular rotation.

Allowed values(values are case sensitive):

|Value|Description|
|:------|:----------:|
|billboard| Billboard object on x,y,z axis |
|billboardX| Billboard object on the x axis|
|billboardY| Billboard object on the y axis|

**width**	PropTypes.number

The width of the the text in 3D world space. If not in a ViroFlexView the default is set to 1.

**viroTag**	PropTypes.string

A tag given to other components when their physics body collides with this component's physics body. Refer to physics for more information.

**visible**	PropTypes.bool

False if the text should be hidden. By default the text is visible and this value is true.

**renderingOrder**	PropTypes.number

This determines the order in which this Node is rendered relative to other Nodes. Nodes with greater rendering orders are rendered last. The default rendering order is zero. For example, setting a Node's rendering order to -1 will cause the Node to be rendered before all Nodes with rendering orders greater than or equal to 0.

## Style Props

**fontFamily**	PropTypes.string

The comma-separated names of the font families that should be used to render this ViroText. The font families, in conjunction with the font size, weight, and style, fully specify the font used for each glyph of the Text.

The fontFamily string may contain a comma-separated list of typefaces. If so, the best typeface in the list will be chosen for each glyph in the Text. For example, if fontFamily is set to 'Roboto, NotoSansCJK', then Roboto will be used for all English glyphs and NotoSansCJK will be used for all Chinese, Japanese, and Korean glyphs.

If a font family cannot be found, the default system typeface will be used in its place.

**fontSize**	PropTypes.number

Set the point size of the font to use when rendering this ViroText.

**fontStyle**	PropTypes.string

Set the style of the font. Supported values are normal and italic.

Note: not all fonts support all styles. If a style is not supported, Viro will fallback to using the default style.

**fontWeight**	PropTypes.string

Set the weight of the font. Supported values are:

'normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900', where:

'100' --> Ultra Light
'200' --> Thin
'300' --> Light
'400' --> Normal
'500' --> Medium
'600' --> Semibold
'700' --> Bold
'800' --> Heavy
'900' --> Extra Black

Note: not all fonts support all weights. If a weight is not supported, Viro will instead render the nearest supported weight. Commonly supported weights are '400' (normal), and '700' (bold).

## Methods

**async getBoundingBoxAsync()**

Async function that returns the component's bounding box in world coordinates.

Returns a Promise that will be completed with the following object:

{ `boundingBox` : { `minX` : number, `maxX` : number, `minY` : number, `maxY` : number, `minZ` : number, `maxZ` : number } }

**async getTransformAsync()**

Async function that returns the component's transform (position, scale and rotation).

|Return value | Description|
|---|---|
| transform | an object that contains "position", "scale" and "rotation" keys which point to number arrays |

**applyImpulse(force: arrayOf(number), position: arrayOf(number))**

A function used with physics to apply an impulse (instantaneous) force to an object with a physics body.

|Parameter|Description|
|---|---|
|force |an array of magnitudes to be applied as force (N) to the object in the positive x, y and z directions|

**applyTorqueImpulse(torque: arrayOf(number), position: arrayOf(number))**

A function used with physics to apply an impulse (instantaneous) torque to an object with a physics body.

|Parameter|Description|
|---|---|
|torque |an array of magnitudes to be applied as a torque (N * m) to the object in the positive x, y and z directions at the given position|
|position | a position relative to the object from which to apply the given torque|

**setVelocity(velocity: arrayOf(number))**

A function used with physics to set the velocity of an object with a physics body.

|Parameter|Description|
|---|---|
|velocity | an array of numbers corresponding to x, y, and z velocity |

**setNativeProps(nativeProps: object)**

A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });