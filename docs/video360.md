# Video360

A component that displays a 360 video sphere that surrounds the user.

**Example use:**
```JavaScript
<Video360
    source={require("./video/myvideo.mp4")}
    onFinish={this._onFinish}
    onUpdateTime={this._onUpdateTime}
    onError={this._videoError}
    loop={true}
    paused={false}
    volume={1.0} />
```

## Props
## Required props

**source**

PropTypes.oneOfType( [PropTypes.shape( {uri:PropTypes.string} ), PropTypes.number])

The video source, a remote URL or a local file resource. MPEG videos accepted.

To invoke with remote url: {uri:"http://example.org/myvideo.mp4"}

To invoke with local source: require('./myvideo.mp4');

## Optional Props

**loop**	PropTypes.bool

Set to true to loop the video. This is set to false by default.

**muted**	PropTypes.bool

Set to true to mute the video audio. This is set to false by default.

**onBufferEnd**	PropTypes.func

Callback invoked when the underlying video component has finished buffering.

**onBufferStart**	PropTypes.func

Callback invoked when video begins buffering. Called at least once at the beginning of playback/video creation.

**onError**	PropTypes.func

Callback invoked when the 360 Video fails to load. The error message is contained in event.nativeEvent.error

**onFinish**	PropTypes.func

Callback that is called when the video is finished playing. This function isn't called at the end of a video if looping is enabled.

**onUpdateTime**	PropTypes.func

Callback that is called when the current playback position has changed.

For example:
_onUpdateTime(currentPlaybackTimeInSeconds, totalPlayBackDurationInSeconds) { // Update Seek Bar or custom UI }

**paused**	PropTypes.bool

Set to true to pause the video. This is set to false by default.

**rotation**	PropTypes.arrayOf(PropTypes.number)

The rotation of the box around it's local axis specified as Euler angles [x, y, z]. Units for each angle are specified in degrees.

**stereoMode**	PropTypes.oneOf(['leftRight', 'rightLeft', 'topBottom', 'bottomTop', 'none'])

Specifies the alignment mode of the provided stereo video in source. The video will be rendered in the given order, the first being the left eye, the next the right eye.

For example, leftRight will render the left half of the video to the left eye, and the right half of the video to the right eye. Similarly, topBottom will render the top half of the video to the left eye, and the bottom half of the video to the right eye.

Defaults to none.

**volume**	PropTypes.number

A number represented volume from 0 to 1. Max volume is equal to 1. Min volume is equal to 0. This is set to 1 by default.

## Methods
**seekToTime(timeInSeconds: number)**

Sets the video to the specified time in seconds.

|Parameters | Description |
| ------------- |:------------- |
|timeInSeconds | Number of seconds into video to seek to. |

**setNativeProps(nativeProps: object)**

A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });