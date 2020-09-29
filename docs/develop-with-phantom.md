## Testbed Apps

## Using the Testbed Apps (No Xcode/Android Studio required)
A key benefit of PhantomReact is that the source need not be compiled and packaged into an application's binary in order to run. PhantomReact provides a testbed feature in our Phantom Media app which allows you to develop and test your PhantomReact application without having to use Xcode or Android Studio. Instead, all you have to do is set up your package server to serve your Javascript files, and point the Phantom Media app towards it. To do this:

1. Install the Phantom Media App from the [AppStore](https://apps.apple.com/us/app/viro-media/id1163100576) on your iOS device, or from the [Play Store](https://play.google.com/store/apps/details?id=com.viromedia.viromedia) for your Android device.
2. The Testbed application looks for an index.js or 'app.js' file with a component named 'PhantomSample'. If you use the phantom-react script to create a project named 'PhantomSample', then this file will be created for you.
3. From the root of your project, run the command: npm start to start the packager server.
4. Launch the Phantom Media App, open the left panel and tap "Enter Testbed"
5. In your terminal, look for the ngrok URL that was created after running npm start (see code below for example), enter it into the text field on the Testbed screen, then press "Go"
```
NGrok Packager Server endpoint: http://5fccabb7.ngrok.io
```

Using IP vs ngrok: if you would like to use your local IP rather than ngrok

Find your local IP, enter it into the text field on the Testbed screen, then press "Go"

Your local IP address can be found by running the command ifconfig in the terminal. Keep in mind you need your local* IP address, not your public one.

6. Your PhantomReact application should now load and run in the Testbed.

Note: If you're connecting via IP, then ensure your device and development machine are on the same network. We recommend using ngrok for better connectivity.

## Reloading Features
PhantomReact supports React Native's reloading features, which enable fast iteration without recompiling. In order to take advantage of these features, open your application and, within any scene, shake the device until the debug menu appears.

?> Reloading on Android Devices

?> Android devices running Nougat OS (or higher) w/ Cardboard must set debug={true} on SceneNavigator within your App.js file for the debug menu to appear. Otherwise, you must use adb shell input text rr to reload.

?> Android devices running Nougat OS (or higher) w/ Daydream must reload using ADB with the command: adb shell input text rr


In this menu there are two options for reloading:

1. Reload: manually force the scene to immediately reload from the package server.
2. Enable Live Reloading: when Live Reloading is turned on, the entire application will be reloaded automatically (from the start) whenever any Javascript file tracked by the package server is saved on disk. To disable Live Reloading, shake the device to bring up the debug menu and tap Disable Live Reloading.

Troubleshooting: Ensure your phantom-react version in your project's package.json file matches the version at the bottom of the Testbed screen.

If they do not match, then you may need to either update your Phantom Media App or downgrade your phantom-react version in your package.json.