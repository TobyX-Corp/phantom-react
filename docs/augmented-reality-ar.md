# Overview

?> AR is limited to ARKit and ARCore supported devices

?> ARKit supported devices [here](https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html) (Look for arkit)

?> ARCore supported devices [here](https://developers.google.com/ar/discover/supported-devices)

The Viro platform supports Augmented Reality (AR) development through various AR-specific components and features. This guide will first give an overview of AR and provide a high-level overview of the components and features that enable developers to build AR experiences.

## Developing for AR
## Building AR Experiences
The Viro platform provides a large suite of components that developers can leverage to build their AR experiences. However, unlike traditional 3D rendering and VR, AR experiences are meant to be responsive to the user's real world. In order to accomplish this, the Viro platform provides a few AR specific components and features detailed below:

## AR Components
These are the components built specifically for and used only in AR on the Viro platform.

|Component	|Description|
|--|--|
|ViroARSceneNavigator	|Top-Level React Native component that presents a view onto which ViroReact renders ViroARScenes.|
|ViroARScene	|Logical container that contains all the components necessary for a singular AR experience. Maintains a scene graph that is rendered in AR atop the real-world. If the desired AR application has multiple "experiences" then multiple ViroARScenes may work best.|
|ViroARPlane	|Component that allows and automatically manages the positioning of other ViroReact components relative to a plane discovered by the AR system. This can be the surface for table-top game, or a wall on which to mount a virtual picture.|
|ViroARPlaneSelector	|Convenience component that wraps ViroARPlane to allow end users to select the plane they want the developer to use to display content.|
|ViroARImageMarker	|Component that enables developers to place objects relative to a given image detected by the AR system. You can create entire virtual user interfaces that appear over real-world images. Or make things like movie posters come alive when they're detected.|
|ViroARTrackingTargets	|Component that allows the user to create targets to use with ViroARImageMarker. API is similar to materials.|

As you can see, the ViroARSceneNavigator and ViroARScene replace the ViroSceneNavigator and ViroScene for VR and also add a few more AR-specific methods and properties.

The ViroARPlane and ViroARPlaneSelector are the only other two fully-AR components which allow the developer to place their content with respect to planes in the real world.

## AR Features
The AR system also provides other information which we make available through the following features on our existing components:

|Features|	Location in API	|Description|
|--|--|--|
|6 Degrees of Camera Movement|	Camera orientation can be accessed through getCameraOrientationAsync() in ViroARScene.|	The camera automatically moves in step with the user's movements in the real world. This results in virtual objects appearing to stay in their positions.|
|Video Pass Through (rendered as background)|	Automatic|	In AR, the back camera is enabled and serves as the "background" of the view onto which virtual objects are rendered.|
|Ambient Light Estimation	|onAmbientLightUpdate in ViroARScene|	Provides an estimate of light intensity and color temperature as detected by the camera.|
|FixedToWorld and FixedToPlane Dragging	|Supported by all "draggable" components through the dragType property.|	Allows the user to drag objects such that they look fixed to points in the real world.|
|AR-based Hit Tests	|Methods in ViroARScene|	Allows to user to get points in the real world from the AR system. For example, if the user touches the screen, what real-world object (if any) did she touch?|
|Portals	|ViroPortalScene and ViroPortal components|	Allows the developer to add a virtual "portal" from the real-world into a virtual world, and back again.|
|Post processing effects	|postProcessEffects prop in ViroARScene|	Allows the developer to apply a pre-built post process effect on their scene.|
|Video and still capture	|Recording API's in ViroARSceneNavigator|	Allows the developer to easily record their virtual objects on top of the recorded camera view.|

With the above features, developers can illuminate their AR experiences with more realistic lighting, make their virtual objects interact realistically with the environment, add other-worldly portals, and much more.