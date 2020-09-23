# Animation
Animating content in your scenes

Animations provide useful feedback to users and add "life" to an application. Viro enables powerful and simple animations on all components.

## Overview
Animations work by registering animations with ViroAnimations.registerAnimations(), then invoking the animation by using the animation prop of the component being animated.

## Registering Animations
Before an animation can be used, it must created and registered. Animations are specified by the following properties:

|Animation property	|Description|
|--|--|
|properties|	Dictionary containing the values the component should animate toward. Animatable properties include: opacity: opacity of an object, [0, 1] positionX: position of object on x-axis positionY: position of object on y-axis positionZ: position of object on z-axis rotateX: rotation of object around x-axis, in degrees rotateY: rotation of object around y-axis, in degrees rotateZ: rotation of object around z-axis, in degrees scaleX: scale value of object on x-axis scaleY: scale value of object on y-axis scaleZ: scale value of object on z-axis * material: the texture, lighting, and other surface properties of the object|
|easing	|The pacing of the animation. Linear: the animation will occur evenly over its duration EaseIn: the animation will begin slowly and then speed up as it progresses EaseOut: the animation will begin quickly and then slow as it progresses EaseInEaseOut: the animation will begin slowly, accelerate through the middle of its duration, and then slow again before completing Bounce: the animation will begin quickly and overshoot* its final position before settling into its final resting place|
|duration	|Length in milliseconds of the animation|
|delay	|Delay in milliseconds to wait before starting the animation|

In the following example, we register an animation that sets the scale of the component to which it is applied to[1.0, 0.6, 1.0], and sets the opacity of said component to 1.0. The animation bounces toward its final value, and lasts for five seconds.

```JavaScript
ViroAnimations.registerAnimations({
    animateImage:{properties:{scaleX:1.0, scaleY:0.6, scaleZ:1.0, 
                              opacity: 1.0},
                  easing:"Bounce", 
                  duration: 5000},
});
```
## Applying Animations
Once an animation is registered, it needs to be applied to the components we wish to animate. To do this, we use the animation prop of the component. Please check the API reference of the component you wish to animate to ensure it supports animations.

The animation object prop has the following structure:

|PropKey	|PropType|
|--|--|
|animation	|PropTypes.string The name of the animation. This should match the name in the Animation registry.|
|delay	|PropTypes.number The delay in milliseconds to apply before executing the specified animation.|
|loop	|PropTypes.bool True if the animation should loop. Set to false by default.|
|onFinish	|PropTypes.func Callback invoked when the animation has finished. If loop is set to true, this is invoked every time the animation loops.|
|onStart	|PropTypes.func Callback invoked when the animation has started. If loop is set to true, this is invoked every time the animation loops.|
|run	|PropTypes.bool Set to true to start the animation. If you set to false, this will pause the animation. The default value is true.|
|interruptible	|PropTypes.bool Set to true if this animation can be interrupted. This means if the animation is changed while it is playing, rather than waiting until the current animation finishes, the animation will be interrupted immediately.|

```JavaScript
<ViroImage source={require('./res/myimage.jpg')} 
           position={[0, -1, -2]} 
           scale={[0.1, 0.1, 0.1]}
           animation={{name:'animateImage', run:true}} 
/>
```
In the example above, we apply the animateImage animation (which we registered in the section above) to the <ViroImage>. The <ViroImage> initially has a scale of [0.1, 0.1, 0.1]. animateImage will animate this scale to [1.0, 0.6, 1.0] over 5 seconds.

The animation will run immediately after the <ViroImage> is added to the scene because run is set to true. If run were set to false, you could trigger the animation at any time by setting it to true. After a button press, for example.

Note that you can apply a single animation to multiple components.

The full code for this animation is below.

```JavaScript
'use strict';

import React, { Component } from 'react';
import {
  ViroScene,
  ViroImage,
  ViroAnimations,
} from 'react-viro';

var AnimationTest = createReactClass({
  render: function() {
    <ViroScene>
        <ViroImage source={require('./res/myimage.jpg')}
                         position={[0, -1, -2]}         
                           scale={[.1, .1, .1]} 
                   animation={{name:'animateImage', 
                              run:true}}  />
    </ViroScene>
  }
});

ViroAnimations.registerAnimations({
  animateImage:{properties:{scaleX:1, scaleY:.6, scaleZ:1, opacity: 1},  
        easing:"Bounce", duration: 5000},
});
```
## Looping and Additive Animations
Animations can be looped, and the target properties for an animation can be set in an additive or multiplicative manner. Below is a simple example showing how to loop an animation that adds to the current property of a component.

```JavaScript
var AnimationTest = createReactClass({
  render: function() {
    <ViroScene>
        <ViroImage source={require('./res/myimage.jpg')}
                    position={[0, -1, -2]}      
                    scale={[.1, .1, .1]}
                  animation={{name:'loopRotate',
                             run:true,
                             loop:true}} />
    </ViroScene>
  }
});

ViroAnimations.registerAnimations({
  loopRotate:{properties:{rotateY:"+=45"}, duration:1000},
});
```
The example above rotates an image around the y axis in an infinite loop. The rotateY property of the loopRotate animation takes the value +=45. This means it will add 45 degrees to the y angle of the component every 1 second. Properties can also be subtracted (-=), multiplied (*=), or divided (/=).

## Chaining Animations
Suppose you have a series of animations that you wish to run in sequence. For example, you have an animation that moves a component horizontally called moveRight, and an animation that rotates a component called rotate, and you would like to run these one after the other. You can do the following:

```JavaScript
ViroAnimations.registerAnimations({
  moveRight:{properties:{positionX:"+=0.3"}, duration: 10000},
  rotate:{properties:{rotateZ:"+=45"}, duration:1000},
  rotateAndMovePicture:[
      ["moveRight", "rotate"],
  ]
});
```
In the example above, we define an animation chain called rotateAndMovePicture. It is defined as an array of existing animations. This new animation, when applied, will move the component then rotate it.

If you want animations to run in parallel instead of in sequence, simply define an animation as multiple animation chains, as demonstrated in the following snippet. rotateAndMovePicture, when applied, will start both chains at the same time: the component will move right and rotate concurrently.

```JavaScript
ViroAnimations.registerAnimations({
  moveRight:{properties:{positionX:"+=0.3"}, duration: 10000},
  rotate:{properties:{rotateZ:"+=45"}, duration:1000},
  rotateAndMovePicture:[
      ["moveRight"],
      ["rotate"],
  ]
});
```
Finally, you can also run animation chains, each with multiple sequential steps, concurrently in parallel with one another. The following example makes our component move right, then move back to its original position; while this is happening, the component will also rotate.

```JavaScript
ViroAnimations.registerAnimations({
    moveRight:{properties:{positionX:"+=0.3"}, duration: 10000},
    moveLeft:{properties:{positionX:"-=0.3", rotateZ:"+=45"}, duration: 10000},
    rotate:{properties:{rotateZ:"+=45"}, duration:1000},
    rotateAndMovePicture:[
        ["moveRight", "moveLeft"],
        ["rotate"]
    ]
});
```
## Interrupting Animations
There are times when interrupting an animation in motion is desired. For example, if a user touches a moving box, you may want to stop the box's movement and have it do something else entirely.

Animations can be interrupted by setting the interruptible flag to true. If this flag is set to true, then changing the animation will immediately start the new animation without waiting for the current animation to finish. Let's look at an example:

```JavaScript
var InterruptAnimation = createReactClass({
  getInitialState() {
    return {
      currentAnim:"moveLeftRight",
    };
  },

  render: function() {
    <ViroScene>
        <ViroBox position={[0, -1, -2]}         
                 scale={[0.1, 0.1, 0.1]}
                 onClick={this._switchAnimation}
                 animation={{name:this.state.currentAnim, 
                             run:true, 
                             interruptible: true}}
        />
    </ViroScene>
  },
  
  _switchAnimation() {
      if(this.state.currentAnim == "moveLeftRight") {
                    this.setState({
            currentAnim:"rotate", 
          });
            } else {
         this.setState({
                        currentAnim:"moveLeftRight",
         });
      }
   },                                            
});

ViroAnimations.registerAnimations({
    moveRight:{properties:{positionX:"+=0.3"}, duration: 10000},
    moveLeft:{properties:{positionX:"-=0.3", rotateZ:"+=45"}, duration: 10000},
    rotate:{properties:{rotateZ:"+=45"}, duration:1000},
    moveLeftRight:[
        ["moveRight", "moveLeft"],
    ]
});
```
The above sample will render a ViroBox moving from left to right. When clicked, it will start rotating; and when clicked again it will resume moving left to right.

## Animation callbacks
Animation callbacks can be used to perform an action when an animation starts, or after an animation completes. For example, to respond to the end of an animation, add the desired function to the onFinish property of the animation property. Let's look at an example:

```JavaScript
var AnimationOnFinishTest = createReactClass({
  render: function() {
    <ViroScene>
        <ViroImage source={require('./res/myimage.jpg')}
                     position={[0, -1, -2]}         
                     scale={[0.1, 0.1, 0.1]}
                     animation={{name:'animateImage', 
                                run:true, 
                                onFinish:{this._onAnimationFinished}}}
        />
    </ViroScene>
  },
  
 _onAnimationFinished(){
      console.log("Animation has finished!");
  },
});

ViroAnimations.registerAnimations({
    animateImage:{properties:{scaleX:1, scaleY:.6, scaleZ:1, opacity: 1},
                  easing:"Bounce", duration: 5000},
});
```
The function is invoked after the animation has ended. If the animation is looping, the function is invoked at the end of every loop.

## Animating Materials
In addition to position, rotation, and scale, the material used by any Viro object can also be animated from one to another. In the example below, we animate a ViroQuad from red to blue.

```JavaScript
var AnimationTest = createReactClass({
  render: function() {
    return (
      <ViroScene >
          <ViroQuad materials={["redColor"]} 
                       position={[0, -.5, -1]}
                       animation={{name:'animateColor', 
                                  run:{true}, 
                                  loop:{false},
                                  delay:3000}}} 
           />
      </ViroScene>
    );
  },
});

ViroMaterials.createMaterials({
  redColor: {
    diffuseColor: "#FF0000"
  },
  blueColor: {
    diffuseColor: "#0000FF"
  },
});

ViroAnimations.registerAnimations({
    animateColor:{properties:{material:"blueColor"}, duration:3000},
});
```
Because material animations can move from one material to any other material, you can use this feature to animate between textures, lighting models, and more.

## Skeletal Animation
Skeletal animation is a technique for animating complex geometries; for example, to make a humanoid character walk. These animations are typically authored in 3D graphics software, and exported as FBX files. Viro has full support for these animations. For more information, please see the 3D Objects guide.