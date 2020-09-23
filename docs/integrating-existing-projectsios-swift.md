# Swift - Integrating Existing Projects

This documentation was adapted from React Native's Integration with Existing Apps guide.

The instructions below explain how to integrate ViroReact with your existing iOS Swift based project. We use the following Github project as an example: https://github.com/austinzheng/swift-2048.

We'll take this app and modify it by adding a ViroReact AR view to the application. This doc will show you how to:

1. Add React Native and ViroReact to your existing Swift application.
2. Launch ViroReact from your existing Swift Application.
3. Pass parameters from your native app to Viro.

?> Note the following has been tested with React Native 0.55.1, XCode 9 and Swift Ver. 4

?> There are no guarantees the following will work when using different versions of the above dependencies.

## Checkout an existing Swift app
Since we're modifying the iOS-2048 app, we'll need to pull it down. From your terminal, navigate to where you'd like to check out the project and run:

```Text
git clone https://github.com/austinzheng/swift-2048
```
This should pull the repository down into an iOS-2048 directory.

## Adding package.json and node_modules to your project.
## package.json
In the root of the project (/iOS-2048/) create a file with the following content and name it package.json.

```Text
{
  "name": "MyReactNativeApp",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  },
  "dependencies": {
    "react": "16.3.1",
    "react-native": "0.55.1",
    "react-viro": "2.7.3"
  }
}
```
After you've added the file, run the follow command at the project root:

```Text
npm install
```
## Podfiles
Since this project does not already use Cocoapods, we'll create a new podfile under the project root. Type the following at the command line:

```Text
pod init
```
Edit your Podfile to look like the following:

```YAML
platform :ios, '9.3'
use_frameworks!

# The target name is most likely the name of your project.
target 'swift-2048' do

  # Your 'node_modules' directory is probably in the root of your project,
  # but if not, adjust the `:path` accordingly
  pod 'React', :path => './node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # needed for debugging
    # Add any other subspecs you want to use in your project
  ]
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod "yoga", :path => "./node_modules/react-native/ReactCommon/yoga"

  # Third party deps podspec link
  pod 'DoubleConversion', :podspec => './node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => './node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => './node_modules/react-native/third-party-podspecs/Folly.podspec'
  
  # Viro Dependencies
  pod 'ViroReact', :path => './node_modules/react-viro/ios/'
  pod 'ViroKit', :path => './node_modules/react-viro/ios/dist/ViroRenderer/'
end
```
## Editing React Native Podfiles
Now this is where things get a bit tricky. Ideally here you'd run pod install and we can move on to integration code. These steps are needed to get React Native 0.55.1 working with Swift. Hopefully in future React Native releases they won't be needed.

1) Modify the yoga.podspec under node_modules/react-native/ReactCommon/yoga/yoga.podspec

Add the following line to the podspec:
```
spec.public_header_files = 'yoga/Yoga.h', 'yoga/YGEnums.h', 'yoga/YGMacros.h'
```

2) Edit the node_modules/react-native/React.podspec.

Edit the 'Core' subspec field ss.exclude_files and add the following as files to be excluded: "React/Fabric/*".

## Run Pod Install
From the command line type pod install to install the pods.

## Adding React Javascript App Code
Now let's add a sample example AR app written in Javascript and React that will connect to our existing app. Our app will consist of two files, index.js and TestScene.js

## index.js
First will be our index.js that will be in our project root directory:

```JavaScript
'use strict';

import React, { Component } from 'react';

import { AppRegistry } from 'react-native';

import {
  ViroARSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

var HelloWorldScene = require('./js/TestScene');

var ViroSample = createReactClass({
  render: function() {
    // The 'viroAppProps={{...this.props}}' line below is used to pass
    // the initial properties from this base component to the ViroARSceneNavigator
    // which will allow the scenes to access them.
    let viroAppProps = {...this.props};
    
    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: HelloWorldScene,
        }}
        viroAppProps={viroAppProps}
        apiKey={"API_KEY_GOES_HERE"}
      />
    );
  }
});

AppRegistry.registerComponent('RNHighScores', () => ViroSample);
```
## TestScene.js
The index.js file will load TestScene.js initially. This file will be located under the js/TestScene.js from your project root. This scene will just display the high score text in front us in AR:

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
} from 'react-viro';
  
var createReactClass = require('create-react-class');

var TestScene = createReactClass({

  render: function() {
   
    var highScore = "High Score: " + this.props.sceneNavigator.viroAppProps.highScore;
    return (
     <ViroARScene>
       <ViroText width={2} text={highScore} style={styles.helloWorldTextStyle} position={[0, 0, -4]} />
     </ViroARScene>
    );
  },
});

var styles = StyleSheet.create({
 helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = TestScene;
```
## Modify Native Code
Almost there. Now open up the XCode workspace created after running pod install, swift-2048.xcworkspace

Modify the React Native files in your project:

1) Open the file RCTReconnectingWebSocket.m. In the file search for the following #import "<fishhook/fishhook.h>" and rename the import to #import "fishhook.h" .

2) Open the file RCTSurfaceSizeMeasureMode.h and search for the following block:
```
RCT_EXTERN void RCTSurfaceMinimumSizeAndMaximumSizeFromSizeAndSizeMeasureMode(
  CGSize size,
  RCTSurfaceSizeMeasureMode sizeMeasureMode,
  CGSize &minimumSize,
  CGSize &maximumSize
);
```
Add an #ifdef __cplusplus around the block so the code looks like:
```
#ifdef __cplusplus
RCT_EXTERN void RCTSurfaceMinimumSizeAndMaximumSizeFromSizeAndSizeMeasureMode(
  CGSize size,
  RCTSurfaceSizeMeasureMode sizeMeasureMode,
  CGSize &minimumSize,
  CGSize &maximumSize
);
#endif
```
## Modify Xcode Build Settings
1. Goto to the project target in Xcode. Under 'Build Settings', set the the 'Enable Bitcode' flag to 'No'.

2. Find the Info.plist file for the project under Supporting files. In Xcode, add the NSCameraUsageDescription property to the Info.plist. This flag is also known as 'Privacy - Camera Usage Description'. Add 'For AR' as the description or whatever description you think fits.
## Adding a React Root Controller
Now we are finally ready to add our Viro React component to our app!

Now open the ViewController.swift file in XCode, and add the following function:

```Swift
@IBAction func highScoreButtonTapped(_ sender : UIButton) {
   // our code to start React Native will go here. 
}
```
Edit the Main.Storyboard, cut and paste the Start Game text and create new Text called 'High Score'.

Hook up the highScoreButtonTapped function to our High Score Text in Interface Builder like below:

Now our text is hooked up to the function and will execute on tap. Let's fill in the method highScoreButtonTapped. Below we add code to the function that creates our root React View, attaches that view to a new UIViewController and invokes our javascript module which is called "RNHighScores". This will present our AR View over the current UIViewController.

```Swift
@IBAction func highScoreButtonTapped(_ sender : UIButton) {
  var jsCodeLocation = URL(string: "http://10.57.107.245:8081/index.bundle?platform=ios")
#if !DEBUG
        jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
    let mockData:NSDictionary = ["highScore": "40"]
    
    let rootView = RCTRootView(
        bundleURL: jsCodeLocation,
        moduleName: "RNHighScores",
        initialProperties: mockData as [NSObject : AnyObject],
        launchOptions: nil
    )
    let vc = UIViewController()
    vc.view = rootView
    self.present(vc, animated: true, completion: nil)
  }
```
Make sure to fill in the proper IP address in the above code if you are in Debug.

Now to run your app do the following:

1) Goto your terminal. In your project directory type npm start to start the packager.

2) In XCode, goto your app and run your application. Now compile and run!

When the app launches, tap the high scores text and React Native will launch with a Viro AR View that displays the high score text :)

## Building for Production
When you are ready to build for release, there is one more step needed. You'll need to add a bundle step to build your assets for release. Selected the project target, goto 'Build Phases', add the following Build Phase called 'Bundling for React Native':

```Shell
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```