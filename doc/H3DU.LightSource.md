# H3DU.LightSource

[Back to documentation index.](index.md)

### H3DU.LightSource([position], [ambient], [diffuse], [specular]) <a id='H3DU.LightSource'></a>

Specifies parameters for light sources.

#### Parameters

* `position` (Type: Array.&lt;Number>) (optional)<br>
    See "position" property.
* `ambient` (Type: Array.&lt;Number>) (optional)<br>
    See "ambient" property.
* `diffuse` (Type: Array.&lt;Number>) (optional)<br>
    See "diffuse" property.
* `specular` (Type: Array.&lt;Number>) (optional)<br>
    See "specular" property.

### Members

* [ambient](#H3DU.LightSource_ambient)<br>A 4-element vector giving an additional color to multiply with the ambient
color of each object, in the red, green,
and blue components respectively.
* [diffuse](#H3DU.LightSource_diffuse)<br>A 4-element vector giving an additional color to multiply with the diffusion
color of each object (which is also called "albedo"), in the red, green,
and blue components respectively.
* [position](#H3DU.LightSource_position)<br>Light position.
* [radius](#H3DU.LightSource_radius)<br>Radius of the light source.
* [specular](#H3DU.LightSource_specular)<br>A 3-element vector giving the color of the light when it causes a specular
reflection, in the red, green,
and blue components respectively.

### Methods

* [setParams](#H3DU.LightSource_H3DU.LightSource_setParams)<br>Sets parameters for this material object.

### H3DU.LightSource#ambient <a id='H3DU.LightSource_ambient'></a>

A 4-element vector giving an additional color to multiply with the ambient
color of each object, in the red, green,
and blue components respectively.
The default is (0,0,0,1), or black. Not used in the default shader program.

### H3DU.LightSource#diffuse <a id='H3DU.LightSource_diffuse'></a>

A 4-element vector giving an additional color to multiply with the diffusion
color of each object (which is also called "albedo"), in the red, green,
and blue components respectively. Diffuse color is the color
seen when light passes through a material and bounces back (diffusion).
Each component ranges from 0 to 1.
The simulated diffusion scatters evenly, in every direction.
The default is (1,1,1,1), or white.

### H3DU.LightSource#position <a id='H3DU.LightSource_position'></a>

Light position. An array of four numbers, where the first three numbers are the X, Y, and Z components and the fourth number is the W component.<ul>
<li> If W is 0, then X, Y, and Z specify a vector in world space; the light will shine the brightest on surfaces that face the light in
this vector's direction from the origin (0, 0, 0).
<li> If W is 1, then X, Y, and Z specify the position of the light in world space; the light will shine brightest, and in every direction, at the given position.</ul>

### H3DU.LightSource#radius <a id='H3DU.LightSource_radius'></a>

Radius of the light source. If 0, the light's intensity doesn't change
with distance.

Default Value: `0`

### H3DU.LightSource#specular <a id='H3DU.LightSource_specular'></a>

A 3-element vector giving the color of the light when it causes a specular
reflection, in the red, green,
and blue components respectively. Each component ranges from 0 to 1.
A specular reflection is a reflection in the opposite direction from the direction
the light reaches the object in, like a mirror. Specular reflections can cause shiny
highlights depending on the viewing angle.
The default is (1,1,1), or white.

NOTE: <i>The default shader uses this only for <a href="H3DU.Material.md">H3DU.Material</a>, not
for <a href="H3DU.md#H3DU.PbrMaterial">H3DU.PbrMaterial</a>.</i>

### H3DU.LightSource#setParams(params) <a id='H3DU.LightSource_H3DU.LightSource_setParams'></a>

Sets parameters for this material object.

#### Parameters

* `params` (Type: Object)<br>
    An object whose keys have the possibilities given below, and whose values are those allowed for each key.<ul> <li><code>position</code> - Light position. (See <a href="H3DU.LightSource.md#H3DU.LightSource_position">H3DU.LightSource#position</a>.) <li><code>ambient</code> - Not used in the default shader program. <li><code>diffuse</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving an additional color to multiply with the diffusion color of each object (which is also called "albedo"). The default is (1, 1, 1, 1) for light index 0 and (0, 0, 0, 0) otherwise. <li><code>specular</code> - A <a href="H3DU.md#H3DU.toGLColor">color vector or string</a> giving the color of specular highlights caused by the light. The default is (1, 1, 1) for light index 0 and (0, 0, 0) otherwise. <li><code>radius</code> - Radius of the light source. If 0, the light's intensity doesn't change with distance. </ul> If a value is null or undefined, it is ignored.

#### Return Value

This object. (Type: <a href="H3DU.Material.md">H3DU.Material</a>)
