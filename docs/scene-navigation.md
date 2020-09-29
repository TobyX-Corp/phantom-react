# Scene Navigation

The <SceneNavigator> handles the transitions between <Scene> objects. It enables the 3D equivalent of a navigation stack.

Phantom displays the scene at the top of the stack. To move to a new scene, simply push that scene onto the navigation stack. To return to the previous scene, pop the current scene off the stack. The Scene Navigator itself can always be retrieved for these operations via each Scene's sceneNavigator property.

The following is a simple example. Below we have a <VRSceneNavigator> that renders a simple initial scene.

```JavaScript
var FirstScene = require('./FirstScene');

var SceneNav = React.createClass({
  render: function() {
    return (
      <VRSceneNavigator
        initialScene={{
          scene: FirstScene,
        }}
      />
    );
  }
});
```
When the application is launched, the scene exported in FirstScene.js is displayed. Continuing the example, FirstScene is a simple scene with an image, shown below.

```JavaScript
var SecondScene = require('./SecondScene');

var FirstScene = React.createClass({
  render: function() {
    return (
      <Scene>
        <Image source={require('./res/image.jpg')} 
                   position={[0, 0, -5]} 
                   onClick={this._pushNextScene}/>            
      </Scene>
    );
  },
  
  _pushNextScene(){
     this.props.sceneNavigator.push({scene:SecondScene});
  },
});

module.exports = FirstScene;
```
The image has a click handler _pushNextScene() which, when pressed, pushes SecondScene onto the stack. Notice that the Scene Navigator is always available via this.props.sceneNavigator.

When SecondScene is pushed onto the stack, it will be rendered until either another new scene is pushed onto the stack, or until it is popped off the stack via this.props.sceneNavigator.pop().

Important Note: Ensure that you do not pop the last scene on the stack, this will result in a red screen with a "Cannot pop below 0" message in development and a crash in release!

## Jumping
In addition to pushing and popping scenes, you can also jump between scenes.

Jump is used to quickly move from scene to scene on the navigation stack. If the scene we are jumping toward is already on the stack, we move it to the top, displaying it to the user. If the scene is not already in the stack, we push it to the top.

Jumping is useful for applications that frequently switch between a number of scenes. Jumping is also optimized to be faster than doing the same via push and pop.

Note that to jump correctly, each scene requires a scene key. The scene key identifies the scene, enabling Phantom to recognize when said scene is already on the stack so we can quickly jump to it.

```JavaScript
var SecondScene = require('./SecondScene');

var FirstScene = React.createClass({
  render: function() {
    return (
      <Scene>
        <Image source={require('./res/image.jpg')} 
                   position={[0, 0, -5]} 
                   onClick={this._jumpNextScene}/>            
      </Scene>
    );
  },
  
  _jumpNextScene(){
     this.props.sceneNavigator.jump("scene2", {scene:SecondScene});
  },
});

module.exports = FirstScene;
```
## Replacing
Finally, to simply replace the scene at the top of the stack with a different scene, use the replace method. Replace is useful for applications that have no need for a hierarchical scene stack, and instead simply swap out one scene for another at the root level.

```JavaScript
var SecondScene = require('./SecondScene');

var FirstScene = React.createClass({
  render: function() {
    return (
      <Scene>
        <Image source={require('./res/image.jpg')} 
                   position={[0, 0, -5]} 
                   onClick={this._replaceNextScene}/>            
      </Scene>
    );
  },
  
  _replaceNextScene(){
     this.props.sceneNavigator.replace({scene:SecondScene});
  },
});

module.exports = FirstScene;
```
## Passing Props from Scene to Scene
As with most mobile apps, you may also need to pass information through different experiences, or scenes. For example, if a user selects an item from a virtual menu to be then displayed in a newly pushed scene, your application may need to propagate additional information related to the selected item into the new scene. In Phantom, there are 3 ways that you can pass information through scenes.

Option 1: Using passProps

If you are looking to pass static properties to your next scene, you can use the passProps parameter within the scene navigator. This approach is great for providing individual scenes with static, unchanging parameters - the passProp cannot be changed once you push a scene with that prop! (To get around that you can use option #2 below.)

```JavaScript
// For your initial scene, you can populate passProps as part of 
// the initialScene dictionary, using the following syntax:
<ARSceneNavigator 
          apiKey="API_KEY_HERE"
          initialScene={{
                      scene:InitialARScene, 
                                passProps:{displayObject:true}
          }}/>

// To Pass properties when pushing another scene, use the following syntax:
this.props.sceneNavigator.jump("Shop", {
    scene : require('./Shop'),
    passProps: {
        displayObject : true
    }
);
```
Then in our InitialARScene, you should be able to reference your value with this.props.displayObject.

Option 2: Using AppProps

The scene navigator object is actually passed as a prop to each scene that you have. If you are using SceneNavigator the prop is called sceneNavigator. If you are using ARSceneNavigator it's called arSceneNavigator. The navigators have a dictionary object called AppProps which you can use as global dictionary to store and pass values across your app. This can be used to maintain application state.

```JavaScript
// For your initial scene, you treat AppProps as a 
// global dictionary container with which to pass information.
<ARSceneNavigator 
          apiKey="API_KEY_HERE"
          initialScene={{scene:InitialARScene}}
          AppProps={{displayObject:false}}
        />

// To pass information from the current scene to the next, simply
// reference the dictionary with the sceneNavigator that is passed
// to each scene.
this.props.sceneNavigator.AppProps={displayObject:true};
```
Then in our InitialARScene, you should be able to check your value with this.props.sceneNavigator.AppProps.displayObject.

Option 3: Using Redux

Generally, if you want props to span across multiple components I recommend using Redux to manage application state. This would mostly be the case for more involved and larger applications, where the above two solutions would not be sufficient, and most likely get out of hand pretty quickly the larger your application grows. More info here on Redux: https://medium.com/@jonlebensold/getting-started-with-react-native-redux-2b01408c0053