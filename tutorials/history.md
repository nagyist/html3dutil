## Version History <a id=Version_History></a>

Version 2.0.0-beta1:

There are many, many changes to version 2.0.0-beta1 from version 1.5.1. Here are some of them, including the most important ones.

- All classes in the main library are moved to a new namespace called `H3DU`.  For example, `Shape` is now {@link H3DU.Shape} and `Mesh` is now {@link H3DU.Mesh}.  Many classes in the "extras" directory are also moved to the `H3DU` namespace.
- `Scene3D`, now {@link H3DU.Scene3D}, is no longer meant to be a scene graph of objects to draw. That job now belongs to the new {@link H3DU.Batch3D} class. Scene3D's `render` method now takes an array of `Batch3D`s to render. For compatibility, though, the methods allowing it to manage 3D models and the coordinate system, such as `makeShape` and `setPerspective`, can still be used until `H3DU.Scene3D` renders a custom `H3DU.Batch3D`. This compatibility behavior may be dropped in the future.
- Alpha is disabled in WebGL contexts created with the {@link H3DU.get3DOr2DContext} method.
- The `Scene3D` {@link H3DU.Scene3D#useProgram} method was deprecated and now does nothing.
- New {@link H3DU.RenderPass3D} class holds information about how a batch of 3D models is to be rendered. It replaces the `Scene3D` {@link H3DU.Scene3D#useFilter} method, which now does nothing.
- New {@link H3DU.FrameBufferInfo} class holds information about a frame buffer; it replaces {@link H3DU.FrameBuffer}.
- The `BufferedMesh`, `FrameBuffer`, and `ShaderProgram` classes are deprecated because they are too tightly coupled with a particular WebGL context. Instead, use {@link H3DU.MeshBuffer}, {@link H3DU.FrameBufferInfo}, and {@link H3DU.ShaderInfo}, respectively, which are not coupled to WebGL contexts.
- Rendering can make use of vertex array objects internally, if supported by the WebGL implementation.
- The {@link H3DU.Shape} object is no longer coupled to vertex buffers.
- The {@link H3DU.LightSource} class now supports a radius of the light.
- The {@link H3DU.TextureLoader} class was added for loading textures; a single object of this class can load and upload images from multiple WebGL contexts. This is unlike `BufferedMesh`, `FrameBuffer`, and `ShaderProgram`, which are tied to the WebGL context.
- `GLMath`, now {@link H3DU.Math}, was expanded with many new methods. The documentation for it is now very detailed. New methods include {@link H3DU.Math.vec3perp}, {@link H3DU.Math.vec3toWindowPoint}, and {@link H3DU.Math.mat4projectVec3}.
- Two new classes in the "extras" folder support 2D text rendering and texture atlases (as sprite sheets), namely, {@link H3DU.TextFont} and {@link H3DU.TextureAtlas}.
- The "doc" folder contains the documentation to the library in the form of Markdown text files.
- The Camera class, now {@link H3DU.Camera}, was rewritten.
- A build script was included in the repository. This build includes a style checker which is run on the library's JavaScript files.
- Many methods were added to many classes. Some methods that didn't return a value now return the value of the object called on, for example, the `clear` method of `H3DU.Scene3D`.
- New demos, including _spinbox.html_ and _quatlerp.html_.  For example, the _gears.html_ demo was moved from the separate "html-gears" repository to here. Other demos were expanded or rewritten. Viewport `meta` tags were added to the demos.
- The underlying code used in `H3DU.toGLColor` was rewritten.  In particular, the "#RRGGBBAA" format is now supported.
- The JavaScript source code better conforms to a uniform code style.
- The experimental 2D canvas renderer in _surfaces2d.html_, was abandoned.
- Added `dispose` method to `H3DU.Scene3D`.
- Added `createPointedStar` and `createLathe` methods to `H3DU.Meshes`.
- Added `getBounds` and `toLinePath` methods to {@link H3DU.GraphicsPath}, an extra, as well
 as an extra that adds methods that compute the intersection, difference, union, and XOR of two
 polygons. Path triangulation now supports polygons with holes.
- The default light configuration is no lights when creating a {@link H3DU.LightSource}. The exception, for compatibility purposes, is when using a {@link H3DU.Scene3D} without rendering a custom `Batch3D`, in which case the default is one light source with its default values.
- The default value for specular materials ({@link H3DU.Material}) is now (0.1, 0.1, 0.1). The default value for shininess is now 32.
- The Mesh class no longer supports multiple primitive types (lines, triangles, points). Using different modes that use the same primitive type (for example, TRIANGLE_FAN and QUAD_STRIP) in the same mesh is still supported.
- Many of the tutorials were edited heavily to accommodate the new version. The `GraphicsPath` tutorial was added.
- There were also numerous bug fixes.
- A known issue: When using the {@link H3DU.Camera} in conjunction with the compatibility behavior of {@link H3DU.Scene3D}, only one side of the scene will appear lighted by default.

Version 1.5.1:

- Fixed bug in normal calculation
- Make certain changes to the demos to ensure compatibility with the
 next major version
- Fix curve returned by GraphicsPath#getCurves() so that closed paths
 remain smooth at their endpoints when a curve tube is generated from
 them

Version 1.5:

- Add support for specular maps and normal maps, including
 in the JSON mesh format and MTL material format.
- To support normal maps, extra methods for bitangents and
 tangents were added to the Mesh class.
- Added six new demos and modified several others
- Support 24-bit color versions of TGA files
- Scene3D now does frustum culling of its shapes
- Fixed vertex normal calculation in the recalcNormals()
 method of the Mesh class.
- Allow two-element arrays to be passed to the Mesh class's
 texCoord3() method.
- Add getBoundingBox method to the Mesh class.
- Add the setVisible method to the Shape and ShapeGroup
 classes.
- Allow reading OBJ files with negative reference numbers
- Add path.js (2D graphics paths) to extras
- Added an "axis" parameter to the SurfaceOfRevolution
 constructor and fromFunction method
- Add vec3negate, vec3negateInPlace, vec3mul, and plane
 and frustum methods to the GLMath class
- Deprecate the practice of setting shape materials directly
 to textures (calling the Shape#setMaterial method with a
 Texture object rather than a Material object).
- Deprecate certain properties of Transform that shouldn't
 be exposed as a public API and add corresponding methods
 for those properties
- Fix getPromiseResults
- Documentation added in many places
- "meshexamples.md" demo added and other demos edited
 or rearranged
- Other changes and fixes

Version 1.4:

- Fixed camera.js issues (thanks to the user "the-sz" on GitHub)
- Added an _extras_ folder with the following new scripts:
    - A CurveTube class for creating tubes from 3D curves
    - A parametric evaluator for surfaces of revolution and
      3 kinds of curves (_evaluators.js_)
    - A frame counter (moved from the demos)
    - A JSON converter and loader for 3D meshes (_meshjson.js_)
- Made _objmtl.js_ compatible with more MTL files
- Math.sin/Math.cos pairs were replaced with optimized
  versions throughout the code
- Add mat4transformVec3 method to GLMath
- Add BSplineCurve class
- Deprecate vertexBezier, normalBezier, colorBezier, and texCoordBezier
  methods of CurveEval and SurfaceEval
- Optimize SurfaceEval's evalSurface method when generating
  triangles
- Add primitiveCount and enumPrimitives methods to the Mesh
  class
- Add setMaterial and removeShape methods to the ShapeGroup class
- Default shader program now uses `modelViewMatrix` instead of
  separate `world` and `view` uniforms
- Fix JSON issues in H3DU.loadFileFromUrl method
- Many new demos added
- Add graphics filters tutorial and expanded several other tutorials

Version 1.3.1:

- Fixed touch events in some of the interactive demos
- Fixed issues with BezierCurve, BezierSurface
- Robustness improvement in autonormal feature of SurfaceEval
- Correctness and other fixes

Version 1.3:

- Camera class rewritten again, but backwards compatible with
version 1.0
- Add vec3add, vec3sub, vec3copy, vec3assign, vec4assign methods
to GLMath
- Fix quatInvert method and optimize mat4inverseTranspose
method of GLMath
- Add reverseNormals method to GLMath
- Add createCanvasElement, getTimePosition, and newFrames methods to GLUtil
- Deprecate createCanvas method of GLUtil
- Improve renderLoop method of GLUtil
- Improved specular highlights
- Allow coordinate arrays in vertex2 and vertex3 methods of Mesh class
- Resolve some autonormal degenerate cases in SurfaceEval class
- Add getCount method to Lights class
- Add face culling, auto resize, and pixel depth methods to Scene3D class
- Add getClientAspect method to Scene3D class
- Other fixes and improvements

Version 1.2.1:

- Fix bug that occurs when a shape derived from a mesh that defines its own
colors is drawn before a shape derived from a mesh that doesn't define its own colors

Version 1.2:

- Support TGA textures
- Camera class rewritten and support added for the mouse wheel
and middle mouse button
- Lines and points supported in OBJ files
- Support loading custom textures from byte arrays
- Add method to create capsule shapes in Meshes class
- Mesh builder (vector3 method) avoids adding degenerate triangles
- Optimizations and bug fixes

Version 1.1:

- Add frame.js, a frame counter helper used in some of the demos
- Add quatInvert method to the GLMath class
- Fix texture mapping bugs
- Expand use of the color3 method of the Mesh class
- Optimize setUniforms method of the ShaderProgram class
- Add movePosition method of the Transform class
- New methods in the ShapeGroup and Scene3D classes
- Bug fixes

Version 1.0:

- Adds setOrtho2DAspect and setOrthoAspect methods to Scene3D
- Adds mat4TransposeInPlace method and two constants to GLMath
- Renames fromEuler and toEuler methods in GLMath to fromTaitBryan
 and toTaitBryan
- Modifies the Lights class
- Allows alpha component in material diffuse
- Optimizes setting uniforms in shader programs
- Adds vertex2 method to Mesh class
- New classes: Transform and ShapeGroup
- Most methods that affect transforms removed, and their functionality
  now uses a new getTransform method and the Transform class
- Bug fixes

Version 0.2:

- First Code Project release
