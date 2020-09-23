# Integrating with React Native Projects

ViroReact was built with React Native integration in mind. The top-level ViroSceneNavigator component was built to work alongside and with other React Native components.

An example app using React Native components combined with Viro components:

https://github.com/viromedia/ViroARSampleApp

Our "Hello World" application created with react-viro init in Quick Start (Mac/Linux) also is an example of a "hybrid" React Native/ViroReact app.

## Adding Viro to an Existing React Native project
If you already have a React Native app and want to add Viro React as dependency you'll need to follow the following steps:

For iOS:

1. Edit your <project_name>/package.json to include Viro React. It's strongly recommended you use the RN version recommended in the Releases tab. Add the following to your dependencies in your package.json (for the "react-viro" line use the latest version of ViroReact, found in the Release page):
```
"dependencies": {
    "react": "16.3.1",
    "react-native": "0.55.1",
    "react-viro": "2.7.3"
  },
```
2. Run npm install to install the Viro React module.
3. Make sure you have cocoapods. Type 'brew install cocoapods' to install.
4. Create a podfile. The podfile will go under your <project_name>/ios directory and look like the following:
```
target '<project name>' do
  use_frameworks!
  pod 'ViroReact', :path => '../node_modules/react-viro/ios/'
  pod 'ViroKit', :path => '../node_modules/react-viro/ios/dist/ViroRenderer/'
end
```
5. Run pod install from the <project_name>/ios directory to install the react-viro pods.
6. Open the <project_name>.xcworkspace file that was created with from the 'pod install' command.
7. In Xcode->Build Settings set 'Enable Bitcode' to 'No'.
8. In your Info.plist file add the 'Privacy - Camera Usage Description' Key with description being 'Used for AR/VR'.
9. Build the App.

?> Note: Possible linking error with vlog_is_on.oo

?> If you run into a linking error with vlog_is_on.oo(https://github.com/facebook/react-native/issues/18022) do the following:

?> a) In XCode open node_modules/react-native/third-party/glog-0.3.4/src/vlog_is_on.cc

?> b) Edit line 52, change the line to(rename v to v2): GLOG_DEFINE_int32(v2, 0, "Show all VLOG(m) messages for m <= this."

?> c) Edit line 55: change the line frome GLOG_DEFINE_string(vmodule... to GLOG_DEFINE_string(vmodule2...

?> d) Edit line 133: Change the line to const char* vmodule = FLAGS_vmodule2.c_str()

?> e) Recompile, the app should link.

For Android:

For Android, do the following:

1. Do steps 1 and 2 from the the iOS instructions above if you haven't already.

2. Go through the following git gist which shows the difference between a newly created React Native project config files and the changes needed to add Viro React. And add the proper lines to your Android Manifest and Gradle files: https://gist.github.com/achuvm/fe0136818158bec2cdf4d1cd11053f6d

Note: If you aren't developing for Samsung Gear(OVR) you can ignore the OVR related changes specified in the Git gist.