# 3D Objects
Working with 3D content

The <Viro3DObject> component enables loading 3D objects (also known as models or meshes) into a scene.

The <Viro3DObject> defines the structure of the 3D object: its vertices, faces, and texture coordinates. The scene graph, or <ViroNode> node hierarchy, determines the orientation and placement of the object. And finally, the appearance of the object is defined by its materials.

## Loading 3D Objects
Viro supports loading 3D models in FBX, GLTF and OBJ formats. Viro will load the geometry, textures, and lighting parameters in the file. For FBX Viro will additionally load all installed skeletal animations. OBJ files are loaded directly by setting the source attribute of <Viro3DObject>, while FBX files need to converted into Viro's own VRX format.

The following snippet shows how a model of the human heart would be loaded, for example. The position attribute positions the object relative to the coordinate system of its parent <ViroNode>, and the materials attribute sets the materials that should be used.

```JavaScript
<Viro3DObject source={require('./res/heart.obj')}
              position={[-0.0, -5.5, -1.15]}
              materials={["heart"]}
              type="OBJ" />
```
The snippet below shows how a model would be loaded from the web (URI).

```JavaScript
<Viro3DObject source={{uri:"http://example.org/myobject.obj"}}
                position={[-0.0, -5.5, -1.15]}
                materials={["heart"]}
                type="OBJ" />
```

?> Model Not Appearing?

?> Try adding a light

?> <ViroAmbientLight color="#FFFFFF" />

?> Are your materials/textures in the right place? Most OBJ/FBX models expect their materials/textures in the same directory.

?> Is your model scaled/positioned properly? Viro displays the object in a 1 to 1 mapping of vertex coordinates to world space, so if your object coordinates specify a 100x100x100 model, then it'll appear 100x100x100 in Viro.

?> If you are running into file path issues, make sure your rn-cli.config file has been updated with the correct extensions -> Adding Asset Types

## Orientation and Placement
The node hierarchy and its transforms determine how 3D objects are positioned in the scene. See the Scene Graph guide for more information.

## Materials
Materials define the appearance of 3D objects. Materials control how an object responds to light. For detailed information see the Lighting and Materials guide.

For OBJ models, materials can either be explicitly set (as in the example above), or they can be loaded via an MTL file. MTL is an extension of the OBJ file format, that allows material properties to be set for each surface of a model. To load an OBJ with an associated MTL file, the MTL file and all of its associated textures must be specified, as in the following example:

```JavaScript
<Viro3DObject source={require('./res/model.obj')}
           resources={[require('./res/model.mtl'),
                       require('./res/texture1.jpg'),
                       require('./res/texture2.jpg'),
                       require('./res/texture3.jpg')]}
           position={[0.0, 0.0, -10]}
           scale={[0.1, 0.1, 0.1]}
           type="OBJ"
/>
```
Note that the OBJ file itself already references the specified MTL file and textures, but we must include them in the resources array in the <Viro3DObject> so that Viro knows to package these resources with your application.

## Callbacks
OBJ loading is performed asynchronously, so as not to introduce lag into your application. Viro provides callbacks to respond to each step of the OBJ loading process. You can register functions to listen for load start, load end, and loading errors. The following example illustrates all three callbacks, printing out a message to the console on receipt of each event.

```JavaScript
var OBJTest = React.createClass({
  render: function() {
    <ViroScene>
        <Viro3DObject source={require('./res/model.obj')}
           resources={[require('./res/model.mtl'),
                       require('./res/texture1.jpg'),
                       require('./res/texture2.jpg'),
                       require('./res/texture3.jpg')]}
           type="OBJ"
           position={[0.0, 0.0, -10]}
           scale={[0.1, 0.1, 0.1]}
           onLoadStart={this._onLoadStart}
           onLoadEnd={this._onLoadEnd}
           onError={this._onError}     
      />
    </ViroScene>
  }
  
  _onLoadStart() {
     console.log("OBJ loading has started"); 
  }
  _onLoadEnd() {
     console.log("OBJ loading has finished");
  }
  _onError(event) {
    console.log("OBJ loading failed with error: " + event.nativeEvent.error);
  },
});
```
## FBX
FBX is an expansive and flexible 3D model format supported by most 3D authoring software. To load FBX files, use the ViroFBX script to convert the FBX file into a VRX file. The VRX file can then be loaded using <Viro3DObject>. The ViroFBX script can found in your project's node_modules/react-viro/bin directory.

?> Mac OSX Support Only

?> Currently the ViroFBX tool runs only on Mac OS X. Support for other platforms is on the way.

The ViroFBX script can be found [here](https://s3-us-west-2.amazonaws.com/virocore/1_5_0/ViroFBX.zip).

The following example shows how to convert a model into VRX format:

```Shell
./ViroFBX path/to/model.fbx path/to/model.vrx
```
In the example above, path/to/model.fbx is the path to the FBX file to convert, and path/to/model.vrx is the path to the VRX file to create. Once the VRX file is created, it can be loaded into an application with <Viro3DObject>. Again, remember to place the model's associated textures in the same directory as the VRX file. Below is a simple example for loading a VRX file. Notice type is set to VRX here:

```JavaScript
<Viro3DObject source={require('./res/model.vrx')}
           resources={[require('./res/texture1.jpg'),
                       require('./res/texture2.jpg'),
                       require('./res/texture3.jpg')]}
           position={[0.0, 0.0, -10]}
           scale={[0.1, 0.1, 0.1]}
           type="VRX"
/>
```

?> Model Not Appearing?

?> You may need to add a Light to your scene. Try adding an Ambient light to see if your model appears:

?> <ViroAmbientLight color="#FFFFFF" />

?> See the Lighting and Materials guide for more details.

## Skeletal Animation
FBX models support skeletal animation. Skeletal animation is a hierarchical technique for animating complex geometries like humanoids. Viro supports these animations through its standard animation system. To run a skeletal animation, simply set the animation's name to the name given to the animation in the FBX file. For example, if the FBX file had an animation called "Take 001", you would run the animation like this:

```JavaScript
<Viro3DObject source={require('./res/model.vrx')}
           resources={[require('./res/texture1.jpg'),
                       require('./res/texture2.jpg'),
                       require('./res/texture3.jpg')]}
           position={[0.0, 0.0, -10]}
           scale={[0.1, 0.1, 0.1]}
           type="VRX"
           animation={{name:'Take 001',
                      run:true,
                      loop:true,
                     delay:1000}}
/>
```
For more information on animations, see the Animation guide.

## GLTF
The GL Transmission Format (glTF) is an API-neutral runtime asset delivery format. glTF bridges the gap between 3D content creation tools and modern 3D applications by providing an efficient, extensible, and interoperable format for the transmission and loading of 3D content. Viro currently supports gLTF 2.0.

## glTF Model Format
glTF assets are represented by the following 3 subcomponents:


1. A JSON-formatted file (.gltf) containing a full scene description: node hierarchy, materials, cameras, as well as descriptor information for meshes, animations, and other constructs
2. Binary files (.bin) containing geometry and animation data, and other buffer-based data
3. Image files (.jpg, .png) for textures

## Loading glTF Models
There are 3 ways you can provide your glTF data to Viro to be rendered:

1. Import the basic 3 components individually: The .gltf, its corresponding binary, and its image files.
2. Import a single .gltf file, where both the binary and image data are embedded into the .gltf file as Base64-encoded data.
3. Import a single .glb file that represents all required glTF components in a raw binary format.

Like FBX, you can use the <Viro3DObject> component to load a glTF model into your scene. When loading glTF files, set the type property to either "GLTF" (for options 1 and 2 above), or "GLB" (for option 3: raw glTF binary).

It is also important to note that any related glTF assets (like binary data or image files) are always referenced by the URI's specified within the glTF file. Relative paths are with respect to the location of the glTF file.

?> Incoming GLTF features and known limitations

?> At the moment, Viro supports rendering static 2.0 glTF models. We are also currently in the process of implementing the full support for the complete set of gLTF features, so stay tuned! :)

?> Incoming features includes:

?> Support for additional gLTF Extensions.

?> Emissive Maps

?> Sparse Accessor Data Formats

?> Non-indexed mesh rendering (drawArray rendering)

?> Additional Primitive Modes (Line_Loop & Triangle_Fan)

?> Material Alpha Mask Mode

?> Additional Min / Mag Filter modes

?> Double sided rendering

?> Baked in gLTF Camera

?> Morph Targets
