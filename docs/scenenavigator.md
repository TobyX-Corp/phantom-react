# SceneNavigator

?> DEPRECATED (starting in PhantomReact 2.5.0)

?> <SceneNavigator> has been DEPRECATED. Please use one of the following:

?> VRSceneNavigator for VR applications.

?> ARSceneNavigator for AR applications.

?> SceneNavigator3D for 3D (non AR/VR) applications.

A SceneNavigator component is the entry point for VR applications. Please see our Scene Navigation Guide for more information on how to properly navigate between scenes.

Example use:

```JavaScript
var MyStartScene = require('./MyStartScene');

import {
  AppRegistry,
  Scene,
  SceneNavigator,
} from 'phantom-react';

var SceneNav = React.createClass({
  render: function() {
    return (
      <SceneNavigator
        initialScene={{
          scene: MyStartScene,
        }}
      />
    );
  }
})
```

## Props

## Required Props

**apiKey**	PropTypes.string.isRequired

Required API Key

**initialScene**	PropTypes.shape( {scene: PropTypes.func.isRequired?} ),?

The initial scene to display for your application on application start.

## Optional Props

**debug**	PropTypes.bool

Used to enable dev menu on Android Nougat device with Cardboard.

**onExitPhantom**	PropTypes.func

Called if the user presses the "X" button to exit.

**AppProps**	PropTypes.object

A javascript object containing properties for this phantom app. One use would be to pass in properties from native if you're using a hybrid applications.

**vrModeEnabled**	PropTypes.bool

Calling vrModeEnabled allows switching to and from VR mode. When set to false, it transitions back to pre-VR (mono) mode. When set to true, we set thie view into a full VR mode. This is set to true by default.

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

These are the functions available on the SceneNavigator component, you can get the handle to the SceneNavigator in 2 ways:

1. using the built-in React Native ref property to grab a reference

2. from your Scene which has been added to the SceneNavigator, it will be given the reference to the SceneNavigator in this variable: this.props.sceneNavigator.

**push(scene: Scene)**

Push the given scene onto scene stack, displaying the scene to the user.

|Parameters | Description |
| ------------- |:------------- |
|scene | Scene that will be pushed onto the stack and displayed to the user |

**pop()**

Pop the top most scene of the stack, effectively going back to the previous scene.

**pop(n: number)**

Go back n scenes at once. If n is equal to 1 this is equivalent to calling pop().

**jump(scene: Scene)**

Move to the given scene in the stack, removing it from its current position in the stack and placing it on top, thereby displaying it to the user. If the scene is not already on the stack, this method pushes the scene to the top of the stack, displaying it to the user. This is best used in applications where the user jumps between a set of scenes frequently.

|Parameters | Description |
| ------------- |:------------- |
|scene | Scene that will be moved or pushed to the top of the stack and displayed to the user |

**replace(scene: Scene)**

Replace the currently displayed scene (the scene at the top of the stack) with the given scene, displaying it to the user. This leaves the remainder of the stack unchanged.

|Parameters | Description |
| ------------- |:------------- |
|scene | Scene that will replace the scene at the top of stack and be displayed to the user |

**recenterTracking()**

Reorients the virtual world such that directly forward of the user is [0, 0, -1] by rotating the scene by the user's y-rotation.
