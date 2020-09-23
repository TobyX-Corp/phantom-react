# ViroLightingEnvironment

Component that represents the lighting environment to use for its parent ViroScene or ViroPortalScene. The lighting environment is a texture that acts as a global light source, illuminating surfaces with diffuse and specular ambient light. Each pixel in the lighting environment is treated as a light emitter, thereby capturing the environment's global lighting and general feel. This gives objects a sense of belonging to their environment. For this reason it is common to use the scene's background texture (set through Viro360Image) as the lighting environment, but this is not necessary.

Lighting environment expects an equirectangular texture. Radiance HDR textures (*.hdr) work best.

## Props

## Required Props

**source**	PropTypes.oneOfType( [PropTypes.shape( {uri: PropTypes.string} ), PropTypes.number] )

The image source, a remote URL or a local file resource. Radiance HDR images (.hdr) are accepted.

To invoke with remote url:
{uri:"http://example.org/myimage.hdr"}
To invoke with local source:
require('./image.hdr');

## Optional Props

**onLoadStart**	PropTypes.func

Callback triggered when we start processing the image to be used in computing this lighting environment (either downloading / reading from file).

**onLoadEnd**	PropTypes.func

Callback triggered when we have finished processing assets to be used in computing this lighting environment. Whether or not assets were processed successfully will be indicated by the parameter "success".

For example:
_onLoadEnd(event:Event){ // Indication of asset loading success event.nativeEvent.success }

**onError**	PropTypes.func

Callback triggered when the hdr image fails to load. Invoked with {nativeEvent: {error}}.