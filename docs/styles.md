# Styles

## Layout Styles

Layout styles used within ViroFlexView components. Please refer to https://facebook.github.io/react-native/docs/layout-props for more information.

?> Border related layout props are currently not supported.

## Text Styles

The styles below only apply to ViroText. Please see that component for more info on how to define these.

**color**	ColorPropType

The color of the text. The default text color is white.

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

**fontFamily**	PropTypes.string

## Supported Fonts

**fontSize**	PropTypes.number

The size of the font. Default is 18. Recommended font size is >=18.

**textAlign**	PropTypes.oneOf([ 'left', 'right', 'center'])

The horizontal alignment of the text. Default is left.

**textAlignVertical**	PropTypes.oneOf(['top', 'bottom', 'center'])

The vertical alignment of the text. Default is top.

**textClipMode**	PropTypes.oneOf(['none', 'clipToBounds'])

Set to clipToBounds to clip this text to its bounding box defined by width and height. If set to none, the text will overrun its bounds if's larger than them.

**textLineBreakMode**	PropTypes.oneOf(['wordwrap','charwrap','justify','none'])

The line break mode to use for text wrapping. We process line breaks against the width of the text.

Set to wordwrap to introduce line breaks only at word boundaries, whenever the next word overruns the width.

Set to charwrap to introduce line breaks whenever the next character overruns the width. This mode may break words in half across lines.

Set to justify to introduce breaks at word boundaries, and add variable internal spacing between words, at the optimal points in the text to reduce the 'raggedness' of the text edges.