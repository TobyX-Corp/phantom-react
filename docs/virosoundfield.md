# ViroSoundField

A component that enables the control and playback of ambisonic sound files. Refer to Sound under Develop for more information.

Example use:

```JavaScript
<ViroSoundField
    source={require("./sound/mysound.wav")}
    rotation={[0,90,0]}
    paused={false}
    onFinish={this.onFinishSound} />
```

## Props

## Required props

**source**	PropTypes.oneOfType( [PropTypes.shape( {uri:PropTypes.string} ), PropTypes.number])

An ambisonic sound file. Only supports multi-channel audio files.

## Optional Props

**loop**	PropTypes.bool

Set to true to loop the sound field. This is set to false by default.

**muted**	PropTypes.bool

Set to true to mute the sound field. This is set to false by default.

**onError**	React.PropTypes.func

Callback invoked when the 360 Image fails to load. The error message is contained in event.nativeEvent.error

**onFinish**	React.PropTypes.func

Callback that is called when the sound field is finished playing. This function isn't called at the end of a sound field if looping is enabled.

**paused**	PropTypes.bool

Set to true to pause the sound field. This is set to false by default.

**rotation**	PropTypes.arrayOf(PropTypes.number),

The rotation which will be applied to the ambisonic sound.

**volume**	PropTypes.number

A number represented volume from 0 to 1. Max volume is equal to 1. Min volume is equal to 0. This is set to 1 by default.

## Method

**seekToTime(timeInSeconds)**

Seek to the given point in the Sound, in seconds.

|Parameter|Description|
|---|---|
|timeInSeconds |The seek position in seconds.|