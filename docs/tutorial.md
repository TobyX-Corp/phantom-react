# Tutorial VR

This tutorial requires the completion of the Quick Start.

This tutorial is a step by step guide for developing a simple AR app. Our goal by the end of this tutorial is to:

1. Understand HelloWorldScene.js
2. Change the photosphere from a beach to a park
3. Add a new component to our HelloWorldScene
4. Add an event to our HelloWorldScene
5. Add a second scene to our app
## Understanding HelloWorldScene.js
The scene you are presented with is HelloWorldScene.js which is set as the initialScene on the ViroVRSceneNavigator component in the App.js, which serves as the entry point into your app.

ViroReact is built on top of React Native and uses React Native constructs to make it easy to create native VR applications. In addition to understanding Javascript, you will also need to understand some basic React concepts, like [JSX](https://reactjs.org/docs/jsx-in-depth.html), [components](https://reactjs.org/docs/react-component.html), [state](https://reactnative.dev/docs/state.html), and [props](https://reactnative.dev/docs/props.html).

Below is the code for HelloWorldScene.js:

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('./res/guadalupe_360.jpg')} />
        <ViroText text="Hello World!" width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
      </ViroScene>
    );
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldScene;
```
This file represents the first and only scene in the app. A scene in VR is analogous to a web page on the web or a ViewController on mobile: it is a full 'screen' that is rendered to the user. The difference in VR is that there are no bounds; the content surrounds you in 360 degrees. Let's go through the file in detail:

## Importing Components
The code begins by importing React, StyleSheet from React Native and react-viro components that the app will use. In this app we use ViroScene,ViroText, and Viro360Image.

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
} from 'react-viro';
  
...
```
## HelloWorldScene class
Below the import code, we create a standard ES6 class HelloWorldScene that extends a React Component that adheres to the [react component lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle). Read more about ES6 classes [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and [here](https://hacks.mozilla.org/2015/07/es6-in-depth-classes/).

First we start with the constructor(). In the constructor, we call the super()/parent constructor (in Component) and we initialize the state. Below that, we "bind" this to the functions we declare in this class so that they may reference this object.

Next, we have the render() function which determines how our scene is displayed. It's defined using [JSX](https://reactjs.org/docs/jsx-in-depth.html) which is syntactically similar to HTML. In the section below we go through this method in detail.

```JavaScript
...

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('./res/guadalupe_360.jpg')} />
        <ViroText text="Hello World!" width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
      </ViroScene>
    );
  }

}

...
```
In the return statement, we declare the top level VR component: ViroScene. All other components are children of the ViroScene.

Viro360Image is the next component: it is known as a background component, in that is rendered behind all other objects in the scene. Viro360Image renders a 360 degree photo that surrounds the user.

ViroText is declared next. It displays the text "Hello World" at x,y,z position of (0,0,-2) with the font, font size and color specified by the style property. In our coordinate system, the viewer faces in the negative-Z direction, so providing a Z coordinate of -2 places the object in front of the viewer.
## Declaring Styles
After the render method, we declare styles that can be used in our application. Styles generally represent layout properties for components. In our app, we declare a style named helloWorldTextStyle that describes the font type, color, size and alignment for our ViroText component.

```JavaScript
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldScene;
```
Now that we described how our scene works, let's see how we can expand upon it.

## Changing Photospheres
Setting a background is important in VR: it gives the user context and immersion. 360 photos and 360 videos are popular backgrounds in VR. Let's change our HelloWorldScene from a beach to a park.

To help you get started, we provide a library of Free Assets. Go to the Free Assets page and scroll down to the Park asset. Save this file as 360_park.jpg in your res folder. In your HelloWorldScene.js file update the Viro360Image component as shown below.

```JavaScript
<Viro360Image source={require('./res/360_park.jpg')} />
```
Save your file and reload the app. To reload your file, simply shake your phone and a debug menu will appear, as shown below. Tap on "Reload" and your changes will appear.

?> Reloading on Android Devices

?> Android devices running Nougat OS w/ Daydream must reload using ADB with the command: adb shell input text rr

?> Android devices running Nougat OS w/ Cardboard must set debug={true} on SceneNavigator within your App.js file for the debug menu to appear.

?> More details on [Reloading](develop-with-viro.md)

Once you reload, you should now see the scene below:


## Adding Components to a Scene
Let's take our current HelloWorld scene and add a 3D Box above the "Hello World" text. We can do this by using the ViroBox component. To add a box to our scene we do the following:

First we import ViroBox and ViroMaterials from react-viro so our import statements now look like:

```JavaScript
import {
  ...
  ViroBox,
  ViroMaterials,
} from 'react-viro';
```
Next we need to add the box to our scene. The ViroBox API Reference lets us know what properties we can set to customize our box.

Copy the following code and add it below the ViroText component:

```JavaScript
<ViroBox position={[0, -1, -2]} scale={[.5,.5,.2]} materials={["grid"]} />
```
## Customizing the ViroBox

In the above code, we set the position of the ViroBox to [0, -.1, -2] so that it sets beneath the "Hello World" text.

We then scale the ViroBox by [.5, .5, .2] to make it smaller as its default width, height, and length is 1 (meters).

Finally, the materials property define the visual appearance of the object, such as its color, lighting model, etc. In this example, we set a material named grid on the ViroBox.

## Defining a Material
Before we can use a material like the aforementioned grid, we need to define it. Since we have already import ViroMaterials, we can simply add the following code beneath the styles declaration.

```JavaScript
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});
```
As you can see, we defined a grid material containing diffuseTexture which points to the file grid_bg.jpg in the res directory.

Two things to note here:

- The require() function is a special function provided in React that converts a filepath into a value that the platform can use to fetch the resource.

- The argument to require() is a filepath and is relative to the location of the file (in this case both the res/ directory and the HelloWorldScene.js are in the same ViroSample/js/ directory.

Now, right click on the grid image below and save it to your res folder as grid_bg.jpg.

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroBox,
  ViroMaterials,
} from 'react-viro';

var HelloWorldScene = React.createClass({
  getInitialState() {
    return {

    };
  },
  render: function() {
    return (
     <ViroScene>
       <Viro360Image source={require('./res/360_park.jpg')} />
       <ViroText text="Hello World!" width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
       <ViroBox position={[0, -1, -2]} width={.5} height={.5} length={.2} scale={[1,1,1]} materials={["grid"]} />
     </ViroScene>
    );
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

module.exports = HelloWorldScene;
```
Save your HelloWorldScene.js file and reload the app. You should now see a pink and grey cube under the Hello World text


## Adding Events and State
Now let's add an event when the user hovers on the box. Also, we'll add an action to the hover event that changes the text displayed in the ViroText component. To accomplish this, we'll need to use [state](https://reactnative.dev/docs/state.html).

## Adding new State
First we modify the this.state = {} line in the constructor to add a new state variable. (We'll explain what we do with this variable in the next step.) Now the line looks like the following:

```JavaScript
this.state = {
  text : "Hello World!",
}
```
Next, we use the text value we stored in state by updating the ViroText component to look like the following:

```JavaScript
<ViroText text={this.state.text} width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
```
## Adding an Event
Now we'll add an onHover handler to the ViroBox, so that when the user hovers over the box, the text will update in response:

```JavaScript
<ViroBox position={[0, -1, -2]} scale={[.5,.5,.2]} materials={["grid"]} onHover={this._onBoxHover}/>
```
Next, add a _onBoxHover function to the HelloWorldScene class after the render() function:

```JavaScript
_onBoxHover(isHovering) {
    let text = isHovering ? "Hello Box!" : "Hello World!";
    this.setState({
      text
    });
}
```
We also need to "bind" this to the _onBoxHover(isHovering) function in our constructor, so after the this.state = {...} line, add the following:

```
this._onBoxHover = this._onBoxHover.bind(this);
```
The above method is invoked when the user hovers on or off the box. When the user hovers on the box isHovering is set to true and we update the state variable to reflect the new text value. Since React is a declarative framework and the state.text variable is bound to the ViroText component, the text will change automatically as the user hovers on and off the box.

Let's look at our final code with our new changes:

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroBox,
  ViroMaterials,
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {
      text : "Hello World!",
    }

    // bind this to the class functions
    this._onBoxHover = this._onBoxHover.bind(this);
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('./res/360_park.jpg')} />
        <ViroText text={this.state.text} width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />

        <ViroBox position={[0, -1, -2]} scale={[.5,.5,.2]} materials={["grid"]} onHover={this._onBoxHover} />
      </ViroScene>
    );
  }

  _onBoxHover(isHovering) {
    let text = isHovering ? "Hello Box!" : "Hello World!";
    this.setState({
      text
    });
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

module.exports = HelloWorldScene;
```
Save your HelloWorldScene.js file and reload the app. When you hover over the pink and gray box with the reticle, you should see the text change to "Hello Box":


## Adding Another Scene
Let's add a second scene to our HelloWorld app.

Copy and paste the following code below into a new file under ViroSample/js/ and save it as HelloBeachScene.js.

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  Viro360Image,
} from 'react-viro';

export default class HelloBeachScene extends Component {
  constructor() {
    super();
  
    this.state = {} // initialize state
  
    this._showHelloWorldScene = this._showHelloWorldScene.bind(this);
  }
  
  render() {
    return (
      <ViroScene onClick={this._showHelloWorldScene}>
        <Viro360Image source={require('./res/guadalupe_360.jpg')} />
      </ViroScene>
    );
  }

  _showHelloWorldScene() {
    this.props.sceneNavigator.pop();
  }

}

module.exports = HelloBeachScene;
```
The top half of the file should look familiar as it is nearly identical to our original HelloWorldScene which showed a 360 beach photo. Except when the user click anywhere in the scene, _showHelloWorldScene() is invoked which causes us to pop() back into our previous HelloWorldScene.

Now that we have created our second scene, we need to connect the two scenes together.

From our original scene, HelloWorldScene.js, we will navigate to the scene in HelloBeachScene.js by clicking on the ViroBox. To do this we add an onClick event listener to the ViroBox.

```JavaScript
<ViroBox position={[0, -1, -2]} scale={[.5,.5,.2]} materials={["grid"]} onHover={this._onBoxHover} onClick={this._showHelloBeachScene}/>
```
Add the following _showHelloBeachScene function within the React.createClass() under _onBoxHover:

```JavaScript
_showHelloBeachScene() {
    this.props.sceneNavigator.push({scene:require("./HelloBeachScene.js")});
  },
```
The above method is invoked when the user clicks on the box. When the user clicks on the box the scene navigator pushes the new scene (HelloBeachScene.js) into the renderer.

Let's look at our final code for HelloWorldScene.js with our new changes:

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  ViroBox,
  ViroMaterials,
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {
      text : "Hello World!",
    }

    // bind this to the class functions
    this._onBoxHover = this._onBoxHover.bind(this);
    this._showHelloBeachScene = this._showHelloBeachScene.bind(this);
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('./res/360_park.jpg')} />
        <ViroText text={this.state.text} width={2} height={2} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />

        <ViroBox position={[0, -1, -2]} scale={[.5,.5,.2]} materials={["grid"]} onHover={this._onBoxHover} onClick={this._showHelloBeachScene} />
      </ViroScene>
    );
  }

  _onBoxHover(isHovering) {
    let text = isHovering ? "Hello Box!" : "Hello World!";
    this.setState({
      text
    });
  }

  _showHelloBeachScene() {
    this.props.sceneNavigator.push({scene:require("./HelloBeachScene.js")});
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

module.exports = HelloWorldScene;
```
At this point we can navigate to a new scene by clicking on the box in HelloWorldScene.js. Reload our completed scene and when you tap on the ViroBox, the scene should change to the HelloBeachScene.js. Tapping anywhere in the the HelloBeachScene.js should then take you back to the HelloWorldScene.js.

Congratulations, you now have a multi-scene VR experience!!!


## Next Steps
## Continue Modifying the Scene
You should now have a basic overview for how ViroReact works. Check out our Code Samples for other example apps, or continuing adding functionality on your own to the HelloWorldScene. For example:

- Add an animation by making the cube rotate. Look at our Animation Guide for info on how to accomplish this.

- Try adding illumination to the scene by adding a <ViroOmniLight> and giving the box a lightingModel. Check out the Lighting and Materials guide for details.

- Create a grid of videos on the next scene to display to the user. Each one playing as you hover on it. Look at our Flexbox UI Guide and Video Guide on how to build the UI for this and display the video.

## Set up Android Studio or Xcode
For most cases, using the solely the testbed to develop your ViroReact application is enough, but there may come a time where you want to build your own standalone application to test other VR platforms, submit to an app store or to integrate ViroReact with an existing native application . In those cases you will need to set up and use either Xcode or Android Studio to configure and build your own native iOS/Android application containing your ViroReact VR experience.

