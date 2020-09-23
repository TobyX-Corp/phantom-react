# Integrating with Existing Projects (Android)

!> Android Simulator NOT supported

!> ViroReact doesn't currently support the Android Simulator

## Integrating with a standard Android application
Because we built Viro with the intention that it operates like any other React Native module, you should first follow steps listed at React Native's Integration with Existing Apps guide.

Once you follow those instructions, come back and follow the instructions in the next section below to add Viro to your project.

?> Each release of Viro is documented here with the React Native version that it was tested with. While other versions were not tested, they may still work with Viro, but the React Native version listed in Releases is the recommended version of React Native to use.

## Integrating React Viro for Android
After following React Native's "Integration with Existing Apps" guide above, you should now have an Android project that works with React Native. The following guide will pick up where that guide left off and show you how to add Viro to your project.

## Installing the latest react-viro package
From the command line:

1. Navigate to the root of your project

2. Run the following to install the Viro module and add it to your package.json manifest:
```Shell
npm install -S -E react-viro
```

## Updating your Application file
1. In Android Studio, open your project

2. Add the following import to the top of the application file:

```Java
import com.viromedia.bridge.ReactViroPackage;
```

3. In getPackages() add a comma after new MainReactPackage(), and add the ReactViroPackage to the next line:

```Java
new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf(BuildConfig.VR_PLATFORM))
```

?> We also support OVR if you want to build for GearVR.

?> You may also want to consider using Gradle's Product Flavors in conjunction with adding custom BuildConfig values to add GVR and OVR product flavors to your application.

## Updating settings.gradle
1. In Android Studio, open the Project tab on left bar.

2. Expand the Gradle Scripts section

3. Open settings.gradle and add the following lines:

```Groovy
include ':react_viro', ':arcore_client', ':gvr_common', ':viro_renderer'
project(':arcore_client').projectDir = new File('../node_modules/react-viro/android/arcore_client')
project(':gvr_common').projectDir = new File('../node_modules/react-viro/android/gvr_common')
project(':viro_renderer').projectDir = new File('../node_modules/react-viro/android/viro_renderer')
project(':react_viro').projectDir = new File('../node_modules/react-viro/android/react_viro')
```
Note: If you don't want/need to use AR, then you can leave out the arcore_client config.

## Updating the Project's build.gradle file
1. In the Project tab, Gradle Scripts section, open the build.gradle (Project: <YOUR_PROJECT>) file

2. Update the version of the com.android.tools.build:gradle depedency to 3.2.1

3. The line should look like this:

```Groovy
classpath 'com.android.tools.build:gradle:3.2.1'
```

## Updating your App's build.gradle
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
    implementation project(path: ':react_viro')
    implementation project(path: ':viro_renderer')
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

## Updating your AndroidManifest.xml
## For all flavors (AR, VR)
Open AndroidManifest.xml and add
```
android:usesCleartextTraffic="true"
```
inside the section in the Manifest file. Note: This is needed to be able to connect to React-Native's package manager in debug builds. Not needed for release builds. For making sure you don't enable clear text traffic (HTTP network calls) in Production builds, look at Android's ([Manifest Build Variables](https://developer.android.com/studio/build/manifest-build-variables)) docs to enable http calls only in debug builds, and not in production builds

## For Daydream/Cardboard
If your app supports Cardboard, you should add this intent-filter to the Activity containing your React Native logic:

```
<category android:name="com.google.intent.category.CARDBOARD" />
```
If you also want to support Daydream, you should also add this intent-filter
```
<category android:name="com.google.intent.category.DAYDREAM" />
```
## For GearVR
To support GearVR, you need to add the following under the <application> node in your AndroidManifest.xml:

```
<meta-data android:name="com.samsung.android.vr.application.mode" android:value="vr_only"/>
```
## For AR
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

## Adding Viro to React-Native
Now that you've set up your project, copy over the index.*.js and App.js files from the project you created in the Quick Start (Mac/Linux) and copy over the js/ directory.

These files can also be found in the <your_project>/node_modules/react-viro/bin/files/javascript directory. You may need to update the string APP_NAME_HERE in the index.*.js files with your project name.

?> AR only

?> Follow the instructions under "Prepare your Device" here to install the ARCore Services package from Google.

## Help
If you have any issues, feel free to file an issue or contact us at the links at the top of the page.