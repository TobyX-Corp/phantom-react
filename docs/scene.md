# Scene

A Scene is the top most component for each scene in a Phantom application. Please see our Scene Guide for more information.

Example use:

```JavaScript
<Scene onClick={this._onClick}>
  <Sphere position={[0, 0 , -1]} />
<Scene/>
Props
Optional Props
PropKey	PropType
dragPlane	PropTypes.shape({
planePoint:PropTypes.arrayOf(PropTypes.number),
planeNormal:PropTypes.arrayOf(PropTypes.number),
maxDistance:PropTypes.number
})
```

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

**ignoreEventHandling**	PropTypes.bool

When set to true, this control will ignore events and not prevent controls behind it from receiving event callbacks.

The default value is false.

**onCameraTransformUpdate**	PropTypes.func

A callback invoked when the camera changes (at most, once per frame).

Returns the value as an object:

{ cameraTransform : { position : [posX, posY, posZ], rotation : [rotX, rotY, rotZ], forward : [forwardX, forwardY, forwardZ], up : [upX, upY, upZ], } }

pos - position (in world coordinates) of the camera
rot - rotation (in world coordinates) of the camera in Euler angles (degrees).
forward - the forward vector of the camera (in world coordinates
up - the up vector of the camera (in world coordinates)

**onClick**	React.PropTypes.func

Function to be invoked when a user clicks on a scene. This is ONLY invoked if a click is not captured on another object within a scene.

Defining this can be used to register clicks for 360 Photos and videos.

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

This is ONLY invoked if a click is not captured on another object within a scene.

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

Function to be invoked when the user hovers on on the scene. If this is defined, it is invoked ONLY if no other object captures the onHover event.

For example:
_onHover(isHovering, position, source) { if(isHovering) { // user is hovering on the scene. } else { // user is hovering on another object in the scene. } }

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

**onPlatformUpdate**	React.PropTypes.func

Callback method set to be notified of platform specific information like headset type or controller type.

Example Code:
_onPlatformUpdate(platformInfo){ var platform = platformInfo.vrPlatform; var headset = platformInfo.headset; var controller = platformInfo.controller; }

List of supported platforms:

| |Cardboard iOS|Cardboard Android|Daydream|GearVR
|:-------------------|:---------------|:---------------|:---------------|:---------------|
|Platform|gvr|gvr|gvr|ovr-mobile|
|Headset|cardboard|cardboard|daydream|gearvr|
|Controller|cardboard|cardboard|daydream|gearvr|

**onRotate**	React.PropTypes.func

Called when the user performs a rotation touch gesture on the control. Rotation factor is returned in degrees.

When setting rotation, the rotation should be relative to it's current rotation, not set to the absolute value of the given rotationFactor.

For example:
_onRotate(rotateState, rotationFactor, source) { if (rotateState == 3) { //set to current rotation - rotationFactor. return; } //update rotation using setNativeProps },

rotationFactor can be the following values:

|State Value|Description|
|:------|:----------:|
|1| Rotation Start: Triggered when the user has started a rotation gesture.|
|2| Rotation Move: Triggered when the user has adjusted the rotation, moving both fingers. |
|3| Rotation End: When the user has finishes the rotation gesture and released both touch points. |

This event is only available in AR.

**onScroll**	React.PropTypes.func

NEED TO UPDATE DESCRIPTION

**onSwipe**	React.PropTypes.func

NEED TO UPDATE DESCRIPTION

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

**physicsWorld**	PropTypes.shape({
gravity: PropTypes.arrayOf(PropTypes.number).isRequired,
drawBounds: PropTypes.bool,
})

Contains and processes the physics bodies of all phantom controls that have been physics enabled in this scene. Environmental physics properties are also applied, like gravity.

|SubPropType|Description|
|:------|:----------:|
|gravity| A constant gravitational acceleration that is applied to all physics body objects in this scene. It is a vector in the terms of meters per second. Defaults to [0, -9.81, 0].|
|drawBounds| If true, renders the mesh representing the shape of all physics bodies in this scene.|

**soundRoom**	PropTypes.shape

Describes the acoustic properties of the room around the user by allowing the developer to describe the room based on its dimensions and its surface properties. Note: This is not supported in Cardboard iOS.

Code Example:
soundRoom={{ size: {[2,2,2]}, wallMaterial: "acoustic_ceiling_tiles", ceilingMaterial:"glass_thin", floorMaterial:"concrete_block_coarse" }}

List of soundRoom properties:

|Name|Description|
|:-------------------|:---------------|
|size|The 3D dimensions of the room.|
|wallMaterial|Sound Material for the four walls.|
|ceilingMaterial|Sound Material for the ceiling|
|floorMaterial|Sound Material for the floor|

List of Supported Sound Materials:

|Name|Description|
|:-------------------|:---------------|
|acoustic_ceiling_tiles|Acoustic ceiling tiles, absorbs most frequencies.|
|brick_bare|Bare brick, relatively reflective.|
|brick_painted|Painted brick|
|concrete_block_coarse|Coarse surface concrete block.|
|concrete_block_painted|Painted concrete block.|
|curtain_heavy|Heavy curtains.|
|fiber_glass_insulation|Fiber glass insulation.|
|glass_thin|Thin glass.|
|glass_thick|Thick glass.|
|grass|Grass.|
|linoleum_on_concrete|Linoleum on concrete.|
|marble|Marble.|
|metal|Galvanized sheet metal.|
|parquet_on_concrete|Wooden parquet on concrete.|
|plaster_rough|Rough plaster surface.|
|plaster_smooth|Smooth plaster surface.|
|plywood_panel|Plywood panel|
|polished_concrete_or_tile|Polished concrete or tile surface.|
|sheet_rock|Sheet rock|
|transparent|Acoustically transparent material, reflects no sound.|
|water_or_ice_surface|Surface of water or ice.|
|wood_ceiling|Wooden ceiling.|
|wood_panel|Wood paneling.|

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

**async findCollisionsWithRayAsync(from: arrayOf(number), to: arrayOf(number), closest: bool, Tag: string)**

This function is used to find collisions between physics bodies and a line emanating from the given from position to the to position. Collided components have their onCollision callbacks invoked.

|Parameters|Description|
|---|---|
|from|the origin position of the line|
|to|the end position of the line|
|closest| if true, only the first object intersected by the line (determined by closest distance to the origin) receives the onCollision callback|
|Tag|the string tag passed to collided components' onCollision callbacks|

|Return Values|Description|
|---|---|
|hasHit| true/false whether or not a collision was detected|

**async findCollisionsWithShapeAsync(from:arrayOf(number), to:arrayOf(number), shapeString: string, shapeParam: object, Tag: string)**

This function is used to find collisions between physics bodies and the given shape moving from the given from position to the to position. Collided components have their onCollision callbacks invoked.

If the from and to positions are the same, then this function invokes the onCollision callbacks of all components within the given shape.

|Parameters|Description|
|---|---|
|from|the origin position of the line|
|to|the end position of the line|
|shapeString| the name of the shape to use in this test|
|shapeParam| the configuration of the shape used in this collision test|
|Tag|the string tag passed to collided components' onCollision callbacks|

|Return Value|Description|
|---|---|
|hasHit| true/false whether or not a collision was detected|

**async getCameraOrientationAsync()**

This function is used to fetch the current Camera's orientation.

|Return Value|Description|
|---|---|
|orientation|an object that contains the camera's position, rotation, forward vector and up vector as number arrays|

**setNativeProps(nativeProps: object)**

A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });