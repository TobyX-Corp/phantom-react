# ARSceneNavigator

ARSceneNavigator is the entry point for AR applications with Phantom. For more information about developing in AR, see our Develop page for Augmented Reality (AR).

## Props

## Required Props

**initialScene**	PropTypes.shape( {scene: PropTypes.func.isRequired?} ),?

The initial AR scene to display for your application on application start.

Note: ARSceneNavigator only accepts ARScene

## Optional Props

**autofocus**	PropTypes.bool

Whether or not to enable autofocus for this AR session.

Default value is true for iOS, false for Android.

False on Android, since currently (as of ARCore 1.4.0), ARCore's tracking is optimized for auto-focus turned off.

**bloomEnabled**	PropTypes.bool

Enable or disable bloom. Bloom adds a soft glow to bright areas in scene, simulating the way bright highlights appear to the human eye. To make an object bloom, this property must be enabled, and the objects's threshold for bloom must be set via its material's bloomThreshold property.

**hdrEnabled**	PropTypes.bool

When HDR rendering is enabled, Phantom uses a deeper color space and renders to a floating point texture, then applies a tone-mapping algorithm to preserve fine details in both bright and dark regions of the scene. If HDR is disabled, then features like Bloom and PBR will not work, and tone-mapping will be disabled.

HDR is not supported on all devices.

**numberOfTrackedImages**	iOS 12+/ARKit 2.0+ only PropTypes.number

Tracked images are images that track continuously. This property represents the max amount of images that should be tracked concurrently. For example, if this number is set to 3, then the first 3 images visible in a scene will be tracked. Even if there are 5 total ARImageMarkers only the first 3 will be tracked, if one marker leaves the view, then an untracked marker will then be tracked.

Keep in mind that this number should be kept low as the higher the number, the worse the performance.

**pbrEnabled**	PropTypes.bool

Enable or disable physically-based rendering. Physically based rendering, or PBR, produces more realistic lighting results for your scenes, and provides a more intuitive workflow for artists. To use PBR, this property must be enabled, and materials must use the physicallyBased lighting model. PBR is controlled by a variety of properties, see PBR guide for details.

**shadowsEnabled**	PropTypes.bool

Enable or disable rendering dynamic shadows. If shadows are disabled here, shadow casting lights will simply not cast a shadow.

**videoQuality**	iOS 11.3+/ARKit 1.5+ only PropTypes.oneOf(["High", "Low"])

Sets the video quality either to the highest or lowest possible if the device supports more than 1 applicable video quality.

Default value is "High".

**AppProps**	PropTypes.object

A javascript object containing properties for this phantom app. One use would be to pass in properties from native if you're using a hybrid applications.

Access this given props from within ARScene objects through this.props.sceneNavigator.AppProps

**worldAlignment**	iOS only - has no effect on Android/ARCore PropTypes.oneOf(["Gravity", "GravityAndHeading", "Camera"])

This property determines the initial orientation/alignment of the world's coordinate system.

Gravity - origin is the device's starting location and the X-Z plane is perpendicular to gravity.

GravityAndHeading - origin is the device's starting location and the X and Z axes are latitudinally and longitudinally aligned.

Camera - coordinate system is locked to the camera's current orientation.

## Methods

The following functions are available on the ARSceneNavigator component. You can get the handle to the ARSceneNavigator, from your Scene. Each Scene added to a ARSceneNavigator provides its parent navigator in the variable: this.props.sceneNavigator.

**push(scene: ARScene)**

Push the given scene onto scene stack, displaying the scene to the user.

|Parameters | Description |
| ------------- |:------------- |
|scene | Scene that will be pushed onto the stack and displayed to the user |

**pop()**

Pop the top most scene of the stack, effectively going back to the previous scene.

**pop(n: number)**

Go back n scenes at once. If n is equal to 1 this is equivalent to calling pop().

**jump(scene: ARScene)**

Move to the given scene in the stack, removing it from its current position in the stack and placing it on top, thereby displaying it to the user. If the scene is not already on the stack, this method pushes the scene to the top of the stack, displaying it to the user. This is best used in applications where the user jumps between a set of scenes frequently.

|Parameters | Description |
| ------------- |:------------- |
|scene | Scene that will be moved or pushed to the top of the stack and displayed to the user |

**replace(scene: ARScene)**

Replace the currently displayed scene (the scene at the top of the stack) with the given scene, displaying it to the user. This leaves the remainder of the stack unchanged.

|Parameters | Description |
| ------------- |:------------- |
|scene | Scene that will replace the scene at the top of stack and be displayed to the user |

**resetARSession(resetTracking: boolean, removeAnchors:boolean)**

iOS Only

Call this function to reset the ARSession with a combination of the two flags:

resetTracking - if true, the scene will realign with the camera's position and orientation.

removeAnchors - if true, the anchors will all be removed (onAnchorRemoved will be called on the ARScene). It's recommended to also set removeAnchor to true if resetTracking is also set to true.

**setWorldOrigin(offset:Object)**

iOS 11.3+/ARKit 1.5+ Only!

This function transforms the world origin by the given offset. Multiple calls to this function are additive, translating the worldOrigin by the given position/rotation.

The offset Object can contain a position and/or a rotation key w/ corresponding values, ie:

this.arSceneNavigator.setWorldOrigin({ position : [x, y, z], rotation : [x, y, z], })

**startVideoRecording(fileName: string, saveToCameraRoll: bool, onError: func)**

Starts a recording of the ARSceneNavigator capturing only Phantom-rendered components and external audio (microphone and camera permissions required).

|Parameters | Description |
| ------------- |:------------- |
|fileName | name of the file saved to app's temporary files. If the name matches an existing file at the location, it will be overridden. A file extension will automatically be added. |
|saveToCameraRoll | Whether or not the file should also be saved to the user's Photos at the end of recording. (Requires photo/video saving permissions) |
|onError | a function invoked w/ an errorCode if recording encounters an issue. Possible error codes here.|

**async stopVideoRecording()**

Async function called to stop video recording.

| Return Values | Description |
| ------------- |:------------- |
| success | true/false if stopping was successful|
| url | path to the file in the application's temporary files. |
|errorCode | a number representing an error while stopping recording. Possible error codes here.|

**async takeScreenshot(fileName: string, saveToCameraRoll: bool)**

Async function called to take a screenshot of the ARSceneNavigator capturing only Phantom-rendered components.

|Parameters | Description |
| ------------- |:------------- |
|fileName | name of the file saved to app's temporary files. If the name matches an existing file at the location, it will be overridden. A file extension will automatically be added. |
|saveToCameraRoll | Whether or not the file should also be saved to the user's Photos at the end of recording. (Requires photo/video saving permissions) |

| Return Values | Description |
| ------------- |:------------- |
| success | true/false if stopping was successful|
| url | path to the file in the application's temporary files. |
|errorCode | a number representing an error while taking/saving the screenshot. Possible error codes here.|

**async project(point:array)**

Async function called that takes a 3d vector representing a 3d world position and returns a vector representing a x,y screen position.

|Parameters | Description |
| ------------- |:------------- |
|point | A 3d vector that represents a 3d world position. For example, a value of [-1, 4, -5] would represent the point (x:-1, y:4, z:-5) in world space. |

| Return Values | Description |
| ------------- |:------------- |
|screenPosition | A 2d vector that represents the projected screen position of the passed in point parameter. screenPosition[0] will represent the x screen position. screenPosition[1] will store the y screen position. |

Example use:
this.props.arSceneNavigator.project(projectPoint).then((returnPos)=> { this.setState({ screenX: returnPos["screenPosition"][0], screenY: returnPos["screenPosition"][1], }); });

**async unproject(point:array)**

Async function called that takes a 3d vector representing a 2d screen position plus a value from 0 to 1 representing a interpolation from the near clipping plane and far clipping plane, and returns a vector representing a x,y,z world space position of the given screen position.

|Parameters | Description |
| ------------- |:------------- |
|point | A 3d vector. point[0] represents the screen x position. point[1] represents the screen y position. point[2] is a value from 0 to 1. 0 will unproject the point on the near clipping plane. A value of 1 will unproject the point on the far clipping plane. A value between 0 and 1 will interpolate between the two planes and unproject the point at that interpolated distance. For example, a value of [100, 400, 0] would inform the method to unproject the screen position(x:100, y:400) onto the near clipping plane. |

| Return Values | Description |
| ------------- |:------------- |
|position | A 3d vector that represents the unprojected world position. position[0] will represent the x position. position[1] will store the y position. position[2] will store the z position.

Example use:
this.props.arSceneNavigator.unproject(unprojectPoint).then((returnDict)=> { this.setState({ unprojectedPoint: returnDict["position"], }); });