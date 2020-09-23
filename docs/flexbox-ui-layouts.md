# UI Controls & Flexbox
Add interactivity to your scenes with traditional UI controls

Viro scenes are 3D environments, but often it's useful to display 2D content. 2D content provides a simple mechanism to provide information to the user, through text and images, or to expose targets for interactivity, like buttons.

Viro provides the following traditional UI controls:

- display images, remote or local

- touchpoint for interactivity

- display text, with powerful formatting options

- traditional indeterminate progress indicator

- stream video, remote or local, onto a 2D surface

Each of these components supports a wide variety of Events, and have specific properties that all documented in their individual reference guides linked above.

To place these controls in your scene, set their position attribute and add them to a <ViroNode>. However, since placing controls absolutely in this manner can often be tedious and time-consuming, we also implement Flexbox, a familiar and powerful way to layout your UI.

## Flexbox Layouts
The flexbox algorithm is used in CSS to layout 2D components. A good overview of flexbox in CSS can be found [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). Much like React Native, Viro supports a subset of [flexbox layout properties](https://reactnative.dev/docs/layout-props.html).

Like React Native, the Viro platform also supports [flexbox](https://reactnative.dev/docs/flexbox.html). This allows you to create components like menus, content panels, and other 2D layouts easily.

## Using Flexbox in Viro
To use Flexbox in Viro, you need to use a <ViroFlexView>. A <ViroFlexView> is a container object that allows you to create 2D Panels that anchor in 3D space. The components that are allowed to be children of a <ViroFlexView> are <ViroText>, <ViroImage>, <ViroVideo>, <ViroButton>, <ViroSpinner>, and <ViroFlexView> itself.

Let's start with a simple example:

```JavaScript
<ViroFlexView style={{flexDirection: 'row', padding: .1}} 
              width={5.0} height={5.0} 
              position={[-5.0, 0.0, -2.0]}
              rotation={[0, 45, 0]} >
  <ViroImage source={require('./res/myImage1.jpg')} style={{flex: .5}} />
  <ViroImage source={require('./res/myImage2.jpg')} style={{flex: .5}}/>
</ViroFlexView>
```
The result of the above code is a simple row of 2 images aligned side by side. The <ViroFlexView> above has a style property, which defines the layout of the children. In this example we are telling the <ViroFlexView> to align its children in a row by setting flexDirection:row. We also indicate that each child should have a padding of 0.1.

The <ViroImage> children also have style properties. In this example, they use the flex property to indicate how large they should be within the container. In this case the value for both images is 0.5, so each ends up taking half the space of the container.

This example only touches the most basic Flexbox properties. A list of all layout properties can be found here.

## Advanced Example
Let's say you want to create something more complex, that has a image in the top row and two images aligned side by side in the bottom row. This would involve nested <ViroFlexView> containers. The example below demonstrates how to accomplish this in render():

```JavaScript
render() {
  
//... render code that has <ViroScene>, etc.
  
<ViroFlexView style={{flexDirection: 'column', padding: .1}}
              width={5.0} height={5.0} 
              position={[-5.0, 0.0, -2.0]} 
              rotation={[0, 45, 0]} >
  <ViroImage source={require('./res/topImage.jpg')} style={{flex: .5}} />
  <ViroFlexView style={{flex: .5, flexDirection: 'row'}} >
    <ViroImage source={require('./res/myImage1.jpg')} style={{flex: .5}} />
    <ViroImage source={require('./res/myImage2.jpg')} style={{flex: .5}} />
  </ViroFlexView>
</ViroFlexView>
    
//... whatever other views we have!!
},
```
From the example above, you can see we added a nested <ViroFlexView> that changes the flexDirection of the children to row and adds padding. You can nest as many <ViroFlexView> containers as you wish.

Note that the outermost <ViroFlexView> is the only element that has a position and rotation property. Position, rotation and scale props are only respected with the outermost <ViroFlexView>. These properties anchor the 2D panel in 3D space.

Check out our Code Samples for more examples on how to use Flexbox to create 2D UI in VR.