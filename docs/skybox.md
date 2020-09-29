# SkyBox

A component that provides scene backgrounds by displaying a cube that surrounds the user to give the effect of a sky or distant horizon. The skybox can either be a fixed color, or it can be composed of six textures via the source property. For more information on scene backgrounds check out our Scene Guide .

Example use:

```JavaScript
<SkyBox source={{nx:require('./res/sb_space_left.jpg'),
                     px:require('./res/sb_space_right.jpg'),
                     ny:require('./res/sb_space_bottom.jpg'),
                     py:require('./res/sb_space_top.jpg'),
                     nz:require('./res/sb_space_back.jpg'),
                     pz:require('./res/sb_space_front.jpg')}} />
```

## Props

## Optional Props

**color**	ColorPropType

The color of the skybox. The default color is black. This property is ignored if source is set.

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

**source**	CubeMapPropType

A cube map which consists of six images that will end up surrounding the user creating a sky effect. The parameters are nx(negative x), px(positive x), ny(negative y), py(positive y), nz(negative z), pz(positive z). nx, py, nz, pz represents the sides of the skybox while py, ny represent the top and bottom of the skybox.

Example:
{ nx:require('./res/nx.jpg'), px:require('./res/px.jpg'), ny:require('./res/ny.jpg'), py:require('./res/py.jpg'), nz:require('./res/nz.jpg'), pz:require('./res/pz.jpg') }

**format**	PropTypes.oneOf(['RGBA8', 'RGBA4', 'RGB565'])

Image texture formats for storage on the GPU.

|Format|Description|
|:------|:----------:|
|RGBA8| Each pixel is described with 32-bits, using eight bits per channel|
|RGBA4| Each pixel is described with 16 bits, using four bits per channel|
|RGB565| Formats the picture into 16 bit color values without alpha|

**onLoadEnd**	React.PropTypes.func

Callback triggered when the cube map specified in source is finished loading.

For example:
_onLoadEnd(event:Event) { if(event.nativeEvent.success) { //skybox has loaded successfully! } }

**onLoadStart**	React.PropTypes.func

Callback triggered when we are processing the assets specified in the source property.

**rotation**	PropTypes.arrayOf(PropTypes.number)

Put the PropType Description here.

**style**	stylePropType

**text**	PropTypes.string

Put the PropType Description here.

**transformBehaviors**	PropTypes.arrayOf(PropTypes.string)

Put the PropType Description here.

**width**	PropTypes.number

Put the PropType Description here.

**visible**	PropTypes.bool

Put the PropType Description here.