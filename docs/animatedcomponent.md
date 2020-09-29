# AnimatedComponent

!> AnimatedComponent is DEPRECATED

!> Use the animation property on the individual components.

!> Refer to the Develop Animation guide for more information.

A AnimatedComponent contains as a child a component on which it is set to animate. A AnimatedComponent can have only 1 child to animate. See our Animation Guide for more information on animation.

Example use:
```
<AnimatedComponent
    animation="rotateAroundYAxis"
    delay={1000}
    loop={true}
    onStart={this._onStart}
    onFinish={this._onFinish}
    run={true}>
    
   <Object3D source={require('./res/skeleton.obj')}
                           position={[-0.0, -5.5, -1.15]}
                           materials={["skeleton"]} />
</AnimatedComponent>
```

## Props

## Optional Props

**animation**	PropTypes.string

The name of the animation.

**delay**	PropTypes.number

The delay in milliseconds to apply before executing the specified animation.

**loop**	PropTypes.bool

True if the animation should loop. Set to false by default.

**onFinish**	PropTypes.func

Callback invoked when the animation has finished. If loop is set to true, this is invoked every time the animation loops.

**onStart**	PropTypes.func

Callback invoked when the animation has started. If loop is set to true, this is invoked every time the animation loops.

**run**	PropTypes.bool

Set to true to start the animation. If you set to false, this will pause the animation. The default value is true.

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