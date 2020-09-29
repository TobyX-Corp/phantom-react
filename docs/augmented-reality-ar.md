# Overview

?> AR is limited to ARKit and ARCore supported devices

?> ARKit supported devices [here](https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html) (Look for arkit)

?> ARCore supported devices [here](https://developers.google.com/ar/discover/supported-devices)

The Phantom platform supports Augmented Reality (AR) development through various AR-specific components and features. This guide will first give an overview of AR and provide a high-level overview of the components and features that enable developers to build AR experiences.

## Developing for AR
## Building AR Experiences
The Phantom platform provides a large suite of components that developers can leverage to build their AR experiences. However, unlike traditional 3D rendering and VR, AR experiences are meant to be responsive to the user's real world. In order to accomplish this, the Phantom platform provides a few AR specific components and features detailed below:

## AR Components
These are the components built specifically for and used only in AR on the Phantom platform.

|Component	|Description|
|--|--|
|ARSceneNavigator	|Top-Level React Native component that presents a view onto which React renders ARScenes.|
|ARScene	|Logical container that contains all the components necessary for a singular AR experience. Maintains a scene graph that is rendered in AR atop the real-world. If the desired AR application has multiple "experiences" then multiple ARScenes may work best.|
|ARPlane	|Component that allows and automatically manages the positioning of other React components relative to a plane discovered by the AR system. This can be the surface for table-top game, or a wall on which to mount a virtual picture.|
|ARPlaneSelector	|Convenience component that wraps ARPlane to allow end users to select the plane they want the developer to use to display content.|
|ARImageMarker	|Component that enables developers to place objects relative to a given image detected by the AR system. You can create entire virtual user interfaces that appear over real-world images. Or make things like movie posters come alive when they're detected.|
|ARTrackingTargets	|Component that allows the user to create targets to use with ARImageMarker. API is similar to materials.|

As you can see, the ARSceneNavigator and ARScene replace the SceneNavigator and Scene for VR and also add a few more AR-specific methods and properties.

The ARPlane and ARPlaneSelector are the only other two fully-AR components which allow the developer to place their content with respect to planes in the real world.

## AR Features
The AR system also provides other information which we make available through the following features on our existing components:

|Features|	Location in API	|Description|
|--|--|--|
|6 Degrees of Camera Movement|	Camera orientation can be accessed through getCameraOrientationAsync() in ARScene.|	The camera automatically moves in step with the user's movements in the real world. This results in virtual objects appearing to stay in their positions.|
|Video Pass Through (rendered as background)|	Automatic|	In AR, the back camera is enabled and serves as the "background" of the view onto which virtual objects are rendered.|
|Ambient Light Estimation	|onAmbientLightUpdate in ARScene|	Provides an estimate of light intensity and color temperature as detected by the camera.|
|FixedToWorld and FixedToPlane Dragging	|Supported by all "draggable" components through the dragType property.|	Allows the user to drag objects such that they look fixed to points in the real world.|
|AR-based Hit Tests	|Methods in ARScene|	Allows to user to get points in the real world from the AR system. For example, if the user touches the screen, what real-world object (if any) did she touch?|
|Portals	|PortalScene and Portal components|	Allows the developer to add a virtual "portal" from the real-world into a virtual world, and back again.|
|Post processing effects	|postProcessEffects prop in ARScene|	Allows the developer to apply a pre-built post process effect on their scene.|
|Video and still capture	|Recording API's in ARSceneNavigator|	Allows the developer to easily record their virtual objects on top of the recorded camera view.|

With the above features, developers can illuminate their AR experiences with more realistic lighting, make their virtual objects interact realistically with the ennment, add other-worldly portals, and much more.