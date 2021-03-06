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
 * Specifies parameters for light sources.
 * @class
 * @alias H3DU.LightSource
 * @param {Array<Number>} [position] See "position" property.
 * @param {Array<Number>} [ambient] See "ambient" property.
 * @param {Array<Number>} [diffuse] See "diffuse" property.
 * @param {Array<Number>} [specular] See "specular" property.
 */
H3DU.LightSource = function(position, ambient, diffuse, specular) {
  "use strict";
 /**
  * A 4-element vector giving an additional color to multiply with the ambient
  * color of each object, in the red, green,
  * and blue components respectively.
  * The default is (0,0,0,1), or black. Not used in the default shader program.
  */
  this.ambient = ambient || [0, 0, 0, 1.0];
 /**
  * Light position. An array of four numbers, where the first three numbers are the X, Y, and Z components and the fourth number is the W component.<ul>
  * <li> If W is 0, then X, Y, and Z specify a vector in world space; the light will shine the brightest on surfaces that face the light in
  * this vector's direction from the origin (0, 0, 0).
  * <li> If W is 1, then X, Y, and Z specify the position of the light in world space; the light will shine brightest, and in every direction, at the given position.</ul>
  */
  this.position = position ? [position[0], position[1], position[2], 1.0] :
   [0, 0, 1, 0];
 /**
  * A 4-element vector giving an additional color to multiply with the diffusion
  * color of each object (which is also called "albedo"), in the red, green,
  * and blue components respectively. Diffuse color is the color
  * seen when light passes through a material and bounces back (diffusion).
  * Each component ranges from 0 to 1.
  * The simulated diffusion scatters evenly, in every direction.
  * The default is (1,1,1,1), or white.
  */
  this.diffuse = diffuse || [1, 1, 1, 1];
 /**
  * A 3-element vector giving the color of the light when it causes a specular
  * reflection, in the red, green,
  * and blue components respectively. Each component ranges from 0 to 1.
  * A specular reflection is a reflection in the opposite direction from the direction
  * the light reaches the object in, like a mirror. Specular reflections can cause shiny
  * highlights depending on the viewing angle.
  * The default is (1,1,1), or white.<p>
  * NOTE: <i>The default shader uses this only for {@link H3DU.Material}, not
  * for {@link H3DU.PbrMaterial}.</i>
  */
  this.specular = specular || [1, 1, 1];
 /**
  * Radius of the light source. If 0, the light's intensity doesn't change
  * with distance.
  * @default */
  this.radius = 0.0;
};
/**
 * Sets parameters for this material object.
 * @param {Object} params An object whose keys have
 * the possibilities given below, and whose values are those
 * allowed for each key.<ul>
 * <li><code>position</code> - Light position. (See {@link H3DU.LightSource#position}.)
 * <li><code>ambient</code> - Not used in the default shader program.
 * <li><code>diffuse</code> - A [color vector or string]{@link H3DU.toGLColor} giving an additional color to multiply with the diffusion
 * color of each object (which is also called "albedo").
 * The default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise.
 * <li><code>specular</code> - A [color vector or string]{@link H3DU.toGLColor} giving the color of specular highlights caused by the light.
 * The default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise.
 * <li><code>radius</code> - Radius of the light source. If 0, the light's intensity doesn't change
 * with distance.
 * </ul>
 * If a value is null or undefined, it is ignored.
 * @returns {H3DU.Material} This object.
 * @memberof! H3DU.LightSource#
 */
H3DU.LightSource.prototype.setParams = function(params) {
  "use strict";
  if(typeof params.ambient !== "undefined" && params.ambient !== null) {
    this.ambient = H3DU.toGLColor(params.ambient);
    this.ambient = this.ambient.slice(0, 4);
  }
  if(typeof params.position !== "undefined" && params.position !== null) {
    var position = params.position;
    this.position = [position[0], position[1], position[2],
      position[3] === null ? 0.0 : position[3]];
  }
  if(typeof params.specular !== "undefined" && params.specular !== null) {
    this.specular = H3DU.toGLColor(params.specular);
  }
  if(typeof params.diffuse !== "undefined" && params.diffuse !== null) {
    this.diffuse = H3DU.toGLColor(params.diffuse);
  }
  if(typeof params.radius !== "undefined" && params.radius !== null) {
    this.radius = params.radius;
  }
  return this;
};
