# Viro360Image

A component that displays a 360 photo sphere that surrounds the user.

**Example use:**
```JavaScript
<Viro360Image
    source={require("./res/myimage.png")}
    rotation={[0, 45, 0]}
    format="RGBA8"
    onLoadStart={this._onLoadStart}
    onLoadEnd={this._onLoadEnd}
    onError={this._onError} />
```
## Props
## Required props

|PropKey	|PropType|
|--|--|
|source|	PropTypes.oneOfType( [PropTypes.shape( {uri:PropTypes.string} ), PropTypes.number]) The image source, a remote URL or a local file resource. PNG and JPG images accepted. To invoke with remote url: {uri:"http://example.org/myimage.png"} To invoke with local source: require('./image.png');|

## Optional Props
|PropKey|	PropType|
|--|--|
|isHdr|	PropTypes.bool Set to true if we are providing a radiance HDR image (.hdr) as the source of this 360 image.|
|format|	PropTypes.oneOf(['RGBA8', 'RGBA4', 'RGB565']) The internal format to use for the image. This is the format we will use to store the image on the GPU. It is not the format of the source image data. This property does not apply to HDR images. |Format|Description| |:------|:----------:| |RGBA8| Each pixel is described with 32-bits, using eight bits per channel| |RGBA4| Each pixel is described with 16 bits, using four bits per channel| |RGB565| Formats the picture into 16 bit color values without alpha|
|onLoadEnd|	React.PropTypes.func Callback triggered when we have finished loading the 360 image to be displayed. If the image was loaded and displayed correctly, the 'success' parameter will be true.For example: _onLoadEnd(event:Event) { // Indication of asset loading success if(event.nativeEvent.success) { //our image successfully loaded! } }|
|onError|	React.PropTypes.func Callback invoked when the 360 Image fails to load. The error message is contained in event.nativeEvent.error|
|onLoadStart|	React.PropTypes.func Callback triggered when we are processing the image to be displayed in this 360 Photo (either downloading / reading from file).|
|rotation|	PropTypes.arrayOf(PropTypes.number) The rotation of the box around it's local axis specified as Euler angles [x, y, z]. Units for each angle are specified in degrees.|
|stereoMode|	PropTypes.oneOf(['leftRight', 'rightLeft', 'topBottom', 'bottomTop', 'none']) Specifies the alignment mode of the provided stereo image in source. The image will be rendered in the given order, the first being the left eye, the next the right eye. For example, leftRight will render the left half of the image to the left eye, and the right half of the image to the right eye. Similarly, topBottom will render the top half of the image to the left eye, and the bottom half of the image to the right eye.Defaults to none. Note: There's a known issue with stereoscopic images of the format RGB565 (the fix is on the roadmap).|

## Methods
**setNativeProps(nativeProps: object)**
```
A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on Direct Manipulation for more information.

|Parameter|Description|
|---|---|
|nativeProps | an object where the keys are the properties to set and the values are the values to set |

For example, setting position natively would look like this:

componentRef.setNativeProps({ position : [0, 0, -1] });
```