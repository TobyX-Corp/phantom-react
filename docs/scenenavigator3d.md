# SceneNavigator3D

SceneNavigator3D is the entry point for applications that want to render a 3D Scene (<Scene>) in a non AR/VR fashion. Please see the Scene Navigation Guide for more information on how to properly navigate between scenes.

Example use:

```JavaScript
var MyStartScene = require('./MyStartScene');

import {
  AppRegistry,
  Scene,
  SceneNavigator3D,
} from 'phantom-react';

var SceneNav = React.createClass({
  render: function() {
    return (
      <SceneNavigator3D
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

**initialScene**	PropTypes.shape( {scene: PropTypes.func.isRequired} ),

The initial scene to display for your application on application start.

## Optional Props

**bloomEnabled**	PropTypes.bool

Enable or disable bloom. Bloom adds a soft glow to bright areas in scene, simulating the way bright highlights appear to the human eye. To make an object bloom, this property must be enabled, and the objects's threshold for bloom must be set via its material's bloomThreshold property.

**debug**	PropTypes.bool

Used to enable the Dev menu on Android Nougat devices with Cardboard.

**hdrEnabled**	PropTypes.bool

When HDR rendering is enabled, Phantom uses a deeper color space and renders to a floating point texture, then applies a tone-mapping algorithm to preserve fine details in both bright and dark regions of the scene. If HDR is disabled, then features like Bloom and PBR will not work, and tone-mapping will be disabled.

HDR is not supported on all devices.

**onExitPhantom**	PropTypes.func

Called if the user presses the "X" button to exit.

**pbrEnabled**	PropTypes.bool

Enable or disable physically-based rendering. Physically based rendering, or PBR, produces more realistic lighting results for your scenes, and provides a more intuitive workflow for artists. To use PBR, this property must be enabled, and materials must use the physicallyBased lighting model. PBR is controlled by a variety of properties, see PBR guide for details.

**shadowsEnabled**	PropTypes.bool

Enable or disable rendering dynamic shadows. If shadows are disabled here, shadow casting lights will simply not cast a shadow.

**AppProps**	PropTypes.object

A Javascript object containing properties for this Phantom app. This can be used to pass in properties from native if you're using a hybrid application.

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

The following functions are available on the SceneNavigator3D component. You can get the handle to the SceneNavigator3D in 2 ways:

Use the built-in React Native ref property to grab a reference

From your Scene. Each Scene added to a SceneNavigator3D provides its parent navigator in the variable: this.props.sceneNavigator.

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
