# ParticleEmitter

A ParticleEmitter is a particle factory that creates, contains, and recycles a pool of quad particles to create a particle effect. See the Particle Effect guide for more information.

Example use:

```JavaScript
<ParticleEmitter
  position={[0, 4.5, 0]}
  duration={2000}
  visible={true}
  delay={0}
  run={true}
  loop={true}
  fixedToEmitter={true}

  image={{
    source:require("./res/particle_snow.png"),                 
    height:0.1,
    width:0.1,
    bloomThreshold:1.0
  }}

  spawnBehavior={{
    particleLifetime:[4000,4000],
    emissionRatePerSecond:[150, 200], 
    spawnVolume:{
      shape:"box", 
      params:[20, 1, 20], 
      spawnOnSurface:false
    },
    maxParticles:800
  }}

  particleAppearance={{
    opacity:{
      initialRange:[0, 0],
      factor:"time",
      interpolation:[
        {endValue:0.5, interval:[0,500]},
        {endValue:1.0, interval:[4000,5000]}
      ]
    },

    rotation:{
      initialRange:[0, 360],
      factor:"time",
      interpolation:[
        {endValue:1080, interval:[0,5000]},
      ]
    },

    scale:{
      initialRange:[[5,5,5], [10,10,10]],
      factor:"time",
      interpolation:[
        {endValue:[3,3,3], interval:[0,4000]},
        {endValue:[0,0,0], interval:[4000,5000]}
      ]
    },
  }}
  
  particlePhysics={{
    velocity:{
    initialRange:[[-2,-.5,0], [2,-3.5,0]]}
  }}
/>
```

## Props

## Required Props

**image**	PropTypes.shape({
source : PropTypes.oneOfType([
PropTypes.shape({ uri: PropTypes.string }),
PropTypes.number
]).isRequired,
height: PropTypes.number,
width: PropTypes.number,
bloomThreshold: PropTypes.number,
})

Image data used to represent the visual look of individual quad particles produced by this Particle Emitter.

|SubProp|Description|
|:------|:----------:|
|source| The image source, a remote URL or a local file resource. PNG and JPG images accepted.|
|height|The height of an individual quad particle in 3D space. Default value is 1.|
|width|The width of an individual quad particle in 3D space. Default value is 1.|
|bloomThreshold| The luminance brightness threshold that must be crossed before bloom effects are applied to the particles. Set this attribute to 0.0 to always make particles bloom, or to a value > 0.0 and < 1.0. Defaults to -1 (no bloom).|

## Optional Props

**delay**	PropTypes.number

The delay in milliseconds to apply before this emitter starts a new emission cycle. Particles are produced during each emission cycle.

**duration**	PropTypes.number

The length of an emitter's emission cycle in milliseconds.

**fixedToEmitter**	PropTypes.bool

When moving particles, the fixedToEmitter property controls the reference point to use when computing the particle's appearance and movement. When true, Phantom uses the emitter's current position; when false, Phantom uses each particle's individual spawn location. Under fixedToEmitter = false, particles are not "locked" to the emitter; they can float away. For example, smoke particles from a moving train would continue floating upward from the location they were spawned. Under fixedToEmitter = true, the smoke particles would be "locked" to the train's emitter: they would always move with the train in reference to the emitter's location.

**loop**	PropTypes.bool

True if the emitter should restart emitting particles at the end of each emission cycle, after the delay.

**onTransformUpdate**	PropTypes.func

A function that is invoked when the component moves. Provides an array of numbers representing the component's position in world coordinates.

**particleAppearance**	see Particle Appearance

A collection of properties defining the appearance of individual particles over the course of their lifetime (color, scale, opacity, rotation).

**particlePhysics**	see Particle Physics

A collection of properties defining the movement behavior of individual particles over the course of their lifetime, like velocity and acceleration.

**position**	PropTypes.arrayOf(PropTypes.number)

Cartesian position in 3D space, stored as [x, y, z].

**rotation**	PropTypes.arrayOf(PropTypes.number)

The rotation of the container around its local axis specified as Euler angles [x, y, z]. Units for each angle are specified in degrees.

**rotationPivot**	PropTypes.arrayOf(PropTypes.number)

Cartesian position in [x,y,z] about which rotation is applied relative to the component's position.

**run**	PropTypes.bool

If true, this emitter will start emitting particles. Can be set to false to pause particle emission.

**scale**	PropTypes.arrayOf(PropTypes.number)

The scale of the all particles contained within this emitter in 3D space, specified as [x,y,z]. A scale of 1 represents the current size of the container. A scale value of < 1 will make the container proportionally smaller while a value >1 will make the container proportionally bigger along the specified axis.

**scalePivot**	PropTypes.arrayOf(PropTypes.number)

Cartesian position in [x,y,z] from which scale is applied relative to the component's position.

**spawnBehavior**	see Spawn Behavior

A collection of properties defining the spawning behavior of this emitter, like how fast particles spawn, how many to spawn, and when to spawn.

**visible**	PropTypes.bool

False if the container should be hidden. By default the container is visible and this value is true.

**renderingOrder**	PropTypes.number

This determines the order in which this Node is rendered relative to other Nodes. Nodes with greater rendering orders are rendered last. The default rendering order is zero. For example, setting a Node's rendering order to -1 will cause the Node to be rendered before all Nodes with rendering orders greater than or equal to 0.

**rotation**	PropTypes.arrayOf(PropTypes.number)

Put the PropType Description here.

**scale**	PropTypes.arrayOf(PropTypes.number)

Put the PropType Description here.

**transformBehaviors**	PropTypes.arrayOf(PropTypes.string)

Put the PropType Description here.

**width**	PropTypes.number

Put the PropType Description here.

**volume**	PropTypes.number

Put the PropType Description here.

**visible**	PropTypes.bool

Put the PropType Description here.

## Spawn Behavior

**emissionRatePerSecond**	PropTypes.arrayOf(PropTypes.number)

The total number of particles this emitter spawns in a second. This value is chosen at random from the given [min, max] range array, and is in addition to the other emission parameters.

**emissionRatePerMeter**	PropTypes.arrayOf(PropTypes.number)

The total number of particles this emitter spawns per meter travelled. This value is chosen at random from the given [min, max] range array, and is in addition to the other emission parameters.

**particleLifetime**	PropTypes.arrayOf(PropTypes.number)

The lifetime of a particle in milliseconds.

**maxParticles**	PropTypes.number

The maximum number of live particles that can exist at any moment from this emitter. This includes particles that have been created by the emissionRatePerSecond, emissionRatePerMeter, and emissionBurst parameters. When the cap is reached, new particles will only be spawned as existing particles die off.

**emissionBurst**	PropTypes.arrayOf(PropTypes.oneOfType([
PropTypes.shape({
time: PropTypes.number,
min: PropTypes.number,
max: PropTypes.number,
cycles: PropTypes.number,
cooldownPeriod: PropTypes.number,
}),
PropTypes.shape({
distance: PropTypes.number,
min: PropTypes.number,
max: PropTypes.number,
cycles: PropTypes.number,
cooldownDistance: PropTypes.number,
})

An array of parameters controlling how this emitter spawns particles in bursts, if any. Bursts can be scheduled to occur at certain times, or after a certain distance travelled by the emitter.

|SubProp|Description|
|:------|:----------:|
|time or distance| Time in milliseconds, at which to emit this burst of particles. This time is set in reference to the start of the emission cycle of this emitter. Can also be in terms of distance travelled, in meters.|
|min| The minimum number of particles to burst.|
|max| The maximum number of particles to burst.|
|cycles| The number of times to loop and repeat this burst. |
|cooldownPeriod| The cool down / waiting duration between cycles before the emitter spawns another burst of particles.|

**spawnVolume**	PropTypes.shape({
shape: PropTypes.string,
params: PropTypes.arrayOf(PropTypes.number),
spawnOnSurface:PropTypes.bool
})

The shape of the volume within which to spawn particles, and the parameters that describe that volume. If spawnOnSurface is true, particles will spawn on the surface of the volume, instead of within the volume. Note that particles will be uniformly distributed throughout the volume.

|Spawn Volume| Accepted Params|
|:------|:----------:|
|Box| [width, height, and length] |
|Sphere| A single float describing a radius parameter for a perfect sphere, or a vector representing the [x, y, z] length of an ellipsoid.

## Particle Appearance

**SubPropKey**	PropType
opacity	PropTypes.shape({
initialRange: PropTypes.arrayOf(PropTypes.number),
factor: PropTypes.oneOf(["time", "distance"]),
interpolation: PropTypes.arrayOf(PropTypes.shape({
interval: PropTypes.arrayOf(PropTypes.number),
endValue: PropTypes.number,
}))

Collection of parameters controlling the opacity of individual particles over time. You can see code examples here .

|SubProp|Description|
|:------|:----------:|
|initialRange| The [min, max] range array within which to initialize a randomized opacity for particles to start of with.|
|factor| The unit of reference against which to interpolate your visual property values, can be either time or distance.|
|interpolation| An array of data points, each containing an endValue and an interpolation interval, thereby "charting" the behavior of this property over the lifetime of the particle.|

**scale**	PropTypes.shape({
initialRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
factor: PropTypes.oneOf(["time", "distance"]),
interpolation: PropTypes.arrayOf(PropTypes.shape({
interval: PropTypes.arrayOf(PropTypes.number),
endValue: PropTypes.arrayOf(PropTypes.number),
}))

Collection of parameters controlling scaling behavior of individual particles over time. You can see code examples here .

|SubProp|Description|
|:------|:----------:|
|initialRange| The [min, max] range array within which to initialize a randomized opacity for particles to start of with. Here, min and max are vectors, as particles are scaled in 3d space.|
|factor| The unit of reference against which to interpolate your visual property values, can be either time or distance.|
|interpolation| An array of data points, each containing an endValue and an interpolation interval, thereby "charting" the behavior of this property over the lifetime of the particle.|

**rotation**	PropTypes.shape({
initialRange: PropTypes.arrayOf(PropTypes.number),
factor: PropTypes.oneOf(["time", "distance"]),
interpolation: PropTypes.arrayOf(PropTypes.shape({
interval: PropTypes.arrayOf(PropTypes.number),
endValue: PropTypes.number,
}))

Collection of parameters controlling the rotation of individual particles over time. You can see code examples here .

|SubProp|Description|
|:------|:----------:|
|initialRange| The [min, max] range array defining the interval of initial rotation values for each particle. Min and max are floats. Rotation is performed on the quad's Z axis, and are then billboarded to the user.|
|factor| The unit of reference against which to interpolate visual property values, can be either time or distance.|
|interpolation| An array of data points, each containing an endValue and an interpolation interval, thereby "charting" the behavior of this property over the lifetime of the particle.|

**color**	PropTypes.shape({
initialRange: PropTypes.arrayOf(ColorPropType),
factor: PropTypes.oneOf(["time", "distance"]),
interpolation: PropTypes.arrayOf(PropTypes.shape({
interval: PropTypes.arrayOf(PropTypes.number),
endValue: ColorPropType,
}))

Collection of parameters controlling the color of individual particles over time. You can see code examples here .

Valid color formats are:

'#f0f' (#rgb)

'#f0fc' (#rgba)

'#ff00ff' (#rrggbb)

'#ff00ff00' (#rrggbbaa)

'rgb(255, 255, 255)'

'rgba(255, 255, 255, 1.0)'

'hsl(360, 100%, 100%)'

'hsla(360, 100%, 100%, 1.0)'

'transparent'

'red'

* 0xff00ff00 (0xrrggbbaa)

|SubProp|Description|
|:------|:----------:|
|initialRange| The [min, max] range within which to initialize each particle's color.|
|factor| The unit of reference against which to interpolate your visual property values, can be either time or distance.|
|interpolation| An array of data points, each containing an endValue and an interpolation interval, thereby "charting" the behavior of this property over the lifetime of the particle.|

## Particle Physics

**SubPropKey**	PropType

**velocity**	PropTypes.shape({
initialRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
})

The range of values defining a particle's initial velocity.

**acceleration**	PropTypes.shape({
initialRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
})

The range of values a particle spawns with as it's initial acceleration.

|SubProp|Description|
|:------|:----------:|
|initialRange| The range of values defining a particle's acceleration.

**explosiveImpulse**	PropTypes.shape({
impulse: PropTypes.number,
position: PropTypes.arrayOf(PropTypes.number),
decelerationPeriod: PropTypes.number,
})

Collection of properties describing the velocity / and acceleration behavior of emitted particles to achieve an explosive effect.

|SubProp|Description|
|:------|:----------:|
|Impulse| Describes the magnitude of the explosive force to apply to all particles.|
|Position| The vector location from which said explosion detonates (local to the emitter). The closer the particles are to the detonation location, the stronger the impulse explosion force.|
|decelerationPeriod| Is the timeframe within which the particles will decelerate against the explosion's directional velocity to 0 m/s.|

## Methods

**async getBoundingBoxAsync()**

Async function that returns the component's bounding box in world coordinates.

Returns a Promise that will be completed with the following object:

{ `boundingBox` : { `minX` : number, `maxX` : number, `minY` : number, `maxY` : number, `minZ` : number, `maxZ` : number } }

**setNativeProps(nativeProps: object)**

A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });