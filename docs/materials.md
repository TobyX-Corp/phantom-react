# Materials

Materials are the set of shading attributes that define the appearance of a geometry's surfaces when rendered. Each object in a scene can be assigned one or more materials. All UI elements, and most basic 3D models, utilize only one material. Complex 3D objects, represented by <Object3D>, typically have multiple materials, one for each defined mesh surface in the 3D object.

The final color of each pixel on a surface is determined by both the Material attributes and the parameters of each <Light> in the Scene. For more information refer to the Lighting and Materials Guide.

## Methods

**static createMaterials(materials:{[key:string]: any})**

Create materials is a static takes a key/value of objects that conform to MaterialPropTypes. They key is a string that represents a unique name for the material while value is a list of properties that align with MaterialPropTypes

Example showing the creation of two materials:

Materials.createMaterials({ earth: { shininess: 2.0, lightingModel: "Lambert", diffuseTexture: require('./res/earth_texture.jpg'), }, moon: { shininess: 2.0, lightingModel: "Constant", diffuseTexture: require('./res/moon_texture.jpg'), }, });

**static deleteMaterials(materials)**

materials - PropTypes.arrayOf(PropTypes.string)

This method takes a list of registered materials names and deletes them (freeing them from memory).

## Material Prop Types

**ambientOcclusionTexture**	ReactPropTypes.any

Set the ambient occlusion texture to use for this Material. The ambient occlusion texture approximates how exposed the surface is to ambient lighting, at each texel. This has no effect on direct lights (it does not result in clear shadows) but it darkens enclosed and sheltered areas. These textures are typically authored using modeling tools along with roughness and metalness.

This property is only used with PBR.

**blendMode**	PropTypes.oneOf(['None', 'Alpha', 'Add', 'Subtract', 'Multiply', 'Screen'])

Blend mode determines how a pixel's color, as it is being rendered, interacts with the color of the pixel already in the framebuffer. The former pixel is called the "source" pixel, and the latter the "destination" pixel.

None. Disables blending: the incoming (source) pixel completely overwrites any existing (destination) pixel.

Alpha. Blend based on the incoming pixel's alpha value. The source pixel is multiplied by its alpha value and the destination pixel is multiplied by 1.0 minus the source pixel's alpha value.

Add. The source and destination pixel colors are added together. This is useful for creating a 'glow' effect.

Subtract. The source color is subtracted from the destination color.

Multiply. The source color is multiplied by the destination color. This results in colors that are at the same brightness or darker than either the source or destination color.

Screen. The inverse of the source color is multiplied by the inverse of the destination color. This results in colors that are the same brightness or lighter than either the source or destination color.

**bloomThreshold**	PropTypes.number

Bloom is an effect that makes surfaces appear to glow by applying a Gaussian blur and additive blend.

This value specifies at what 'brightness' the pixels of the surfaces using this material should start to bloom. Brightness is effectively the magnitude of the final color of a pixel (modified for the human eye: specifically it is the dot product of the final color with (0.2126, 0.7152, 0.0722)).

For example, if this property is set to 0.0, then all surfaces using this material will bloom. If this property is set to 1.0, then only those pixels of the surface whose brightness exceeds 1.0 (after lights are applied) will bloom.

**colorWriteMask**	PropTypes.arrayOf(PropTypes.oneOf(['None', 'Red', 'Green', 'Blue', 'Alpha', 'All']))

colorWriteMask indicates what colors should be written to the screen when rendering a Material. This is commonly used for two purposes: one, to filter out a base color (e.g. red) from the Material, or two, to turn off all color writing for a Material, so that the Material is only written to the depth buffer. This latter approach can be used to implement "transparent occlusion planes", or surfaces that occlude other geometry without being visible to the user.

**cullMode**	ReactPropTypes.oneOf(['None', 'Back', 'Front'])

Specifies whether or not the object that applies this material renders all surfaces or only surfaces whose normal is facing the user. By default, Back is enabled.

**diffuseColor**	ColorPropType

The color of this material. Note: Either diffuseColor or diffuseTexture can be specified. Both cannot be specified.

Valid color formats are:

'#f0f' (#rgb)

'#f0fc' (#rgba)

'#ff00ff' (#rrggbb)

'#ff00ff00' (#rrggbbaa)

'rgb(255, 255, 255)'

'rgba(255, 255, 255, 1.0)'

'hsl(360, 100%, 100%)'

'hsla(360, 100%, 100%, 1.0)'

'transparent'

'red'

* 0xff00ff00 (0xrrggbbaa)

chromaKeyFilteringColor	ColorPropType

Enables chroma key filtering for this material by setting the color to be filtered out. Chroma key filtering enables partially transparent ("alpha") videos. When chroma key filtering is enabled, all colors within an epsilon range about the chroma key filtering color (this property) will be made transparent. This technique is useful when rendering "green screen" or "blue screen" videos, as is commonly seen in newscasting and motion pictures.

**diffuseIntensity**	PropTypes.number

Modulates the impact of the diffuseTexture and diffuseColor on the overall appearance of the surface. Ranges from 0 to 1.

Setting to 0 implies the diffuseTexture and diffuseColor will have no influence on the overall appearance of the surface.

Default value is 1.0.

**diffuseTexture**	ReactPropTypes.any

A texture iamge which can be a remote URL or a local file resource. PNG and JPG images accepted.

To invoke with remote url:
{uri:"http://example.org/myimage.png"}
To invoke with local source:
require('./image.png');

**lightingModel**	ReactPropTypes.oneOf(['Phong', 'Blinn', 'Lambert', 'Constant', 'PBR'])

Lighting that applies to this material. Default is Blinn. Set to 'PBR' to use Physically Based Rendering with this material. See the Lighting and Materials guide for more details.

**magnificationFilter**	ReactPropTypes.oneOf(['Nearest', 'Linear'])

The filter to use when the texture image needs to be rendered onto a surface larger than the image. This occurs, for example, when rendering a textured surface very close to the camera.

'Nearest' filtering returns the color from the texel nearest to the coordinates being sampled.

'Linear' filtering samples the texels in the neighborhood of the coordinate and linearly interpolates between them.

Default is 'Linear'.

**metalness**	PropTypes.number

Set a uniform metalness value to use for this material. Metalness defines how "metallic" the surface is at each pixel, which influences the degree to which light reflects off the surface, the sharpness of the reflections, and more.

This property is only used with PBR. If a metalnessTexture is specified, then this value is ignored, and the values derived from the metalness texture are used instead.

**metalnessTexture**	ReactPropTypes.any

Set the metalness texture to use for this material. The metalness texture defines how "metallic" the surface is at each texel, which influences the degree to which light reflects off the surface, the sharpness of the reflections, and more.

This property is only used with PBR.

**minificationFilter**	ReactPropTypes.oneOf(['Nearest', 'Linear'])

The filter to use when the texture image needs to be rendered onto a surface smaller than the image. This occurs, for example, when rendering a textured surface very far away from the camera.

'Nearest' filtering returns the color from the texel nearest to the coordinates being sampled.

'Linear' filtering samples the texels in the neighborhood of the coordinate and linearly interpolates between them.

Default is 'Linear'.

**mipFilter**	ReactPropTypes.oneOf(['Nearest', 'Linear'])

Mipmapping increases rendering performance when rendering textures at small sizes. When used, Phantom will create scaled down versions of the texture, and during rendering will sample the version that's closest to the size of the surface being rendered.

'Nearest' filtering will return the color from the mip-level closest to the size of the rendered surface.

'Linear' filtering will return the color found by interpolating between the two nearest mip-levels.

**normalTexture**	ReactPropTypes.any

A normal map texture which can be a remote URL or a local file resource. PNG and JPG images accepted.

Normal maps define the orientation of the surface at each point for use in lighting. Phantom treats the R, G, and B components of each pixel in the normal map as the X, Y, and Z components of a surface normal vector. Normal maps are often used to simulate rough surfaces or to add details to otherwise smooth surfaces.

To invoke with remote url:
{uri:"http://example.org/myimage.png"}
To invoke with local source:
require('./image.png');

**readsFromDepthBuffer**	ReactPropTypes.bool

Phantom tracks the depth of each object in the scene with a depth buffer. This way the renderer can determine which surfaces are on top of (occlude) others from the point of view of the user.

True if surfaces using this material should read from the depth buffer. By doing so, the surface first checks if any other surface is closer to the user: if so, the surface will not appear (it is occluded). Defaults to true.

Set to false for advanced usage only.

**roughness**	PropTypes.number

Set a uniform roughness value to use for this material. Roughness defines the roughness of the surface's microfacets, at each pixel. The rougher a surface is (roughness approaching 1.0), the more light sill scatter along completely different directions, resulting in larger and more muted specular reflections. Smoother surfaces (roughness approaching 0.0), meanwhile, exhibit a sharper specular reflection as light rays are more likely to reflect in a uniform direction.

This property is only used with PBR. If roughnessTexture is set, then this value is ignored, and the values derived from the roughness texture are used instead.

**roughnessTexture**	ReactPropTypes.any

Set the roughness texture to use for this material. The roughness texture defines the roughness of the surface's microfacets at each texel. The rougher a surface is (roughness approaching 1.0), the more light sill scatter along completely different directions, resulting in larger and more muted specular reflections. Smoother surfaces (roughness approaching 0.0), meanwhile, exhibit a sharper specular reflection as light rays are more likely to reflect in a uniform direction.

This property is only used with PBR.

**shininess**	ReactPropTypes.number

The sharpness of specular highlights, which only applies if there is a specularTexture.

**specularTexture**	ReactPropTypes.any

A specular texture image which can be a remote URL or a local file resource. PNG and JPG images accepted.

To invoke with remote url:
{uri:"http://example.org/myimage.png"}
To invoke with local source:
require('./image.png');

**wrapS**	PropTypes.oneOf(['Clamp', 'Repeat', 'Mirror'])

Determines what happens when the texture coordinates extend outside the [0.0, 1.0] in the X direction of the image.

Clamp: texture coordinates are clamped between 0.0 and 1.0.

Repeat: texture coordinates repeat by going back to 0.0 after exceeding 1.0. Essentially this means the renderer only uses the fractional part of the texture coordinates when sampling.

Mirror: Similar to repeat, but the range reverses each time the limit is exceeded. E.g. from 0.0 to 1.0, then 1.0 to 0.0, then 0.0 to 1.0, etc.

**wrapT**	PropTypes.oneOf(['Clamp', 'Repeat', 'Mirror'])

Determines what happens when the texture coordinates extend outside the [0.0, 1.0] range in the Y direction of the image.

Clamp: texture coordinates are clamped between 0.0 and 1.0.

Repeat: texture coordinates repeat by going back to 0.0 after exceeding 1.0. Essentially this means the renderer only uses the fractional part of the texture coordinates when sampling.

Mirror: Similar to repeat, but the range reverses each time the limit is exceeded. E.g. from 0.0 to 1.0, then 1.0 to 0.0, then 0.0 to 1.0, etc.

**writesToDepthBuffer**	ReactPropTypes.bool

Phantom tracks the depth of each object in the scene with a depth buffer. This way the renderer can determine which surfaces are on top of (occlude) others from the point of view of the user.

Set this to true if surfaces using this material should write to the depth buffer. By doing so, any surfaces that read from the depth buffer will only appear if they are at a shallower depth than this material (e.g. if they are closer to the user). Defaults to true.

Set to false for advanced usage only.