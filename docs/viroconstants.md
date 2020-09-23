# ViroConstants

A collection of constants used in the Viro Platform.

Example use:

```JavaScript
import {ViroConstants} from 'react-viro';

if (returnValue == ViroConstants.RECORD_ERROR_NONE) {
    console.log("Success!");
}
```

## Constants:

###Video Recording/Screenshot Errors

|Name|	Value|	Notes|
|--|--|--|
|RECORD_ERROR_NONE|	-1|	Indicates that there is no error.|
|RECORD_ERROR_UNKNOWN|	0|	Indicates that the platform encountered an unknown error.|
|RECORD_ERROR_NO_PERMISSION|	1|	The user has denied permission required for recording/saving videos/screenshots.|
|RECORD_ERROR_INITIALIZATION|	2| Indicates there was an error during initialization.	|
|RECORD_ERROR_WRITE_TO_FILE|	3| Indicates that there was an error writing to file.	|
|RECORD_ERROR_ALREADY_RUNNING|	4| Indicates that the system is already recording.|	
|RECORD_ERROR_ALREADY_STOPPED|	5| Indicates that the system is not currently recording.	|

## AR Tracking States for ARScene

|Name|	Value|	Notes|
|--|--|--|
|TRACKING_UNAVAILABLE|	1|	AR Camera position is not available.|
|TRACKING_LIMITED|	2|	Tracking is available but quality of results can be may be wildly inaccurate and should generally not be used|
|TRACKING_NORMAL|	3|	Camera position tracking is providing optimal results.|
|TRACKING_REASON_NONE|	1|	The current tracking state is not limited.|
|TRACKING_REASON_EXCESSIVE_MOTION|	2|	The device is moving too fast for accurate image-based position tracking.|
|TRACKING_REASON_INSUFFICIENT_FEATURES|	3|	The scene visible to the camera does not contain enough distinguishable features for image-based position tracking.|