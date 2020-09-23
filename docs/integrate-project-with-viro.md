# ObjectiveC - Integrating Existing Projects

This documentation was adapted from React Native's Integration with Existing Apps guide.

## Integrating with an Existing iOS Application
The instructions below explain how to integrate ViroReact with your existing iOS project. We use the following github project as an example: https://github.com/JoelMarcey/iOS-2048.

We'll take this app and modify it by adding a ViroReact VR or AR view to the application. This doc will show you how to:

1. Add React Native and ViroReact to your existing iOS application.
2. Launch ViroReact from your existing iOS Application.
3. Pass parameters from your native app to Viro.

Note that the following has been tested with React Native 0.55.1 and Xcode 9

## Prerequisites
Complete the first 7 steps of the Set up Xcode with Viro guide to install dependencies.

## Checkout an existing iOS app
Since we're modifying the [iOS-2048](https://github.com/JoelMarcey/iOS-2048) app, we'll need to pull it down. From your terminal, navigate to where you'd like to check out the project and run:

```Shell
git clone https://github.com/JoelMarcey/iOS-2048.git
```
This should pull the repository down into an iOS-2048 directory.

## Adding package.json and node_modules to your project.
## package.json
In the root of the project (/iOS-2048/) create a file with the following content and name it package.json.

```JavaScript
{
  "name": "NumberTileGame",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  },
  "dependencies": {
    "react": "16.0.0-beta.5",
    "react-native": "0.49.3",
    "react-viro": "2.3.0"
  }
}
```
After you've added the file, run the follow command at the project root:

```Shell
npm install
```
## Podfile
Since this project does not already uses Cocoapods, directory to create a Podfile:

```Shell
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
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # needed for debugging
    # Add any other subspecs you want to use in your project
  ]
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod "yoga", :path => "../node_modules/react-native/ReactCommon/yoga"

  # Third party deps podspec link
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
  
  # Viro Dependencies
  pod 'ViroReact', :path => '../node_modules/react-viro/ios/'
  pod 'ViroKit', :path => '../node_modules/react-viro/ios/dist/ViroRenderer/'
end
```
## Editing React Native Podfiles
Now this is where things get a bit tricky. Ideally here you'd run pod install and we can move on to integration code. Hopefully in future React Native releases they won't be needed.

1) Modify the yoga.podspec under node_modules/react-native/ReactCommon/yoga/yoga.podspec

Add the following line to the podspec:
```
spec.public_header_files = 'yoga/Yoga.h', 'yoga/YGEnums.h', 'yoga/YGMacros.h'
```

2) Edit the node_modules/react-native/React.podspec.

Edit the 'Core' subspec field ss.exclude_files and add the following as files to be excluded:
```
"React/Fabric/*".
```

If you are already using CocoaPods, simply add ViroReact to your Podfile.

Once you've made your changes, from the terminal, run:

```
pod install
```

?> If your app doesn't support use_frameworks! in Cocoapods...

?> Read this page Integrating w/o use_frameworks! (Cocoapods)

## index.js
Create a file called index.js at the directory root and add the below content:

```JavaScript
'use strict';

import React, { Component } from 'react';

import { AppRegistry } from 'react-native';

import {
  ViroSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

var HelloWorldScene = require('./js/TestScene');

var ViroSample = createReactClass({
  render: function() {
    // The 'viroAppProps={{...this.props}}' line below is used to pass
    // the initial properties from this base component to the ViroSceneNavigator
    // which will allow the scenes to access them.
    let viroAppProps = {...this.props};
    
    return (
      <ViroSceneNavigator
        initialScene={{
          scene: HelloWorldScene,
        }}
        viroAppProps={viroAppProps}
        vrModeEnabled={viroAppProps.vrModeEnabled}
        apiKey={"YOUR_API_KEY_HERE"}
      />
    );
  }
});

AppRegistry.registerComponent('RNHighScores', () => ViroSample);
```
This file is the main entry point into the iOS version of your application. Essentially, it creates a basic React class (ViroSampleApp) which wraps a ViroSceneNavigator and sets the initial scene to a TestScene module defined at ./js/TestScene which we'll create in the next step. It then registers RNHighScores with the AppRegistry so that we can launch it by name from objective-C.

Next, replace the text YOUR_API_KEY_HERE on line 26 above with the API Key you received.

## TestScene.js
Create a separate directory at the root named js

Create a file in it called TestScene.js with the below contents:

```JavaScript
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
} from 'react-viro';
  
var createReactClass = require('create-react-class');

var TestScene = createReactClass({

  render: function() {
   
    var highScore = "High Score: " + this.props.sceneNavigator.viroAppProps.highScore;
    return (
     <ViroScene>
       <Viro360Image source={require('./res/guadalupe_360.jpg')} />
       <ViroText width={2} text={highScore} style={styles.helloWorldTextStyle} position={[0, 0, -4]} />
     </ViroScene>
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
This scene simply renders a text view with the high score parameter passed from the application.

## Resources
We recommend keeping all your resources within one directory in your application for better file management.

Create a res directory at the root of your workspace, download this image and place it in the directory you just created.

## Native Changes
## Modify React Native Code
Now goto XCode and open up the workspace file, NumberTileGame.xcworkspace.

Due to some quirks in React Native 0.55.1 we'll have to modify some React Native code:

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
Now that we finished modifying the React Native codebase, it's time to modify your iOS code to enter a ViroReact Scene. The easiest way to do this is to add an event (button click, etc) to an existing view controller. Then in the event callback, create and launch a UIViewController with a RCTRootView containing the ViroReact app specified in the above index.js file.

Let's do this with the example we are using.

First let's edit the apps AppDelegate, in this case F3HAppDelegate. Open F3HAppDelegate.h and add the property isViroSceneDisplaying:

```Objective-C
#import <UIKit/UIKit.h>

@interface F3HAppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (nonatomic, assign) BOOL isViroSceneDisplaying;

@end
```
Now add the method below to F3HAppDelegate.m:

```Objective-C
- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  // Force the oprientation into landscape mode if we are displaying a ViroSceneViewController.
  if (self.isViroSceneDisplaying) {
    return UIInterfaceOrientationMaskLandscapeRight;
  }
  return UIInterfaceOrientationMaskAllButUpsideDown;
}
```
This ensures that when a ViroReact scene displays the rotation will be set to landscape at the app level.

Now lets create a UIViewController derived class called ViroViewController. The header file should look like below:

```Objective-C
//
//  ViroViewController.h
//  NumberTileGame
//

#import <Foundation/Foundation.h>

@interface ViroViewController : UIViewController
  
-(id)initWithVREnabledMode:(BOOL)vrEnabledMode;

@property (nonatomic, assign) BOOL vrMode;
@end
```
Now in ViroViewController.m add the following methods so the file looks like below:

```Objective-C
//
//  ViroViewController.m
//  NumberTileGame
//

#import "ViroViewController.h"
#import "F3HAppDelegate.h"
#import "VRTNotifications.h"

@implementation ViroViewController

- (id)initWithVREnabledMode:(BOOL)vrEnabledMode {
  self = [super init];
  self.vrMode = vrEnabledMode;
  return self;
}

- (void)viewWillAppear:(BOOL)animated {
    F3HAppDelegate *delegate = (F3HAppDelegate *)[[UIApplication sharedApplication] delegate];
    delegate.isViroSceneDisplaying = YES;
  
  // register for the exit notification
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(exitReactViro)
                                               name:kVRTOnExitViro
                                             object:nil];
  
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
  return (UIInterfaceOrientationLandscapeLeft);
}

- (BOOL)shouldAutorotate {
  return NO;
}

- (void)exitReactViro {
  dispatch_async(dispatch_get_main_queue(), ^{
    F3HAppDelegate *delegate = (F3HAppDelegate *)[[UIApplication sharedApplication] delegate];
    delegate.isViroSceneDisplaying = NO;
    if (self.vrMode) {
      [self willMoveToParentViewController:nil];
      [self.view removeFromSuperview];
      [self removeFromParentViewController];
    } else {
      [self dismissViewControllerAnimated:NO completion:nil];
    }
    [[NSNotificationCenter defaultCenter] removeObserver:self];
  });
}

@end
```
Let's go through the above code in detail to understand what it's doing. The rotation methods shouldAutorotate and supportedInterfaceOrientations ensure that when we launch into VR or 360 mode(fullscreen mode that doesn't require a cardboard headset) we ensure the app stays in landscape mode.

The viewDidAppear appear method is invoked when our controller is about to appear. In this method we do the following:

1. Tell our appDelegate we are displaying our VR scene by setting isViroSceneDisplaying to true.

2. Register to listen for notification kVRTOnExitViro. This is a notification that ViroReact invokes to let you know that ViroReact is exiting so you can perform your own cleanup. In this case we state we want to invoke the exitReactViro method.

The exitReactViro method is invoked when we exit the ViroReact View. Depending on if vrMode is true or false, we signal to our parent controller that we are dismissing. In addition, we tell the appDelegate we are no longer displaying a ViroReact scene and remove ourselves as a listener for NSNotificationCenter.

Now let's use our new ViroViewController and integrate it into our current app.

First, add the following imports to F3HController.m:

```Objective-C
#import "ViroViewController.h"
#import <React/RCTRootView.h>
```
Add a method call highScoreButtonPressed to F3HController.m like below:

```Objective-C
- (IBAction)highScoreButtonPressed:(id)sender {
  BOOL vrEnabled = true;
  NSDictionary *initialProperties =
  @{
    @"highScore" : @"40",
   @"vrModeEnabled" : [NSNumber numberWithBool:vrEnabled]
   };
  
  NSURL *jsCodeLocation = nil;
#ifdef DEBUG
  jsCodeLocation = [NSURL URLWithString:@"http://<YOUR IP or NGROK ENDPOINT>/index.bundle?platform=ios"];
#else
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"                                                                 fallbackResource:nil];
#endif

  RCTRootView *rootView =
  [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                       moduleName        : @"RNHighScores"
                       initialProperties :initialProperties
                        launchOptions    : nil];
  ViroViewController *vc = [[ViroViewController alloc] initWithVREnabledMode:vrEnabled];
  vc.view = rootView;

  //present the controller differently depending on whether we are in vr mode or not.
  if (vrEnabled) {
    [self addChildViewController:vc];
    vc.view.frame = CGRectMake(0,   0,self.view.frame.size.width,self.view.frame.size.height);
    [self.view addSubview:vc.view];
    [vc didMoveToParentViewController:self];
  } else{
      vc.modalPresentationStyle = UIModalPresentationFullScreen;
      [self presentViewController:vc animated:YES completion:nil];
  }
}
```
On line 11 above, replace <YOUR IP or NGROK ENDPOINT> with your ngrok url (aaaaaaa.ngrok.io) or ip address (10.0.0.0:8081).

The method we just added does the following:

1. Creates a dictionary that gets passed to the initial javascript file index.js.
2. If we are in debug our source js location is assumed to be using the react native packager server which can run from your local IP or ngrok endpoint. In release builds, the Javascript files are bundled into the application and are loaded from disk during runtime.
3. We then create a RCTRootView and set is at the view of our new controller.
4. Next, we present the controller. Depending on whether we want stereographic vr view that requires a cardboard headset(vrEnabled = true) or a full screen 360 mode experience(vrEnabled=false), we present the controller differently due to how Google Cardboard SDK works.

## Adding a button to launch Viro
Open the Main_iPhone.storyboard file, in the main view, add a button and change its text to High Score.

Now hook up the High Score button to the new method highScoreButtonPressed using Interface Builder.

And Voilà! you've now added a ViroReact Scene into your application.

## Modify Build Settings
In the build settings of the project do the following(some of these are already set, but it's good to d:

1. Change enable Bitcode to No:

2. Set deployment target to iOS 9.3 or higher.

3. Set Build Settings -> Linking -> Other Linker Flags to include the following 3 values:

- $(inheirited)

- -ObjC

- -lc++

4. In Build Settings -> Linking -> Runpath Search Paths add @executable_path/Frameworks

5. In Build Settings, for Dead Code Stripping make sure both Debug and Release values are Yes.

## Run the App
Now you are almost ready to run your ViroReact integrated app:

1. In terminal, where your .xcodeproj is located, run npm start to launch the react packager that will retrieve your JS files from xcode.
```Shell
npm start
```

2. Find your IP or your ngrok endpoint if you run 'ngrok http 8081' on the terminal. Cut and paste that into where it says in F3HController.m

3. Run your app in debug!

You now have added ViroReact to an existing app!

Tap on the high score text to see the VR mode launch and display the text that was passed in from the native code!

## Running your app in fullscreen 360 mode.
Sometimes you may wish to launch into a full screen mode, rather than a a stereoscopic mode that requires a headset. To do this, in the above code, modify the vrEnabled flag to be false. This will launch the app in full screen 360 mode.

If you wish to have the user choose what they prefer, then it's best to add an iOS dialog before you push the view controller that asks them if they have a headset or not. The vrEnabled flag can be set based on what they choose.

## Adding AR
Replace the code in index.js and the files in the js/ directory with AR code and relaunch the application.

## Building for Release.
To run your new VR Enabled iOS App in release you'll need to add a new 'Run Script' build phase.

Paste the following code into the the run script phase:

```Shell
export NODE_BINARY=node

$SRCROOT/node_modules/react-native/packager/react-native-xcode.sh
```
This above script will compile and bundle the necessary assets and js code into your app for release.

Now select the NumbeTileGame scheme and switch the build type to 'Release'

Compile and build and the app. It should run in release without connecting to any react package server. This is how your app will look in production!

## Troubleshooting
Please refer to the troubleshooting section at the bottom of the Installing Viro guide.