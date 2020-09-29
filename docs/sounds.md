# Sound

A component that enables the user play and control mono and stereo sound effects. Refer to Sound under Develop for more information.

Example use:

```JavaScript
<Sound
    source={require("./sound/mysound.mp3")}
    onFinish={this.onFinishSound} />
```

## Props

## Required props

**source**	PropTypes.oneOfType( [PropTypes.shape( {uri:PropTypes.string} ), PropTypes.number])

The sound source, either a mono or stereo audio file. Supported extensions include .mp3 and .wav.

This can also be the key of a preloaded sound. See preloadSounds below for more information.

## Optional Props

**loop**	PropTypes.bool

Set to true to loop the sound. This is set to false by default.

**muted**	PropTypes.bool

Set to true to mute the sound. This is set to false by default.

**onError**	React.PropTypes.func

Callback invoked when the Sound fails to load. The error message is contained in event.nativeEvent.error

**onFinish**	React.PropTypes.func

Callback that is called when the sound is finished playing. This function isn't called at the end of a sound if looping is enabled.

**paused**	PropTypes.bool

Set to true to pause the sound. This is set to false by default.

**volume**	PropTypes.number

A number represented volume from 0 to 1. Max volume is equal to 1. Min volume is equal to 0. This is set to 1 by default.

## Methods

**seekToTime(timeInSeconds)**

Seek to the given point in the Sound, in seconds.

|Parameter|Description|
|---|---|
|timeInSeconds |The seek position in seconds.|

## Methods

**seekToTime(timeInSeconds)**

Seek to the given point in the Sound, in seconds.

|Parameter|Description|
|---|---|
|timeInSeconds |The seek position in seconds.|

## Static Methods

**static preloadSounds(soundMap:{[key:string]: string)**

Given a map of keys and links to their corresponding sound data, Phantom will prefetch each sound and store it locally for quick access, asynchronously. You can then play these sounds later by providing the key in the sound's source attribute. We currently only support external urls (web-based).

Example showing the preloading of two sounds:

Sound.preloadSounds({ "cube_sound" : resolveAssetSource(require("../res/metronome.mp3")), "cube_sound_2" : "http://www.kozco.com/tech/32.mp3"), });

**static unloadSounds(soundKeys: [string])**

Given sound keys, will delete the local prefetched copy of sound data from the application's internal directory.

Sound.unloadSounds([ "cube_sound", ]);