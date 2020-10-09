//  Copyright © 2018 Viro Media. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining
//  a copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to
//  permit persons to whom the Software is furnished to do so, subject to
//  the following conditions:
//
//  The above copyright notice and this permission notice shall be included
//  in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

package com.viromedia.bridge.component.node.control;

import com.facebook.react.bridge.ReactContext;
import com.viro.core.Material;
import com.viro.core.Polygon;
import com.viro.core.Vector;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class VRTPolygon extends VRTControl {
    private Polygon mNativePolygon;
    private float mU0 = 0;
    private float mV0 = 0;
    private float mU1 = 1;
    private float mV1 = 1;
    private boolean mGeometryNeedsUpdate = false;
    private boolean mARShadowReceiver = false;
    private List<Vector> mVertices = new ArrayList<>();
    private List<List<Vector>> mHoles = new ArrayList<>();

    public VRTPolygon(ReactContext reactContext) {
        super(reactContext);
    }

    public void setUVCoordinates(float u0, float v0, float u1, float v1) {
        mU0 = u0;
        mV0 = v0;
        mU1 = u1;
        mV1 = v1;
        mGeometryNeedsUpdate = true;
    }

    public void setVertices(List<Vector> coords) {
        mVertices = coords;
        mGeometryNeedsUpdate = true;
    }

    public void setHoles(List<List<Vector>> holes) {
        mHoles = holes;
        mGeometryNeedsUpdate = true;
    }

    public void setARShadowReceiver(boolean arShadowReceiver) {
        mARShadowReceiver = arShadowReceiver;
    }

    @Override
    public void onPropsSet() {
        super.onPropsSet();
        updateSurface();
    }

    public void updateSurface() {
        if (mGeometryNeedsUpdate && mNativePolygon != null){
            mNativePolygon.dispose();
            mNativePolygon = null;
        }

        if (mNativePolygon == null) {
            mNativePolygon = new Polygon(mVertices, mHoles, mU0, mV0, mU1, mV1);
            setGeometry(mNativePolygon);
        }

        applyMaterials();
    }

    @Override
    public void setMaterials(List<Material> materials) {
        /*
         Override to set the shadow mode in the materials.
         */
        if (materials != null) {
            for (Material material : materials) {
                material.setShadowMode(mARShadowReceiver ? Material.ShadowMode.TRANSPARENT : Material.ShadowMode.NORMAL);
            }
            super.setMaterials(materials);
        }
        /*
         If no material was assigned to this surface, then set a default material with the correct
         shadow mode.
         */
        else if (mNativePolygon.getMaterials() == null) {
            Material material = new Material();
            material.setShadowMode(mARShadowReceiver ? Material.ShadowMode.TRANSPARENT : Material.ShadowMode.NORMAL);
            mNativePolygon.setMaterials(Arrays.asList(material));
        }
    }

    @Override
    public void onTearDown() {
        super.onTearDown();
        if (mNativePolygon != null) {
            mNativePolygon.dispose();
            mNativePolygon = null;
        }
    }
}
