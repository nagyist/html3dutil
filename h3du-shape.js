/**
 * An object that associates a geometric mesh (the shape of the object) with
 *  material data (which defines what is seen on the object's surface)
 * and a transformation matrix (which defines the object's position and size).
 * See the "{@tutorial shapes}" tutorial.
 *  @class
 * @alias H3DU.Shape
* @param {H3DU.BufferedMesh} mesh A mesh in the form of a buffer object.
* For {@link H3DU.Mesh} objects, the shape
 * created will use the mesh in its current state and won't
 * track future changes.  <i>Using H3DU.BufferedMesh objects as the parameter
 * is deprecated.</i>
  */
H3DU.Shape = function(mesh){
  if((mesh===null || typeof mesh==="undefined"))throw new Error("mesh is null");
  if(mesh instanceof H3DU.Mesh){
   this.bufferedMesh=H3DU.MeshBuffer.fromMesh(mesh);
  } else {
   if(!H3DU.Shape._bufferedMeshWarning && mesh instanceof H3DU.BufferedMesh){
    console.warn("Using an H3DU.BufferedMesh in H3DU.Shape objects is deprecated.")
    H3DU.Shape._bufferedMeshWarning=true
   }
   this.bufferedMesh=mesh;
  }
  this.transform=new H3DU.Transform();
  this.material=new H3DU.Material();
  this.parent=null;
  this.visible=true;
}
H3DU.Shape._bufferedMeshWarning=false;
/**
 * Gets the number of vertices composed by
 * all shapes in this scene.
 * @returns {Number} Return value. */
H3DU.Shape.prototype.vertexCount=function(){
 return (this.bufferedMesh) ? this.bufferedMesh.vertexCount() : 0;
};
/**
* Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this scene.
 * @returns {Number} Return value. */
H3DU.Shape.prototype.primitiveCount=function(){
 return (this.bufferedMesh) ? this.bufferedMesh.primitiveCount() : 0;
};
/**
 * Not documented yet.
 * @param {*} value
 */
H3DU.Shape.prototype.setVisible=function(value){
 this.visible=!!value;
 return this;
};
/**
 * Gets whether this shape will be drawn on rendering.
 * @returns {Boolean} True if this shape will be visible; otherwise, false.
 */
H3DU.Shape.prototype.getVisible=function(){
 return this.visible;
};
/**
* Sets material parameters that give the shape a certain color.
* (If a material is already defined, sets its ambient and diffusion
* colors.)
* However, if the mesh defines its own colors, those colors will take
* precedence over the color given in this method.
* @param {Array<Number>|number|string} r A [color vector or string]{@link H3DU.toGLColor},
* or the red color component (0-1).
* @param {Number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {Number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {Number} [a] Alpha color component (0-1).
* If the "r" parameter is given and this parameter is null or omitted,
* this value is treated as 1.0.
 * @returns {H3DU.Shape} This object.
*/
H3DU.Shape.prototype.setColor=function(r,g,b,a){
  var c=H3DU.toGLColor(r,g,b,a);
  // TODO: Consider setting only the diffuse color
  return this.setMaterialParams({"ambient":c,"diffuse":c})
};
/**
 * Sets material parameters that give the shape a texture with the given URL.
 * @param {String} name {@link H3DU.Texture} object, or a string with the
* URL of the texture data.  In the case of a string the texture will be loaded via
*  the JavaScript DOM's Image class.  However, this method
*  will not load that image if it hasn't been loaded yet.
 * @returns {H3DU.Shape} This object.
 */
H3DU.Shape.prototype.setTexture=function(name){
 return this.setMaterialParams({"texture":name});
};
/**
 * Sets this shape's material to a shader with the given URL.
 * @param {H3DU.ShaderInfo} shader Source code for a WebGL
 * shader program. <i>Using a {@link H3DU.ShaderProgram} here
 * is deprecated.</i>
 * @returns {H3DU.Shape} This object.
 */
H3DU.Shape.prototype.setShader=function(shader){
 return this.setMaterialParams({"shader":shader});
};
/**
 * Sets parameters of this shape's material.
 * @param {Object} params An object described in {@link H3DU.Material#setParams}.
 * @param {H3DU.Shape} This object.
 */
H3DU.Shape.prototype.setMaterialParams=function(params){
 if(this.material){
   this.material.setParams(params)
 } else {
   this.material=new Material().setParams(params)
 }
 return this;
};
/**
* Sets this shape's material to the given texture and color.
 * @param {String} name {@link H3DU.Texture} object, or a string with the
* URL of the texture data.  In the case of a string the texture will be loaded via
*  the JavaScript DOM's Image class.  However, this method
*  will not load that image if it hasn't been loaded yet.
* @param {Array<Number>|number|string} r A [color vector or string]{@link H3DU.toGLColor},
* or the red color component (0-1).
* @param {Number} g Green color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {Number} b Blue color component (0-1).
* May be null or omitted if a string or array is given as the "r" parameter.
* @param {Number} [a] Alpha color component (0-1).
* If the "r" parameter is given and this parameter is null or omitted,
* this value is treated as 1.0.
 * @returns {H3DU.Shape} This object.
*/
H3DU.Shape.prototype.setTextureAndColor=function(name,r,g,b,a){
 var c=H3DU.toGLColor(r,g,b,a);
 return this.setMaterialParams({
  "texture":name,
  "ambient":c,
  "diffuse":c
 });
};
/**
* Sets this shape's material parameters.
* @param {Material} material
 * @returns {H3DU.Shape} This object.
*/
H3DU.Shape.prototype.setMaterial=function(material){
 this.material=material;
 return this;
};
/**
* Makes a copy of this object.  The copied object
* will have its own version of the transform and
* material data, but any texture
* image data and buffered meshes will not be duplicated,
* but rather just references to them will be used.
* @returns {H3DU.Shape} A copy of this object.
*/
H3DU.Shape.prototype.copy=function(){
 var ret=new H3DU.Shape(this.bufferedMesh);
 ret.material=this.material.copy();
 ret.transform=this.getTransform().copy();
 return ret;
};
/**
 * Not documented yet.
 */
H3DU.Shape.prototype.getTransform=function(){
 return this.transform;
};
/**
 * Not documented yet.
 */
H3DU.Shape.prototype.getBounds=function(){
 if(!this.bufferedMesh){
  return [0,0,0,-1,-1,-1];
 }
 var bounds=(this.bufferedMesh.getBounds) ?
   this.bufferedMesh.getBounds() :
   this.bufferedMesh._getBounds();
 var matrix=this.getMatrix();
 if(!H3DU.Math.mat4isIdentity(matrix)){
  var mn=H3DU.Math.mat4transformVec3(matrix,bounds[0],bounds[1],bounds[2]);
  var mx=H3DU.Math.mat4transformVec3(matrix,bounds[3],bounds[4],bounds[5]);
  return [
   Math.min(mn[0],mx[0]),
   Math.min(mn[1],mx[1]),
   Math.min(mn[2],mx[2]),
   Math.max(mn[0],mx[0]),
   Math.max(mn[1],mx[1]),
   Math.max(mn[2],mx[2])
  ];
 } else {
  return bounds.slice(0,6);
 }
}
/** @private */
H3DU.Shape.prototype.isCulled=function(frustum){
 if(!this.bufferedMesh||!this.visible)return true;
 return !H3DU.Math.frustumHasBox(frustum,this.getBounds());
};
/**
 * Not documented yet.
 * @param {*} transform
 */
H3DU.Shape.prototype.setTransform=function(transform){
 this.transform=transform.copy();
 return this;
};
/**
 * Sets the scale of this shape relative to its original
 * size. See {@link H3DU.Transform#setScale}
 * @param {number|Array<Number>} x Scaling factor for this object's width,
 * or a 3-element scaling array, as specified in {@link H3DU.Transform#setScale}.
 * @param {Number} y Scaling factor for this object's height.
 * @param {Number} z Scaling factor for this object's depth.
* @returns {H3DU.Scene3D} This object.
 */
H3DU.Shape.prototype.setScale=function(x,y,z){
  this.getTransform().setScale(x,y,z);
  return this;
};
/**
 * Sets the relative position of this shape from its original
 * position.  See {@link H3DU.Transform#setPosition}
 * @param {number|Array<Number>} x X coordinate
 * or a 3-element position array, as specified in {@link H3DU.Transform#setScale}.
 * @param {Number} y Y-coordinate.
 * @param {Number} z Z-coordinate.
* @returns {H3DU.Scene3D} This object.
 */
H3DU.Shape.prototype.setPosition=function(x,y,z){
  this.getTransform().setPosition(x,y,z);
  return this;
};
/**
 * Sets this object's orientation in the form of a [quaternion]{@tutorial glmath}.
 * See {@link H3DU.Transform#setQuaternion}.
 * @param {Array<Number>} quat A four-element array describing the rotation.
 * @returns {H3DU.Shape} This object.
 */
H3DU.Shape.prototype.setQuaternion=function(quat){
  this.getTransform().setQuaternion(quat);
  return this;
};
/**
 * Gets the transformation matrix used by this shape.
   * See {@link H3DU.Transform#getMatrix}.
 * @returns {Array<Number>} The current transformation matrix.
 */
H3DU.Shape.prototype.getMatrix=function(){
  var xform=this.getTransform();
  var thisIdentity=xform.isIdentity();
  var mat;
  if(this.parent!==null){
   var pmat=this.parent.getMatrix();
   if(thisIdentity){
    mat=pmat;
   } else if(H3DU.Math.mat4isIdentity(pmat)){
    mat=xform.getMatrix();
   } else {
    mat=H3DU.Math.mat4multiply(pmat,xform.getMatrix());
   }
  } else {
   mat=xform.getMatrix();
  }
  return mat;
};
