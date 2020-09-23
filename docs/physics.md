# Physics

Viro contains a simple but powerful Physics engine. This engine enables developers to build interactive experiences that simulate real world forces. This development guide will go through the basics of creating physics objects and offer an overview of the experiences that can be created with them.

In Viro, almost every 3D control can be physics-enabled through the physicsBody property. For example, to make a <ViroBox> fall due to gravity, simply add a physicsBody property to the box with a mass and type, as shown below:

```Text
<ViroBox
    position={[0,1,-3]}
  height={1} width={1} length={1}
    physicsBody={{
        type:'dynamic', mass:1
  }}
/>
```
Each physicsBody must have a type that dictates the behavior of the physics body. Physics bodies may also be given a shape to represent the collision mesh of the body. This can be automatically inferred if not provided.

## Physics Body Type
There are three types of physics bodies available in Viro: Dynamic, Kinematic, and Static. Each has unique movement and interaction behavior. Note also there is a mass requirement associated with each type.

|Property	|Static RigidBody	|Kinematic RigidBody	|Dynamic RigidBody|
|--|--|--|--|
|Mass (in kg)	|- Must have 0 mass.|	- Must have 0 Mass.|	- Positive Mass (cannot be negative).|
|Movement Behavior	|- Cannot move.	|- Can be moved under explicit developer/user control.|	- Designed to be moved under simulation (you should not be directly manipulating / animating this object's position). - Can be moved by colliding against other objects, and in response to forces and impulse.|
|Collision Behavior	|- Can collide only with dynamic bodies.- Least resource intensive. - Works well with static objects like floor, ground, etc.|	- Can collide with dynamic bodies. - Does not collide with other other kinematic bodies or static bodies. - Cannot be influenced by dynamic bodies. - Behaves like a movable object with infinite mass during collisions (will always push objects away). - Works well with objects you wish to directly move with animations with fine movement detail. |- Can collide with any body type. - Works well with objects that do not have applied animations, and that are reactive to forces applied in the world.|

## Physics Body Shape
After specifying a type, Viro will need to determine the actual shape of the physics object representing the control's geometry. This can be specified through the shape property in a physicsBody. There are three kinds of shapes that the physics body accepts: box, sphere, and compound, as shown below.


|Shape	|Parameters|
|--|--|
|box|	Accepts width, height, and length of the box in the form [w, h, l]. Will be centered around the origin of the control.|
|sphere|	Accepts a radius parameter. Creates a sphere that will be centered around the origin of your control.|
|compound|	No parameters. Viro automatically iterates through the compound control's subtree and infers the physics shape.|

Note that the shape property is optional. If none is provided, Viro automatically generates a physics box (or sphere) shape that roughly represents that geometric control. You can also toggle a debug flag on the scene to draw all meshes representing physics shapes. This is demonstrated in the image above, and is primarily used for debugging purposes (it comes at a significant performance cost).

It is important to note that physics objects cannot be recursively stacked. That is, a Viro control that is physics-enabled cannot have sub-nodes or children that also have their own physics-enabled bodies. There is no hierarchy to physics bodies. Compound shapes, however -- where multiple geometric objects are compounded together to form a single physics body -- are supported in Viro.

## Physics Body Forces
Applying forces to physics enabled Viro controls can be done through an object's physicsBody property. Viro automatically manages the reconciling of those forces on an object's transform when they are applied.

## Constant Forces
Constant forces can be useful in situations for moving objects in constant motion; for example, when adding thrust to a spaceship being launched into the sky. To apply a constant directional force, set a single force (or an array of forces) on the physics body's force property. For each force, you can specify both its magnitude (in newtons) and its location (on the object). The location property is optional.

Rotational forces are also supported. To apply a constant rotational force, use the torque property.

## Impulsive Forces and Motion
Impulse forces are useful in situations where you would like to apply an instantaneous burst of force to an object. These are often useful for launching projectile objects. Rotational impulses are supported as well.

## Velocity
Developers have access to finer control over object movement via the velocity property. Doing so will override any forces that are already applied to the object.

## Forces and Drag Behavior
With Viro, the default behavior of drag events works with physics-enabled controls; users are still able to drag objects around the scene. Viro handles this by temporarily converting any dragged physics bodies into kinematic types during the drag, then switching back to the original types upon completion of the drag. This can be used to give users the ability to fling objects toward other dynamic-typed physics bodies. An example of this is shown below.

## Physics Body Properties
Viro physics bodies have additional properties that the developer can tune to achieve different kinds of behavior. Two of these are friction and restitution.

Restitution controls how "bouncy" an object or surface is. When two objects collide, some of the energy of the collision is used to deform the collided objects, some is used rebound the objects from one another, and some is lost to heat. Restitution is a measure of how much of that kinetic energy is used for objects to rebound from one another. To take a real-world example, a massive bowling bowl has a low coefficient of restitution -- it doesn't really bounce on the floor -- whereas a basketball has a high coefficient of restitution.

Note the restitution factor is applied on both the objects involved in the collision. In the image below, that means both the floor and each colliding ball. Restitution of 1.0 implies a perfectly elastic collision: kinetic energy is conserved and the ball will bounce right back up to its initial height. A value of 0.0 represents a completely inelastic collision: the ball will stick to the floor after colliding and have zero velocity.

Friction is used to calculate the force of resistance an object encounters when moving across another. A value of 0.0 implies no friction, whereas a value of 1.0 implies high friction. When two physics bodies are in contact, their respective friction values are used to create a friction coefficient, which is in turn used to compute the applied frictional force for the two colliding objects. In other words, the friction values of both objects are considered. For example, a metal sword has a different coefficient of friction when rubbing against cloth than against wood.

## Physics World
While most physics parameters are set through the individual physicsBody properties of each object, there are some global physics properties that can be modified. These are accessed from the physicsWorld property in <ViroScene>. The following properties are part of physicsWorld:

gravity globally accelerates physics bodies in a specific direction. To make objects float without falling, set gravity to 0.0. The default is -9.8 m/s in the negative Y direction, to simulate gravity on Earth.

drawBounds will render lines representing the physics shapes for all physics objects in the scene. This is a useful tool for debugging physics bodies. It provides developers visual feedback on where the physics objects are, and how they interact with one another.

## Collision Events
## Colliding Objects

Developers can register for collision events that occur for a given Viro control. physicsBody has an onCollision callback property that is triggered when two physics bodies collide. As shown below, upon collision the collided point and normal are both returned in world coordinates. The ViroTag of the collided object is also returned, which can be used provide information to the callback about what the control has collided against.

```JavaScript
onCollision(collidedTag, collidedPoint, collidedNormal){
    // collidedPoint - Point at which the collision had occured, in world coords.
  // collidedNormal - The normal at the point of collision.
  // collidedTag - The ViroTag of the collided object.
},
```
## Physics Ray Hit Test

In addition to registering for collision callbacks, developers can actively query the scene for collisions with ray intersection tests. This can be done in two ways:

1. findCollisionsWithRayAsync(from, to, closest, viroTag)
This shoots a single ray into scene starting at from and ending at to. The viroTag enables developers to identify this collisionRay event within the collisionCallback of all in-scene physics bodies. If only the nearest result is desired, set the closest flag to true. This function returns true if any objects have been hit.

2. findCollisionsWithShapeAsync(from, to, shapeString, shapeParam, viroTag)
This method fires a physics shape into the scene and determines what physics objects collide with the shape. The shapeString is either "box" or "sphere", and shapeParam are shape parameters as described above for boxes and spheres. If from != to, this method only invokes the callback of the closest object that has been hit. Otherwise, if from == to (if this isn't a collision test along a path), then the collision callback is triggered on all collided objects.

You can view those methods in greater detail here.

## PhysicsBody API
Example use:
```JavaScript
<ViroBox
    position={[0,1,-3]}
  height={1} width={1} length={1}
    physicsBody={{
        type:'Dynamic', 
    mass:1,
    force:{value:[0,0,1]},
    torque:[0,30,0],
    viroTag="MySpecialBox",
    onCollision={this.onCollide}
  }}
/>
```
|PropKey|	PropType|
|--|--|
|type|	PropTypes.oneOf(['Dynamic','Kinematic','Static']).isRequired The type of this rigid body. See here for more info.|
|mass|	PropTypes.number The mass of this physics body in kg.|
|shape|	PropTypes.shape({type: PropTypes.oneOf(["Box", "Sphere", "Compound"]).isRequired,params: PropTypes.arrayOf(PropTypes.number)}) Describes the shape that represents this physics body. If not specified, this is inferred from the geometry of the parent control. Users can specify the shape in the form below:|Physics Shapes |Description||:------|:----------:||Box| Accepts [width, height, length] parameters used for creating the box.|Sphere| Accepts radius parameter.|Compound| Usually is set on VRONodes to encapsulate multiple objects in a compound shape. This is achieved by recursing down the scene graph and combining the geometries into a single compound physics shape.Example code:shape:{type:'Box', params:[0.4,0.4,0.2]} shape:{type:'Sphere', params:[0.5]}|
|restitution|	PropTypes.number The bounciness of an object. Value of 0.0 will not bounce. Value of 1.0 will bounce without any loss of energy.|
|friction|	PropTypes.number Determines the force of resistance an object or surface encounters when moving across another. Value of 0.0 implies no friction. Value of 1.0 implies high friction.|
|useGravity|	PropTypes.bool If false, this physics object will ignore all gravitational forces that are applied on this object.|
|enabled|	PropTypes.bool If false, disables all physics properties on the Viro control (as if there were no physics bodies applied).|
|force|	PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({value: PropTypes.arrayOf(PropTypes.number),position: PropTypes.arrayOf(PropTypes.number)})),PropTypes.shape({value: PropTypes.arrayOf(PropTypes.number),position: PropTypes.arrayOf(PropTypes.number)}),]),A single force vector or an array of force vectors applied to the physics body. If an array of forces is provided, the corresponding net force will be applied. Force units are in newtons.|
|torque|	PropTypes.arrayOf(PropTypes.number) A single torque vector or an array of torque vectors applied to the physics body. If an array of torque is provided, the corresponding net torque will be applied. Torque units are in newton meters.|
|velocity|	PropTypes.arrayOf(PropTypes.number) Used to directly move an object without applying a force. Units are m/s. Doing so will override any forces that are already applied on this physics body.|