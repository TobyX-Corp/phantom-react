# Particle Effects

Viro's particle system enables developers to create and configure quad emitters for building complex and intricate particle effects. Some examples are smoke, rain, confetti, and fireworks. This development guide will go through several examples of effects that can be created.

ViroParticleEmitters are particle factories that create, contain and recycle a pool of particles. Groups of particle emitters can be used in conjunction with one another to create a composite effect. For example, a campfire may include a flame emitter, a smoke emitter, and an ember or sparks emitter. In the near-future Viro will also provide several pre-built emitter templates.

Below is a code snippet of a basic ParticleEmitter, one that creates a simple 'Fountain' like effect.

```JavaScript
<ViroParticleEmitter
  position={[0, 4.5, 0]}
  duration={2000}
  run={true}
  
  image={{
    source:require("./res/particle_snow.png"),                 
    height:0.1,
    width:0.1,
  }}
/>
```
As shown above, there are three steps to creating a particle effect:

1. Provide an image source representing the particles to emit.
2. State the rate at which the particle emits and lives for.
3. Start the emitter.

You can see a more comprehensive code sample here.

## Basic Emitter Properties
There are two key configurations within the ViroParticleEmitter that you can use to control the aggregate behavior of particles. First, shown below are properties of the emitter itself. These include what image to emit, when to emit, and how long to emit for.

|Property|	Description|
|--|--|
|image|	The visual representation of a single quad particle. You can provide the source image of your particle, it's height and width, and bloom (optional).|
|duration / loop / run|	These parameters controls how long the particle emitter should run for, if it should repeat that cycle, and if it is paused or not.|

Second, the SpawnBehavior attribute contains configurable parameters describing how particles are spawned: the spawn rate, spawn volume, and burst intervals, if any.

## Spawn Rates
How fast an emitter produces particles is determined by either emissionRatePerSecond or emissionRatePerMeter (in which the particle output is proportional to how fast the emitter itself is moving). Depending on the effect you wish to create, you may decide to one or both properties. For example, in a situation where steam particles are emitted from a train upon movement, emissionRatePerMeter is the sensible choice. This is also true if you, say, have a spaceship that emits more smoke as it accelerates.

How long a particle lives for (or how fast a particle dies) is defined by particleLifetime, in milliseconds. Specifying particleLifeTime and particleEmissionRate determines an eventual steady state. In this steady state, there will be a roughly constant number of existing, spawned particles for the emitter.

|Emission Rate|	Particle LifeTime|	Max Particles|	Steady State Outcome|
|--|--|--|--|
|High|	Low|	|Low|	A quick "jet of particles" that die quickly, possibly resulting in emitter starvation.|
|Low|	High|	|Low|	Particles are produced slowly, but are long-lived, eventually resulting in emitter starvation.|
|High|	High|	|Low|	A quick "jet of particles" that are long-lived. Quickly results in emitter starvation.|
|High|	Low|	|High|	Particles are produced quickly and die quickly.|
|Low|	High|	|High|	Particles are produced slowly, and live for a long time. (Possible performance cost)|
|High|	High|	|High|	Lots of particles, produced quickly, that live for along time. (High performance cost)|

To prevent an unbounded number of particles, the ViroParticleEmitter also provides a maxParticles property.

This number caps the number of live particles per emitter at any point in time. It is important to note that the more particles your scene has, the higher the performance cost. It is recommended to keep maxParticles low when possible.

## Spawn Burst
In addition to emitting particles at a constant rate, certain particle effects may require the ability to instantaneously spawn n number of particles all at once in a single burst. Fireworks, sparks, and explosions are some examples. To specify a burst use the emissionBurst property in spawnBehavior. Here you can specify a time (or distance traveled) at which to burst a number of particles, in repetition if needed. These bursts are done in conjunction with emission rates, and are also subjected to the same maxParticles constraint.

## Spawn Volumes
By default, an emitter spawns particles at the location of the emitter. This is useful for effects tied to a single source, like smoke rising from a chimney. However, other effects may require more complex spawn volumes; for example, spawning snow or rain over an area of land.

With the spawnVolume property in spawnBehavior, you can specify the shape within which to spawn particles. Supported shapes are box with width, height, and length, and sphere with either radius or an x,y,z ellipsoid length. All particles will spawn in a uniformly distributed pattern within the shape.

Finally, there may be effects that require particles to spawn on the surface of a shape, rather than within it. For example, fireworks require particles to be spawned on the surface of a sphere. To achieve this effect, set the spawnOnSurface flag within spawnVolume. Particles will be spawned in a uniformly distributed fashion on the surface of the specified shape.

## Particle Appearance Attributes
The visual traits of particles may change over time. For example, firework particles may change in color, while smoke particles may grow in size before disappearing into the sky. These visual behaviors can be created through the `particleAppearance property.

There are four types of particle visual properties: opacity, scale, rotation, and color. To configure each property:

1. Provide an initialRange of of values. For each particle a value will be chosen from a uniform distribution across this range. If the range consists of two identical values, there will be no randomization.

2. If the property is dynamic (meaning it changes over the course of the particle's lifetime), then it needs a factor against which to interpolate the change. This can be either "time" (e.g. making a particle scale down over time) or "distance" (e.g. making a particle scale down as it moves away).

3. Finally, again only if the property is dynamic, provide a list of interpolation data to describe the change over time. Each item in the interpolation list consists of the endValue you wish to interpolate toward, and the interval within which to interpolate. Interval values can start and end at any point in the particle's lifecycle, as long as they do not overlap each other.

An interpolation example is provided below:

```JSON
opacity: {
    initialRange: [1.0, 1.0],
    factor: "time",
    interpolation: [{
            endValue: 0.8,
            interval: [0, 500]
        },
        {
            endValue: 0.0,
            interval: [500, 1000]
        }
    ]
},
```
In the snippet above, we are manipulating the opacity of our particles by slowly fading them out to 0.8 over the first 500 milliseconds, and then we fade them completely to 0.0 at 1000 milliseconds.

## Particle Physics Attributes
By default, particle emitters radiate particles in a fountain-like fashion. This movement behavior is also configurable through the particlePhysics attribute. Whether it be falling snow, rising smoke, or exploding fireworks, these physics-specific attributes describe how a particle moves over the course of its lifetime.

The first two properties -- velocity and acceleration -- are straightforward: they define each particle's initial velocity or constantly applied acceleration. Setting these values will override the emitter's "fountain-like" default behavior. As before, you can provide a range of two identical values to eliminate randomization. Or you can provide a lower and upper bound.

A variety of affects can be produced with these two properties. For example, falling, swaying snow can be achieved with a fixed acceleration of -9.81 and a randomized initial horizontal velocity. A similar configuration can be used to make steam particles emanate from a kettle. Note also that these physics properties can be used in conjunction with the animation system. For example, to make a tornado, radiate particles upward in a fountain-like fashion with fixed velocity, then rotate the node clockwise about the Y axis with an animation.

When moving particles, the fixedToEmitter property controls the reference point to use when computing the particle's appearance and movement. When true, Viro uses the emitter's current position; when false, Viro uses each particle's individual spawn location. Under fixedToEmitter = false, particles are not "locked" to the emitter; they can float away. For example, smoke particles from a moving train would continue floating upward from the location they were spawned. Under fixedToEmitter = true, the smoke particles would be "locked" to the train's emitter: they would always move with the train in reference to the emitter's location.

Impulsive forces, to create effects like explosions, are also possible. For example, fireworks require an initial impulse on every particle, each in a different direction from the detonation point. This behavior can be achieved with the explosiveImpulse property in particlePhysics. This property is specified in newton seconds. The detonation position (relative to the particle emitter) may also be specified. The closer particles are to the detonation point, the larger their explosion force.

Finally, the behavior of an explosion may also be tuned with the decelerationPeriod property. This effectively enables developers to apply a "dampening deceleration effect" against the explosive impulse force, in order to slow down the explosion. The decelerationPeriod defines the timeframe within which the particles will decelerate from their initial velocity to 0.0 m/s. This is particularly useful for fireworks, which explode outward then slow down / are dampened after a specific length of time or spherical size. An interesting side effect of this property is that the deceleration dampener effect is still applied even after the decelerationPeriod, if the particle is still alive. That is to say, the particle would continue to decelerate in the opposite direction of the explosion, creating a "gravitational attraction" effect.

It is also important to note that setting an initial explosiveImpulsive force automatically invalidates any initial velocity property that is set on the emitter's particlePhysics attribute, as an explosion directly manipulates an object's velocity. Likewise, if the decelerationPeriod is provided in the explosiveImpulse, this dampening behavior will override the acceleration property set in particlePhysics.

