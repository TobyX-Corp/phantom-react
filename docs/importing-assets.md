# Assets
Loading resources into your scenes

Assets are text or binary resources that are needed for your app. These include images, textures, sounds, videos, and more. For the vast majority of components, including <ViroImage>, <ViroSound>, <ViroVideo>, and more, the asset to be used is specified via the source attribute.

The source asset accepts both local and remote resources. To use a local resource, use the require function as shown:

```JavaScript
<Viro360Image source={require('./res/360_park.jpg')} />
```
In debug builds, local resources are pulled from your running package server. In release builds, local resources are bundled with your application.

To use a remote resource, simply set the source URI, as in the following example:

```JavaScript
<Viro360Image source={{uri:"https://www.mywebsite.com/360_park.jpg"}} />
```

?> Asset naming guidelines

?> 1. The package server and asset bundler will not properly serve assets that have spaces, hyphens, parenthesis, or other symbols in their name.

?> 2. Assets with the same name but different extensions will not work on Android. Provide each asset a unique name.

## Supported Assets
The following assets are supported out of the box by React Native, meaning they will be bundled with your application in release mode, and vended by your package server in debug mode.

Image formats: 'jpg', 'jpeg', 'png', 'gif'

Video formats: 'm4v', 'mov', 'mp4', 'mpeg', 'mpg', 'webm'

Audio formats: 'aac', 'aiff', 'caf', 'm4a', 'mp3', 'wav'

In addition, Viro adds support for 3D object assets:

3D Object formats: obj, mtl, vrx (Viro Custom 3d model format), gltf, glb, bin, arobject

?> Viro adds support for these formats only for projects created through the react-viro-cli script. For projects not created with this script, these formats must be added manually, as per the next section.

## Adding Asset Types

?> Case Sensitivity

?> Asset types are case sensitive! For example, 'JPG' is not supported as an extension by default, while 'jpg' is.

To add additional asset types, edit (or create if it does not exist) the rn-cli.config file at your project's root (the folder where node_modules is contained). In this file, edit getAssetExts() to return the additional asset types you would like to include.

```JavaScript
'use strict';

const blacklist = require('react-native/packager/blacklist');
const path = require('path');

module.exports = {
  getProjectRoots() {
    return this._getRoots();
  },

  getAssetRoots() {
    return this._getRoots();
  },

  getAssetExts() {
    return ["obj", "mtl", "JPG", "vrx", "hdr", "gltf", "glb", "bin", "arobject", "gif"];
  },

  getBlacklistRE() {
    return blacklist();
  },

  _getRoots() {
    // match on either path separator
    if (__dirname.match(/node_modules[\/\\]react-native[\/\\]packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else if (__dirname.match(/Pods\/React\/packager$/)) {
      // packager is running from node_modules of another project
      return [path.resolve(__dirname, '../../..')];
    } else {
      return [path.resolve(__dirname, '.')];
    }
  },

  getTransformModulePath() {
    return require.resolve('react-native/packager/transformer');
  },

};
```