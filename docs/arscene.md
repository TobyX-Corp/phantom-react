# ARScene

The ARScene component allows developers to logically group their experiences and components and switch between them using the ARSceneNavigator.

This component also hosts various properties that enable developers to control and interact with the AR subsystem. Like displayPointCloud which configures the renderer to draw the AR point cloud. The onAnchorFound|Updated|Removed functions work in conjunction with ARPlane's manual anchoring mode to enable developers to fully control their experience.

Example use:

```JavaScript
<ARScene onTrackingUpdated={this._trackingUpdated} >
  <ARPlane>
    <Box position={[0, .5, 0]} />
  </ARPlane>
</ARScene>
```

## Props

## Optional Props

**anchorDetectionTypes**	PropTypes.string or PropTypes.arrayOf(PropTypes.string)

Determines what types of anchors the scene should return.

Currently supports the following values:

None

PlanesHorizontal

PlanesVertical

**displayPointCloud**	PropTypes.boolean or {pointCloudOptions} described below.

Setting this property to true draws the point cloud using a default configuration.

Setting this property to false disables the drawing of the point cloud.

This property can also take a dictionary of properties which enable point cloud drawing with the given pointCloudOptions:

|Key|Description|
|---|---|
| imageSource | image used to represent each point|
|imageScale | scale of the image used for each point, the default is [.01,.01,.01]|
|maxPoints| the max number of points drawn each frame|

Example:
<ARScene displayPointCloud={{ imageSource : require("./res/pointCloudPoint.png"), imageScale : [.02,.02,.02], maxPoints : 100 }} />

**dragPlane**	PropTypes.shape({
planePoint:PropTypes.arrayOf(PropTypes.number),
planeNormal:PropTypes.arrayOf(PropTypes.number),
maxDistance:PropTypes.number
})

When a drag type of "FixedToPlane" is given, dragging is limited to a user defined plane. The dragging behavior is then configured by this property (specified by a point on the plane and its normal vector). You can also limit the maximum distance the dragged object is allowed to travel away from the camera/controller (useful for situations where the user can drag an object towards infinity).

**dragType**	PropTypes.oneOf(["FixedDistance", "FixedToWorld"])

Determines the behavior of drag if onDrag is specified.

|Value|Description|
|:- -----|:- ---------:|
|FixedDistance| Dragging is limited to a fixed radius around the user, dragged from the point at which the user has grabbed the geometry containing this draggable node|
|FixedDistanceOrigin| Dragging is limited to a fixed radius around the user, dragged from the point of this node's position in world space.|
|FixedToWorld| Dragging is based on intersection with real world objects. Available only in AR |
|FixedToPlane| Dragging is limited to a fixed plane around the user. The configuration of this plane is defined by the dragPlane property.|

The default value is "FixedDistance".

**ignoreEventHandling**	PropTypes.bool

When set to true, this control will ignore events and not prevent controls behind it from receiving event callbacks.

The default value is false.

**onAmbientLightUpdate**	PropTypes.func

Function that provides an estimate of the light intensity and color temperature.

|Parameter|Description|
|- --|- --|
|intensity| a number representing the estimated intensity of the ambient light as detected by the camera|
|colorTemperature|a number representing the estimated colorTemperature of the ambient light as detected by the camera|

**onAnchorFound**	PropTypes.func

Called when the AR system finds an Anchor.

|Parameters | Description |
|---|---|
|anchor| see Anchor |

**onAnchorUpdated**	PropTypes.func

Called when the AR system detects changed properties of a previously found Anchor.

|Parameters | Description |
|---|---|
|anchor| see Anchor |

**onAnchorRemoved**	PropTypes.func

Called when the AR system detects that a previously found Anchor no longer exists

|Parameters | Description |
|---|---|
|anchor| see Anchor |

**onARPointCloudUpdate**	PropTypes.func

This callback will invoke whenever the point cloud is updated.

|Parameters | Description|
|---|---|
|pointCloud|A Javascript object containing the point cloud in the format below|

{ "pointCloud" : { "points" : [ [x, y, z, confidence], ... ], "identifiers" : [ identifier1, identifier2, ... ] } }

where:

x, y, z - represents the x,y,z coordinates of the point in world space

confidence - is a float value from 0 -> 1 that represents the confidence that the underlying system has for this point (Android only)

identifier - is a number that is unique to the corresponding point in the points array that allow the user to track points between point cloud updates (iOS only)

**onCameraARHitTest**	PropTypes.func

If defined, a callback is invoked returning the camera position and orientation along with a set of hit results in an array consisting of ARHitTestResult objects. The hit test results correspond to the AR points found by the AR system defined by the ray shooting from the camera direction and position.

This can be used to show a tracking plane placed in the world while the user moves or to inform the user of the confidence of the area being looked at.

If defined, this callback is invoked as often as possible in order to keep with the frame rate.

The following object structure is returned:

{ "hitTestResults": [ [ARHitTestResult1], [ARHitTestResult2],...] "cameraOrientation": { position: [x, y, z], rotation:[x,y,z], forward:[x,y,z], up[x,y,z] } }

ARHitTestResult format found here.

cameraOrientation consists of position, the rotation of the camera in degrees, and the current forward and up vectors of the camera.

**onCameraTransformUpdate**	PropTypes.func

A callback invoked when the camera changes (at most, once per frame).

Returns the value as an object:

{ cameraTransform : { position : [posX, posY, posZ], rotation : [rotX, rotY, rotZ], forward : [forwardX, forwardY, forwardZ], up : [upX, upY, upZ], } }

pos - position (in world coordinates) of the camera

rot - rotation (in world coordinates) of the camera in Euler angles (degrees).

forward - the forward vector of the camera (in world coordinates

up - the up vector of the camera (in world coordinates)

**onClick**	PropTypes.func

Function to be invoked when a user clicks on a scene. This is ONLY invoked if a click is not captured on another object within a scene.

Defining this can be used to register clicks for 360 Photos and videos.

**onClickState**	PropTypes.func

Called for each click state an object goes through as it is clicked. Supported click states and their values are the following:

|State Value|Description|
|:- -----|:- ---------:|
|1| Click Down: Triggered when the user has performed a click down action while hovering on this control.|
|2| Click Up: Triggered when the user has performed a click up action while hovering on this control.|
|3| Clicked: Triggered when the user has performed both a click down and click up action on this control sequentially, thereby having "Clicked" the object.|

Example code:
_onClickState(stateValue, position, source) { if(stateValue == 1) { // Click Down } else if(stateValue == 2) { // Click Up } else if(stateValue == 3) { // Clicked } }

For the mapping of sources to controller inputs, see the Events section.

This is ONLY invoked if a click is not captured on another object within a scene.

**onDrag**	PropTypes.func

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
|:- -----|:- ---------:|
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
|:- ------------------|:- --------------|:- --------------|:- --------------|:- --------------|
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
|:- -----|:- ---------:|
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
|:- -----|:- ---------:|
|1| Touch Down: Triggered when the user makes physical contact with the touch pad on the controller. |
|2| Touch Down Move: Called when the user moves around the touch pad immediately after having performed a Touch Down action. |
|3| Touch Up: Triggered after the user is no longer in physical contact with the touch pad after a Touch Down action. |

For example:
_onTouch(state, touchPos, source) { var touchX = touchPos[0]; var touchY = touchPos[1]; if(state == 1) { // Touch Down } else if(state == 2) { // Touch Down Move } else if(state == 3) { // Touch Up } }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS).

**onTrackingInitialized (Deprecated)**	PropTypes.func

WARN: This function will be deprecated in the upcoming release, in favor of onTrackingUpdated.

Function called when the AR system has properly initialized. The platform maintains a right-handed coordinate system, where the origin of the system is the user's location at the time AR tracking was initialized. The camera's forward vector is [0, 0, -1] and up vector is [0,1,0].

**onTrackingUpdated**	PropTypes.func

Invoked when the tracking state of the device changes. The tracking state indicates how well the device is able to track its position within the real world. Tracking state is subject to lighting conditions, the speed at which the device is moving, and other environmental factors.

Sample code:

(Note that we use Constants to properly compare different tracked states):

_onTrackingUpdated(state, reason) { if (state == Constants.TRACKING_NORMAL){ // Show my AR Scene experience } else if (state == Constants.TRACKING_NONE){ // Prompt user to move phone around } },

Tracking states include:

|AR Tracking State Values|Description|
|:- -----|:- ---------:|
|1: TRACKING_UNAVAILABLE| Tracking is unavailable: the camera's position in the world is not known. |
|2: TRACKING_LIMITED| Tracking is available, but the camera's position in the world may be inaccurate and should not be used with confidence. |
|3: TRACKING_NORMAL| Camera position tracking is providing optimal results. |

For iOS, a possible diagnosis for limited tracking quality is provided in the second parameter: "reason". These states include:

|AR Tracking State Reason|Description|
|:- -----|:- ---------:|
|1: TRACKING_REASON_NONE|The current tracking state is not limited. |
|2: TRACKING_REASON_EXCESSIVE_MOTION| The device is moving too fast for accurate position tracking. |
|3: TRACKING_REASON_INSUFFICIENT_FEATURES | The scene visible to the camera does not contain enough distinguishable features for optimal position tracking. |

**postProcessEffects**	PropTypes.arrayOf(PropTypes.string)

Specifies which post-process effects to enable. Refer to Post-Process Effects for more information.

**physicsWorld**	PropTypes.shape({
gravity: PropTypes.arrayOf(PropTypes.number).isRequired,
drawBounds: PropTypes.bool,
})

Contains and processes the physics bodies of all phantom controls that have been physics enabled in this scene. environmental physics properties are also applied, like gravity.

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
|:- ------------------|:- --------------|
|size|The 3D dimensions of the room.|
|wallMaterial|Sound Material for the four walls.|
|ceilingMaterial|Sound Material for the ceiling|
|floorMaterial|Sound Material for the floor|

List of Supported Sound Materials:

|Name|Description|
|:- ------------------|:- --------------|
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
|- --|- --|
|from|the origin position of the line|
|to|the end position of the line|
|closest| if true, only the first object intersected by the line (determined by closest distance to the origin) receives the onCollision callback|
|Tag|the string tag passed to collided components' onCollision callbacks|

|Return Values|Description|
|- --|- --|
|hasHit| true/false whether or not a collision was detected|

**async findCollisionsWithShapeAsync(from:arrayOf(number), to:arrayOf(number), shapeString: string, shapeParam: object, Tag: string)**

This function is used to find collisions between physics bodies and the given shape moving from the given from position to the to position. Collided components have their onCollision callbacks invoked.

If the from and to positions are the same, then this function invokes the onCollision callbacks of all components within the given shape.

|Parameters|Description|
|- --|- --|
|from|the origin position of the line|
|to|the end position of the line|
|shapeString| the name of the shape to use in this test|
|shapeParam| the configuration of the shape used in this collision test|
|Tag|the string tag passed to collided components' onCollision callbacks|

|Return Value|Description|
|- --|- --|
|hasHit| true/false whether or not a collision was detected|

**async getCameraOrientationAsync()**

This function is used to fetch the current Camera's orientation.

|Return Value|Description|
|- --|- --|
|orientation|an object that contains the camera's position, rotation, forward vector and up vector as number arrays|

**async performARHitTestWithRay(ray: arrayOf(number))**

This function performs a AR system-backed hit test with the given ray from the camera's position outward.

|Return Value|Description|
|---|---|
|arHitTestResults| returns an array of ARHitTestResult corresponding to the AR points found by the AR system along the ray.|

**async performARHitTestWithPosition(position: arrayOf(number))**

This function performs an AR system-backed hit test with the ray from the camera to the given position.

|Return Value|Description|
|---|---|
|arHitTestResults| returns an array of ARHitTestResult corresponding to the AR points found by the AR system along the ray.|

**async performARHitTestWithPoint(x:number, y:number)**

This function performs an AR system-backed hit test with the given 2D screen coordinates in pixels. You may need to scale the x and y position by the pixel ratio to get the correct result:

For example:
performARHitTestWithPoint(evt.nativeEvent.locationX * PixelRatio.get(), evt.nativeEvent.locationX * PixelRatio.get())

|Return Value|Description|
|---|---|
|arHitTestResults| returns an array of ARHitTestResult corresponding to the AR points found by the AR system along the ray.|

## ARHitTestResult

These are the individual objects in the array of ARHitTestResults returned by the two performARHitTest... functions.

arHitTestResult = (object) {
    type : string,
    transform : (object) {
    position : array(number),
    rotation : array(number),
    scale : array(number)
  }
}

**type**	string

The type of point returned, can only be one of the following:

"ExistingPlaneUsingExtent"

"ExistingPlane"

"EstimatedHorizontalPlane"

"FeaturePoint"

**transform**	object

The transform of the point. Contains the following keys:

position, rotation, scale as arrays of numbers.

## Anchor

This is the object given to the developer through the onAnchorFound, onAnchorUpdated and onAnchorRemoved callback functions.

**anchorId**	string

Id of the anchor

**type**	string

type of the anchor

**position**	arrayOf(number)

Position of the anchor in world coordinates.

**rotation**	arrayOf(number)

Rotation of the rotation of the anchor in degrees.

**center (ARPlane only)**	arrayOf(number)

Center of the plane relative to the plane's position.

**alignment (ARPlane only)**	string

The plane alignment, one of the following values:

"horizontal" - iOS only

"HorizontalDownwards" - Android only

"HorizontalUpwards" - Android only

"NonHorizontal" - Android only

**width (ARPlane only)**	number

Current width of the attached plane

**height (ARPlane only)**	number

Current height of the attached plane

**vertices**	arrayOf(arrayOf(number))

An array of 3D points representing the vertices along the boundary of a polygonal plane for this ARPlane. Although the contents of this property consist of 3D points, the represented polygonal plane is always two-dimensional, and is always positioned in only the x and z axis. This points are always placed relative to the ARPlane's center transform.

**trackingMethod (ARImageMarker & Android only)**	Android only String

The current tracking method used to keep track of the Image Marker Anchor. It can be one of the following values:

"notTracking" - image marker hasn't yet been found

"tracking" - image marker is actively being tracked

"lastKnownPose" - image marker isn't currently being tracked but instead rendered based on its last known pose

## Post-Process Effects

|Effect|	Description|
|--|--|
|grayscale|	An effect where the resulting image is in black and white.|
|sepia|	An effect where the resulting image has a dark reddish-brown pigment color effect on it.|
|sincity|	A sin-city like effect where the resulting image is in black and white, except for places where there is saturated red colors.|
|baralleldistortion|	A fish-eye-like effect where the fish eye lens distortion becomes more pronounce towards the center of the image.|
|pincushiondistortion|	A cushioning effect where the resulting image is "pinched" into the center.|
|thermalvision|	A coloring effect where the resulting image gives of a "radiant heat" look from a thermal sensor.|
|crosshatch|	An effect where the resulting image is made up of tiny crossed lines that recreates the scene.|
|pixelated|	An effect where the resulting image is pixelized.|
