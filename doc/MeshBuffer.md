# MeshBuffer

[Back to documentation index.](index.md)

<a name='MeshBuffer'></a>
### new MeshBuffer()

**Deprecated: It is planned to render this class obsolete and rely on three.js's BufferGeometry.**

A geometric mesh in the form of buffer objects.
A mesh buffer is made up of one or more <a href="BufferAccessor.md">vertex attribute objects</a>,
and an optional array of vertex indices. Each vertex attribute object contains
the values of one attribute of the mesh, such as positions,
vertex normals, and texture coordinates. A mesh buffer
can store vertices that make up triangles, line segments, or points.

This constructor creates an empty mesh buffer and sets the array
of vertex indices to null and the primitive type to <a href="MeshBuffer.md#MeshBuffer.TRIANGLES">MeshBuffer.TRIANGLES</a>.

The `MeshBuffer` class contains four methods (`fromPositions`,
`fromPositionsNormals`, `fromPositionsUV`, and `fromPositionsNormalsUV`) that let you define a mesh buffer from a predefined array of vertex data. See the documentation for those methods for more information.

The <a href="Meshes.md">`Meshes`</a> class includes several handy methods for creating built-in shapes; those methods return a `MeshBuffer` object that describes the triangles they
are composed of.

<b>Instancing</b>

Some 3D rendering pipelines support <i>instancing</i>, which is a technique for rendering multiple versions of a mesh buffer with a single draw call. Instancing involves the use of a second mesh buffer (an <i>instance buffer</i>); rather than holding vertex data, the instance buffer holds <i>instance data</i>, that is, data to be used when rendering each instance of the first mesh buffer. Besides this, however, instance buffers are largely similar to vertex buffers as far as the <code>MeshBuffer</code> class is concerned; any reference to vertices in the documentation applies analogously to instances in instance buffers. However, instance buffers should use the primitive type <code>MeshBuffer.POINTS</code>; it makes little sense to have instance buffers describe triangles or line segments.

#### Examples

The following example converts a MeshBuffer object to three.js buffer geometries (and thus serves as a bridge between this library and three.js). Pass the return value to the <code>THREE.Mesh</code>, <code>THREE.LineSegments</code>, or <code>THREE.Points</code> constructor to generate the appropriate kind of shape object depending on the MeshBuffer's primitive type. This example requires the three.js library.

    function toBufferGeometry(mesh) {
    var p=mesh.getAttribute("POSITION")
    var n=mesh.getAttribute("NORMAL")
    var t=mesh.getAttribute("TEXCOORD_0")
    var c=mesh.getAttribute("COLOR")
    var ind=mesh.getIndices()
    var geom=new THREE.BufferGeometry()
    var attributes=[p,n,t,c]
    var attributeNames=["position","normal","uv","color"]
    for(var i=0;i<attributes.length;i++) {
    if(attributes[i]) {
    var a=attributes[i]
    var attr=new THREE.InterleavedBufferAttribute(
    new THREE.InterleavedBuffer(a.buffer,a.stride),
    a.countPerValue,a.offset)
    geom.addAttribute(attributeNames[i],attr)
    }
    }
    if(ind)geom.index=new THREE.BufferAttribute(
    ind,1)
    return geom
    }

### Members

* [LINES](#MeshBuffer.LINES)<br>Indicates that a mesh buffer contains line segments; the mesh
buffer stores each line segment using two consecutive vertices.
* [POINTS](#MeshBuffer.POINTS)<br>Indicates that a mesh buffer contains points; the mesh
buffer stores each point using one vertex.
* [TRIANGLES](#MeshBuffer.TRIANGLES)<br>Indicates that a mesh buffer contains triangles; the mesh
buffer stores each triangle using three consecutive vertices.

### Methods

* [deindex](#MeshBuffer_deindex)<br>TODO: Not documented yet.
* [ensureIndices](#MeshBuffer_ensureIndices)<br>Gets the array of vertex indices used by this mesh buffer, or if
such an array doesn't exist, builds an array containing one index
for each vertex in this mesh buffer, in the order in which those
vertices appear.
* [fromPositions](#MeshBuffer.fromPositions)<br>Creates a new mesh buffer with the given array of vertex positions.
* [fromPositionsColors](#MeshBuffer.fromPositionsColors)<br>Creates a new mesh buffer with the given array of vertex positions
and vertex colors.
* [fromPositionsNormals](#MeshBuffer.fromPositionsNormals)<br>Creates a new mesh buffer with the given array of vertex positions
and vertex normals.
* [fromPositionsNormalsColors](#MeshBuffer.fromPositionsNormalsColors)<br>Creates a new mesh buffer with the given array of vertex positions,
vertex normals, and vertex colors.
* [fromPositionsNormalsUV](#MeshBuffer.fromPositionsNormalsUV)<br>Creates a new mesh buffer with the given array of vertex positions,
vertex normals, and texture coordinates.
* [fromPositionsUV](#MeshBuffer.fromPositionsUV)<br>Creates a new mesh buffer with the given array of vertex positions
and texture coordinates.
* [getAttribute](#MeshBuffer_getAttribute)<br>Gets a vertex attribute included in this mesh buffer.
* [getBounds](#MeshBuffer_getBounds)<br>Finds the tightest
bounding box that holds all vertices in the mesh buffer.
* [getIndex](#MeshBuffer_getIndex)<br>Gets the vertex data index for use in referencing
vertex data in buffer attributes.
* [getIndices](#MeshBuffer_getIndices)<br>Gets the array of vertex indices used by this mesh buffer.
* [getPositions](#MeshBuffer_getPositions)<br>Gets an array of vertex positions held by this mesh buffer,
arranged by primitive.
* [merge](#MeshBuffer_merge)<br>Merges the vertices from another mesh into this one.
* [normalizeNormals](#MeshBuffer_normalizeNormals)<br>Modifies this mesh buffer by converting the normals it defines to glmath
("normalized" vectors with a length of 1).
* [primitiveCount](#MeshBuffer_primitiveCount)<br>Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.
* [primitiveType](#MeshBuffer_primitiveType)<br>Gets the type of primitive stored in this mesh buffer.
* [recalcNormals](#MeshBuffer_recalcNormals)<br>Recalculates the normal vectors (directions that generally point up and away from the mesh buffer's surface) for triangles
in this mesh buffer, in order to give the shape described by this buffer a flat or smooth appearance or to shade the shape from the inside or the outside upon rendering.
* [reverseNormals](#MeshBuffer_reverseNormals)<br>Modifies this mesh buffer by reversing the sign of normals it defines.
* [reverseWinding](#MeshBuffer_reverseWinding)<br>Reverses the winding order of the triangles in this mesh buffer
by swapping the second and third vertex indices of each one.
* [setAttribute](#MeshBuffer_setAttribute)<br>Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information).
* [setAttributeEx](#MeshBuffer_setAttributeEx)<br>Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information), taking a semantic index as
an additional parameter.
* [setColor](#MeshBuffer_setColor)<br>Sets all the vertices in this mesh to the given color, by
assigning each value with the attribute semantic <code>COLOR</code>
to the given color.
* [setIndices](#MeshBuffer_setIndices)<br>Sets the vertex indices used by this mesh buffer.
* [setType](#MeshBuffer_setType)<br>Sets the type of graphics primitives stored in this mesh buffer.
* [transform](#MeshBuffer_transform)<br>Transforms the positions and normals of all the vertices currently
in this mesh, with the help of a glmath.
* [vertexCount](#MeshBuffer_vertexCount)<br>Gets the number of vertices in this mesh buffer, that
is, the number of vertex indices in its index buffer (some of which
may be duplicates), or if there is no index buffer, the lowest maximum
number of items that a buffer attribute can hold.
* [vertexIndices](#MeshBuffer_vertexIndices)<br>Gets the vertex indices of a given primitive (triangle, line,
or point) in this mesh buffer.
* [wireFrame](#MeshBuffer_wireFrame)<br>Converts the triangles in this mesh to line segments.

<a name='MeshBuffer.LINES'></a>
### MeshBuffer.LINES (constant)

Indicates that a mesh buffer contains line segments; the mesh
buffer stores each line segment using two consecutive vertices.

Default Value: `1`

<a name='MeshBuffer.POINTS'></a>
### MeshBuffer.POINTS (constant)

Indicates that a mesh buffer contains points; the mesh
buffer stores each point using one vertex.

Default Value: `0`

<a name='MeshBuffer.TRIANGLES'></a>
### MeshBuffer.TRIANGLES (constant)

Indicates that a mesh buffer contains triangles; the mesh
buffer stores each triangle using three consecutive vertices.

Default Value: `4`

<a name='MeshBuffer_deindex'></a>
### MeshBuffer#deindex()

TODO: Not documented yet.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='MeshBuffer_ensureIndices'></a>
### MeshBuffer#ensureIndices()

Gets the array of vertex indices used by this mesh buffer, or if
such an array doesn't exist, builds an array containing one index
for each vertex in this mesh buffer, in the order in which those
vertices appear.

#### Return Value

The vertex index array. (Type: Uint16Array | Uint32Array | Uint8Array)

<a name='MeshBuffer.fromPositions'></a>
### (static) MeshBuffer.fromPositions(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex positions. This array's length must be divisible by 3; every 3 elements are the X, Y, and Z coordinates, in that order, of one vertex.
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position. Here, three vertices
    // are defined.
    var vertices = [x1, y1, z1, x2, y2, z2, x3, y3, z3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositions(vertices, indices);

The following example generates a mesh buffer
consisting of a 10 &times; 10 &times; x grid of points. This mesh buffer can serve, for
example, as instance data to draw multiple instances
of a 3-D cube in different positions.

    var vertices=[]
    for(var x=0;x<10;x++)
    for(var y=0;y<10;y++)
    for(var z=0;z<10;z++)vertices.push(x,y,z);
    var meshBuffer=MeshBuffer.fromPositions(vertices)
    .setType(MeshBuffer.POINTS);

<a name='MeshBuffer.fromPositionsColors'></a>
### (static) MeshBuffer.fromPositionsColors(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions
and vertex colors.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 6; every 6 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>Red, green, and blue components, in that order, of the vertex color, where each component ranges from a low of 0 to a high of 1.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions, normals,
and texture cordinates.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position and associated
    // color components. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the color components.
    var vertices = [
    x1, y1, z1, r1, g1, b1,
    x2, y2, z2, r2, g2, b2,
    x3, y3, z3, r3, g3, b3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsColors(vertices, indices);

<a name='MeshBuffer.fromPositionsNormals'></a>
### (static) MeshBuffer.fromPositionsNormals(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions
and vertex normals.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 6; every 6 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>X, Y, and Z components, in that order, of the vertex normal.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions and normals.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position and normal. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the normal.
    var vertices = [
    x1, y1, z1, nx1, ny1, nz1,
    x2, y2, z2, nx2, ny2, nz2,
    x3, y3, z3, nx3, ny3, nz3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsNormals(vertices, indices);

<a name='MeshBuffer.fromPositionsNormalsColors'></a>
### (static) MeshBuffer.fromPositionsNormalsColors(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions,
vertex normals, and vertex colors.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 9; every 9 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>X, Y, and Z components, in that order, of the vertex normal. <li>Red, green, and blue components, in that order, of the vertex color, where each component ranges from a low of 0 to a high of 1.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions, normals,
and texture cordinates.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position and normal, and associated
    // color components. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the normal, followed by the color components.
    var vertices = [
    x1, y1, z1, nx1, ny1, nz1, r1, g1, b1,
    x2, y2, z2, nx2, ny2, nz2, r2, g2, b2,
    x3, y3, z3, nx3, ny3, nz3, r3, g3, b3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsNormalsColors(vertices, indices);

<a name='MeshBuffer.fromPositionsNormalsUV'></a>
### (static) MeshBuffer.fromPositionsNormalsUV(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions,
vertex normals, and texture coordinates.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 8; every 8 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>X, Y, and Z components, in that order, of the vertex normal. <li>U and V <a href="Semantic.md#Semantic.TEXCOORD">texture coordinates</a> in that order, of the vertex.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions, normals,
and texture cordinates.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position and normal, and associated
    // texture coordinates. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the normal, followed by the texture coordinates.
    var vertices = [
    x1, y1, z1, nx1, ny1, nz1, u1, v1,
    x2, y2, z2, nx2, ny2, nz2, u2, v2,
    x3, y3, z3, nx3, ny3, nz3, u3, v3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsNormalsUV(vertices, indices);

<a name='MeshBuffer.fromPositionsUV'></a>
### (static) MeshBuffer.fromPositionsUV(vertices, [indices])

Creates a new mesh buffer with the given array of vertex positions
and texture coordinates.

#### Parameters

* `vertices` (Type: Array.&lt;number> | Float32Array)<br>An array of vertex data. This array's length must be divisible by 5; every 5 elements describe one vertex and are in the following order:<ol> <li>X, Y, and Z coordinates, in that order, of the vertex position. <li>U and V <a href="Semantic.md#Semantic.TEXCOORD">texture coordinates</a> in that order, of the vertex.</ol>
* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null | undefined) (optional)<br>Array of vertex indices that the mesh buffer will use. Each index (n) is a number referring to the (n+1)th vertex. If you are defining a set of triangles, there should be 3 indices for each triangle; for line segments, 2 indices for each segment; and for points, 1 index for each point. Can be null, undefined, or omitted, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

A new mesh buffer. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following example shows how to define a mesh
buffer from a predefined array of vertex positions, normals,
and texture cordinates.

    // First, create an array of numbers giving the X, Y, and
    // Z coordinate for each vertex position and associated
    // texture coordinates. Here, three vertices
    // are defined. For each vertex, the position is given, followed by
    // the texture coordinates.
    var vertices = [
    x1, y1, z1, u1, v1,
    x2, y2, z2, u2, v2,
    x3, y3, z3, u3, v3 ];
    // Second -- and this is optional -- create a second array of numbers
    // giving the indices to vertices defined in the previous step.
    // Each index refers to the (n+1)th vertex; since 3 vertices
    // were defined, the highest index is 2.
    var indices = [0, 1, 2];
    // Finally, create the mesh buffer. (If there are no indices,
    // leave out the "indices" argument.)
    var meshBuffer=MeshBuffer.fromPositionsUV(vertices, indices);

<a name='MeshBuffer_getAttribute'></a>
### MeshBuffer#getAttribute(name, [semanticIndex])

Gets a vertex attribute included in this mesh buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="Semantic.md#Semantic.POSITION">Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `semanticIndex` (Type: number) (optional)<br>The set index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string. Otherwise, if null or omitted, the default value is 0.

#### Return Value

A vertex buffer accessor, or null
if the attribute doesn't exist. (Type: <a href="BufferAccessor.md">BufferAccessor</a>)

#### Examples

The following function gets the positions,
normals, <a href="Semantic.md#Semantic.TEXCOORD">texture coordinates</a> and colors of each primitive
(line, text, or point) in the mesh buffer. A point will have one
vertex per primitive, a line two vertices and a triangle three.
The attributes, if present, will be stored in the "position",
"normal", "uv", and "color" properties of each vertex.

    function getPrimitives(mesh) {
    var p=mesh.getAttribute("POSITION")
    var n=mesh.getAttribute("NORMAL")
    var t=mesh.getAttribute("TEXCOORD_0")
    var c=mesh.getAttribute("COLOR")
    var count=mesh.vertexCount()
    var primSize = 3;
    if(mesh.primitiveType() === MeshBuffer.LINES)
    primSize = 2;
    if(mesh.primitiveType() === MeshBuffer.POINTS)
    primSize = 1;
    var ret=[]
    for(var i=0;i<ind.length;i+=primSize) {
    var prim=[]
    var index=mesh.getIndex(i)
    for(var j=0;j<primSize;j++) {
    var info={}
    if(p)info.position=p.getVec(index,[])
    if(n)info.normal=n.getVec(index,[])
    if(t)info.uv=t.getVec(index,[])
    if(c)info.color=c.getVec(index,[])
    }
    ret.push(prim)
    }
    return ret
    }

<a name='MeshBuffer_getBounds'></a>
### MeshBuffer#getBounds()

Finds the tightest
bounding box that holds all vertices in the mesh buffer.
Only positions with attribute semantic <code>POSITION</code> are
used in the bounding box calculation.

#### Return Value

An array of six numbers describing the tightest
axis-aligned bounding box
that fits all vertices in the mesh. The first three numbers
are the smallest-valued X, Y, and Z coordinates, and the
last three are the largest-valued X, Y, and Z coordinates.
This calculation uses the attribute with the semantic POSITION
and set index 0. If there is no such attribute,
or no vertices are defined in this buffer, returns the array
[Inf, Inf, Inf, -Inf, -Inf, -Inf]. (Type: Array.&lt;number>)

<a name='MeshBuffer_getIndex'></a>
### MeshBuffer#getIndex(indicesIndex)

Gets the vertex data index for use in referencing
vertex data in buffer attributes.

#### Parameters

* `indicesIndex` (Type: number)<br>A number 0 or greater, and less than the return value of <a href="MeshBuffer.md#MeshBuffer_vertexCount">MeshBuffer#vertexCount</a>. For example, if this mesh buffer holds triangles, 0 means the first vertex, 1 the second vertex, and 2 the third vertex of the first triangle, regardless of where that vertex's data is stored in the mesh buffer.

#### Return Value

The vertex data index; this is <code>getIndices()[indicesIndex]</code>
if this mesh buffer includes an index array, or <code>indicesIndex</code> otherwise. (Type: number)

<a name='MeshBuffer_getIndices'></a>
### MeshBuffer#getIndices()

Gets the array of vertex indices used by this mesh buffer.

#### Return Value

Return value. (Type: Uint16Array | Uint32Array | Uint8Array)

<a name='MeshBuffer_getPositions'></a>
### MeshBuffer#getPositions()

Gets an array of vertex positions held by this mesh buffer,
arranged by primitive.
Only values with the attribute semantic <code>POSITION_0</code> are returned.

#### Return Value

An array of primitives,
each of which holds the vertices that make up that primitive.
If this mesh holds triangles, each primitive will contain three
vertices; if lines, two; and if points, one. Each vertex is an array containing that vertex's coordinates (for example, if the attribute holds 3 elements per value, the coordinates are X, Y, and Z coordinates, in that order). (Type: Array.&lt;Array.&lt;number>>)

<a name='MeshBuffer_merge'></a>
### MeshBuffer#merge(other)

Merges the vertices from another mesh into this one.
The vertices from the other mesh will be copied into this one,
and the other mesh's indices copied or adapted.

#### Parameters

* `other` (Type: <a href="MeshBuffer.md">MeshBuffer</a>)<br>A mesh to merge into this one. The mesh given in this parameter will remain unchanged. Throws an error if this mesh's primitive type is not the same as the other mesh's primitive type.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

    var copiedMesh = new MeshBuffer().merge(meshToCopy);

<a name='MeshBuffer_normalizeNormals'></a>
### MeshBuffer#normalizeNormals()

Modifies this mesh buffer by converting the normals it defines to glmath
("normalized" vectors with a length of 1).
Has no effect if this mesh buffer doesn't define any normals.
All attributes with the semantic <code>NORMAL</code>,
regardless of semantic index, are affected.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='MeshBuffer_primitiveCount'></a>
### MeshBuffer#primitiveCount()

Gets the number of primitives (triangles, lines,
and points) composed by all shapes in this mesh.

#### Return Value

Return value. (Type: number)

<a name='MeshBuffer_primitiveType'></a>
### MeshBuffer#primitiveType()

Gets the type of primitive stored in this mesh buffer.

#### Return Value

Either <a href="MeshBuffer.md#MeshBuffer.TRIANGLES">MeshBuffer.TRIANGLES</a>,
<a href="MeshBuffer.md#MeshBuffer.LINES">MeshBuffer.LINES</a>, or <a href="MeshBuffer.md#MeshBuffer.POINTS">MeshBuffer.POINTS</a>. (Type: number)

<a name='MeshBuffer_recalcNormals'></a>
### MeshBuffer#recalcNormals([flat], [inward])

Recalculates the normal vectors (directions that generally point up and away from the mesh buffer's surface) for triangles
in this mesh buffer, in order to give the shape described by this buffer a flat or smooth appearance or to shade the shape from the inside or the outside upon rendering.

 Each normal calculated will
be normalized to have a length of 1 (unless the normal is (0,0,0)),
and will be stored in an attribute with semantic <code>NORMAL_0</code>.

This method will have an effect only if the buffer includes an attribute with
semantic <code>POSITION_0</code> and each of that attribute's values is at least 3 elements
long. If the buffer already includes an attribute with semantic <code>NORMAL_0</code>,
ensures its values are each at least 3 elements long.

For normal calculation to properly affect shading:<ul>
<li>Each triangle's vertices in the mesh buffer (as they appear when the triangle's front side is seen) must be ordered in the same winding (counterclockwise or clockwise) throughout. If the vertices have the wrong order, use the <a href="MeshBuffer.md#MeshBuffer_reverseWinding">`reverseWinding()`</a>
method to change their order.
<li>If the mesh describes a closed convex surface (such as a sphere or cube) and is being rendered in a right-handed coordinate system (e.g., X-right, Y-up, Z-backward), each of its triangles must have counterclockwise winding for the shape to be shaded from the outside.</ul>

#### Parameters

* `flat` (Type: boolean) (optional)<br>If true, each triangle in the mesh will have the same normal, which usually leads to a flat appearance. If false, each unique vertex in the mesh will have its own normal, which usually leads to a smooth appearance. If null, undefined, or omitted, the default is false.
* `inward` (Type: boolean) (optional)<br>If true, the generated normals will point inward, so that the shape is shaded from the inside upon rendering; otherwise, the normals will point outward. If null, undefined, or omitted, the default is false.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

    // Use flat shading, and shape is shaded from the outside
    meshBuffer.recalcNormals(true, false);
    // Both parameters can be omitted, setting both to false
    meshBuffer.recalcNormals();

<a name='MeshBuffer_reverseNormals'></a>
### MeshBuffer#reverseNormals()

Modifies this mesh buffer by reversing the sign of normals it defines.
Has no effect if this mesh buffer doesn't define any normals.
All attributes with the semantic <code>NORMAL</code>,
regardless of semantic index, are affected.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following code generates a two-sided mesh, where
the normals on each side face in the opposite direction.
This is only useful when drawing open geometric shapes, such as open
cylinders and two-dimensional planar shapes.
Due to the z-fighting effect, drawing a two-sided mesh is
recommended only if face culling is enabled.

    var twoSidedMesh = originalMesh.merge(
    new MeshBuffer().merge(originalMesh)
    .reverseWinding().reverseNormals()
    );

<a name='MeshBuffer_reverseWinding'></a>
### MeshBuffer#reverseWinding()

Reverses the winding order of the triangles in this mesh buffer
by swapping the second and third vertex indices of each one.
Has an effect only if this mesh buffer consists of triangles.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following code generates a mesh that survives face culling,
since the same triangles occur on each side of the mesh, but
with different winding orders.
This is only useful when drawing open geometric shapes, such as open
cylinders and two-dimensional planar shapes.
Due to the z-fighting effect, drawing this kind of mesh is
recommended only if face culling is enabled.

    var frontBackMesh = originalMesh.merge(
    new MeshBuffer().merge(originalMesh).reverseWinding()
    );

<a name='MeshBuffer_setAttribute'></a>
### MeshBuffer#setAttribute(name, buffer, countPerValue, [offset], [stride])

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information). An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="Semantic.md#Semantic.POSITION">Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid. If this isn't a string, the set index of the attribute will be 0 (see <a href="MeshBuffer.md#MeshBuffer_setAttributeEx">MeshBuffer#setAttributeEx</a>).
* `buffer` (Type: Float32Array | Array)<br>The buffer where the per-vertex data is stored. See <a href="MeshBuffer.md#MeshBuffer_setAttributeEx">MeshBuffer#setAttributeEx</a>.
* `countPerValue` (Type: number)<br>The number of elements in each per-vertex item. See <a href="MeshBuffer.md#MeshBuffer_setAttributeEx">MeshBuffer#setAttributeEx</a>.
* `offset` (Type: number) (optional)<br>The index into the array (starting from 0) where the first per-vertex item starts.See <a href="MeshBuffer.md#MeshBuffer_setAttributeEx">MeshBuffer#setAttributeEx</a>.
* `stride` (Type: number) (optional)<br>The number of elements from the start of one per-vertex item to the start of the next. See <a href="MeshBuffer.md#MeshBuffer_setAttributeEx">MeshBuffer#setAttributeEx</a>.

#### Return Value

This object. Throws an error if the given
semantic is unsupported. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='MeshBuffer_setAttributeEx'></a>
### MeshBuffer#setAttributeEx(name, index, buffer, [countPerValue], [offset], [stride])

Adds information about a buffer attribute to this
mesh buffer (or sets an
existing attribute's information), taking a semantic index as
an additional parameter. An attribute
gives information about the per-vertex data used and
stored in a vertex buffer.

#### Parameters

* `name` (Type: number | string)<br>An attribute semantic, such as <a href="Semantic.md#Semantic.POSITION">Semantic.POSITION</a>, "POSITION", or "TEXCOORD_0". Throws an error if this value is a string and the string is invalid.
* `index` (Type: number)<br>The semantic index of the attribute for the given semantic. 0 is the first index of the attribute, 1 is the second, and so on. This is ignored if "name" is a string.
* `buffer` (Type: Float32Array | Array | <a href="BufferAccessor.md">BufferAccessor</a>)<br>The buffer where the per-vertex data is stored. If this parameter is an (untyped) Array, converts that parameter to a Float32Array.
* `countPerValue` (Type: number) (optional)<br>The number of elements in each per-vertex item. For example, if each vertex is a 3-element vector, this value is 3. Throws an error if this value is 0 or less. If "buffer" is a <a href="BufferAccessor.md">BufferAccessor</a>, the value of "countPerValue" is taken from that accessor and this parameter is ignored; this parameter is currently required otherwise.
* `offset` (Type: number) (optional)<br>The index into the array (starting from 0) where the first per-vertex item starts. If null, undefined, or omitted, the default is 0. Throws an error if less than 0. If "buffer" is a <a href="BufferAccessor.md">BufferAccessor</a>, the value of "offset" is taken from that accessor and this parameter is ignored.
* `stride` (Type: number) (optional)<br>The number of elements from the start of one per-vertex item to the start of the next. If null, undefined, or omitted, this value is the same as "countPerValue". Throws an error if this value is 0 or less. If "buffer" is a <a href="BufferAccessor.md">BufferAccessor</a>, the value of "stride" is taken from that accessor and this parameter is ignored.

#### Return Value

This object.Throws an error if the given
semantic is unsupported. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='MeshBuffer_setColor'></a>
### MeshBuffer#setColor(color)

Sets all the vertices in this mesh to the given color, by
assigning each value with the attribute semantic <code>COLOR</code>
to the given color. (If the attribute's <a href="BufferAccessor.md#BufferAccessor_countPerValue">count per value</a>
is less than 4, each such value will be set to as many elements of the converted 4-element
color as possible.) If an attribute with the semantic <code>COLOR</code>
doesn't exist, an attribute with the semantic <code>COLOR_0</code> and a count per
value of 3 is created.

All attributes with the semantic <code>COLOR</code>,
regardless of semantic index, are affected by this method.

#### Parameters

* `color` (Type: Array.&lt;number> | number | string)<br>A <a href="toGLColor.md">color vector or string</a> identifying the color to set.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='MeshBuffer_setIndices'></a>
### MeshBuffer#setIndices([indices])

Sets the vertex indices used by this mesh buffer.

#### Parameters

* `indices` (Type: Array.&lt;number> | Uint16Array | Uint32Array | Uint8Array | null) (optional)<br>Array of vertex indices that the mesh buffer will use. Can be null, in which case no index array is used and primitives in the mesh buffer are marked by consecutive vertices.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='MeshBuffer_setType'></a>
### MeshBuffer#setType(primType)

Sets the type of graphics primitives stored in this mesh buffer.
By default, the primitive type is <a href="MeshBuffer.md#MeshBuffer.TRIANGLES">MeshBuffer.TRIANGLES</a>.

#### Parameters

* `primType` (Type: number)<br>The primitive type, either <a href="MeshBuffer.md#MeshBuffer.TRIANGLES">MeshBuffer.TRIANGLES</a>, <a href="MeshBuffer.md#MeshBuffer.LINES">MeshBuffer.LINES</a>, or <a href="MeshBuffer.md#MeshBuffer.POINTS">MeshBuffer.POINTS</a>. For TRIANGLES, every three vertices or vertex indices identify a single triangle. For LINES, every two vertices or vertex indices identify a single line segment. For POINTS, every vertex or vertex index identifies a single point.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

<a name='MeshBuffer_transform'></a>
### MeshBuffer#transform(matrix)

Transforms the positions and normals of all the vertices currently
in this mesh, with the help of a glmath. Only values with the attribute semantic <code>POSITION_0</code>
or <code>NORMAL_0</code> will be affected by this method; values of
other attributes will be unaffected.

#### Parameters

* `matrix` (Type: Array.&lt;number>)<br>A 4 &times; 4 matrix described in the <a href="MathUtil.md#MathUtil.mat4projectVec3">MathUtil.mat4projectVec3</a> method. The normals will be transformed using the 3 &times; 3 inverse transpose of this matrix (see <a href="MathUtil.md#MathUtil.mat4inverseTranspose3">MathUtil.mat4inverseTranspose3</a>). (Normals need to be transformed specially because they describe directions, not points.)

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

#### Examples

The following example transforms positions
and normals to move the mesh 2 units to the right.

    mesh.transform(MathUtil.mat4translated(2, 0, 0));

The following example transforms positions
and normals to double the mesh's size.

    mesh.transform(MathUtil.mat4scaled(2, 2, 2));

<a name='MeshBuffer_vertexCount'></a>
### MeshBuffer#vertexCount()

Gets the number of vertices in this mesh buffer, that
is, the number of vertex indices in its index buffer (some of which
may be duplicates), or if there is no index buffer, the lowest maximum
number of items that a buffer attribute can hold.

#### Return Value

Return value. (Type: number)

<a name='MeshBuffer_vertexIndices'></a>
### MeshBuffer#vertexIndices(primitiveIndex, ret)

Gets the vertex indices of a given primitive (triangle, line,
or point) in this mesh buffer.

#### Parameters

* `primitiveIndex` (Type: number)<br>The index (counting from 0) of the primitive whose indices will be retrieved.
* `ret` (Type: Array.&lt;number>)<br>An array where the vertex indices for the given primitive will be stored. If this mesh buffer stores triangles, three indices will be stored; if lines, two; and if points, one.

#### Return Value

The parameter "ret". (Type: Array.&lt;number>)

<a name='MeshBuffer_wireFrame'></a>
### MeshBuffer#wireFrame()

Converts the triangles in this mesh to line segments.
Has no effect if this mesh doesn't use triangles as primitives.

#### Return Value

This object. (Type: <a href="MeshBuffer.md">MeshBuffer</a>)

[Back to documentation index.](index.md)
