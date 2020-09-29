# Troubleshooting

This page documents some of the common scenarios that you might run into while developing on Phantom. If you are facing an issue that is not covered here, please open an issue on our github here.

## 1. My screen appears just black.
If you are using Phantom React 2.16 or below then your application could be missing keys. Make sure you include your key emailed to you when you signed up here, in the App.js. Note: Phantom React 2.17 and above does NOT use an API key for applications

## 2. My android app shows an old scene, when I restart the app.
The android platform caches the scene from last run. If you are not seeing updates to the scene on code changes, hit reload using developer menu.

## 3. My android app is crashing repeatedly while reloading scenes.
If your app started crashing repeatedly after changing scenes, you may need to clear the application cache by either clearing data or by uninstalling and installing the app.

## 4. React Developer menu does not appear on my android app.
If you are developing on Cardboard and Nougat device, then make sure to set the debug flag in SceneNavigator to true in your App.js or index.js file

```JavaScript
<SceneNavigator apiKey="API_KEY_HERE"
       initialScene={{scene: scene}}
       vrModeEnabled={this.props.vrMode}
       debug={this.props.debug} // set this to true
        />
```
The developer menu is not supported on Daydream.

## 5. Certain Assets / Resources types are not loading in my application.
If your application cannot find assets/resources in your project, it may be that you need to update the rn-cli.config.js and add the extension to getAssetExts().

## 6. I get an an error "Can't connect to development server".
This error occurs when the Testbed app can't connect to your react package server on your local machine. Make sure your device and your desktop are on the same network. If they are and you are still unable to connect try the following:

- Try using the ngrok endpoint if you are using the IP address in the testbed app. The ngrok endpoint is a tunnel that sits behind the ngrok domain. This way you avoid network issues when connecting to a local IP on a network which sometimes fails to resolve properly. In your packager logs this would be: xxxxx.ngrok.io.

- Sometimes firewalls or security software can block outgoing traffic on your desktop or laptop. The packager server runs on port 8081 and it might be blocked from sending data. If the above solutions don't work, then perhaps something is blocking data from being sent and needs to be turned off.

- (Android only)If you are using Android try using reverse tethering provided by ADB. ADB(android debug bridge) is a versatile command-line tool provided by Google that allows you to communicate with your device. See the instructions below for how to install ADB.

## Installing ADB(Android Only)
ADB allows you to connect to your device via reverse tethering, enabling you to connect your android device and desktop via localhost. Download links are provided in the table below:

ADB Download Links

[Mac](https://dl.google.com/android/repository/platform-tools-latest-darwin.zip)

[Linux](https://dl.google.com/android/repository/platform-tools-latest-linux.zip)

[Windows](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)

Once you download ADB, follow the install instructions for your OS here.

After you install ADB and it's on your path do the following:

- Connect your phone to your laptop/desktop via USB. If the enable debugging dialog pops up on the phone, tap yes.

- In your terminal type adb reverse tcp:8081 tcp:8081.

- Now run 'npm start' in your project folder to start the package server.

- Once it's started in your testbed app, type 127.0.0.1. Your device should now connect to the package server on your laptop/desktop. You should be good to go!
