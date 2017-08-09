/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU, Uint32Array, Uint8Array, WebGL2RenderingContext */

/**
 * A geometric mesh in the form of buffer objects.
 * @deprecated This class is likely to become a private class.
 * Use the {@link H3DU.MeshBuffer} class instead, which is not coupled to WebGL
 * contexts.
 * @constructor
 * @suppress {deprecated}
 * @memberof H3DU
 * @alias H3DU.BufferedMesh
 * @param {H3DU.Mesh|H3DU.MeshBuffer} mesh
 * A geometric mesh object. Cannot be null.
 * @param {WebGLRenderingContext|WebGL2RenderingContext|Object} context A WebGL context to
 * create a buffer from, or an object, such as H3DU.Scene3D, that
 * implements a no-argument <code>getContext</code> method
 * that returns a WebGL context. (Note that this constructor uses
 * a WebGL context rather than a shader program because
 * buffer objects are not specific to shader programs.)
 */
var BufferedMesh = function(mesh, context) {
  context = context.getContext ? context.getContext() : context;
  if(mesh instanceof H3DU.MeshBuffer) {
    this._bounds = mesh._bounds;
  } else {
    this._bounds = mesh.getBoundingBox();
  }
  this._initialize(mesh, context);
};
/** @ignore */
BufferedMesh.prototype._getArrayObjectExt = function(context) {
  if(typeof this.arrayObjectExt === "undefined" || this.arrayObjectExt === null) {
    this.arrayObjectExt = context.getExtension("OES_vertex_array_object");
    this.arrayObjectExtContext = context;
    return this.arrayObjectExt;
  } else if(this.arrayObjectExtContext === context) {
    return this.arrayObjectExt;
  } else {
    return context.getExtension("OES_vertex_array_object");
  }
};
/**
 * NOTE: Warning suppressed for now because
 * Closure compiler doesn't yet include a definition for WebGL2RenderingContext
 * @ignore
 * @suppress {missingProperties}
 */
BufferedMesh.prototype._createVertexArray = function(context) {
  if(typeof WebGL2RenderingContext !== "undefined" && WebGL2RenderingContext !== null &&
  context instanceof WebGL2RenderingContext) {
    context.createVertexArray();
  } else if(context instanceof WebGLRenderingContext) {
    var ao = this._getArrayObjectExt(context);
    return typeof ao === "undefined" || ao === null ? null : ao.createVertexArrayOES();
  }
  return null;
};
/** @ignore
 * @suppress {missingProperties}
 */
BufferedMesh.prototype._deleteVertexArray = function(context, va) {
  if(typeof WebGL2RenderingContext !== "undefined" && WebGL2RenderingContext !== null &&
  context instanceof WebGL2RenderingContext) {
    context.deleteVertexArray(va);
  } else if(context instanceof WebGLRenderingContext) {
    var ao = this._getArrayObjectExt(context);
    if(typeof ao !== "undefined" && ao !== null) {
      ao.deleteVertexArrayOES(va);
    }
  }
};
/**
 * @ignore
 * @suppress {missingProperties}
 */
BufferedMesh.prototype._bindVertexArray = function(context, va) {
  if(typeof WebGL2RenderingContext !== "undefined" && WebGL2RenderingContext !== null &&
  context instanceof WebGL2RenderingContext) {
    context.bindVertexArray(va);
  } else if(context instanceof WebGLRenderingContext) {
    var ao = this._getArrayObjectExt(context);
    if(typeof ao !== "undefined" && ao !== null) {
      ao.bindVertexArrayOES(va);
    }
  }
};
/**
 * @ignore
 * @suppress {missingProperties}
 */
BufferedMesh.prototype._initialize = function(mesh, context) {
  if(typeof mesh === "undefined" || mesh === null)throw new Error("mesh is null");
  var smb = mesh instanceof H3DU.MeshBuffer ? mesh :
    mesh.toMeshBuffer();
  this.smb = smb;
  this.vertsMap = new H3DU.BufferedMesh._Map();
  this.indices = context.createBuffer();
  if(typeof this.indices === "undefined" || this.indices === null)throw new Error("can't create face buffer");
  this.vao = this._createVertexArray(this.context);
  var attribs = smb._getAttributes();
  for(var i = 0; i < attribs.length; i++) {
    var vb = attribs[i][2].buffer;
    if(vb) {
      if(!this.vertsMap.get(vb)) {
        // Vertex array not seen yet, create a buffer object
        // and copy the array's data to that object
        var vbuffer = context.createBuffer();
        if(typeof vbuffer === "undefined" || vbuffer === null) {
          throw new Error("can't create buffer");
        }
        context.bindBuffer(context.ARRAY_BUFFER, vbuffer);
        context.bufferData(context.ARRAY_BUFFER,
          vb, context.STATIC_DRAW);
        this.vertsMap.put(vb, vbuffer);
      }
    }
  }
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
  context.bufferData(context.ELEMENT_ARRAY_BUFFER,
    smb.indices, context.STATIC_DRAW);
  var type = context.UNSIGNED_SHORT;
  if(smb.indices instanceof Uint32Array) {
    type = context.UNSIGNED_INT;
  } else if(smb.indices instanceof Uint8Array) {
    type = context.UNSIGNED_BYTE;
  }
  this.type = type;
  this.context = context;
  this._lastKnownProgram = null;
  this._attribLocations = [];
  this._attribNames = [];
};
/** @ignore */
BufferedMesh.prototype._toMeshBuffer = function() {
  return this.smb;
};
/** @ignore */
BufferedMesh.prototype._getBounds = function() {
  return this._bounds;
};
/**
 * Returns the WebGL context associated with this object.
 * @deprecated
 * @returns {WebGLRenderingContext|WebGL2RenderingContext} Return value.
 */
BufferedMesh.prototype.getContext = function() {
  return this.context;
};

/**
 * Deletes the vertex and index buffers associated with this object.
 * @returns {void} This method doesn't return a value.
 */
BufferedMesh.prototype.dispose = function() {
  if(typeof this.vertsMap !== "undefined" && this.vertsMap !== null) {
    var verts = this.vertsMap.values();
    for(var i = 0; i < verts.length; i++) {
      verts[i].dispose();
    }
  }
  if(typeof this.indices !== "undefined" && this.indices !== null) {
    this.context.deleteBuffer(this.indices);
  }
  if(typeof this.vao !== "undefined" && this.vao !== null) {
    this._deleteVertexArray(this.context, this.vao);
  }
  this.vertsMap = null;
  this.indices = null;
  this.smb = null;
  this.vao = null;
  this._lastKnownProgram = null;
  this._attribLocations = [];
  this._attribNames = [];
};

/** @ignore */
BufferedMesh.prototype._getAttribLocations = function(program) {
  if(this._lastKnownProgram !== program) {
    this._lastKnownProgram = program;
    var attrs = this.smb._getAttributes();
    this._attribLocations = [];
    for(var i = 0; i < attrs.length; i++) {
      var arrLoc = [];
      var arrName = [];
      program._addNamesWithSemantic(arrName, attrs[i][0], attrs[i][1]);
      for(var j = 0; j < arrName.length; j++) {
        var loc = program.get(arrName[j]);
        if(typeof loc === "undefined" || loc === null) {
          loc = -1;
        }
        arrLoc.push(loc);
      }
      this._attribLocations[i] = arrLoc;
      this._attribNames[i] = arrName;
    }
    return true;
  }
  return false;
};

/** @ignore */
BufferedMesh.prototype._prepareDraw = function(program, context) {
  var rebind = this._getAttribLocations(program);
  if(this.vao) {
    this._bindVertexArray(context, this.vao);
  } else {
    rebind = true;
  }
  if(rebind) {
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices);
    var attrs = this.smb._getAttributes();
    var attrNamesEnabled = [];
    for(var i = 0; i < this._attribLocations.length; i++) {
      for(var j = 0; j < this._attribLocations[i].length; j++) {
        var attrib = this._attribLocations[i][j];
        if(attrib >= 0) {
          var vertBuffer = this.vertsMap.get(attrs[i][2].buffer);
          context.bindBuffer(context.ARRAY_BUFFER, vertBuffer);
          context.enableVertexAttribArray(attrib);
          context.vertexAttribPointer(attrib, attrs[i][2].countPerValue,
            context.FLOAT, false, attrs[i][2].stride * 4, attrs[i][2].offset * 4);
          attrNamesEnabled.push(this._attribNames[i][j]);
        }
      }
    }
    program._disableOthers(attrNamesEnabled);
  }
};
/**
 * Binds the buffers in this object to attributes according
 * to their data format, and draws the elements in this mesh
 * according to the data in its buffers.
 * @deprecated
 * @param {H3DU.ShaderProgram} program A shader program object to get
 * the IDs from for attributes named "position", "normal",
 * "colorAttr", and "uv", and the "useColorAttr" uniform.
 * @returns {void} This method doesn't return a value.
 */
BufferedMesh.prototype.draw = function(program) {
  // Binding phase
  var context = program.getContext();
  if(typeof this.vertsMap === "undefined" || this.vertsMap === null) {
    throw new Error("mesh buffer disposed");
  }
  if(context !== this.context) {
    throw new Error("can't bind mesh: context mismatch");
  }
  this._prepareDraw(program, context);
  // Drawing phase
  var primitive = context.TRIANGLES;
  if(this.smb.primitiveType() === H3DU.Mesh.LINES) {
    primitive = context.LINES;
  }
  if(this.smb.primitiveType() === H3DU.Mesh.POINTS) {
    primitive = context.POINTS;
  }
  context.drawElements(primitive,
    this.smb.indices.length,
    this.type, 0);
  this._bindVertexArray(context, null);
};
/**
 * Gets the number of vertices composed by all shapes in this mesh.
 * @returns {number} Return value.
 */
BufferedMesh.prototype.vertexCount = function() {
  return this.smb.indices.length;
};
/**
 * Gets the number of primitives (triangles, lines,
 * and points) composed by all shapes in this mesh.
 * @returns {number} Return value.
 */
BufferedMesh.prototype.primitiveCount = function() {
  return this.smb.primitiveCount();
};

/** @ignore
 * @constructor */
BufferedMesh._Map = function() {
  this.map = [];
};
/** @ignore */
BufferedMesh._Map.prototype.get = function(o) {
  for(var i = 0; i < this.map.length; i++) {
    if(this.map[i][0] === o)return this.map[i][1];
  }
  return null;
};
/** @ignore */
BufferedMesh._Map.prototype.put = function(k, v) {
  for(var i = 0; i < this.map.length; i++) {
    if(this.map[i][0] === k) {
      this.map[i][1] = v;
      return;
    }
  }
  this.map.push([k, v]);
};
/** @ignore */
BufferedMesh._Map.prototype.values = function() {
  var ret = [];
  for(var i = 0; i < this.map.length; i++) {
    ret.push(this.map[i][1]);
  }
  return ret;
};

/** @ignore
 * @constructor */
BufferedMesh._MeshLoader = function() {
  this.meshes = [];
};
/** @ignore */
BufferedMesh._MeshLoader.prototype.draw = function(meshBuffer, prog) {
  if(!(meshBuffer instanceof H3DU.MeshBuffer)) {
    throw new Error("Expected H3DU.MeshBuffer");
  }
  var context = prog.getContext();
  for(var i = 0; i < this.meshes.length; i++) {
    var m = this.meshes[i];
    if(m[0] === meshBuffer && m[1] === context) {
      m[2].draw(prog);
      return;
    }
  }
  var bm = new H3DU.BufferedMesh(meshBuffer, prog);
  this.meshes.push([meshBuffer, context, bm]);
  bm.draw(prog);
};
/** @ignore */
BufferedMesh._MeshLoader.prototype.dispose = function() {
  for(var i = 0; i < this.meshes.length; i++) {
    this.meshes[i][2].dispose();
  }
  this.meshes = [];
};

export {BufferedMesh};
