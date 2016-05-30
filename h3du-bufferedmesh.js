/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/* global H3DU */

/** @private */
H3DU.BufferedSubMesh=function(mesh, context){
 "use strict";
 var smb=(mesh instanceof H3DU.SubMeshBuffer) ? mesh :
   new H3DU.SubMeshBuffer(mesh);
 this.smb=smb;
 this.vertBuffers=[];

 this.indices=context.createBuffer();
 if(!this.indices)throw new Error("can't create face buffer")
 this.arrayObjectExt=context.getExtension("OES_vertex_array_object")
 this.arrayObjectExtContext=context;
 this.vao=null;
 if(this.arrayObjectExt){
   this.vao=this.arrayObjectExt.createVertexArrayOES();
 }
 context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
 context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    smb.indices, context.STATIC_DRAW);
 for(var i=0;i<this.smb._accessors.length;i++){
  if(!this.smb._accessors[i])continue;
  this.vertBuffers.push(context.createBuffer());
  if(!this.vertBuffers[i])throw new Error("can't create buffer for vertices")
  context.bindBuffer(context.ARRAY_BUFFER, this.vertBuffers[i]);
  context.bufferData(context.ARRAY_BUFFER,
    this.smb._accessors[i][0], context.STATIC_DRAW);
 }
 var type=context.UNSIGNED_SHORT;
 if(smb.indexBufferSize === 4){
  type=context.UNSIGNED_INT;
 } else if(smb.indexBufferSize === 1){
  type=context.UNSIGNED_BYTE;
 }
  this.type=type;
  this.context=context;
  this._lastKnownProgram=null;
  this._attribLocations=[];
};
/** @private */
H3DU.BufferedSubMesh.prototype._getVaoExtension=function(context){
 if(this.arrayObjectExtContext==context){
  return this.arrayObjectExt;
 } else {
  return context.getExtension("OES_vertex_array_object")
 }
}
/**
* A geometric mesh in the form of buffer objects.
* @deprecated This class is likely
* to become a private class. Use the MeshBuffer class instead, which
* is not coupled to WebGL contexts.
* @class
* @alias H3DU.BufferedMesh
* @param {H3DU.Mesh} mesh A geometric mesh object.
* @param {WebGLRenderingContext|object} context A WebGL context to
*  create a buffer from, or an object, such as H3DU.Scene3D, that
* implements a no-argument <code>getContext</code> method
* that returns a WebGL context. (Note that this constructor uses
*  a WebGL context rather than a shader program because
*  buffer objects are not specific to shader programs.)
*/
H3DU.BufferedMesh = function(mesh, context){
 "use strict";
 this.subMeshes=[];
 this.context=H3DU._toContext(context);
 if(mesh instanceof H3DU.MeshBuffer){
  this._bounds=mesh._bounds;
  for(var i=0;i<mesh.subMeshes.length;i++){
   this.subMeshes.push(new H3DU.BufferedSubMesh(
    mesh.subMeshes[i],this.context));
  }
 } else {
  this._bounds=mesh.getBoundingBox();
  for(var i=0;i<mesh.subMeshes.length;i++){
   var sm=mesh.subMeshes[i];
   // skip empty submeshes
   if(sm.indices.length===0)continue;
   this.subMeshes.push(new H3DU.BufferedSubMesh(
    sm,this.context));
  }
 }
}
/** @private */
H3DU.BufferedMesh.prototype._getBounds=function(){
 "use strict";
return this._bounds;
};
/**
 * Returns the WebGL context associated with this object.
 * @deprecated
 * @returns {WebGLRenderingContext} Return value. */
H3DU.BufferedMesh.prototype.getContext=function(){
 "use strict";
return this.context;
};

/**
* Binds the buffers in this object to attributes according
* to their data format, and draws the elements in this mesh
* according to the data in its buffers.
* @param {H3DU.ShaderProgram} program A shader program object to get
* the IDs from for attributes named "position", "normal",
* "colorAttr", and "uv", and the "useColorAttr" uniform.
*/
H3DU.BufferedMesh.prototype.draw=function(program){
 "use strict";
for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].draw(program);
 }
};
/**
* Deletes the vertex and index buffers associated with this object.
*/
H3DU.BufferedMesh.prototype.dispose=function(){
 "use strict";
for(var i=0;i<this.subMeshes.length;i++){
  this.subMeshes[i].dispose();
 }
 this.subMeshes=[];
};
/**
 * @private */
H3DU.BufferedSubMesh.prototype.dispose=function(){
 "use strict";
if(this.verts!==null)
  this.context.deleteBuffer(this.verts);
 if(this.indices!==null)
  this.context.deleteBuffer(this.indices);
 if(this.vao!==null){
  this.arrayObjectExt.deleteVertexArrayOES(this.vao);
 }
 this.verts=null;
 this.indices=null;
 this.smb=null;
 this.vao=null;
 this._lastKnownProgram=null;
 this._attribLocations=[];
};



/** @private */
H3DU.BufferedSubMesh.prototype._getAttribLocations=function(program,context){
 if(this._lastKnownProgram!=program){
  this._lastKnownProgram=program;
  for(var i=0;i<this.smb._accessors.length;i++){
   if(!this.smb._accessors[i]){
    this._attribLocations[i]=-1;
   } else {
    this._attribLocations[i]=program.get(this.smb._accessors[i][6]);
   }
  }
  return true;
 }
 return false;
}

/**
 * @private */
H3DU.BufferedSubMesh.prototype._prepareDraw=function(program, context){
  var rebind=this._getAttribLocations(program,context);
  var vaoExt=this._getVaoExtension(context);
  if(this.vao) {
   vaoExt.bindVertexArrayOES(this.vao);
  } else {
   rebind=true;
  }
  if(rebind) {
   context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
   for(var i=0;i<this._attribLocations.length;i++){
    var attrib=this._attribLocations[i];
    if(attrib>=0){
     if(this.smb._accessors[i]){
      context.enableVertexAttribArray(attrib);
      context.bindBuffer(context.ARRAY_BUFFER, this.vertBuffers[i]);
      context.vertexAttribPointer(attrib,
        this.smb._accessors[i][5],
        this.smb._accessors[i][3], false,
        this.smb._accessors[i][2],
        this.smb._accessors[i][1]);
     } else {
      context.disableVertexAttribArray(attrib);
     }
    }
   }
  }
  var useColorAttr=(this.smb._accessors[2]) ? 1.0 : 0.0;
  program.setUniforms({"useColorAttr":useColorAttr});
}
/**
 * @private */
H3DU.BufferedSubMesh.prototype.draw=function(program){
  // Binding phase
  "use strict";
  var context=program.getContext();
  if(this.verts===null || this.face===null){
   throw new Error("mesh buffer disposed");
  }
  if(context!==this.context){
   throw new Error("can't bind mesh: context mismatch");
  }
  this._prepareDraw(program,context);
  // Drawing phase
  var primitive=context.TRIANGLES;
  if((this.smb.format&H3DU.Mesh.LINES_BIT)!==0)primitive=context.LINES;
  if((this.smb.format&H3DU.Mesh.POINTS_BIT)!==0)primitive=context.POINTS;
  context.drawElements(primitive,
    this.smb.facesLength,
    this.type, 0);
  var vaoExt=this._getVaoExtension(context);
  if(this.vao) {
   vaoExt.bindVertexArrayOES(null);
  }
};
/**
 * Gets the number of vertices composed by all shapes in this mesh.
* @returns {Number} Return value.*/
H3DU.BufferedMesh.prototype.vertexCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].smb.vertexCount();
 }
 return ret;
};
/**
 * Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this mesh.
* @returns {Number} Return value.*/
H3DU.BufferedMesh.prototype.primitiveCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].smb.primitiveCount();
 }
 return ret;
};

/** @private */
H3DU.BufferedMesh._MeshLoader=function(){
 this.meshes=[]
}
/** @private */
H3DU.BufferedMesh._MeshLoader.prototype.draw=function(meshBuffer,prog){
 if(meshBuffer instanceof H3DU.BufferedMesh){
  // NOTE: Using H3DU.BufferedMesh objects directly in Shapes is deprecated
  meshBuffer.draw(prog);
 } else {
  var context=prog.getContext();
  for(var i=0;i<this.meshes.length;i++){
   var m=this.meshes[i];
   if(m[0]==meshBuffer && m[1]==context){
    m[2].draw(prog);
    return;
   }
  }
  var bm=new H3DU.BufferedMesh(meshBuffer,prog);
  this.meshes.push([meshBuffer,context,bm]);
  bm.draw(prog);
 }
}
/** @private */
H3DU.BufferedMesh._MeshLoader.prototype.dispose=function(){
  for(var i=0;i<this.meshes.length;i++){
   this.meshes[i][2].dispose();
  }
  this.meshes=[];
}
