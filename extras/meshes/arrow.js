/*
 Any copyright to this file is released to the Public Domain.
 In case this is not possible, this file is also licensed under the Unlicense: https://unlicense.org/
*/

/** The <code>extras/arrow.js</code> module.
 * To import all symbols in this module, either of the following can be used:
 * <pre>
 * import * from "extras/arrow.js";
 * // -- or --
 * import * as CustomModuleName from "extras/arrow.js";</pre>
 * @module extras/arrow */

import {MathUtil, Meshes, toGLColor} from "../../h3du_module.js";

function matTo4D(three, mat){
var r=new three.Matrix4()
r.set(mat[0],mat[4],mat[8],mat[12],
      mat[1],mat[5],mat[9],mat[13],
      mat[2],mat[6],mat[10],mat[14],
      mat[3],mat[7],mat[11],mat[15])
return r
}

// Generate a composite mesh representing an arrow
export const createArrow = function(three, shaftLength, pointerLength, shaftRadius, pointerRadius) {
  const slices = 32;
  // generate the four parts of the arrow
  const shaft = Meshes.createCylinder(three, shaftRadius, shaftRadius,
    shaftLength, slices);
  const pointer = Meshes.createCylinder(three, pointerRadius, 0, pointerLength, slices);
  const base = Meshes.createDisk(three, 0, shaftRadius, slices, 1, true);
  const pointerBase = Meshes.createDisk(three, shaftRadius, pointerRadius, slices, 1, true);
  // move the pointer base to the top of the shaft
  pointerBase.applyMatrix4(matTo4D(three,MathUtil.mat4translated(0, 0, shaftLength)));
  // move the pointer to the top of the shaft
  pointer.applyMatrix4(matTo4D(three,MathUtil.mat4translated(0, 0, shaftLength)));
  // merge the four parts of the arrow
  return three.BufferGeometryUtils.mergeGeometries([shaft,base,pointer,pointerBase],false)
}

function setColorBuffer(three,buffergeom,r,g,b){
 var color=toGLColor(r,g,b)
 var ret=[]
 var pos=0
 for(var i=0;i<buffergeom.index.count;i++,pos+=3){
  ret[pos]=color[0]
  ret[pos+1]=color[1]
  ret[pos+2]=color[2]
 }
 buffergeom.setAttribute("color",
    new three["BufferAttribute"](new Float32Array(ret),3))
 return buffergeom
}

/**
 * TODO: Not documented yet.
 * @param {number} shaftLength
 * @param {number} pointerLength
 * @param {number} shaftRadius
 * @param {number} pointerRadius
 * @param {Array<number>|number|string} shaftColor A [color vector or string]{@link toGLColor} specifying the color of the shaft.
 * @param {Array<number>|number|string} pointerColor A [color vector or string]{@link toGLColor} specifying the color of the pointer.
 * @returns {MeshBuffer} A mesh buffer of the resulting shape.
 * @function
 */
export const createMultiColoredArrow = function(three,shaftLength, pointerLength, shaftRadius, pointerRadius, shaftColor, pointerColor) {
  const slices = 32;
  // generate the four parts of the arrow
  const shaft = Meshes.createCylinder(three,shaftRadius, shaftRadius,
    shaftLength, slices);
  const pointer = Meshes.createCylinder(three,pointerRadius, 0, pointerLength, slices);
  const base = Meshes.createDisk(three,0, shaftRadius, slices, 1, true);
  const pointerBase = Meshes.createDisk(three,shaftRadius, pointerRadius, slices, 1, true);
  setBufferColor(three,shaft,shaftColor);
  setBufferColor(three,pointer,pointerColor);
  setBufferColor(three,base,shaftColor);
  setBufferColor(three,pointerBase,pointerColor);
  // move the pointer base to the top of the shaft
  pointerBase.applyMatrix4(matTo4D(three,MathUtil.mat4translated(0, 0, shaftLength)));
  // move the pointer to the top of the shaft
  pointer.applyMatrix4(matTo4D(three,MathUtil.mat4translated(0, 0, shaftLength)));
  // merge the four parts of the arrow
  return three.BufferGeometryUtils.mergeGeometries([shaft,base,pointer,pointerBase],false)
};
