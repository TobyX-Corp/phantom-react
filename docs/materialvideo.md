# MaterialVideo

A component that provides a control for video materials. This can be used to start, stop, play video textures.

Example use:

```JavaScript
<MaterialVideo ref={"video_ref"} material={"test_material"} paused={false}
           onBufferStart={this._onBufferStart} onBufferEnd={this._onBufferEnd}
          loop={true} muted={false} volume={1.0}
          onFinish={this._onVideoFinished} onUpdateTime={this._onUpdateTime} />

//Video texture example:
 
Materials.createMaterials({
  test_material: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseTexture: require('./res/test_video.mp4'),
  },
});
```

## Props
## Optional Props

**material**	PropTypes.string

A string that each represent a video material that was created via Materials.createMaterials().

A video material has it's diffuseTexture property set to a video asset.

**paused**	PropTypes.bool

Set to true to pause the video. This is set to false by default.

**loop**	PropTypes.bool

Set to true to loop the video. This is set to false by default.

**muted**	PropTypes.bool

Set to true to mute the video. This is set to false by default.

**onBufferEnd**	PropTypes.func

Callback invoked when the underlying video component has finished buffering.

**onError**	PropTypes.func

Callback invoked when the Video fails to load. The error message is contained in event.nativeEvent.error

**onBufferStart**	PropTypes.func

Callback invoked when video begins buffering. Called at least once at the beginning of playback/video creation.

**onFinish**	PropTypes.func

Callback that is called when the video is finished playing. This function isn't called at the end of a video if looping is enabled.

**onUpdateTime**	PropTypes.func

Callback that is called when the current playback position has changed.

For example:
_onUpdateTime(currentPlaybackTimeInSeconds, totalPlayBackDurationInSeconds) { // Update Seek Bar or custom UI }

**volume**	PropTypes.number

A number represented volume from 0 to 1. Max volume is equal to 1. Min volume is equal to 0. This is set to 1 by default.

## Methods

**seekToTime(timeInSeconds: number)**

Sets the video to the specified time in seconds.

|Parameters | Description |
| ------------- |:------------- |
|timeInSeconds | Number of seconds into video to seek to. |