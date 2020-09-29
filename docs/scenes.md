# Scenes

Applications in PhantomReact consist of Scenes, represented either by Scene or ARScene components. Scenes are the 3D equivalent of the Views found in most 2D application frameworks. They contain all the content that PhantomReact renders in AR/VR: UI controls, 3D objects, lights, and more.

An application in PhantomReact typically contains one or more of these Scene components contained in a SceneNavigator or ARSceneNavigator.

## Basic Scene
A simple <Scene> is provided below. The scene contains a single <Text> object, which displays the text "Hello World".

```JavaScript
<Scene>
  <Text text="Hello World" position={[0, -.1, -1]} />
</Scene>
```
## Positioning Objects in a Scene
Phantom uses a right-handed coordinate system, where the direction of view is along the negative z-axis. The point of view can be modified by changing the Camera. By default, the camera is positioned at [0, 0, 0] and looks in the direction [0, 0, -1]. In frameworks with only 3DOF (3 degrees of freedom) support (like mobile VR), the camera stays at [0,0,0] until moved by the developer with the end user only able to control the rotation of the camera. On the other hand, 6DOF (6 degrees of freedom) supported frameworks allow the end user to move about their world and move the camera in the Phantom Scene in response (like in AR).

Objects in the scene are positioned in this 3D coordinate system via the position attribute. As scenes grow in complexity, it is best to take advantage of Phantom's underlying Scene Graph when placing objects.

## Scene Backgrounds
The background of a scene is the content rendered in the distance, behind all the objects. This background can either be a 360 degree image, or a skybox.

To render a 360 image as the background add a <Image360> component to the scene, as shown below.

```JavaScript
<Scene style={styles.container} >
  <Image360 source={require('./res/360_diving.jpg')} />
</Scene>
```
To render a skybox, use the <Skybox> component. A skybox is a cube with 6 sides that encloses the user. The six sides can either be given a solid color, by setting the color attribute of the skybox, or they can each be assigned a texture, by setting the source attribute. In the example below, each side of the skybox is assigned the same image.

```JavaScript
<Scene style={styles.container}>
  <Skybox source={{nx:require('./res/grid_bg.jpg'),
                       px:require('./res/grid_bg.jpg'),
                       ny:require('./res/grid_bg.jpg'),
                       py:require('./res/grid_bg.jpg'),
                       nz:require('./res/grid_bg.jpg'),
                       pz:require('./res/grid_bg.jpg')}} />
</Scene>
```
The parameters in source, nx, px, ny, py, nz, and pz, specify the texture to use for each cube face (where nx is the face in the negative-x direction, px is the face in the positive-x direction, and so on).

## Scene Graph
Underlying the <Scene> is a full-featured 3D scene graph engine. A scene graph is a hierarchical tree structure of nodes that allows developers to intuitively construct a 3D environment. The root node is the <Scene> itself. Sub-nodes are represented by child <Node> objects. Each <Node> represents a position and transform in 3D space, to which you can attach 3D objects, lights, or other content.

A <Node> by itself has no visible content when it is rendered; it represents only a coordinate space transform (position, rotation, and scale) relative to its parent <Node>. You use a hierarchy of <Node> objects to model your scene in a way that makes sense for your app.

For example, in the scene below Text A's final position will be [0, 0.9, -2], and Text B's final position will be [1, 1, -1]. Similarly, Text A's final scale will be [2, 2, 2], while Text B's final scale will be [4, 4, 4], since it picks up the scale from both its parent nodes.

```JavaScript
<Scene>
  <Node position={[0, 1, -1]} scale={[2, 2, 2]}>
    <Text text="Text A" position={[0, -.1, -1]}  />
    
    <Node position={[1, 0, 0 ]} scale={[4, 4, 4]}>
      <Text text="Text B" />
    </Node> 
  </Node>
</Scene>
```
To take a more concrete example, suppose your app presents an animated view of a solar system. You can construct a <Node> hierarchy that models celestial bodies relative to one another. Each body can be a <Node>, with its position in its orbit defined in the coordinate system of its parent. The sun would define its own coordinate space, and the Earth would position itself in that space. At the same time, the Earth would define its own coordinate space in which the moon would position itself. The snippet below shows a simple solar system.

```JavaScript
<Node position={[0,0,-3]} /**sun-earth system**/>
    <Sphere materials={["sunClipart"]} />
  <Node position={[0, 0, -5]} /**moon-earth system**/>
    <Sphere position={[0,0,0]} materials={["earth"]} />
    <Sphere position={[0,1,-2]} scale={[.2, .2, .2]} materials={["moon"]}/>
  </Node>
</Node>
```
This scene hierarchy makes it intuitive to animate the celestial bodies: the revolution of the moon around the Earth and the Earth around the sun combine such that the moon follows the planet around the sun.