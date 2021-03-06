# H3DU.ShaderInfo

[Back to documentation index.](index.md)

### H3DU.ShaderInfo([vertexShader], [fragmentShader]) <a id='H3DU.ShaderInfo'></a>

Holds source code for a WebGL shader program. A shader program in
WebGL consists of a vertex shader (which processes vertices),
and a fragment shader (which processes pixels). Shader programs
are specially designed for running on a graphics processing unit,
or GPU.

This class also stores uniform values associated with the shader
source code.

Note that this class is not associated with any WebGL context, so the
uniform values this object stores is not set for any WebGL context.

#### Parameters

* `vertexShader` (Type: String) (optional)<br>
    Source text of a vertex shader, in OpenGL ES Shading Language (GLSL). If null, a default vertex shader is used instead.
* `fragmentShader` (Type: String) (optional)<br>
    Source text of a fragment shader in GLSL. If null, a default fragment shader is used instead.

### Methods

* [.getBasicVertex](#H3DU.ShaderInfo.getBasicVertex)<br>Gets the text of a basic vertex shader.
* [.getDefaultFragment](#H3DU.ShaderInfo.getDefaultFragment)<br>Gets the text of the default fragment shader.
* [.getDefaultVertex](#H3DU.ShaderInfo.getDefaultVertex)<br>Gets the text of the default vertex shader.
* [.makeCopyEffect](#H3DU.ShaderInfo.makeCopyEffect)<br>Generates source code for a shader program that copies the colors of a texture.
* [.makeEdgeDetectEffect](#H3DU.ShaderInfo.makeEdgeDetectEffect)<br>Generates source code for a shader program that generates a two-color texture showing
the source texture's edges.
* [.makeEffect](#H3DU.ShaderInfo.makeEffect)<br>Generates source code for a shader program for applying
a raster effect (postprocessing effect) to a texture.
* [.makeEffectFragment](#H3DU.ShaderInfo.makeEffectFragment)<br>Generates source code for a fragment shader for applying
a raster effect to a texture.
* [.makeInvertEffect](#H3DU.ShaderInfo.makeInvertEffect)<br>Generates source code for a shader program that inverts the colors of a texture.
* [copy](#H3DU.ShaderInfo_H3DU.ShaderInfo_copy)<br>Returns a new shader info object with the information in this object
copied to that object.
* [getFragmentShader](#H3DU.ShaderInfo_H3DU.ShaderInfo_getFragmentShader)<br>Gets the text of the fragment shader stored in this object.
* [getVertexShader](#H3DU.ShaderInfo_H3DU.ShaderInfo_getVertexShader)<br>Gets the text of the vertex shader stored in this object.
* [setUniforms](#H3DU.ShaderInfo_H3DU.ShaderInfo_setUniforms)<br>Sets the values of one or more uniforms used by this shader program.

### H3DU.ShaderInfo.getBasicVertex() <a id='H3DU.ShaderInfo.getBasicVertex'></a>

Gets the text of a basic vertex shader.

#### Return Value

The resulting shader text. (Type: String)

### H3DU.ShaderInfo.getDefaultFragment() <a id='H3DU.ShaderInfo.getDefaultFragment'></a>

Gets the text of the default fragment shader. Putting "#define SHADING\n"
at the start of the return value enables the lighting model.
Putting "#define SPECULAR\n"
at the start of the return value enables specular highlights (as long
as SHADING is also enabled).

#### Return Value

The resulting shader text. (Type: String)

### H3DU.ShaderInfo.getDefaultVertex() <a id='H3DU.ShaderInfo.getDefaultVertex'></a>

Gets the text of the default vertex shader. Putting "#define SHADING\n"
at the start of the return value enables the lighting model.

#### Return Value

The resulting shader text. (Type: String)

### H3DU.ShaderInfo.makeCopyEffect() <a id='H3DU.ShaderInfo.makeCopyEffect'></a>

Generates source code for a shader program that copies the colors of a texture.

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

### H3DU.ShaderInfo.makeEdgeDetectEffect() <a id='H3DU.ShaderInfo.makeEdgeDetectEffect'></a>

Generates source code for a shader program that generates a two-color texture showing
the source texture's edges.

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

### H3DU.ShaderInfo.makeEffect(functionCode) <a id='H3DU.ShaderInfo.makeEffect'></a>

Generates source code for a shader program for applying
a raster effect (postprocessing effect) to a texture.

#### Parameters

* `functionCode` (Type: String)<br>
    A string giving shader code in OpenGL ES Shading Language (GLSL) that must contain a function with the following signature:

    vec4 textureEffect(sampler2D sampler, vec2 uvCoord, vec2 textureSize)

 where <code>sampler</code> is the texture sampler, <code>uvCoord</code> is the texture coordinates ranging from 0 to 1 in each component, <code>textureSize</code> is the dimensions of the texture in pixels, and the return value is the new color at the given texture coordinates. Besides this requirement, the shader code is also free to define additional uniforms, constants, functions, and so on (but not another "main" function).

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

### H3DU.ShaderInfo.makeEffectFragment(functionCode) <a id='H3DU.ShaderInfo.makeEffectFragment'></a>

Generates source code for a fragment shader for applying
a raster effect to a texture.

#### Parameters

* `functionCode` (Type: String)<br>
    See <a href="H3DU.ShaderInfo.md#H3DU.ShaderInfo.makeEffect">H3DU.ShaderInfo.makeEffect</a>.

#### Return Value

The source text of the resulting fragment shader. (Type: String)

### H3DU.ShaderInfo.makeInvertEffect() <a id='H3DU.ShaderInfo.makeInvertEffect'></a>

Generates source code for a shader program that inverts the colors of a texture.

#### Return Value

The resulting shader program. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

### H3DU.ShaderInfo#copy() <a id='H3DU.ShaderInfo_H3DU.ShaderInfo_copy'></a>

Returns a new shader info object with the information in this object
copied to that object.

#### Return Value

Return value. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)

### H3DU.ShaderInfo#getFragmentShader() <a id='H3DU.ShaderInfo_H3DU.ShaderInfo_getFragmentShader'></a>

Gets the text of the fragment shader stored in this object.

#### Return Value

return value. (Type: String)

### H3DU.ShaderInfo#getVertexShader() <a id='H3DU.ShaderInfo_H3DU.ShaderInfo_getVertexShader'></a>

Gets the text of the vertex shader stored in this object.

#### Return Value

return value. (Type: String)

### H3DU.ShaderInfo#setUniforms(uniforms) <a id='H3DU.ShaderInfo_H3DU.ShaderInfo_setUniforms'></a>

Sets the values of one or more uniforms used by this shader program.
Since this object doesn't store a WebGL context, or receive one as input,
the uniforms won't be associated with a WebGL context.

#### Parameters

* `uniforms` (Type: Object)<br>
    An object whose keys are the names of uniforms defined in either the vertex or fragment shader of this shader program. If the uniform is an array, each element in the array is named as in these examples: "unif[0]", "unif[1]". If it's a struct, each member in the struct is named as in these examples: "unif.member1", "unif.member2". If it's an array of struct, each member is named as in these examples: "unif[0].member1", "unif[0].member2". The value of each key depends on the data type expected for the uniform named by that key. The value can be a 3-, 4-, 9-, or 16-element array if the uniform is a "vec3", "vec4", "mat3", or "mat4", respectively, or a Number if the uniform is a "float" or "int".

#### Return Value

This object. (Type: <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>)
