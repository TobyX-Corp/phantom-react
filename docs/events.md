# Input Events

Input events are triggered through controllers like the Daydream Controller or Oculus Gear Touchpad. Phantom UI controls respond to input events via event handlers in a bubbled up fashion: events are passed up the view hierarchy until they encounter a component that can handle and potentially swallow the event.

There are many kinds of events: onHover, onClick, onClickState, onDrag, onScroll, onSwipe, onFuse, and onTouch. Not all components can respond to all events; please refer to each component's properties in the API reference for specifics. The details of each event type and sample code are described below.

All triggered events originate from a given controller input source. This allows developers to easily identify which input button is being pressed, and from which hand held controller. Each Phantom event handler callback provides a unique numeric source identifier that corresponds to an input source on the physical controller. You can view a mapping of input source IDs to Gear, Cardboard and Daydream below.

## Event Handlers
These methods are used to register behaviors to take effect when the user interacts with Phantom UI Controls.

**onClick(position, source)**

Phantom components fire onClick events when the user taps while focused on a component.

**onClickState(state, position, source)**

Phantom components fire onClickState events for each "click state" the component passes through during a single click: click down, click up, and clicked.

State Numeric Value	Description

1	                Click Down: Triggered when the user has performed a click down action while hovering on this control

2	                Click Up: Triggered when the user has performed a click up action while hovering on this control

3	                Triggered when the user has performed both a click down and click up action on this control sequentially, thereby having "Clicked" the object

**onHover(isHovering, position, source)**

Phantom components fire onHover events when the user focuses on a component with his reticle. In AR this is triggered, if the object is "focused upon" and positioned in the center of the view screen.

**onDrag(position, source)**

Phantom components fire onDrag events when they are being dragged by the user; that is, when the user performs a click down on a view, holds that click, and then physically moves the controller (or tilts the headset). The view will automatically drag in VR, and as it does so, the onDrag event callback is continually triggered with the latest 3D location of the object. It is also important to note that onDrag must be assigned to a Phantom component to make it draggable.

**onFuse(source)**

Phantom components fire onFuse events when the user hovers his or her reticle over the component and remain hovered for timeToFuse milliseconds. The timeToFuse parameter is optional and is defaulted to 2000ms.

**onScroll(scrollPosition, source)**

Phantom components fire onScroll events when they are scrolled on by the user; that is, when the user scrolls on a touch pad while hovering on top of the targeted view. The distance the user has scrolled by is given as a unit ratio of the touch pad from 0.0 to 1.0 for both X and Y coordinates.

**onSwipe(swipeState, source)**

Phantom components fire onSwipe events when the user swipes in a specific direction on a controller's touch pad, while hovering on top of the targeted view.

State Numeric Value	

1	              Swiped Up

2	              Swiped Down

3	              Swiped Left

4	              Swiped Right

**onTouch(touchState, touchPosition, source)**

Phantom components fire onTouch events when the user performs a touch gesture on the touch pad of the physical control.

State Numeric Value	Description

1	                Touch Down: triggered when the user makes physical contact with the touch pad on the controller

2	                Touch Down Move: triggered when the user moves around the touch pad immediately after having performed a Touch Down action

3	                Touch Up: triggered after the user is no longer in physical contact with the touch pad after a Touch Down action

## Example Code
Here is a code snippet where we implement several event callbacks for a <Image> within a scene.

```JavaScript
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Scene,
  Image,
} from 'phantom-react';

var OnHoverExample = React.createClass({
  render: function() {
    return (
      <Scene>
          <Image source={require('./res/myimg.jpg')} 
                   position={[0, -.5, -2]} scale={[.1, .1, .1]} 
                   onClick={this._onClick}
                   onClickState={this._onClickState}
                   onDrag={this._onDrag}
                   onHover={this._onHoverDoSomething}
                   onScroll={this._onScroll}
                   onSwipe={this._onSwipe}
                   onTouch={this._onTouch}
                   onFuse={{callback:this._onFuse, timeToFuse:3000}}/>
      </Scene>
    );
  }, 
    
  _onClick(source) {
    console.log("We just Clicked the image!");
  },
    
  _onClickState(state, source) {
    if(stateValue == 1) {
        console.log("User has click-down on the image!");
    } else if(stateValue == 2) {
        console.log("User has click-up on the image!");
    } else if(stateValue == 3) { 
        console.log("User has finally clicked on the image!");
    }
  },
    
  _onDrag(draggedToPosition, source) {
    console.log("Dragged to: x" + draggedToPosition[0] + " y:" + draggedToPosition[1] + " z: " + draggedToPosition[2]); 
  },
    
  _onHoverDoSomething(isHovering, source) {
    if(isHovering) {
      console.log("We are hovering onto the image!");
    }else{
      console.log("We are not longer hovering on the image!");
    }   
  },
  
  _onScroll(scrollPosition, source) {
         console.log("Scrolled to: x" + scrollPosition[0] + " y:" + scrollPosition[1]); 
  },
    
  _onSwipe(swipeState, source) {
    if(swipeState == 1) {
        console.log("Swiped up");
    } else if(swipeState == 2) {
        console.log("Swiped down");
    } else if(swipeState == 3) { 
       console.log("Swiped left");
    } else if(swipeState == 4) { 
       console.log("Swiped right");
    }
  },
  
  _onTouch(state, touchPos, source)  {
   var touchX = touchPos[0];
   var touchY = touchPos[1];
    if(state == 1) {
        // Touch Down
    } else if(state == 2) {
        // Touch Down Move
    } else if(state == 3) { 
        // Touch Up
    }
  },
  
  _onFuse(source){
   // User has hovered over object for timeToFuse milliseconds
  },  
});
```
## Event Handler Assignment
We can also assign the same event handler callback to multiple objects. You can identify which control the event has been triggered on by passing an objectTag to a lambda function as a part of the event callback.

```JavaScript
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Scene,
  Image,
} from 'phantom-react';

var OnHoverExample = React.createClass({
  render: function() {
    return (
      <Scene>
          <Image source={require('./res/myimg.jpg')} 
                   position={[0, -.5, -2]} scale={[.1, .1, .1]} 
                   onClick={this._onClick("Image 1")}/>
        <Image source={require('./res/myimg.jpg')} 
                   position={[0, 0, -2]} scale={[.1, .1, .1]} 
                   onClick={this._onClick("Image 2")}/>
        <Image source={require('./res/myimg.jpg')} 
                   position={[0, .5, -2]} scale={[.1, .1, .1]} 
                   onClick={this._onClick("Image 3")}/>           
      </Scene>
    );
  }, 
    
  _onClick(objectTag) {
    return (source) => {
        console.log("We just clicked on the " + objectTag);
      
      if (objectTag == "Image 3"){
        // Do something else.
      }
    }
  }
});
```
## Supported Controllers
At the very least, both onHover and onClick are guaranteed to be supported across all platforms. However, due to the physical limitations of controllers on each platform, certain events as shown below may not be supported.

Events	        Daydream	GearVR	        Android Cardboard	IOS Cardboard

onHover	        Supported	Supported	Supported	        Supported

onClick	        Supported	Supported	Supported	        Supported

onClickState	Supported	Supported	Supported	        Not Supported

onDrag	        Supported	Supported	Supported	        Not Supported

onScroll	Supported	Not Supported	Not Supported	        Not Supported

onSwipe	        Supported	Supported	Not Supported	        Not Supported

onTouch	        Supported	Supported	Not Supported	        Not Supported

onRotate	Not Supported	Not Supported	Not Supported	        Not Supported

onPinch	        Not Supported	Not Supported	Not Supported	        Not Supported

Different types of controllers may result in different forms of interactivity or UI. For example, users can easily scroll through galleries with daydream's touch pad, but additional UI buttons may be needed for Cardboard.

To account for the different types of controllers in your code, you can utilize the scene's onPlatformUpdate() callback function to be notified of platform specific information. You can then filter based on Controller type and render UI tailored to the current platform. Note that deploying an app that implements unsupported event callbacks is still safe: these events resolve to a no-op.

## Platform Specific Input Source Identifiers
As mentioned above, a unique numeric source identifier that corresponds to an input source on the physical controller. This section will go through the mappings of sources for Cardboard, GearVR and Daydream.

Input Source Value	Description

1	                Main Controller

2	                Primary Cardboard Trigger

Input Source Value	Description

1	                Main Controller

2	                Gear Touch Pad

3	                Gear Back Button

Input Source Value	Description

1	                Main Controller

2	                Daydream TouchPad

3	                Daydream App Button

4	                Daydream Home Button

5	                Volume Up Button

6	                Volume Down Button