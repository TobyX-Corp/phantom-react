# Integrating w/o use_frameworks! (Cocoapods)

?> PhantomReact 2.8.0 onwards

?> Starting with PhantomReact 2.8.0 we have started including our static library (without the need for relying on use_frameworks! in the PhantomReact package that you get from npm itself.

Steps to switch your setup your iOS pods over to using PhantomReact static library are as follows:

1. Open your podfile (located at ios/Podfile in your repository`).

2. Change the line pod 'PhantomKit', :path => '../node_modules/phantom-react/ios/dist/PhantomRenderer/' to
pod 'PhantomKit_static_lib', :path => '../node_modules/phantom-react/ios/dist/PhantomRenderer/static_lib'

3. Remove the line containing use_frameworks!.

4. Save Podfile.

5. Run pod install to properly install the new pod for static lib.