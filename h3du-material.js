/*
 Any copyright to this file is released to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/
 If you like this, you should donate
 to Peter O. (original author of
 the Public Domain HTML 3D Library) at:
 http://peteroupc.github.io/
*/
/* global H3DU */
/**
 * Specifies parameters for geometry materials, which describe the appearance of a
 * 3D object. This includes how an object scatters, reflects, or absorbs light,
 * as well as a texture image to apply on that object's surface.<p>
 * <i>For more information on this constructor's parameters,
 * see the {@link H3DU.Material#setParams} method. NOTE: It is preferred
 * to set a material's parameters with the {@link H3DU.Material#setParams} method, rather than this
 * constructor.</i>
 * @class
 * @alias H3DU.Material
 * @param {Array<Number>} [ambient] A [color vector or string]{@link H3DU.toGLColor} giving the ambient color.
 * @param {Array<Number>} [diffuse] A [color vector or string]{@link H3DU.toGLColor} giving the diffusion color (also called "albedo").
 * @param {Array<Number>} [specular] A [color vector or string]{@link H3DU.toGLColor} giving the specular highlight reflection.
 * @param {Array<Number>} [shininess] Specular highlight exponent of this material.
 * @param {Array<Number>} [emission] A [color vector or string]{@link H3DU.toGLColor} giving the additive color emitted by an object.
 */
H3DU.Material = function(ambient, diffuse, specular, shininess, emission) {
  "use strict";
 /** Specular highlight exponent of this material.
  * The greater the number, the more concentrated the specular
  * highlights are (and the smoother the material behaves).
  * The lower the number, the more extended the highlights are (and the rougher the material behaves).
  * Ranges from 0 through 128.
  * @default
  */
  this.shininess = 32;
 /** Ambient color of this material.<p>
  * Ambient color indicates how much an object's color is affected by ambient
  * lights, those that color pixels the same way regardless
  * of direction or distance.
  * Because every part of an object will be shaded the same way by ambient
  * colors, an object with just ambient color will not look much like a 3D object.<p>
  * (Ambient color simulates the effect of light being scattered multiple times
  * from the same surface.)</p>
  * This value is a 3-element array giving the red, green, and blue
  * components of the ambient color; the final ambient color depends
  * on the ambient color of the scene.
  * (0,0,0) means no ambient color,
  * and (1,1,1) means total ambient color.<p>
  * Setting ambient color and diffusion color to the same value usually defines an object's
  * color.<p>
  * @default
  */
  this.ambient = [0.2, 0.2, 0.2];
 /**
  * Diffusion color of this material (also called "albedo").
  * See {@link H3DU.PbrMaterial#diffuse}, except the information relating
  * to the specular and metalness workflows.
  * @type {Array<Number>}
  * @default
  */
  this.diffuse = [0.8, 0.8, 0.8, 1.0];
 /**
  * Specular highlight reflection of this material.
  * See {@link H3DU.PbrMaterial#specular}, except the information relating
  * to the specular workflow.
  * NOTE: Before version 2.0, this value's default was (0,0,0).
  * @type {Array<Number>}
  * @default
  */
  this.specular = [0.2, 0.2, 0.2];
 /**
  * Additive color emitted by objects with this material.
  * See {@link H3DU.PbrMaterial#emission}.
  * @type {Array<Number>}
  * @default
  */
  this.emission = [0, 0, 0];
/**
 * Texture for this material. Each color in the texture
 * sets the diffusion (also called "albedo")
 * of each part of the material.
 * @default
 * @type {H3DU.Texture}
 */
  this.texture = null;
/**
 * Specular map texture.
 * See {@link H3DU.PbrMaterial#specularMap}.
 * @default
 */
  this.specularMap = null;
 /**
  * Normal map (bump map) texture. See {@link H3DU.PbrMaterial#normalMap}.
  * @default
  */
  this.normalMap = null;
 /**
  * If true, only the "diffuse" and "texture" properties of this object are used
  * when processing objects that use this material.
  * @default
  */
  this.basic = false;
 /**
  * Shader program to use when rendering objects with this material.
  * @default
  */
  this.shader = null;
  this.setParams({
    "ambient":ambient,
    "diffuse":diffuse,
    "specular":specular,
    "shininess":shininess,
    "emission":emission
  });
};
/**
 * Clones this object's parameters to a new H3DU.Material
 * object and returns that object. The material's texture
 * maps and shader info, if any, won't be cloned, but rather, a reference
 * to the same object will be used.
 * @returns {H3DU.Material} A copy of this object.
 * @memberof! H3DU.Material#
 */
H3DU.Material.prototype.copy = function() {
  "use strict";
  return new H3DU.Material().setParams({
    "ambient":this.ambient,
    "diffuse":this.diffuse,
    "specular":this.specular,
    "shininess":this.shininess,
    "emission":this.emission,
    "texture":this.texture,
    "specularMap":this.specularMap,
    "normalMap":this.normalMap,
    "basic":this.basic,
    "shader":this.shader
  });
};
/**
 * Sets parameters for this material object.
 * @param {Object} params An object whose keys have
 * the possibilities given below, and whose values are those
 * allowed for each key.<ul>
 * <li><code>basic</code> - If set to true, only the "diffuse" and "texture" properties
 * of this material are used, and the object with this material will be drawn without
 * regard to lighting.
 * <li><code>ambient</code> - A [color vector or string]{@link H3DU.toGLColor} giving the ambient color. (See {@link H3DU.Material#ambient}.)
 * The default is (0.2, 0.2, 0.2).
 * <li><code>diffuse</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the diffusion color (also called "albedo"). (See {@link H3DU.Material#diffuse}.) The default is (0.8, 0.8, 0.8).
 * <li><code>specular</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the specular reflection. (See {@link H3DU.Material#specular}.) The default is (0,0,0), meaning no specular highlights.
 * <li><code>shininess</code> - Specular reflection exponent. (See {@link H3DU.Material#shininess}).
 * Ranges from 0 through 128. The default is 0.
 * <li><code>emission</code> - A [color vector or string]{@link H3DU.toGLColor} giving
 * the additive color. (See {@link H3DU.Material#emission}.) If this is an array, its numbers can
 * range from -1 to 1. The default is (0,0,0).
 * <li><code>texture</code> - {@link H3DU.Texture} object, or a string with the URL of the texture
 * to use.
 * <li><code>specularMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a specular
 * map texture (see {@link H3DU.Material#specularMap}).
 * <li><code>normalMap</code> - {@link H3DU.Texture} object, or a string with the URL, of a normal
 * map (bump map) texture (see {@link H3DU.Material#normalMap}).
 * <li><code>shader</code> - {@link H3DU.ShaderInfo} object for a WebGL shader program
 * to use when rendering objects with this material. <i>Using {@link H3DU.ShaderProgram} objects in
 * this parameter is deprecated.</i>
 * </ul>
 * Any or all of these keys can exist in the parameters object. If a value is null or undefined, it is ignored.
 * @returns {H3DU.Material} This object.
 * @memberof! H3DU.Material#
 */
H3DU.Material.prototype.setParams = function(params) {
  "use strict";

  if(typeof params.ambient !== "undefined" && params.ambient !== null) {
    this.ambient = H3DU.toGLColor(params.ambient);
    if(this.ambient.length > 3)this.ambient = this.ambient.slice(0, 3);
  }
  if(typeof params.diffuse !== "undefined" && params.diffuse !== null) {
    this.diffuse = H3DU.toGLColor(params.diffuse);
    if(this.diffuse.length > 4)this.diffuse = this.diffuse.slice(0, 4);
  }
  if(typeof params.specular !== "undefined" && params.specular !== null) {
    this.specular = H3DU.toGLColor(params.specular);
    if(this.specular.length > 3)this.specular = this.specular.slice(0, 3);
  }
  if(typeof params.emission !== "undefined" && params.emission !== null) {
    this.emission = H3DU.toGLColor(params.emission);
    if(this.emission.length > 3)this.emission = this.emission.slice(0, 3);
  }
  if(typeof params.shininess !== "undefined" && params.shininess !== null) {
    this.shininess = Math.min(Math.max(0, params.shininess), 128);
  }
  if(typeof params.texture !== "undefined" && params.texture !== null) {
    this.texture = H3DU.Texture._texOrString(params.texture);
  }
  if(typeof params.specularMap !== "undefined" && params.specularMap !== null) {
    this.specularMap = H3DU.Texture._texOrString(params.specularMap);
  }
  if(typeof params.normalMap !== "undefined" && params.normalMap !== null) {
    this.normalMap = H3DU.Texture._texOrString(params.normalMap);
  }
  if(typeof params.basic !== "undefined" && params.basic !== null) {
    this.basic = params.basic;
  }
  if(typeof params.shader !== "undefined" && params.shader !== null) {
    this.shader = params.shader;
  }
  return this;
};
/** Convenience method that returns an {@link H3DU.Material}
 * object from an RGBA color.
 * @param {Array<Number>|number|string} r A [color vector or string]{@link H3DU.toGLColor},
 * or the red color component (0-1).
 * @param {Number} g Green color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} b Blue color component (0-1).
 * May be null or omitted if a string or array is given as the "r" parameter.
 * @param {Number} [a] Alpha color component (0-1).
 * If the "r" parameter is given and this parameter is null or omitted,
 * this value is treated as 1.0.
 * @returns {H3DU.Material} The resulting material object.
 * @memberof! H3DU.Material
 */
H3DU.Material.fromColor = function(r, g, b, a) {
  "use strict";
  var color = H3DU.toGLColor(r, g, b, a);
  return new H3DU.Material(color, color);
};

/** Convenience method that returns an {@link H3DU.Material}
 * object from a texture to apply to a 3D object's surface.
 * @param {H3DU.Texture|string} texture {@link H3DU.Texture} object, or a string with the
 * URL of the texture data. In the case of a string the texture will be loaded via
 * the JavaScript DOM's Image class. However, this method
 * will not load that image yet.
 * @returns {H3DU.Material} The resulting material object.
 * @memberof! H3DU.Material
 */
H3DU.Material.fromTexture = function(texture) {
  "use strict";
  return new H3DU.Material().setParams({"texture":texture});
};

/**
 * Convenience method that returns an {@link H3DU.Material}
 * object from a shader information object to use when drawing a 3D object.
 * @param {H3DU.ShaderInfo} shader Shader information object to use.
 * @returns {H3DU.Material} The resulting material object.
 * @memberof! H3DU.Material
 */
H3DU.Material.forShader = function(shader) {
  "use strict";
  return new H3DU.Material().setParams({"shader":shader});
};
