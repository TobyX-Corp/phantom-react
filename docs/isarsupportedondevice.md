# IsARSupportedOnDevice

We provide a helpful utility module isARSupportedOnDevice to enable our developers to check their app users' device for compatibility to support their AR experiences conditionally. This way app developers can check and render appropriate views depending on whether the device is supported by the underlying AR system.

## Description

The function has the following signature:

isARSupportedOnDevice(notSupportedCallback, supportedCallback)

Arguments:

(React.PropTypes.func) notSupportedCallback - Called when the device does not support AR

(React.PropTypes.func) supportedCallback - Called when the device supports AR

Note:
Per ARCore docs, in the notSupportedCallback we now return a String value between UNSUPPORTED, UNKNOWN or TRANSIENT. If ARCore returned TRANSIENT, the application should check back again soon for an updated state value.

Example Use:
To take advantage of this utility, simply import ViroUtils on top of your scene and create an alias to the function like below:

```JavaScript
import {
  ViroUtils,
} from 'react-viro';
```

var isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;

Then, wherever in your scene you want to show a Viro AR Scene, you can check for AR support. For example, in the following snippet, we make this check in componentWillMount(). This way we know what to render based on compatibility:

```JavaScript
componentWillMount() {
    isARSupportedOnDevice(this._handleARNotSupported, this._handleARSupported);
  }
  _handleARSupported() {
    console.log("AR supported");
    this._getARNavigator();
  }
  _handleARNotSupported(reason) {
    console.log("AR not supported, with reason: " + reason);
    this._getNonARExperience();
  }
```