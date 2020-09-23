# Integrating w/o use_frameworks! (Cocoapods)

?> ViroReact 2.8.0 onwards

?> Starting with ViroReact 2.8.0 we have started including our static library (without the need for relying on use_frameworks! in the ViroReact package that you get from npm itself.

Steps to switch your setup your iOS pods over to using ViroReact static library are as follows:

1. Open your podfile (located at ios/Podfile in your repository`).

2. Change the line pod 'ViroKit', :path => '../node_modules/react-viro/ios/dist/ViroRenderer/' to
pod 'ViroKit_static_lib', :path => '../node_modules/react-viro/ios/dist/ViroRenderer/static_lib'

3. Remove the line containing use_frameworks!.

4. Save Podfile.

5. Run pod install to properly install the new pod for static lib.

## Steps for earlier versions (2.6.1 - 2.7.3)
1. To use, first delete your current react-viro package, from your project root run:rm -rf node_modules/react-viro from the command line.

2. Download the patched react-viro from here:

react-viro v2.6.1	https://s3-us-west-2.amazonaws.com/viro/viro_2_6_1_static_lib/react-viro-2.6.1.tgz

react-viro v2.7.1	https://s3-us-west-2.amazonaws.com/viro/viro_2_7_1_static_lib/react-viro-2.7.1.tgz

react-viro v2.7.3	https://s3-us-west-2.amazonaws.com/viro/viro_2_7_3_static_lib/react-viro-2.7.3.tgz

3. Install the .tgz file. Run npm install path/to/file.tgz.

4. Your Podfile will need to be modified to remove the use_frameworks! line.

5. Run pod install to properly install the pods.