# Controller

UI Control through which the user interacts with the 3D world, enabled by default. In daydream, this would represent the daydream controller and it's laser pointer. In cardboard ios, cardboard Android and GearVR, the controller is effectively the reticle.

The Controller is also notified of all events that occur within the scene, with the exception of hover. Thus, include this controller in your scene if you would like to register to be always notified of such events. You can also toggle certain UI expects of the controller as well, such as reticle or daydream visibility.

Example use:

```JavaScript
<Controller
    reticleVisibility={true}
    controllerVisibility={true}
    onClick={this._onClickListenerForAllEvents} />
```

## Props

## Optional Props

**controllerVisibility**	PropTypes.bool

Flag for displaying the daydream controller. True by default. Note: this only applies to Daydream headsets.

**onClick**	React.PropTypes.func

Called when any object has been clicked.

Example code:
_onClick(position, source) { // user has clicked the object }

**onClickState**	React.PropTypes.func

Called for each click state any object goes through as it is clicked.

Supported click states and their values are the following:

|State Value|Description|
|:------|:----------:|
|1| Click Down: Triggered when the user has performed a click down action while hovering on that control.|
|2| Click Up: Triggered when the user has performed a click up action while hovering on that control.|
|3| Clicked: Triggered when the user has performed both a click down and click up action on that control sequentially, thereby having "Clicked" the object.|

Example code:
_onClickState(stateValue, position, source) { if(stateValue == 1) { // Click Down } else if(stateValue == 2) { // Click Up } else if(stateValue == 3) { // Clicked } }

For the mapping of sources to controller inputs, see the Events section.

**onControllerStatus**	React.PropTypes.func

Called when the status of the controller has changed. This is only triggered for wireless controllers, else the return value would always be "Connected".

|Status Value|Description|
|:------|:----------:|
|1| Unknown: The controller state is being initialized and is not yet known.|
|2| Connecting: The controller is currently scanning and attempting to connect to your device or phone.|
|3| Connected: The controller is connected to your device.|
|4| Disconnected: The controller has disconnected from your device.|
|5| Error: The controller has encountered an internal error and is currently unusable. This is usually triggered upon initialization. |

**onDrag**	React.PropTypes.func

Called when any view is dragged. The dragToPos parameter provides the current 3D location of the dragged object.

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

rotationFactor can be the following values:

|State Value|Description|
|:------|:----------:|
|1| Rotation Start: Triggered when the user has started a rotation gesture.|
|2| Rotation Move: Triggered when the user has adjusted the rotation, moving both fingers. |
|3| Rotation End: When the user has finishes the rotation gesture and released both touch points. |

This event is only available in AR.

**onScroll**	React.PropTypes.func

Called when the user performs a scroll action, while hovering on any views.

For example:
_onScroll(scrollPos, source) { // scrollPos[0]: x scroll position from 0.0 to 1.0. // scrollPos[1]: y scroll position from 0.0 to 1.0. }

For the mapping of sources to controller inputs, see the Events section.

Unsupported VR Platforms: Cardboard(Android and iOS)

**onSwipe**	React.PropTypes.func

Called when the user performs a swipe gesture on the physical controller, while hovering on any views.

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

**reticleVisibility**	PropTypes.bool

Flag for displaying the reticle. True by default.

## Methods

**setNativeProps(nativeProps: object)**

A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });

**getControllerForwardAsync()**

An async function used to retrieve the forward vector of the current controller used to interact with the 3D scene.

For example, grabbing the async could look like this:

this.controllerRef.getControllerForwardAsync().then((forward)=>{ // Do stuff with forward vector array });