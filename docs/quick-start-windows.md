# Quick Start (Android)

?> Using a Mac or Linux laptop/desktop?

?> Find instructions at [Quick Start (Mac/Linux)](quick-start)

?> Phantom Platform no longer requires an API key with release 2.17

## Install Node and the React Native CLI
Go to the [React Native Getting Started](https://reactnative.dev/docs/getting-started.html) guide, switch to the Building Projects with Native Code tab and follow the steps in the first two sections under Installing Dependencies (Node, Python2, JDK and The React Native CLI).

Note: you do not need Android Studio/Xcode to use the testbed application.

## Create a new React Native project
Open Powershell and navigate to where you want to create the PhantomReact project and run the command

```
react-native init Sample
This will create a React Native project in the Sample directory.
```

!> If you get the Error: MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe".

!> Install the ```windows-build-tools package``` through npm: ```npm install --global --production windows-build-tools```

!> Then delete the ```Sample``` directory and re-run the ```react-native init``` command.

## 1. install via NPM

Run `npm i phantom-react`

## 2. Update Application File

1. In Android Studio, open your project

2. Add the following import to the top of the application file:

```Java
import com.tobyx.bridge.PhantomReactPackage;
```

3. In getPackages() add a comma after new MainReactPackage(), and add the PhantomReactPackage to the next line:

```Java
new PhantomReactPackage(PhantomReactPackage.Platform.valueOf(BuildConfig.VR_PLATFORM))
```

?> We also support OVR if you want to build for GearVR.

?> You may also want to consider using Gradle's Product Flavors in conjunction with adding custom BuildConfig values to add GVR and OVR product flavors to your application.


## 3. Update settings.gradle

1. In Android Studio, open the Project tab on left bar.

2. Expand the Gradle Scripts section

3. Open settings.gradle and add the following lines:

```Groovy
include ':phantom_react', ':arcore_client', ':gvr_common', ':phantom_renderer'
project(':arcore_client').projectDir = new File('../node_modules/phantom-react/android/arcore_client')
project(':gvr_common').projectDir = new File('../node_modules/phantom-react/android/gvr_common')
project(':phantom_renderer').projectDir = new File('../node_modules/phantom-react/android/phantom_renderer')
project(':phantom_react').projectDir = new File('../node_modules/phantom-react/android/phantom_react')
```

Note: If you don't want/need to use AR, then you can leave out the arcore_client config.

## 4. Update Project's build.gradle

1. In the Project tab, Gradle Scripts section, open the build.gradle (Project: <YOUR_PROJECT>) file

2. Update the version of the com.android.tools.build:gradle depedency to 3.2.1

3. The line should look like this:

```Groovy
classpath 'com.android.tools.build:gradle:3.2.1'
```

## 5. Update App's build.gradle

1. In the Project tab, Gradle Scripts section, open your app's build.gradle file

2. Under the defaultConfig section, update minSdkVersion and targetSdkVersion as follows:

```Groovy
minSdkVersion 23
targetSdkVersion 28
```
3. In the dependencies section, add the following dependencies:

```Groovy
implementation project(':gvr_common')
    implementation project(':arcore_client')
    implementation project(path: ':phantom_react')
    implementation project(path: ':phantom_renderer')
    implementation 'com.google.android.exoplayer:exoplayer:2.7.1'
    implementation 'com.google.protobuf.nano:protobuf-javanano:3.0.0-alpha-7'
    implementation 'com.amazonaws:aws-android-sdk-core:2.7.7'
    implementation 'com.amazonaws:aws-android-sdk-ddb:2.7.7'
    implementation 'com.amazonaws:aws-android-sdk-ddb-mapper:2.7.7'
    implementation 'com.amazonaws:aws-android-sdk-cognito:2.7.7'
    implementation 'com.amazonaws:aws-android-sdk-cognitoidentityprovider:2.7.7'
```
Note: If you don't want/need to use AR, then you can leave out the arcore_client dependencies.

4. Also under dependencies, update the com.android.support:appcompat-v7:... line to the following:

```Groovy
implementation 'com.android.support:appcompat-v7:28.0.0'
```

## 6. Update AndroidManifest.xml

For all flavors (AR, VR)

Open AndroidManifest.xml and add

```
android:usesCleartextTraffic="true"
```

inside the section in the Manifest file. Note: This is needed to be able to connect to React-Native's package manager in debug builds. Not needed for release builds. For making sure you don't enable clear text traffic (HTTP network calls) in Production builds, look at Android's ([Manifest Build Variables](https://developer.android.com/studio/build/manifest-build-variables)) docs to enable http calls only in debug builds, and not in production builds

For Daydream/Cardboard

If your app supports Cardboard, you should add this intent-filter to the Activity containing your React Native logic:

```
<category android:name="com.google.intent.category.CARDBOARD" />
```
If you also want to support Daydream, you should also add this intent-filter
```
<category android:name="com.google.intent.category.DAYDREAM" />
```

For GearVR

To support GearVR, you need to add the following under the <application> node in your AndroidManifest.xml:

```
<meta-data android:name="com.samsung.android.vr.application.mode" android:value="vr_only"/>
```

For AR

To support AR, you need to add the following permission to your AndroidManifest.xml under the <manifest> node:

```
<uses-permission android:name="android.permission.CAMERA" \/>
```

You will also need to add the following line to your <application> node:

```
<meta-data android:name="com.google.ar.core" android:value="optional" \/>
```

Note: If you want to restrict your app to ARCore-only devices, set the android:value to "required".

?> Building AR/ARCore With Android Studio

?> Because of existing issues with AR Core, please ensure that you have disabled instant run in Android Studio before building your application!

## 7. Adding Phantom to React-Native

Now that you've set up your project, copy over the index.*.js and App.js files from the project you created in the Quick Start (Mac/Linux) and copy over the js/ directory.

These files can also be found in the <your_project>/node_modules/phantom-react/bin/files/javascript directory. You may need to update the string APP_NAME_HERE in the index.*.js files with your project name.

?> AR only

?> Follow the instructions under "Prepare your Device" here to install the ARCore Services package from Google.

## Next Steps/Other Resources
1. Want to learn more about PhantomReact? Check out our tutorials:

[Tutorial VR](tutorial.md) or [Tutorial AR](tutorial-ar) where we go through how to modify the Hello World Scenes.

2. New to React Native? Check out the React Native [Tutorial](https://reactnative.dev/docs/tutorial.html) which goes over some basic concepts of React Native which we leverage.
3. Check out our code samples on Github to see what else you can build with PhantomReact -> [Phantom Github](https://github.com/TobyX-Corp/phantom-react)
