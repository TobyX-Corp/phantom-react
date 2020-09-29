# Video
Adding video to your scenes

Phantom supports various components for displaying video. Video can be displayed in 360 degrees, surrounding the user, or on a flat plane, simulating a physical video screen.

## Video Screen
The <Video> component can be used to display video on a 2D screen. Like all UI elements, you specify the position in world space. You can also set the width and height of the screen, and set the video via the source attribute, as shown in the example below.

```JavaScript
<Video
    source={require('./video/myvid.mp4')}
    height={2}
    width={2}
    loop={true}
    position={[0,2,-5]}
 />
```
Supported video formats are .mov, .mp4, .mpv, and .3gp. The video source may be a remote URL or a local file resource. To invoke with a remote URL, set the source to a URI. For example, {uri:"http://example.org/myvideo.mp4"}. To invoke with a local file resource, use require: require('./myvideo.mp4');.

For a full list of properties, refer to the Video reference.

## 360 Video
Spherical videos that surround the user can be displayed via the <Video360> component. These videos are displayed as a scene background , behind all other UI elements.

```JavaScript
<Video360
    source={require("./video/myvideo.mp4")}
    onFinish={this._onFinish}
    loop={false} 
/>
```
As with 2D videos, 360 video sources may be remote URLs or local file resources. For a full list of properties, refer to the Video360 reference.

## Alpha Video (Chroma Key Filtering)
Phantom supports rendering partially transparent video over any VR, AR, or 3D scene. For AR scenes in particular, this enables "hologram" type experiences like Will.I.Am on CNN or Princess Leia in Star Wars.

Alpha video works via "chroma key filtering". Chroma key filtering removes (makes transparent) all colors from a video that are within an epsilon range of a target color. This technique is useful when rendering "green screen" or "blue screen" videos, as is commonly seen in newscasting and motion pictures. The videos in their raw form look something like the image below.

The code below shows how to enable chroma-key filtering, by setting the chromaKeyFilteringColor property on the <Material> being used by the <Video>.

```JavaScript
render: function() {
  return (
    <Scene>
       <Video source={require('./video/myvid.mp4')}
                  height={2} width={2}
                  loop={true}
                  position={[0, 2, -5]}
                  materials={["chromaKeyFilteredVideo"]}
       />
    </Scene>
  );
},

...
 
Materials.createMaterials({
  chromaKeyFilteredVideo : {
    chromaKeyFilteringColor: "#00FF00"
  },
});
```
## Manipulating Video
Both the <Video> and <Video360> components enable you to:

- Adjust volume via the volume property

- Mute the video via the muted property

- Pause the video by setting the paused property

- Seek the video to a specific time in seconds by invoking the seekToTime(time) method

You can also respond to various callbacks:

- onFinish is invoked when a video finishes playing (if looping, this is invoked at the end of each loop)

- onUpdateTime is invoked every second with the current time transpired in the video, and

- onError is called when we encounter an error loading or playing the video.

The following example illustrates these features.

```JavaScript
var VIDEO_REF = "videoref";

var VideoTest = React.createClass({
  getInitialState() {
    return {
      muteVideo: true,
      volume: 1,
    }
  },
  
  render: function() {
    <Scene>
      <Video360
          ref={VIDEO_REF}
          paused={false}
          source={require('./res/test-video.mp4'}
          loop={true} 
          muted={this.state.muteVideo} 
          volume={this.state.volume}
          onFinish={this._onVideoFinished} 
          onUpdateTime={this._onUpdateTime}
          onError={this._onVideoError} />   
      />
                           
      <Text position={[2, -2, -5])} text="Restart"
                onClick={this._restartVideo} 
                transformBehaviors={["billboard"]}/>
    </Scene>
  },
  
  _onVideoFinished(){
    console.log("Video finished!");
  },
  _onUpdateTime(current, total){
    console.log("Video time update, current: " + current + ", total: " + total);
  },
  _onVideoError(event) {
    console.log("Video loading failed with error: " + event.nativeEvent.error);
  },
  _restartVideo() {
    this.refs[VIDEO_REF].seekToTime(0);
  },
});
```
In particular, the example above shows how to respond to the various video callbacks, and provides an example of how to use the seekToTime function. When the <Text> component is tapped, _restartVideo() is invoked, which sets the time back to zero.

