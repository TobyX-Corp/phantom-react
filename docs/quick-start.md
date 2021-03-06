# Quick Start (IOS)

?> Using Windows? Find instructions at [Quick Start (Windows)](quick-start-windows)

## 1. Create a react-native app
Please follow this [link](https://reactnative.dev/docs/tutorial) and initialize a react-native app, or use an existing one.

## 2. Install via NPM
`npm i phantom-react`

## 3. IOS Setup Steps

Please follow the steps below:

1. Run `cd ios`
 
2. In Podfile at the end add:

`pod 'PhantomReact', :path => '../node_modules/phantom-react/ios/'`

`pod 'PhantomKit_static_lib', :path => '../node_modules/phantom-react/ios/dist/PhantomRenderer/static_lib'`

3. save your Podfile and in your terminal run `pod install && cd ..`

4. Open the `<project_name>.xcworkspace` file that was created from the 'pod install' command.

5. In Xcode->Build Settings set 'Enable Bitcode' to 'No'.

6. In `Info.plist` file,  add the 'Privacy - Camera Usage Description' Key with the description being 'Used for AR/VR'.

7. Build the App

## Next Steps/Other Resources
1. Want to learn more about PhantomReact? Check out our tutorials:

[Tutorial VR](tutorial.md) or [Tutorial AR](tutorial-ar) where we go through how to modify the Hello World Scenes.

2. New to React Native? Check out the React Native [Tutorial](https://reactnative.dev/docs/tutorial.html) which goes over some basic concepts of React Native which we leverage.
3. Check out our code samples on Github to see what else you can build with PhantomReact -> [Phantom Github](https://github.com/TobyX-Corp/phantom-react)
