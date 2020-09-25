![Logo](/docs/_images/logo-full-transparent.png)

Phantom React is a platform for developers to rapidly build augmented reality (AR) and virtual reality (VR) experiences. Developers write in React Native, and phantom runs their code natively across all mobile VR (including Google Daydream, Samsung Gear VR, and Google Cardboard for iOS and Android) and AR (iOS ARKit and Android ARCore) platforms. Developed based on Viro-React, Phantom-React solved compatibility issues with latest versions of React-Native and Apple store policy.

**_Warning: Due to removal of UIWebView, VR functions are currently unusable. Expect them to be implemented in the future._**

**_Note: The improvement of ViroCore -- Phantom Core, is coming soon!_**

This project contains the full source code for Phantom-React, and various sample phantom projects.

The platform is free to use with no limits on distribution.

To report bugs/issues with phantom platform, please file new issues under this repository.

## Instructions for running sample projects using Testbed app:

1. Follow directions in documenation to setup dependencies for trying these sample projects with the Phantom Media App.
2. Clone the repo into your workspace with git: `git clone https://github.com/TobyX-Corp/phantom-react.git`.
3. Go into the code-samples directory.
4. Run `npm install` from the root of this project.
5. Run `npm start` from the root of this project.
6. Open the phantom Media App, slide out the left panel and select "Enter Testbed".
7. Type the entire ngrok URL output (xxxxxx.ngrok.io) at the top of the terminal into the text field and hit 'GO'
8. You should now be in the application! Enjoy!

## Instructions for running sample code as a stand alone project (with no Testbed app):
Tried the samples through our Testbed app and now want to try deploying sample code to your device as standalone apps? These quick steps below should get you started:
1. Follow steps 1 - 4 from above (instructions for using with Testbed app)
2. For Android, make sure you have downloaded and installed Android Studio from [here](https://developer.android.com/studio/install) to get required SDK and platform-tools for building android apps
    Make sure you have the required enphantomnment variables set - `$ANDROID_HOME`, and added `platform-tools` to `$PATH` variable. If not,
    ```
    export ANDROID_HOME=/YOUR_PATH_TO/Android/sdk
    export PATH=$ANDROID_HOME/platform-tools:$PATH
    export PATH=$ANDROID_HOME/tools:$PATH
    ```
    Build and launch android app by executing the following from the root of the project
    ```
    react-native run-android --variant=gvrDebug
    ```
3. For iOS, in Xcode open `phantomSample.xcworkspace` in `ios/` directory.
    Select the right "Team" for `phantomSample` and `phantomSampleTest` target under `General -> Signing`
    Hit play to build and launch the app on your iOS device

### Changing Between Samples

1. Open App.js in a text editor.
2. For AR, set showARScene=true at line 44.
3. For VR, Modify line 61: `scene: scenes['360 Photo Tour'],` to a scene defined in the `scenes` dictionary on line 30.
3. Reload/restart the application.

## Instructions for using a CI-built phantom React platform from Mainline:
You can also try the latest mainline build containing bleeding edge features and fixes. Please keep in mind that mainline builds may not be as stable as release builds. To do so, simply:

1. Go to the phantom Actions Workflows for this project.
2. You should see a list of "phantom Bridge CI Pipeline" workflows.
3. Click on the latest successfully built workflow pipeline (should be a checkmark next to it).
4. Download the latest built phantomReact.tgz artiface.
4. Clone this repo into your workspace with git: `git clone https://github.com/TobyX-Corp/phantom-react.git`.
5. Go into the code-samples directory.
6. Run `npm install` from the root of this project. 
7. Remove the phantomReact framework that was pulled down from the npm install (you are going to use the pre-built one).
8. npm install ../path/to/your/downloadedArtifact.tgz

## Instructions for manually building the phantom React platform:

### Building iOS phantom React:

1. Follow directions on our documentation to setup dependencies.
2. Clone the repo into your workspace with git: `git clone https://github.com/TobyX-Corp/phantom-react.git`.
3. Build our iOS renderer using build instructions outlined in our phantomcore repo.
4. Verify you see new files created in `ios/dist` folder.
5. Install pods in `ios/` folder:
   ```
   cd ios
   pod install
   ```
6. Install node_modules in test folder:
   ```
   cd test
   npm install
   ```
7. Install pods in the `phantomExample` folder:
   ```
   cd test/ios/phantomExample
   pod install
   ```
8. Open `phantomExample.xcworkspace` in Xcode. (Make sure you open the .xcworkpace file, and **not*** the .xcodeproj file!)
9. Select Product->Scheme. If you don't see a `React` scheme, hit `Manage Schemes...`. In the dialog box, add `React` scheme.
10. Go through build configuration (Debug vs Release) for schemes `React`, `phantomReact` and `phantomExample` and ensure they are all either Release or Debug, depending on what you are trying to build.
11. That's it! Now build React scheme for `Generic iOS Device`, followed by phantomReact scheme for the same target.
Note:
    ```
    11.a If you want the ability to run on Simulator, 
         change target to any of the `iOS Simulator` targets instead of `Generic iOS Device`. 
    11.b If in your own app project setup, you prefer to include phantom React as a static library 
         rather than relying on `use_frameworks!` - build scheme `phantomReact_static_lib` 
         instead of `phantomReact` as mentioned above in step #11. 
    ```
12. You should see a new file `libphantomReact.a` at `ios/dist/lib/libphantomReact.a`.
13. To run phantom React tests, run `phantomExample` scheme on your plugged in iOS device.

### Building Android phantom React:
1. Under the phantom directory, run `./prepareRelease.sh`.
2. Your android bridge should now be built under release.
3. You should see a new file created at android/react_phantom/react_phantom-release.aar
4. To build android release tests:
   ```
   $ cd test/android
   $ ./gradlew assembleGvrRelease
   ```
5. Install app-gvr-release.apk from `test/android/app/build/output/gvr/app-gvr-release.apk` onto your plugged in Android device.


### Bundling and using built iOS and Android into a single npm tar package:
1. The `./prepareRelease.sh` you ran above builds android react bridge and bundles both iOS and Android bridge into a `phantom-react-*.tgz` file. * for current version from `package.json` file.
