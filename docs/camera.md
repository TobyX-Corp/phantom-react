# Camera
Setting the Point of View

Scenes in Viro are full 3D environments that can be viewed from any angle. The ViroCamera element defines the position from which the scene is viewed. By default, the camera is positioned at the origin [0, 0, 0]. The camera always points in the negative Z direction [0, 0, -1].

In the example below, we set the camera to position [-1, 0, 0], so that when the user enters the scene she is staring directly at the text.

```JavaScript
<ViroScene>
   <ViroCamera position={[-1, 0, 0]} active={true} />
   <ViroText style={styles.baseText} text="Hello!" position={[-1, 0, -1]} />
</ViroScene>
```
If no <ViroCamera> is specified, then the default camera (position at origin) is used. Rotation may also be set for <ViroCamera>, which sets the base orientation of the camera; that is, the orientation of the camera when the user is staring straight ahead. For example, in the camera below the user enters the scene looking up 45 degrees.

```JavaScript
<ViroScene>
   <ViroCamera position={[0, 0, 0]} rotation={[45, 0, 0]) active={true} />
   <ViroText style={styles.baseText} text="Hello!" position={[-1, 0, -1]} />
</ViroScene>
```
## Orbit Camera
The <ViroOrbitCamera> is an alternative camera that enables the user to orbit about a focal point. This is useful for exploring a single point in a 3D scene from all angles: as the user tilts her head, the camera orbits about that single point.

The example below utilizes an orbit camera. The focalPoint is set to [0, 0, -1]. Since the <Viro3DObject> is also positioned at [0, 0, -1], this means the user will stay focused on that 3D model as he tilts his head, revealing it from all angles.

```JavaScript
<ViroScene>
  <ViroOrbitCamera position={[0, 0, 0]} focalPoint={[0, 0, -1]} active={true} />
  <Viro3DObject source={require('./res/heart.obj') position={[0, 0, -1]} />
</ViroScene>
```
## Node-Attached Cameras
You can also define a cameras within <ViroNode> objects. By doing so, you 'attach' the camera to the node: it is transformed within the node like any other element in the scene graph.

```JavaScript
<ViroNode position={[0, 0, -3]} /**sun-earth system**/>
    <ViroSphere materials={["sun"]} />
  
  <ViroNode position={[0, 0, -5]} /**earth-moon system**/>
    <ViroCamera position={[0, 0, 0]} active={true} />
    <ViroSphere position={[0, 0, 0]} materials={["earth"]} />
    <ViroSphere position={[0, 1, -2]} scale={[.2, .2, .2]} materials={["moon"]}/>
  </ViroNode>
</ViroNode>
```
In the example above, the camera is placed at Earth. If we were to animate the Earth-Moon system in the example above -- for example to orbit around the Sun -- the camera would animate as well.

## Multiple Cameras
Viro allows developers to specify multiple cameras. The camera the user sees through is that which has its active property set to true. If no camera is active, the default camera (positioned at 0, 0, 0, looking toward negative Z), will be used.

## Camera UI Constraint
Viro also enables developers to add "Hud" like components to their scene. Like a ViroNode, 3D elements that are parented under a ViroCamera are effectively "locked" and always positioned in reference to the camera's position. As such, they will always move with the camera, irregardless of wherever the user may be looking at.

The code sample below demonstrates a ViroBox that will always be placed 5 meters in front of the camera, irregardless of wherever the user may be looking at.

```HTML
<ViroCamera position={[0,0,0]} active={true} >
    <ViroBox position={[0, 0, -5]} />
</ViroCamera>
```