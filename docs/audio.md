# Sound
Adding audio to your scenes

PhantomReact supports three forms of audio: stereo sound, spatial sound, and ambisonic sound fields. Sprinkling environments with sound helps to add true immersion to your scenes; they draw the listener's attention and provide cues on where to look next. PhantomReact supports three forms of sound.

## Stereo Sound
Many scenes benefit from having a background sound track, either in the form of music or ambient noise like wind or ocean waves. You can add background audio to your scene by utilizing the <Sound> component. The audio to be played is specified via the source property, as in the following example.

```JavaScript
<Sound paused={false}
           muted={false}
           source={require('./res/sound.mp3'}
           loop={false}
           volume={1.0}
           onFinish={this.onFinishSound}
           onError={this.onErrorSound}/>
```

!> The following paragraph is broken in original documentation.

Sound can also be used for short sound effects. To replay such a sound, either set loo to true, or toggle pause off and on. Finally, these sounds also provide callbacks: onFinis is invoked whenever the sound completes (if looping, this is invoked at the end of each loop onErro is invoked if a sound fails to load. <SpatialSound component. This component supports all the fields of
<Sound and adds new properties that define how the sound travels. positio indicates the position of the sound within the coordinate space of its parent node minDistanc
specifies the distance from the sound at which it *starts* attenuating maxDistanc the maximum distance at which the sound can be heard; that is, when the sound attenuates to zero rolloffMode defines the curve of the attenuation between
minDistanc and maxDistanc and can be set to non, linea or logarithmi>

Spatial sounds are especially useful in that they can be animated along with visual objects in the scene graph. In the example below, the 'chirp' sound follows the bird 3D object. We can do this by adding both the sound and the 3D object to the same node, then simply animating the node as a whole.

```JavaScript
var SoundAnimationTest = React.createClass({
  render: function() {
    <Scene>
        <AnimatedComponent animation='translate' run={true} loop={true}>
        <Node>
          <3DObject source={require('./res/bird.obj')}
                        resources={[require('./res/bird.mtl'),
                                    require('./res/bird.jpg')]}
                        position={[0, 0, 0]} />
          <SpatialSound rolloffModel="linear"
                  paused={false} muted={false}
                  minDistance={5} maxDistance={8}
                  position={[0, 0, 0]}
                  source={require('./res/chirp.wav'}
                  loop={true}
                  volume={1.0} />
        </Node>
     </AnimatedComponent> 
   </Scene>
  }
});

Animations.registerAnimations({
  translate:{properties:{positionX:"+=1.0"}, duration:1000},
});
```

## Ambisonic Sound Fields
Ambisonic sound fields emit environmental sound from every direction. They are the audio equivalent of a skybox or 360 image, providing atmospheric background noise. These sounds respond to the user's head rotation.

Producing ambisonic sound is beyond the scope of this document, but if you have ambisonic sound files, you can load them into PhantomReact via the <SoundField> component. This component shares the same properties as <Sound>, and can additionally be rotated about the Z axis with the rotation property. See the reference for details.