# Lighting and Materials
Illuminating Scenes

You illuminate scenes in Phantom by adding lights to your <Node> objects. For example, in the scene below, a grey spotlight and a blue ambient light illuminate a 3D object.

```JavaScript
<Scene>
  <OrbitCamera position={[0, 0, -0]} focalPoint={[0, 0, -1.15]} />
  <SpotLight position={[0, -0.25, 0]}
                 color="#777777"
                 direction={[0, 0, -1]}
                 attenuationStartDistance={5}
                 attenuationEndDistance={10}
                 innerAngle={5}
                 outerAngle={20}/>

  <AmbientLight color="#FF0000" />

  <Object3D source={require('./res/heart.obj')}
                position={[-0.0, -5.5, -1.15]}
                materials={["heart"]} />
</Scene>
```
The impact of a light's illumination on a component is determined by two things: the light's properties, and the component's materials. This guide covers both lights and materials.

## Constant Lighting
For basic scenes with only UI elements and a background (<Image360> or <Skybox>), lights can effectively be ignored. By default, all elements use Constant lighting. Components with Constant lighting ignore the lights in the scene altogether; they are displayed in full color.

To apply lighting, one or more lights must be added to the scene, and the lighting models of the components you want to respond to light must be set. The next few sections go into more detail.

## Materials
For more advanced scenes, we use lights and materials to control the illumination of objects.

Materials are the set of shading attributes that define the appearance of a geometry's surface when rendered. Each object in a scene can be assigned one or more materials. All UI elements, and most basic 3D models, utilize only one material. Complex 3D objects, represented by <Object3D>, can have multiple materials, one for each defined mesh surface in the 3D object.

Materials are assigned via the object's materials property. The following is a simple example:

```JavaScript
<Object3D source={require('./res/heart.obj')}
                      position={[-0.0, -5.5, -1.15]}
                      materials={["heart"]} />
```
The material itself is then defined as follows:

```JavaScript
Materials.createMaterials({
  heart: {
     lightingModel: "Blinn",
     diffuseTexture: require('./res/Heart_D3.jpg'),
     specularTexture: require('./res/Heart_S2.jpg'),
   },
});
```
The following material properties determine how a material is rendered in light:

- diffuseTexture and diffuseColor: describe the color of light reflected equally in all directions from the material’s surface. The diffuse property of a pixel is independent of the point of view, so it can be thought of as a material’s “base” color or texture. The diffuse property be set as a texture (via diffuseTexture), and/or as a uniform color (via diffuseColor). If both are set, the two will be multiplied together at each pixel.

- specularTexture: describes the color of light reflected by the material directly toward the viewer. The specular color forms a bright highlight on the surface, simulating a glossy or shiny appearance.

- shininess: describes the sharpness of specular highlights. Ranges from 0 to 1.

- lightingModel: defines how material properties and the lights in the scene are combined to create the color for each pixel on the material's surface. Set to one of Constant, Lambert, Phong, or Blinn. See the next section for details.

- normalTexture: defines the orientation of the surface at each point for use in lighting. Phantom treats the R, G, and B components of each pixel in the normal map as the X, Y, and Z components of a surface normal vector. Normal maps are often used to simulate rough surfaces or to add details to otherwise smooth surfaces.

## Lighting Models

Phantom supports four traditional lighting models: Constant, Lambert, Phong, or Blinn. Each of these lighting models defines a formula for combining a material’s diffuse and specular properties with the lights in the scene and the point of view, to create the color of each rendered pixel.

In the examples below, diffuseMaterial refers to either the material's diffuseTexture or diffuseColor, whichever is defined. If both are defined it refers to the material's diffuseTexture multiplied by its diffuseColor.

## Constant
The diffuseMaterial wholly determines the color of the surface. Lights are ignored.

## Lambert
Lambert’s Law of diffuse reflectance determines the color of the surface. The formula is as follows:

!> The following formula was not displayed correctly in the original document. Further investigation needed.

```
∑ambientLigh, the sum of all ambient lights in the scene, as contributed by
AmbientLigh
objects
∑diffuseLigh
the sum of each non-ambient light's diffuse contribution. Each light's contribution is defined as follows
= max(0, dot(N, L)
t
```
where N is the surface normal vector at the point being shaded, and L is the normalized vector from the point being shaded to the light source.

## Phong
The Phong approximation of real-world reflectance adds a specular contribution to the calculation:

!> The following formula was not displayed correctly in the original document. Further investigation needed.

```e
∑specularLigh
the sum of each non-ambient light's specular contribution. Each light's specular contribution is defined as follows
= pow(max(0, dot(R, E)), shininess
t
```

where E is the normalized vector from the point being shaded to the viewer, R is the reflection of the light vector L across the normal vector N, and shininess is the value of the material's shininess property.

## Blinn
The Blinn-Phong approximation of real-world reflectance is similar to Phong, but uses a different formula for the specular contribution

!> The following formula was not displayed correctly in the original document. Further investigation needed.

```)```

where H is the vector halfway between the light vector L and the eye vector E, and shininess is the value of the material's shininess property.

## PBR
PBR is the physically-based lighting model, which uses approximations to actual lighting and surface physics models to compute the illumination of each pixel. For detail on this, see the PBR guide.

## Light Types
The lighting models above determine how a set of lights impact a surface. The influence of a given light is also determined by the properties of the lights themselves. Light properties determine things like the directionality of the light, the color of the light, and how the light impacts objects over a distance. Phantom supports four light types.

## Ambient Light
<AmbientLight> illuminates all objects in the view (and its subviews) with equal intensity from all directions. Only the color of am ambient light needs to be set.

## Directional Light
<DirectionalLight> represents a light source with uniform direction and constant intensity. The sun is a canonical example of a directional light. Directional lights have a color property and a direction property.

## Omni Light
<OmniLight> is a light source that casts light in all directions from a given position. Omni lights have a color property and a position property. Additionally, the illumination of an omni light can attenuate over distance. This attenuation is controlled by the attenuationStartDistance and attenuationEndDistance properties.

## Spot Light
<SpotLight> is a light source that illuminates a cone-shaped area determined by its position and direction. The color of the spot light is determined by its color property. The edges of the cone are controlled by innerAngle, the angle at which the cone begins to fade, and outerAngle, the angle at which the cone has faded completely. Additionally, spot lights, like omni lights, can also attenuate with distance. This is controlled via the attenuationStartDistance and attenuationEndDistance properties.

## Shadows
Phantom renders shadows through shadow mapping, a technique where the silhouettes of objects are rendered to an image, and that image is then reprojected onto the screen. Phantom will generate shadows for all lights that have their castsShadow property set to true.

Shadows are particularly important for AR, in that they provide a visual cue about what real-world surface a virtual object is resting on. However, because casting shadows involves re-rendering the scene multiple times, they do incur a performance cost.

Shadows are only supported for directional and spot lights. The following snippet shows how to create a spotlight that casts shadows:

```JavaScript
<Scene>
  <SpotLight position={[0, -0.25, 0]}
                 color="#777777"
                 direction={[0, 0, -1]}
                 attenuationStartDistance={5}
                 attenuationEndDistance={10}
                 innerAngle={5}
                 outerAngle={20}
                 castsShadow={true} />
</Scene>
```
There are a multitude of parameters that can be tuned for shadow maps. Most of these involve a tradeoff between performance and quality. The shadowMapSize parameter, in particular, controls the resolution of the shadow map. Increasing this value yields a higher resolution shadow at a higher performance cost. Decreasing this value results in lower resolution shadows (pixelated at the edges) but higher performance. In general it is best to keep this value as power of 2. The deafult is 1024.

The other key determinant of shadow quality is the shadow frustum. For a spotlight, this is essentially the cone of the light. It is determined by the spotlight's innerAngle and outerAngle, and by the shadowNearZ and shadowFarZ. The smaller the cone, the better the shadow quality. If the cone is too large, the shadows will become pixelated. The shadowNearZ and shadowFarZ parameters determine the extent of the cone in the direction of the light. Tightening these together as well will improve the precision of the shadow. For more detail on these parameters, see the SpotLight reference.

For directional lights, shadows have some additional parameters. Directional lights have no position --- they are ubiquitous -- so in theory they should cast shadows on all objects in the scene. However, doing so would be prohibitively expensive, so Phantom requires that we choose a box volume over which the directional light will cast shadows. This box projects out from shadowOrthographicPositionand is of width and length shadowOrthographicSize. It's depth is defined by shadowNearZ and shadowFarZ, as shown in the diagram below.


Again, the tighter the shadow region, the higher resolution the shadows will appear. The following example shows a directional light casting shadows over a 10x10 meter area, 5 meters away from the origin in the Z direction.

```JavaScript
<Scene>
  <DirectionalLight color="#FFFFFF"
                        direction={[0, -1, 0]}
                        shadowOrthographicPosition={[0, 3, -5]}
                        shadowOrthographicSize={10}
                        shadowNearZ={2}
                        shadowFarZ={9}
                        castsShadow={true} />

  <Box position={[-1, 2, -5]}
           width={0.5} height={0.5}
           materials={["grid"]} />

  <Box position={[1, -1, -5]}
           width={0.5} height={0.5}
           materials={["grid"]} />

  <Quad position={[0, -2, -3]}
               rotation={[-90, 0, 0]}
               width={20} height={20}
               materials={["grid"]} />
</Scene>
               
...

Materials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    lightingModel: "Lambert",
  },
});
```
In the scene depicted above, the directional light casts shadows onto the horizontal <Quad>. Note, however, that the directional light will only cast a shadow for the second box. The first box does not cast a shadow because it's not within the shadow region. The shadow region in this example ranges from -5 to 5 on the X axis and 0 to -10 along the Z axis (determined by shadowOrthographicPosition, direction, and shadowOrthographicSize), and +1 to -6 in the Y direction (determined by shadowOrthographicPosition, direction, shadowNearZ, and shadowFarZ). Specifically, the first box is cut off from the shadow region by shadowNearZ.

Note that shadows are:

1. Only cast by objects within the shadow region.

2. Only rendered on objects within the shadow region.

## AR Shadow Surfaces
When rendering in augmented reality, it's common to want to render shadows onto real world surfaces. To do this, we have to specify the position of the surface we want to render the shadows onto, and set its arShadowReceiver property to true. To ensure the surface we're rendering onto truly does correspond to a real-world surface, typically we place the surface within a <ARPlaneSelector> or similar component, as shown below:

```JavaScript
<ARScene>
  <ARPlaneSelector>
    <SpotLight
            innerAngle={5}
            outerAngle={25}
            direction={[0, -1, -.2]}
            position={[0, 3, 1]}
            color="#ffffff"
            castsShadow={true}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

    <Object3D
      source={require('./res/pug.vrx')}
      position={[0, 0, 0]}
      scale={[.2, .2, .2]}
      type="VRX" />

    <Quad
      position={[0, 0, 0]}
      rotation={[-90, 0, 0]}
      width={4} height={4}
      arShadowReceiver={true} />
</ARPlaneSelector>
```
In the scene above the <Quad> will be coincident with the detected horizontal plane, and will have no "virtual" appearance; it simply designates a real-world surface on which virtual shadows should be rendered. The spotlight will cast a shadow of the <Object3D> onto this surface.

## Light Influence Bit Masks
Phantom supports creating categories of lights, so that specific lights can influence specific nodes. To do this, lights and nodes in the scene can be assigned bit-masks.

During rendering, Phantom compares each light's influenceBitMask with each node's lightReceivingBitMask and shadowCastingBitMask. The bit-masks are compared using a bitwise AND operation.

If (influenceBitMask & lightReceivingBitMask) != 0, then the light will illuminate the node, and the node will receive shadows cast from objects occluding the light.

If (influenceBitMask & shadowCastingBitMask) != 0, then the node will cast shadows from the light.

This feature can be used to limit the scope of a given light, or to limit what objects cast shadows for a given light. In the following example, the first box will cast shadows and the second will not, and only the first surface will receive shadows from the spotlight.

```JavaScript
<Scene>
    <DirectionalLight color="#777777"
                          direction={[0, -1, 0]}
                          shadowOrthographicPosition={[0, 8, -5]}
                          shadowOrthographicSize={10}
                          shadowNearZ={2}
                          shadowFarZ={9}
                          lightInfluenceBitMask={2}
                              castsShadow={true} />
                        
    <Box position={[-3, 3, -5]}
             width={0.5} height={0.5}
             shadowCastingBitMask={2} />
          
    <Box position={[3, 3, -5]}
             width={0.5} height={0.5} />
          
    <Quad position={[0, 0, 0]}
                 rotation={[-90, 0, 0]}
                 lightReceivingBitMask={2}
                 width={2} height={2} />
                 
    <Quad position={[0, 0, 0]}
                 rotation={[-90, 0, 0]}
                 width={2} height={2} />
</Scene>
```
The default mask is 0x1.

## Bloom
Bloom is an effect used to simulate extremely bright light overwhelming a camera capturing a scene. It's often referred to as "glow" as well. Because Phantom supports High Dynamic Range (HDR) rendering, you can integrate bloom into your scenes.

To do this, set the bloomThreshold of the material you would like to glow. This value specifies at what 'brightness' the pixels of the surfaces using this material should start to bloom. Brightness is effectively the magnitude of the final color of a pixel (modified for the human eye: specifically, it is the dot product of the final color with (0.2126, 0.7152, 0.0722)).

For example, if bloomThreshold is set to 0.0, then all surfaces using the material will bloom. If bloomThreshold is set to 1.0, then only those pixels of the surface whose brightness exceeds 1.0 (after lights are applied) will bloom.

The following example creates a glow on the box by using a bloomThreshold of 0.5 and a combination of lights that exceeds 0.5 brightness on the box's surfaces.

```JavaScript
<Scene>
      <AmbientLight color="#FFFFFF" intensity={250} />
      <DirectionalLight color="#FFFFFF" direction={[0, -1,  0]}/>
      <DirectionalLight color="#FFFFFF" direction={[0,  0, -1]}/>

      <Box position={[0, -.5, -1]}
               rotation={[0, 45, 0]}   
               scale={[.3, .3, .1]} materials={["grid"]} />
</Scene>
        
...

Materials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    lightingModel: "Lambert",
    bloomThreshold: 0.5,
  },
});
```