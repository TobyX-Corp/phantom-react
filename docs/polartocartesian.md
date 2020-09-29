# PolarToCartesian

While it makes sense to position in cartesian coordinates for 2D space, 3D space lends itself more towards polar coordinates. As a result, we have provided the utlity module polarToCartesian which takes in polar coordinates and converts them into cartesian coordinates for your convenience.

## Description

The function has the following signature:

**polarToCartesian(radius, theta, phi)**

Arguments:

(float) radius - given in world lengths

(float) theta - given in degrees

(float) phi - given in degrees

and converts the given polar coordinates into cartesian coordinates based on the default user location of (0, 0, 0) with forward vector of (0, 0, -1) and up vector of (0, 1, 0).

Furthermore, polar coordinates of [1, 0, 0] give the forward vector [0, 0, -1] and increasing the theta sweeps the vector to the right whereas increasing the phi value sweeps the vector upwards. Refer to the image below.

Example use:
To take advantage of this utility, simply import Utils in top of your scene and then create an alias to the function like below:

```JavaScript
import {
  Utils,
} from 'phantom-react';
```

let polarToCartesian = Utils.polarToCartesian;

Then wherever you use position, simply replace it with the function polarToCartesian:

```JavaScript
<Object3D source={require('./res/skeleton.obj')}
                          position={polarToCartesian([1, 30, 30])}
                          materials={["skeleton"]} />
```

## Advanced

For those of you who like to be mathematically accurate, the positive X axis it to the right of the user, the positive Y is "up" and the positive Z is straight "behind" the user's starting location. As a result, we've provided a variation of the polarToCartesian utility which we call polarToCartesianActual which take the same arguments as the original.

The main difference here is that polarToCartesianActual is mathematically accurate with the polar coordinates of [1, 0, 0] returning the cartesian coordinates of [1, 0, 0] (to the right of the user) vs [0, 0, -1] (directly in front of the user). As theta increases, the vector sweeps clockwise from the right of the user to directly behind the user and as phi increases, the vector sweeps from the same X-Z plane of the user up towards the [0, 1, 0] vector (directly above the user).

To use this utility, simply import the new function at the top of your scene:

import { polarToCartesianActual } from 'polarToCartesian';

And use it anywhere you require cartesian coordinates.

