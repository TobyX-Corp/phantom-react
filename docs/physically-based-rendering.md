# PBR
Physically based rendering

## Overview
Physically-based rendering, or PBR, is a collection of rendering techniques that produces more realistic lighting results for your scenes by incorporating an advanced model of real-world lights and materials. The theory behind PBR closely matches the physics of real-world lighting and surfaces (though not exactly, it is still an approximation).

In addition to looking better, PBR offers an artist workflow that's far more intuitive: lighting and surface materials are based on physical parameters, so things naturally "look right" without having to resort to random tweaks.

Phantom fully supports physically-based rendering. This guide covers the three constructs you need for creating great PBR scenes -- materials, direct lighting, and image-based lighting -- and offers some sample code to get you started.

## Materials
The first step to creating PBR scenes is to configure materials. There are four PBR properties in each Material.

- Diffuse texture: The diffuse or albedo texture defines the base color of the material.

- Metalness: The metalness value or texture defines how "metallic" the surface is, which influences the degree to which light refracts and reflects off the surface, the level of sharpness in the reflections, and more. This can be set through a material's metalnessTexture property, or, if a uniform value is preferred, the metalness property.

- Roughness: The roughness value or texture defines the roughness of the microfacets on the surface. The rougher a surface is, the more light will scatter along completely different directions, resulting in larger and more muted specular reflections. Smoother surfaces, meanwhile, exhibit a sharper specular reflection as light rays are more likely to reflect in a uniform direction. Roughness can be set through a material's roughnessTexture property, or, if a uniform value is preferred, the roughness property.

- Ambient Occlusion: The ambient occlusion texture approximates how exposed the surface is to ambient lighting. This has no effect on direct lights (it does not result in clear shadows) but it darkens enclosed and sheltered areas. These textures are typically authored using modeling tools along with roughness and metalness. Ambient occlusion can be set through each material's ambientOcclusionTexture property.

These properties are best understood with images. Below is a grid of spheres that are illuminated by four direct lights. The spheres have no diffuse texture, but are colored red. Each sphere has a unique roughness and metalness value: roughness increases from left to right, and metalness increases from bottom to top. You can see that increasing metalness creates a shinier, more reflective sphere, and increasing roughness makes the spheres scatter incoming light more, creating a less sharp and more diffuse effect.

In the image above, no textures are used: the diffuse color, the roughness, and the metalness are all uniform across each sphere. However, using modeling software, artists can create texture maps for these properties, so that each pixel on a surface has its own roughness and metalness value. Phantom supports loading such models through OBJ and FBX. The image below shows spheres with diffuse, roughness, and metalness texture maps.

To learn more about using modeling software to create Phantom-compatible PBR models, check out our guide on the PBR asset pipeline.

## Direct Lighting
Accurate physically-based rendering requires not only that material surface models are accurate, but also that the lights themselves behave physically. Phantom supports two forms of physically-based lights, and two forms of stylized lights.

## Physically-based Lights
Physically-based lights attenuate naturally, using a distance-squared falloff, which closely matches lights in the real-world. Note this means that the attenuationStartDistance for such lights is ignored -- but the attenuationEndDistance is still adhered to. Furthermore, these lights also have their intensity set as luminous flux (in lumens).

SpotLight and OmniLight behave physically when illuminating physically-based materials (that is, materials whose lightingModel is set to "PhysicallyBased").

## Stylized Lights
Not all lights are physically-based; you may want to tweak lighting to achieve a cinematic effect in your Scene that can't be easily achieved by tuning realistic light sources. For this purpose we have stylized lights.

For stylized lights, the intensity is not set in lumens: instead it is simply divided by 1,000 and multiplied by the light's color. In other words, intensity acts a scalar multiplier on the color, affecting the light's brightness. Furthermore, stylized lights do not attenuate naturally: instead their attenuation can be set via the attenuationStartDistance, attenuationEndDistance and (coming soon) falloff exponent to achieve the desired effect.

When PBR is enabled, AmbientLight and DirectionalLight remain as stylized lights. When PBR is disabled, all lights behave as stylized lights.

## Image-Based Lighting
Image-based lighting (IBL) refers to the techniques used to physically simulate ambient light. Whereas the lights described above simulate direct lights -- for example, bulbs and spotlights -- image-based lighting simulates the softer illumination from the Environment.

Phantom handles IBL through LightingEnvironment. The lighting Environment is a texture that acts as a global light source, illuminating surfaces with diffuse and specular ambient light. Each pixel in the lighting Environment is treated as a light emitter, thereby capturing the Environment's global lighting and general feel. This gives objects a sense of belonging to their Environment. For this reason it is common to use the scene's background texture as the lighting Environment, but this is not necessary.

For these lighting Environment textures, Phantom expects images in HDR Radiance format (.hdr). Below are two examples of lighting Environment maps. Notice how even the less reflective spheres (those on the bottom right, with high roughness and low metalness) capture a sense of belonging in their Environment.

Below is a simplified scene with fewer spheres, and corresponding code to create it. You can use this as a starting point for experimenting with PBR. The code sample combines material properties, direct lighting, and IBL lighting. The HDR image used in the sample can be found here. It should be dropped into the /res folder of your application.

```JavaScript
'use strict';

import React, { Component } from 'react';
import {
 Scene,
 Materials,
 Node,
 OmniLight,
 360Image,
 Sphere,
 Controller,
 LightingEnvironment,
} from 'phantom-react';

var createReactClass = require('create-react-class');
var PBRTest = createReactClass({
  getInitialState() {
    return {

    };
  },

  render: function() {
    return (

    <Scene>
      <Image360 source={require('./res/ibl_mans_outside.hdr')} 
                    isHdr={true} />
      <LightingEnvironment source={require('./res/ibl_mans_outside.hdr')}/>

      <OmniLight
          intensity={300}
          position={[-10, 10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />
      <OmniLight
          intensity={300}
          position={[10, 10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />
      <OmniLight
          intensity={300}
          position={[-10, -10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />
      <OmniLight
          intensity={300}
          position={[10, -10, 1]}
          color={"#FFFFFF"}
          attenuationStartDistance={20}
          attenuationEndDistance={30} />

      <Sphere
          position={[-3, 1.5, -9]}
          radius={1}
          materials={"sphereA"} />
      <Sphere
          position={[0, 1.5, -9]}
          radius={1}
          materials={"sphereB"}/>
      <Sphere
          position={[3, 1.5, -9]}
          radius={1}
          materials={"sphereC"}/>
      <Sphere
          position={[-3, -1.5, -9]}
          radius={1}
          materials={"sphereD"} />
      <Sphere
          position={[0, -1.5, -9]}
          radius={1}
          materials={"sphereE"}/>
      <Sphere
          position={[3, -1.5, -9]}
          radius={1}
          materials={"sphereF"}/>
    </Scene>
  );
  },
 });

Materials.createMaterials({
  sphereA: {
    roughness: 0.0,
    metalness: 1.0,
    lightingModel: "PBR",
    diffuseColor: "#FFFFFF"
  },
  sphereB: {
    roughness: 0.2,
    metalness: 1.0,
    lightingModel: "PBR",
    diffuseColor: "#FFFFFF"
  },
  sphereC: {
    roughness: 0.5,
    metalness: 1.0,
    lightingModel: "PBR",
    diffuseColor: "#FFFFFF"
  },
  sphereD: {
    roughness: 0.0,
    metalness: 0.3,
    lightingModel: "PBR",
    diffuseColor: "#FFFFFF"
  },
  sphereE: {
    roughness: 0.2,
    metalness: 0.3,
    lightingModel: "PBR",
    diffuseColor: "#FFFFFF"
  },
  sphereF: {
    roughness: 0.5,
    metalness: 0.3,
    lightingModel: "PBR",
    diffuseColor: "#FFFFFF"
  },
});

module.exports = PBRTest;
```
To see the full effect of physically-based rendering it's best to use FBX models authored for PBR. Below is one example: an FBX model of a canister, featuring a metalness map, a roughness map, diffuse textures, and ambient occlusion textures. The model is placed in an HDR Environment. Observe how the lighting around the model subtly matches its Environment lighting, and notice the sharp specular reflections on the metallic regions of the canister.

Finally, the slightly different cylinder below, seen from all angles, showcases the effects of PBR more vividly.