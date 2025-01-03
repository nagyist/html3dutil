# MeshBuffer

[Back to documentation index.](index.md)

<a name='MeshBuffer'></a>
### new MeshBuffer()

**Deprecated: It is planned to render this class obsolete and rely on three.js's BufferGeometry.**

<b>Instancing</b>

Some 3D rendering pipelines support <i>instancing</i>, which is a technique for rendering multiple versions of a mesh buffer with a single draw call. Instancing involves the use of a second mesh buffer (an <i>instance buffer</i>); rather than holding vertex data, the instance buffer holds <i>instance data</i>, that is, data to be used when rendering each instance of the first mesh buffer. Besides this, however, instance buffers are largely similar to vertex buffers as far as the <code>MeshBuffer</code> class is concerned; any reference to vertices in the documentation applies analogously to instances in instance buffers. However, instance buffers should have only one vertex per primitive; it makes little sense to have instance buffers describe triangles or line segments.

### Members

* [LINES](#MeshBuffer.LINES)<br>Indicates that a mesh buffer contains line segments; the mesh
buffer stores each line segment using two consecutive vertices.
* [POINTS](#MeshBuffer.POINTS)<br>Indicates that a mesh buffer contains points; the mesh
buffer stores each point using one vertex.
* [TRIANGLES](#MeshBuffer.TRIANGLES)<br>Indicates that a mesh buffer contains triangles; the mesh
buffer stores each triangle using three consecutive vertices.

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

[Back to documentation index.](index.md)
