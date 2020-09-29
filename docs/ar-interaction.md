# Interaction

Phantom supports numerous mechanisms through which users can interact with both the real world and the virtual UI. These are detailed below.

## AR Hit Testing
<ARScene> has a variety of methods used to "hit-test" against the real-world. These hit tests can be used to determine, to the best of Phantom's ability, what real-world features exist at a given point on the 2D screen. Note that since a single 2D point on the view corresponds to a 3D ray in the scene, multiple results may be returned (each at a different depth). The results may be anchors -- like planes -- or they may be feature points that have not yet been fully identified.

In the example below we perform an AR hit test using a ray. For more detail on AR hit tests, see the ARScene and ARHitTestResult references.

```JavaScript
this.refs["arscene"].performARHitTestWithRay(orientation.forward).then((results)=>{
  for (var i = 0; i < results.length; i++) {
    let result = results[i];
    if (result.type == "ExistingPlaneUsingExtent") {
       // We hit a plane, do something!
    }
  }
})
```
## Fixed to World Dragging
Normally when dragging a <Node> (by setting its onDrag property) the Node, when dragged, stays at a fixed distance from from the user, as though the user is dragging the Node across the inner surface of a sphere. This is called FixedDistance dragging.

Phantom also supports FixedToWorld dragging in AR, where instead of keeping a dragged Node's distance from the user fixed, the dragged Node's distance is instead determined by its intersection with the nearest real-world object. This is useful for dragging a virtual object across a real-world surface, for example. To enable this, set the node's dragType property to FixedToWorld.

## Fixed to Plane Dragging
Fixed to Plane dragging enables you to specify a plane atop which a <Node> can be dragged. The node will not be able to leave this plane. You can also specify a maximum distance away from the camera that the node can travel, to prevent users from dragging the node out to infinity. To do this, set the node's dragType property to FixedToPlane. Then to define the plane, set the dragPlane property. You define the plane along which the Node can be dragged by specifying any point on the plane, and the normal vector of the plane.

```JavaScript
dragPlane: PropTypes.shape({
  planePoint  : PropTypes.arrayOf(PropTypes.number),
  planeNormal : PropTypes.arrayOf(PropTypes.number),
  maxDistance : PropTypes.number
}),
```
In the example below we allow a Box to only be dragged about a horizontal plane one meter below us, and we stop it from traveling more than five meters away from us.

```JavaScript
<Node position={[0, -1, -1]} 
          dragType="FixedToPlane"
          dragPlane={{planePoint:[0, -1, 0], 
                      planeNormal:[0, 1, 0],
                      maxDistance:5}}
</Node>
```