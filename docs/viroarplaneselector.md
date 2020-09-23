# ViroARPlaneSelector

The ViroARPlaneSelector is a composite component written entirely in React Native leveraging ViroARPlane that provides developers with an easy way to have the end user select a plane they want to use. This component surfaces all the same properties as ViroARPlane but rather than attaching the developer's components to the first surface found, it presents end users with white, transparent surfaces which they can select to indicate where they want to have their AR experience.

Example use:

```JavaScript
<ViroARPlaneSelector minHeight={.5} minWidth={.5} onPlaneSelected={...}>
  <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} />
  ...
</ViroARPlaneSelector>
```

## Props

## Optional Props

**alignment**	Don't forget to set the anchorDetectionTypes prop of ViroARScene to tell the AR Session what type of planes to discover.

*Note: "HorizontalUpward" and "HorizontalDownward" are only supported in Android.

PropTypes.oneOf(["Horizontal","HorizontalUpward","HorizontalDownward","Vertical"])

Specifies the desired alignment of a plane that this component will "anchor" to.

The default value is "Horizontal".

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
|FixedDistance| Dragging is limited to a fixed radius around the user|
|FixedToWorld| Dragging is based on intersection with real world objects. Available only in AR |
|FixedToPlane| Dragging is limited to a fixed plane around the user. The configuration of this plane is defined by the dragPlane property.|

The default value is "FixedDistance".

**ignoreEventHandling**	PropTypes.bool

When set to true, this control will ignore events and not prevent controls behind it from receiving event callbacks.

The default value is false.

**maxPlanes**	PropTypes.number

The number of planes to present to the end user for them to select. If the AR system discovers more planes than this number, then it will only display the first maxPlanes number of planes to the end user.

The default value is 15.

**minHeight**	PropTypes.number

Specifies the minimum height, in meters, of a plane that this component will "anchor" to.

The default value is 0.

**minWidth**	PropTypes.number

Specifies the minimum width, in meters, of a plane that this component will "anchor" to.

The default value is 0.

**onAnchorFound**	PropTypes.func

Developer should instead listen to onPlaneSelected

Called when this component is anchored to a plane that is at least minHeight by minWidth large. This is when the component is made visible.

|Parameters | Description |
|---|---|
|anchor| see Anchor |

**onAnchorRemoved**	PropTypes.func

Called when this component is detached from a plane and is no longer visible.

**onAnchorUpdated**	PropTypes.func

Called when the plane to which this component is anchored is updated.

|Parameters | Description |
|---|---|
|anchor| see Anchor |

**onClick**	React.PropTypes.func

Called when an objeect has been clicked.

Example code:
_onClick(source) { // user has clicked the object }

**onClickState**	React.PropTypes.func

Called for each click state an object goes through as it is clicked. Supported click states and their values are the following:

|State Value|Description|
|:- -----|:- ---------:|
|1| Click Down: Triggered when the user has performed a click down action while hovering on this control.|
|2| Click Up: Triggered when the user has performed a click up action while hovering on this control.|
|3| Clicked: Triggered when the user has performed both a click down and click up action on this control sequentially, thereby having "Clicked" the object.|

Example code:
_onClickState(stateValue, source) { if(stateValue == 1) { // Click Down } else if(stateValue == 2) { // Click Up } else if(stateValue == 3) { // Clicked } }

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

Function to be invoked when the user hovers on or off the container view. If defined, this is only invoked if the child hovered upon doesn't have onHover defined.

For instance, let's say you have a that contains a few buttons and text. If none of them have a onHover handler defined, and they get hovered upon, then this function will invoke, effectively capturing the onHover event from it's children.

For example:
_onHover(isHovering) { if(isHovering) { // user is hovering on the container view. } else { // user is no longer hovering on the container view. } }

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

**onPlaneSelected**	React.PropTypes.func

This function is called when the end user has selected a plane to use.

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
|:- -----|:- ---------:|
|1| Touch Down: Triggered when the user makes physical contact with the touch pad on the controller. |
|2| Touch Down Move: Called when the user moves around the touch pad immediately after having performed a Touch Down action. |
|3| Touch Up: Triggered after the user is no longer in physical contact with the touch pad after a Touch Down action. |

For example:
_onTouch(state, touchPos, source) { var touchX = touchPos[0]; var touchY = touchPos[1]; if(state == 1) { // Touch Down } else if(state == 2) { // Touch Down Move } else if(state == 3) { // Touch Up } }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS).

**opacity**	PropTypes.number

A number from 0 to 1 that specifies the opacity of the container. A value of 1 translates into a fully opaque node while 0 represents full transparency.

**viroTag**	PropTypes.string

A tag given to other components when their physics body collides with this component's physics body. Refer to physics for more information.

**visible**	PropTypes.bool

False if the container should be hidden. By default the container is visible and this value is true.

**renderingOrder**	PropTypes.number

This determines the order in which this Node is rendered relative to other Nodes. Nodes with greater rendering orders are rendered last. The default rendering order is zero. For example, setting a Node's rendering order to -1 will cause the Node to be rendered before all Nodes with rendering orders greater than or equal to 0.

**rotation**	PropTypes.arrayOf(PropTypes.number)

Put the PropType Description here.

**scale**	PropTypes.arrayOf(PropTypes.number)

Put the PropType Description here.

**transformBehaviors**	PropTypes.arrayOf(PropTypes.string)

Put the PropType Description here.

**width**	PropTypes.number

Put the PropType Description here.

**volume**	PropTypes.number

Put the PropType Description here.

**visible**	PropTypes.bool

Put the PropType Description here.

## Anchor

This is the object given to the developer through the onAnchorFound and onAnchorUpdated callback functions.

**position**	arrayOf(number)

Position of the attached plane in world coordinates.

**rotation**	arrayOf(number)

Rotation of the attached plane in world coordinates.

**center**	arrayOf(number)

Center of the underlying plane relative to the plane's position.

**width**	number

Current width of the attached plane

**height**	number

Current height of the attached plane

## Methods

**reset()**

This function resets the ARPlaneSelector back to the "selection" state which presents the end user with all planes that have been found by the AR system (up to maxPlanes number of planes).