# ViroARImageMarker

ViroARImageMarker is a component that attempts to find the given target in the user's view allowing the developer to place objects with respect to the image or to determine their location relative to the image target.

Example use:

```JavaScript
// Register the target

ViroARTrackingTargets.createTargets({
  "targetOne" : {
    source : require('./res/targetOne.jpg'),
    orientation : "Up",
    physicalWidth : 0.1 // real world width in meters
  },
});

<ViroARImageMarker target={"targetOne"} >
  <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} />
</ViroARImageMarker>
```

## Props
## Required Props

**target**	PropTypes.string

Name of the image target created with ViroARTrackingTargets.

## Optional Props

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
|FixedDistance| Dragging is limited to a fixed radius around the user|
|FixedToWorld| Dragging is based on intersection with real world objects. Available only in AR |
|FixedToPlane| Dragging is limited to a fixed plane around the user. The configuration of this plane is defined by the dragPlane property.|

The default value is "FixedDistance".

**ignoreEventHandling**	PropTypes.bool

When set to true, this control will ignore events and not prevent controls behind it from receiving event callbacks.

The default value is false.

**onAnchorFound**	PropTypes.func

Called when this component is anchored to a plane that is at least minHeight by minWidth large. This is when the component is made visible.

|Parameters | Description |
|---|---|
|anchor| see Anchor |

**onAnchorRemoved**	PropTypes.func

Called when this component is detached from a plane and is no longer visible.

**onAnchorUpdated**	PropTypes.func

Called when the anchor is update. For image markers, there's additional information provided in the returned anchor.

|Parameters | Description |
|---|---|
|anchor| see Anchor |

**onClick**	PropTypes.func

Called when a marker has been clicked.

Example code:
_onClick(position, source) { // user has clicked the object }

The position parameter represents the position in world coordinates on the marker where the click occurred.

For the mapping of sources to controller inputs, see the Events section.

**onClickState**	PropTypes.func

Called for each click state an object goes through as it is clicked. Supported click states and their values are the following:

|State Value|Description|
|:------|:----------:|
|1| Click Down: Triggered when the user has performed a click down action while hovering on this control.|
|2| Click Up: Triggered when the user has performed a click up action while hovering on this control.|
|3| Clicked: Triggered when the user has performed both a click down and click up action on this control sequentially, thereby having "Clicked" the object.|

Example code:
_onClickState(stateValue, position, source) { if(stateValue == 1) { // Click Down } else if(stateValue == 2) { // Click Up } else if(stateValue == 3) { // Clicked } }

The position parameter represents the position in world coordinates on the marker where the click occurred.

For the mapping of sources to controller inputs, see the Events section.

**onCollision**	React.PropTypes.func

Called when this component's physics body collides with another component's physics body. Also invoked by ViroScene/ViroARScene's findCollisions... functions.

|Return Value | Description |
|---|---|
|viroTag | the given viroTag (string) of the collided component |
|collidedPoint | an array of numbers representing the position, in world coordinates, of the point of collision|
|collidedNormal | an array representing the normal of the collision in world coordinates. |

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

**onHover**	PropTypes.func

Function to be invoked when the user hovers on or off the container view. If defined, this is only invoked if the child hovered upon doesn't have onHover defined.

For instance, let's say you have a that contains a few buttons and text. If none of them have a onHover handler defined, and they get hovered upon, then this function will invoke, effectively capturing the onHover event from it's children.

For example:
_onHover(isHovering, position, source) { if(isHovering) { // user is hovering on the container view. } else { // user is no longer hovering on the container view. } }

The position parameter represents the position in world coordinates on the marker where the click occurred.

For the mapping of sources to controller inputs, see the Events section.

**onPinch**	PropTypes.func

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

**onRotate**	PropTypes.func

Called when the user performs a rotation touch gesture on the control. Rotation factor is returned in degrees.

When setting rotation, the rotation should be relative to it's current rotation, not set to the absolute value of the given rotationFactor.

For example:

_onRotate(rotateState, rotationFactor, source) { if (rotateState == 3) { //set to current rotation - rotationFactor. return; } //update rotation using setNativeProps },

rotationState can be the following values:

|State Value|Description|
|:------|:----------:|
|1| Rotation Start: Triggered when the user has started a rotation gesture.|
|2| Rotation Move: Triggered when the user has adjusted the rotation, moving both fingers. |
|3| Rotation End: When the user has finishes the rotation gesture and released both touch points. |

This event is only available in AR.

**onScroll**	PropTypes.func

Called when the user performs a scroll action, while hovering on the control.

For example:
_onScroll(scrollPos, source) { // scrollPos[0]: x scroll position from 0.0 to 1.0. // scrollPos[1]: y scroll position from 0.0 to 1.0. }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS)

**onSwipe**	PropTypes.func

Called when the user performs a swipe gesture on the physical controller, while hovering on this control.

For example:
_onSwipe(state, source) { if(state == 1) { // Swiped up } else if(state == 2) { // Swiped down } else if(state == 3) { // Swiped left } else if(state == 4) { // Swiped right } }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS)

**onTouch**	PropTypes.func

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

**opacity**	PropTypes.number

A number from 0 to 1 that specifies the opacity of the container. A value of 1 translates into a fully opaque node while 0 represents full transparency.

**pauseUpdates**	PropTypes.boolean

True/False to stop the automatic positioning/rotation of children components of a ViroARPlane. This does not stop onAnchorUpdated from being called.

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

## Methods

**setNativeProps(nativeProps: object)**

A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });
