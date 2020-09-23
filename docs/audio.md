# Sound
Adding audio to your scenes

ViroReact supports three forms of audio: stereo sound, spatial sound, and ambisonic sound fields. Sprinkling environments with sound helps to add true immersion to your scenes; they draw the listener's attention and provide cues on where to look next. ViroReact supports three forms of sound.

## Stereo Sound
Many scenes benefit from having a background sound track, either in the form of music or ambient noise like wind or ocean waves. You can add background audio to your scene by utilizing the <ViroSound> component. The audio to be played is specified via the source property, as in the following example.

```JavaScript
<ViroSound paused={false}
           muted={false}
           source={require('./res/sound.mp3'}
           loop={false}
           volume={1.0}
           onFinish={this.onFinishSound}
           onError={this.onErrorSound}/>
```

!> The following paragraph is broken in original documentation.

ViroSound can also be used for short sound effects. To replay such a sound, either set loo to true, or toggle pause off and on. Finally, these sounds also provide callbacks: onFinis is invoked whenever the sound completes (if looping, this is invoked at the end of each loop onErro is invoked if a sound fails to load. <ViroSpatialSound component. This component supports all the fields of
<ViroSound and adds new properties that define how the sound travels. positio indicates the position of the sound within the coordinate space of its parent node minDistanc
specifies the distance from the sound at which it *starts* attenuating maxDistanc the maximum distance at which the sound can be heard; that is, when the sound attenuates to zero rolloffMode defines the curve of the attenuation between
minDistanc and maxDistanc and can be set to non, linea or logarithmi>

Spatial sounds are especially useful in that they can be animated along with visual objects in the scene graph. In the example below, the 'chirp' sound follows the bird 3D object. We can do this by adding both the sound and the 3D object to the same node, then simply animating the node as a whole.

```JavaScript
var SoundAnimationTest = React.createClass({
  render: function() {
    <ViroScene>
        <ViroAnimatedComponent animation='translate' run={true} loop={true}>
        <ViroNode>
          <Viro3DObject source={require('./res/bird.obj')}
                        resources={[require('./res/bird.mtl'),
                                    require('./res/bird.jpg')]}
                        position={[0, 0, 0]} />
          <ViroSpatialSound rolloffModel="linear"
                  paused={false} muted={false}
                  minDistance={5} maxDistance={8}
                  position={[0, 0, 0]}
                  source={require('./res/chirp.wav'}
                  loop={true}
                  volume={1.0} />
        </ViroNode>
     </ViroAnimatedComponent> 
   </ViroScene>
  }
});

ViroAnimations.registerAnimations({
  translate:{properties:{positionX:"+=1.0"}, duration:1000},
});
```

## Ambisonic Sound Fields
Ambisonic sound fields emit environmental sound from every direction. They are the audio equivalent of a skybox or 360 image, providing atmospheric background noise. These sounds respond to the user's head rotation.

Producing ambisonic sound is beyond the scope of this document, but if you have ambisonic sound files, you can load them into ViroReact via the <ViroSoundField> component. This component shares the same properties as <ViroSound>, and can additionally be rotated about the Z axis with the rotation property. See the reference for details.