# ViroSpatialSound

A component that represents a sound in 3D space. Must be a single-channel sound (mono) and can be placed within a ViroNode or ViroAnimatedComponent which changes its position relative to the user. Refer to Sound under Develop for more information.

Example use:

```JavaScript
<ViroSpatialSound
    source={require("./sound/mysound.wav")}
    position={[0, 0, -3]}
    onFinish={this.onFinishSound} />
```

## Props

## Required props

**source**	PropTypes.oneOfType( [PropTypes.shape( {uri:PropTypes.string} ), PropTypes.number])

The source of a spatial sound. Must be a single-channel audio file.

## Optional Props

**loop**	PropTypes.bool

Set to true to loop the spatial sound. This is set to false by default.

**maxDistance**	PropTypes.number

A distance after which the audio can not be heard.

**minDistance**	PropTypes.number

A distance after which the audio will begin to attenuate until maxDistance where the sound is completely gone.

**muted**	PropTypes.bool

Set to true to mute the spatial sound. This is set to false by default.

**onError**	React.PropTypes.func

Callback invoked when the 360 Image fails to load. The error message is contained in event.nativeEvent.error

**onFinish**	React.PropTypes.func

Callback that is called when the spatial sound is finished playing. This function isn't called at the end of a spatial sound if looping is enabled.

**paused**	PropTypes.bool

Set to true to pause the spatial sound. This is set to false by default.

**rolloffModel**	PropTypes.string

The rolloff model which determines how the sound volume will fall off between minDistance and maxDistance. Accepts the following values:

None

Linear

*Logarithmic

**volume**	PropTypes.number

A number represented volume from 0 to 1. Max volume is equal to 1. Min volume is equal to 0. This is set to 1 by default.

**position**	PropTypes.arrayOf(PropTypes.number)

Cartesian position of the sound in 3D world space, specified as [x, y, z].

## Method

**seekToTime(timeInSeconds)**

Seek to the given point in the Sound, in seconds.

|Parameter|Description|
|---|---|
|timeInSeconds |The seek position in seconds.|
