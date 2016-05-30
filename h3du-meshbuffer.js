/*
Written by Peter O. in 2015.

Any copyright is dedicated to the Public Domain.
http://creativecommons.org/publicdomain/zero/1.0/
If you like this, you should donate to Peter O.
at: http://upokecenter.dreamhosters.com/articles/donate-now-2/
*/
/* global H3DU */

/** @private */
H3DU.SubMeshBuffer=function(mesh){
 "use strict";
 var vertices=new Float32Array(mesh.vertices)
 if(mesh.vertices.length>=65536 || mesh.indices.length>=65536){
  this.indexBufferSize=4;
  this.indices=new Uint32Array(mesh.indices);
 } else if(mesh.vertices.length<=256 && mesh.indices.length<=256){
  this.indexBufferSize=1;
  this.indices=new Uint8Array(mesh.indices);
 } else {
  this.indexBufferSize=2;
  this.indices=new Uint16Array(mesh.indices);
 }
  this.stride=mesh.getStride();
  var numVertices=mesh.vertices.length/this.stride;
  this.facesLength=mesh.indices.length;
  this.format=mesh.attributeBits;
  this._stride=H3DU.Mesh._getStride(this.format);
  var attribsUsed=[
   0,
   H3DU.Mesh._normalOffset(this.format),
   H3DU.Mesh._colorOffset(this.format),
   H3DU.Mesh._texCoordOffset(this.format),
   H3DU.Mesh._tangentOffset(this.format),
   H3DU.Mesh._bitangentOffset(this.format)
  ];
  var sizes=[3,3,3,2,3,3];
  this._accessors=[]
  for(var i=0;i<attribsUsed.length;i++){
   if(attribsUsed[i]>=0){
    this._accessors[i]=[
     vertices, // buffer view
     this._attribsUsed[i], // byte offset
     this.stride*4, // byte stride
     5126, // component type (FLOAT)
     numVertices, // count
     this._sizes[i], // number of components
     H3DU.SubMeshBuffer._DefaultNames[i]
    ]
   } else {
    this._accessors[i]=null
   }
  }
};

/** @private
 @const */
H3DU.SubMeshBuffer._DefaultNames=[
   "position","normal","colorAttr","uv","tangent","bitangent"
];
/** @private */
H3DU.SubMeshBuffer._componentStride=function(accessor){
 var str=accessor[2]
 var type=accessor[3]
 if(type==5122 || type==5123)str/=2;
 if(type==5126)str/=4;
 return str
}
/** @private */
H3DU.SubMeshBuffer._typeToSize=function(type){
 if(type=="SCALAR")return 1
 if(type=="VEC2")return 2
 if(type=="VEC3")return 3
 if(type=="VEC4")return 4
 if(type=="MAT2")return 4
 if(type=="MAT3")return 9
 if(type=="MAT4")return 16
 return 0
}
/**
 * @private */
H3DU.SubMeshBuffer.prototype.primitiveCount=function(){
  "use strict";
if((this.format&H3DU.Mesh.LINES_BIT)!==0)
   return Math.floor(this.facesLength/2);
  if((this.format&H3DU.Mesh.POINTS_BIT)!==0)
   return this.facesLength;
  return Math.floor(this.facesLength/3);
};

H3DU.SubMeshBuffer.prototype.addAttribute=function(params){
 if(!isdef(params.name) || !isdef(params.bufferView) ||
  !isdef(params.componentType) ||
  !isdef(params.count) ||
  !isdef(params.type))throw new Error();
 var offset=(isdef(params.byteOffset)) ? params.byteOffset : 0
 var stride=(isdef(params.byteStride)) ? params.byteStride : 0
 var componentType=params.componentType
 var count=params.count
 var typeSize=H3DU.SubMeshBuffer._typeToSize(params.type)
}

/**
* A geometric mesh in the form of buffer objects.
* @class
* @alias H3DU.MeshBuffer
* @param {H3DU.Mesh} mesh A geometric mesh object.
*/
H3DU.MeshBuffer = function(){
"use strict";
 this.subMeshes=[];
 var inf=Number.POSITIVE_INFINITY;
 this._bounds=[inf,inf,inf,-inf,-inf,-inf];
}
/**
 * Not documented yet.
 * @param {*} mesh
 */
H3DU.MeshBuffer.fromMesh=function(mesh){
 "use strict";
 this.subMeshes=[];
 this._bounds=mesh.getBoundingBox();
 for(var i=0;i<mesh.subMeshes.length;i++){
  var sm=mesh.subMeshes[i];
  // skip empty submeshes
  if(sm.indices.length===0)continue;
  this.subMeshes.push(new H3DU.SubMeshBuffer(
    sm));
 }
}
/**
 * Not documented yet.
 */
H3DU.MeshBuffer.prototype.getBounds=function(){
 "use strict";
 if(!this._bounds){
  var empty=true;
  var inf=Number.POSITIVE_INFINITY;
  var ret=[inf,inf,inf,-inf,-inf,-inf];
  for(var i=0;i<this.subMeshes.length;i++){
   var sm=this.subMeshes[i];
   var stride=H3DU.SubMeshBuffer._componentStride(sm._accessors[0]);
   var v=sm._accessors[0][0];
   for(var j=0;j<sm.indices.length;j++){
    var vi=sm.indices[j]*stride;
    if(empty){
     empty=false;
     ret[0]=ret[3]=v[vi];
     ret[1]=ret[4]=v[vi+1];
     ret[2]=ret[5]=v[vi+2];
    } else {
     ret[0]=Math.min(ret[0],v[vi]);
     ret[3]=Math.max(ret[3],v[vi]);
     ret[1]=Math.min(ret[1],v[vi+1]);
     ret[4]=Math.max(ret[4],v[vi+1]);
     ret[2]=Math.min(ret[2],v[vi+2]);
     ret[5]=Math.max(ret[5],v[vi+2]);
    }
   }
  }
  this._bounds=ret;
 }
 return this._bounds;
};
H3DU.SubMeshBuffer.prototype.vertexCount=function(){
 "use strict";
 return this._accessors[0][4];
};

/**
 * Not documented yet.
 */
H3DU.MeshBuffer.prototype.vertexCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].vertexCount();
 }
 return ret;
};
/**
 * Gets the number of primitives (triangles, lines,
* and points) composed by all shapes in this mesh.
* @param {*} Return value.*/
H3DU.MeshBuffer.prototype.primitiveCount=function(){
 "use strict";
var ret=0;
 for(var i=0;i<this.subMeshes.length;i++){
  ret+=this.subMeshes[i].primitiveCount();
 }
 return ret;
};
