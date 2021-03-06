# Library Overview

[Back to documentation index.](index.md)

## Public-Domain HTML 3D Library <a id=Public_Domain_HTML_3D_Library></a>

This page will introduce the [**HTML 3D Library**](https://github.com/peteroupc/html3dutil/releases), an open-source JavaScript library that I wrote.

This library contains classes and utility methods to ease the development of HTML 3D applications, such as Web sites, in browsers that support 3D drawing using the HTML5 Canvas.

The library differs from many others because this one is in the public domain, so no permission is required to use it.

This page includes information on how to use the HTML 3D library, an overview of its features, and an example of a simple 3D-enabled Web page.

## Example <a id=Example></a>

![](https://peteroupc.github.io/html3dutil/html3d.png)

## Contents <a id=Contents></a>

[Public-Domain HTML 3D Library](#Public_Domain_HTML_3D_Library)<br>[Example](#Example)<br>[Contents](#Contents)<br>[How to Use](#How_to_Use)<br>&nbsp;&nbsp;[List of Classes](#List_of_Classes)<br>&nbsp;&nbsp;[`H3DU.Scene3D`](#H3DU_Scene3D)<br>&nbsp;&nbsp;[The "Camera"](#The_Camera)<br>&nbsp;&nbsp;[3D Models](#3D_Models)<br>&nbsp;&nbsp;[Shapes](#Shapes)<br>&nbsp;&nbsp;[The Render Loop](#The_Render_Loop)<br>[A Skeleton for 3D Apps](#A_Skeleton_for_3D_Apps)<br>[Demos](#Demos)<br>&nbsp;&nbsp;[Simple Demos](#Simple_Demos)<br>&nbsp;&nbsp;[Materials](#Materials)<br>&nbsp;&nbsp;[Shapes and meshes](#Shapes_and_meshes)<br>&nbsp;&nbsp;[Paths](#Paths)<br>&nbsp;&nbsp;[Curves and Surfaces](#Curves_and_Surfaces)<br>&nbsp;&nbsp;[Textures](#Textures)<br>&nbsp;&nbsp;[Shaders](#Shaders)<br>&nbsp;&nbsp;[Particle Systems](#Particle_Systems)<br>&nbsp;&nbsp;[Loading 3D Models](#Loading_3D_Models)<br>&nbsp;&nbsp;[Text](#Text)<br>&nbsp;&nbsp;[Miscellaneous](#Miscellaneous)<br>[Example](#Example)<br>

## How to Use <a id=How_to_Use></a>

1. [**Download the HTML 3D library**](https://github.com/peteroupc/html3dutil/releases).
2. Extract the file <i>"h3du_min.js"</i>, and write the following code in every HTML page where you will use the library.

        <script type="text/javascript" src="h3du_min.js"></script>

3. Include an HTML 3D canvas somewhere on the Web page, since drawing 3D objects requires a 3D canvas. You may set its `width` and `height`. You should also give it an ID so you can refer to it more easily in your JavaScript code, as shown in this example.

        <canvas width="640" height="480" id="canvas"></canvas>

4. To use the HTML 3D library in JavaScript, either add the JavaScript code to the bottom of the page or use an event listener, as in this example:

        <script>
        window.addEventListener("load",function(){
          var scene=new Scene3D(document.getElementById("canvas"));
          // We have the 3D scene, use it. (See the example code
          // at the bottom of this article for a more complete example.)
        })
        </script>

### List of Classes <a id=List_of_Classes></a>
This is an overview of most of the JavaScript classes available in this library:

* [`H3DU`](https://peteroupc.github.io/html3dutil/H3DU.html) - Contains various utility methods in the HTML 3D Library
* [`H3DU.Math`](https://peteroupc.github.io/html3dutil/H3DU.Math.html) - Contains math methods useful in 3D applications, such as matrices and vectors
* [`H3DU.Mesh`](https://peteroupc.github.io/html3dutil/H3DU.Mesh.html) - Helper class for building a 3D model
* [`H3DU.MeshBuffer`](https://peteroupc.github.io/html3dutil/H3DU.MeshBuffer.html) - Represents a 3D model
* [`H3DU.Meshes`](https://peteroupc.github.io/html3dutil/H3DU.Meshes.html) - Contains methods for generating common 3D models.
* [`H3DU.Material`](https://peteroupc.github.io/html3dutil/H3DU.Material.html),
 [`H3DU.Texture`](https://peteroupc.github.io/html3dutil/H3DU.Texture.html) - Represents textures and colors for a 3D object&#39;s appearance.
* [`H3DU.Lights`](https://peteroupc.github.io/html3dutil/H3DU.Lights.html),
 [`H3DU.LightSource`](https://peteroupc.github.io/html3dutil/H3DU.LightSource.html) - Represents light sources
* [`H3DU.Batch3D`](https://peteroupc.github.io/html3dutil/H3DU.Batch3D.html) - Represents a collection of shapes to draw and a projection and view.
* [`H3DU.FrameBufferInfo`](https://peteroupc.github.io/html3dutil/H3DU.FrameBufferInfo.html) - Describes a frame buffer, or an offscreen buffer for rendering graphics content.
* [`H3DU.ShaderInfo`](https://peteroupc.github.io/html3dutil/H3DU.ShaderInfo.html) - Represents a GLSL shader program
* [`H3DU.Shape`](https://peteroupc.github.io/html3dutil/H3DU.Shape.html) - Represents an instance of a 3D shape with its own transform and appearance
* [`H3DU.ShapeGroup`](https://peteroupc.github.io/html3dutil/H3DU.ShapeGroup.html) - Represents a group of 3D shapes
* [`H3DU.BezierCurve`](https://peteroupc.github.io/html3dutil/H3DU.MeshBuffer.html),
 [`H3DU.BezierSurface`](https://peteroupc.github.io/html3dutil/H3DU.BezierSurface.html),
 [`H3DU.BSplineCurve`](https://peteroupc.github.io/html3dutil/H3DU.BSplineCurve.html),
 [`H3DU.BSplineSurface`](https://peteroupc.github.io/html3dutil/H3DU.BSplineSurface.html),
 [`H3DU.CurveEval`](https://peteroupc.github.io/html3dutil/H3DU.CurveEval.html),
 [`H3DU.SurfaceEval`](https://peteroupc.github.io/html3dutil/H3DU.SurfaceEval.html) - Supports generating parametric curves and surfaces

The following classes concern themselves with the HTML 3D canvas context:

* [`H3DU.Scene3D`](https://peteroupc.github.io/html3dutil/H3DU.Scene3D.html) - Holds an HTML 3D canvas context (GL context).
* [`H3DU.TextureLoader`](https://peteroupc.github.io/html3dutil/H3DU.TextureLoader.html) - Caches textures loaded by the application and maps them to GL contexts.

For much more information on all of these classes, see my <a href="https://peteroupc.github.io/html3dutil">documentation for the HTML 3D library</a>.

The following sections detail how a 3D application using this library works.

### `H3DU.Scene3D` <a id=H3DU_Scene3D></a>

The `H3DU.Scene3D` class is a renderer for a canvas GL context. It renders batches of 3D shapes
in the form of `H3DU.Batch3D` objects.  Each `Batch3D` represents a so-called "scene graph". It holds
3D objects which will be drawn to the screen, as well as the camera&#39;s projection, the camera&#39;s
position, and light sources to illuminate the 3D scene.

To create a `H3DU.Scene3D`, you first need to find the HTML canvas in your JavaScript, then you
need to pass it to `new Scene3D()`. Once you do so, `H3DU.Scene3D` will use that canvas to draw
3D objects. Here is an example. You will also need to create a `H3DU.Batch3D` to hold 3D objects.

    // Find the HTML canvas with the ID "canvas".
    var canvas=document.getElementById("canvas")
    // Create a 3D scene using that canvas.
    var scene=new H3DU.Scene3D(canvas);
    var batch=new H3DU.Batch3D();

### The "Camera" <a id=The_Camera></a>

The `H3DU.Batch3D` class has a concept of a "projection transform" and a "view transform". If we
use the concept of a "camera", the projection is like setting the camera&#39;s focus and lens, and the view transform is like setting its position and orientation. `H3DU.Batch3D` has methods for setting all these attributes of this abstract "camera". Two of them are `perspectiveAspect()` and `setLookAt()`, which are shown in the example below.

    // Set the perspective view. Camera has a 45-degree field of view
    // and will see objects from 0.1 to 100 units away.
    batch.perspectiveAspect(45,0.1,100);
    // Move the camera back 40 units.
    batch.setLookAt([0,0,40]);
    // Move the camera back 30 units instead, and turn it so it
    // points at (0, 2, 0), that is, up 2 units.
    batch.setLookAt([0,0,30], [0,2,0]);

For more information, see _<a href="http://www.codeproject.com/Tips/989978/The-Camera-and-the-Projection-and-View-Transforms">The "Camera" and Geometric Transforms</a>_.

### 3D Models <a id=3D_Models></a>

Every 3D scene is made up of "meshes", or the triangles, lines, and points that make up a geometric three-dimensional object. Meshes can be simple, such as a cube, or very complex, such as a town model complete with houses. You create a mesh using the `H3DU.Mesh` class, or create a built-in geometric shape using a method in the `H3DU.Meshes` class. The example below shows how you can create a box mesh:

    // Create a box mesh 10 units in width, 20 units
    // in height, and 25 units in depth
    var mesh=H3DU.Meshes.createBox(10,20,25);

Here are some other built-in mesh methods. This page doesn&#39;t explain all the
features or parameters in the `Meshes` class; for that, see the
<a href="http://peteroupc.github.io/html3dutil/H3DU.Meshes.html">Meshes API documentation</a>.

  * <dfn>`H3DU.Meshes.createSphere(radius)`</dfn>
  <br>Creates a sphere with the given `radius`.
  * <dfn>`H3DU.Meshes.createCylinder(base, top, height)`</dfn>
  <br>Creates a cylinder with the given `base` radius, `top` radius, and `height`. Can be used
  to create a cone if `base` or `top` is `0`.
  * <dfn>`H3DU.Meshes.createClosedCylinder(base, top, height)`</dfn>
  <br>Like `createCylinder`, except it also covers the base and top.
  * <dfn>`H3DU.Meshes.createPartialDisk(inner, outer, start, sweep)`</dfn>
  <br>Creates a circular ring, of radius `outer` with a hole of radius `inner`, starting at `start`
  degrees and sweeping `sweep` degrees.
  * <dfn>`H3DU.Meshes.createDisk(inner, outer)`</dfn>
  <br>Same as calling `createPartialDisk` with `start` 0 and `sweep` 360.

For more information on meshes, see <a href="http://www.codeproject.com/Tips/987914/Creating-shapes-using-the-Public-Domain-HTML-D-Lib">_Creating shapes using the Public Domain HTML 3D Library_</a>.
### Shapes <a id=Shapes></a>

Once a mesh is created, it needs to be added to the 3D scene in order to be rendered.
Use the `H3DU.Shape` constructor method to convert the mesh to a shape. Then you can set the shape&#39;s properties such as color, size, and position. Then, call `addShape()` to add the shape to the 3D object batch.

    // Create a shape based on the mesh
    var shape=new H3DU.Shape(mesh);
    // Make it red (you can also use the HTML color string
    // "#FF0000" instead)
    shape.setColor("red");
    // Move it 1 unit along the X axis
    shape.setPosition(1,0,0);
    // Add the shape to the scene
    batch.addShape(shape);

The appearance of a 3D shape is known in the 3D graphics world as a "material". It includes textures (images), colors, and light reflection parameters. The <a href="http://peteroupc.github.io/html3dutil/H3DU.Material.html">`Material`</a> class holds data on some of these parameters, and is part of the definition of a shape.

Here are details on some of the `Shape` class&#39;s methods.

  * <dfn>`shape.setPosition(x, y, z)`</dfn>
  <br>Sets the shape&#39;s position to the given coordinates.
  * <dfn>`shape.setScale(x, y, z)`</dfn>
  <br>Sets the shape&#39;s scaling along the x, y, and z axes. Examples: (1, 1, 1) means no scaling, (2, 1, 1) means a doubled width, (1, 1, 0.5) means a halved depth.
  * <dfn>`shape.getTransform().setRotation(angle, x, y, z)`</dfn>
  <br>Sets the shape&#39;s rotation given an angle in degrees, and an axis of rotation (the x, y, and z parameters). Example: (40, 1, 0, 0) means a 40-degree rotation around the X axis (x is 1 in the axis of rotation).
  * <dfn>`shape.setColor(color)`</dfn>
  <br>Gives the shape a particular color. `color` can be an HTML color ("#ff0000"), CSS color ("red"), RGB color("rgb(20, 30, 40)") or HSL color("hsl(20, 50%, 50%)"), or a set of values from 0 to 1 (example: `[1.0,0.5,0.0]`).
   See my [colors tutorial](https://peteroupc.github.io/html3dutil/tutorial-colors.html).
  * <dfn>`shape.setTexture(name)`</dfn>
  <br>Gives the shape a particular texture, with the URL `name`. The texture should be in the same origin as the Web page (which usually means the same directory).
  * <dfn>`shape.copy()`</dfn>
  <br>Creates a copy of this shape. Can be more efficient than calling `new H3DU.Shape` if the same geometric mesh will be used more than once in the same 3D scene, with different positions and attributes.

### The Render Loop <a id=The_Render_Loop></a>

An important part of a 3D application is the render loop. The render loop is a block of code that is called many times a second (or many "frames" a second) to redraw the 3D scene. Each frame, the state of the application is updated, and the 3D scene is re-rendered to account for that state. To render a scene, use the `H3DU.Scene3D.render()` method, passing a batch of shapes to render. Render loops are created using the `H3DU.renderLoop()` method. Here is an example of a render loop.

    // Set up the render loop
    H3DU.renderLoop(function(time){
     // This will be called once each frame.
     // Here, we render the scene
     scene.render(batch);
    });

The render loop method takes a parameter (here "time"), containing the number of milliseconds since the page was started.&nbsp; This can be used to implement frame-rate independent animations.

## A Skeleton for 3D Apps <a id=A_Skeleton_for_3D_Apps></a>

The following is a minimal skeleton you can use for writing HTML apps using this library.

    <head>
    <meta charset=utf-8>
    <meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1">
    <script type="text/javascript" src="h3du_min.js"></script>
    </head>
    <body style="margin:0px">
    <canvas id=canvas style="width:100%; height:100%; overflow: hidden;"></canvas>
    <script>
    // Your script goes here
    </script>
    </body>

## Demos <a id=Demos></a>

The following are HTML Web pages showing a variety of features of the HTML 3D library. Each demo includes a link to access source code for that demo.

### Simple Demos <a id=Simple_Demos></a>

* [demos/simple.html](https://peteroupc.github.io/html3dutil/demos/simple.html) - A simple demo using this library.
* [demos/triangle.html](https://peteroupc.github.io/html3dutil/demos/triangle.html) - Demonstrates drawing a triangle.

### Materials <a id=Materials></a>

* [demos/selfpulse.html](https://peteroupc.github.io/html3dutil/demos/selfpulse.html) - Demonstrates
a rotating, pulsating box.

### Shapes and meshes <a id=Shapes_and_meshes></a>

* [demos/compositeMesh.html](https://peteroupc.github.io/html3dutil/demos/compositeMesh.html) - Demonstrates
combining multiple meshes into one.
* [demos/shapes.html](https://peteroupc.github.io/html3dutil/demos/shapes.html) - Demonstrates
the built-in shapes.
* [demos/newshapes.html](https://peteroupc.github.io/html3dutil/demos/newshapes.html) - Fancier
demo of some of the built-in shapes.
* [demos/builtinshapes.html](https://peteroupc.github.io/html3dutil/demos/builtinshapes.html) - Interactive demo of
the built-in shapes.
* [demos/platonic.html](https://peteroupc.github.io/html3dutil/demos/platonic.html) - A demo featuring the five
platonic solids. Demonstrates:
    * How vertex and index arrays are built up to create geometric meshes, and
    * How to position HTML elements on top of 3D models based on their 3D positions.
* [demos/clock.html](https://peteroupc.github.io/html3dutil/demos/clock.html) - A demo
featuring a wall clock.

### Paths <a id=Paths></a>

* [demos/marchingdots.html](https://peteroupc.github.io/html3dutil/demos/marchingdots.html) - Demo
of a series of dots following a path like marching ants. Shows some of the functionality of graphics paths.
* [demos/polyclip.html](https://peteroupc.github.io/html3dutil/demos/polyclip.html) -
Similar to "marchingdots.html", but now uses the union of two circles as a path to demonstrate polygon
clipping.
* [demos/pathtube.html](https://peteroupc.github.io/html3dutil/demos/pathtube.html) - Demo
of a tube formed by a path curve.
* [demos/pathshapes.html](https://peteroupc.github.io/html3dutil/demos/pathshapes.html) - Demo
of 3D and 2D shapes generated by a 2D path.

### Curves and Surfaces <a id=Curves_and_Surfaces></a>

* [demos/surfaces.html](https://peteroupc.github.io/html3dutil/demos/surfaces.html) - Demonstrates
using evaluators to generate parametric surfaces.
* [demos/curves.html](https://peteroupc.github.io/html3dutil/demos/curves.html) - Demonstrates
using evaluators to generate parametric curves.
* [demos/surfacesexpr.html](https://peteroupc.github.io/html3dutil/demos/surfacesexpr.html) - Demonstrates
parametric surfaces, with a custom formula editor.
* [demos/curvesexpr.html](https://peteroupc.github.io/html3dutil/demos/curvesexpr.html) - Demonstrates
parametric curves, with a custom formula editor.
* [demos/implicit.html](https://peteroupc.github.io/html3dutil/demos/implicit.html) - Demonstrates
implicit surfaces.

### Textures <a id=Textures></a>

* [demos/textured.html](https://peteroupc.github.io/html3dutil/demos/textured.html) - Demonstrates loading textures
and applying them to 3D shapes.
* [demos/specular.html](https://peteroupc.github.io/html3dutil/demos/specular.html) - Demonstrates using
textures as specular reflection maps.
* [demos/gradient.html](https://peteroupc.github.io/html3dutil/demos/gradient.html) - Demonstrates generating a custom
texture -- a linear gradient from one color to another.

### Shaders <a id=Shaders></a>

* [demos/squares.html](https://peteroupc.github.io/html3dutil/demos/squares.html) - Demonstrates shader-based filters.

### Particle Systems <a id=Particle_Systems></a>

* [demos/tris.html](https://peteroupc.github.io/html3dutil/demos/tris.html) - Demonstrates a particle system.
* [demos/fallingballs.html](https://peteroupc.github.io/html3dutil/demos/fallingballs.html) - Demonstrates falling balls
of different sizes.

### Loading 3D Models <a id=Loading_3D_Models></a>

* [demos/obj.html](https://peteroupc.github.io/html3dutil/demos/obj.html) - An object file loader.
* [demos/stl.html](https://peteroupc.github.io/html3dutil/demos/stl.html) - Demonstrates loading 3D models.

### Text <a id=Text></a>

* [demos/textwith3D.html](https://peteroupc.github.io/html3dutil/demos/textwith3d.html) - Demonstrates loading bitmap fonts and displaying text with them. Demonstrates showing bitmap font text on top of a 3D animation.

### Miscellaneous <a id=Miscellaneous></a>

* [demos/background.html](https://peteroupc.github.io/html3dutil/demos/background.html) - A demo
featuring a background with continuously drawn 3D shapes.
* [demos/animation.html](https://peteroupc.github.io/html3dutil/demos/animation.html) - A demo
illustrating a simple animation of 3D shapes.
* [demos/starfield.html](https://peteroupc.github.io/html3dutil/demos/starfield.html) - Demo of a star field.
* [demos/quatlerp.html](https://peteroupc.github.io/html3dutil/demos/quatlerp.html) - Demonstrates
the difference between <a href="H3DU.Math.md#H3DU.Math.quatNlerp">H3DU.Math.quatNlerp</a> and <a href="H3DU.Math.md#H3DU.Math.quatSlerp">H3DU.Math.quatSlerp</a>,
both functions for interpolating quaternion rotations.
* [demos/perspective.html](https://peteroupc.github.io/html3dutil/demos/perspective.html) - Demonstrates a perspective projection.
* [demos/gears.html](https://peteroupc.github.io/html3dutil/demos/gears.html) - A demonstration of rotating gears.

## Example <a id=Example></a>

The following is a simple example of an HTML page that uses the HTML 3D library. It sets up the 3D scene, generates a 3D box, colors it red, and rotates it each frame as time passes. Look at the comments; they explain better what each part of the code is doing. Also note the `<canvas>` element it uses on the page.

    <head>
    <script type="text/javascript" src="h3du_min.js"></script>
    </head>
    <body>
    <canvas width="600" height="450" id=canvas></canvas>
    <script>
     // Create the 3D scene; find the HTML canvas and pass it
     // to Scene3D.
     var scene=new H3DU.Scene3D(document.getElementById("canvas"));
     var sub=new H3DU.Batch3D();
      // Set the perspective view. Camera has a 45-degree field of view
      // and will see objects from 0.1 to 100 units away.
      .perspectiveAspect(45,0.1,100)
      // Move the camera back 40 units.
      .setLookAt([0,0,40]);
    sub.getLights().setBasic();
     // Create a box mesh 10 units in size
     var mesh=H3DU.Meshes.createBox(10,20,20);
     // Create a shape based on the mesh and give it a red color
     var shape=new H3DU.Shape(mesh).setColor("red");
     // Add the shape to the scene
     sub.addShape(shape);
     // Create a timer
     var timer={};
     // Set up the render loop
     H3DU.renderLoop(function(time){
      // Update the shape's rotation
      var q=H3DU.Math.quatFromTaitBryan(
        360*H3DU.getTimePosition(timer,time,6000),
        360*H3DU.getTimePosition(timer,time,12000),
        0
      );
      shape.setQuaternion(q);
      // Render the scene
      scene.render(sub);
    });
    //-->
    </script>
    </body>

<h2>History</h2>

Version 2.0.0-beta1:

- All classes in the main library are moved to a new namespace called `H3DU`.  For example, `Shape` is now <a href="H3DU.Shape.md">H3DU.Shape</a> and `Mesh` is now <a href="H3DU.Mesh.md">H3DU.Mesh</a>.  Many classes in the "extras" directory are also moved to the `H3DU` namespace.
- `Scene3D`, now <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>, is no longer meant to be a scene graph of objects to draw. That job now belongs to the new <a href="H3DU.Batch3D.md">H3DU.Batch3D</a> class. Scene3D's `render` method now takes an array of `Batch3D`s to render. For compatibility, though, the methods allowing it to manage 3D models and the coordinate system, such as `makeShape` and `setPerspective`, can still be used until `H3DU.Scene3D` renders a custom `H3DU.Batch3D`. This compatibility behavior may be dropped in the future.
- Alpha is disabled in WebGL contexts created with the <a href="H3DU.md#H3DU.get3DOr2DContext">H3DU.get3DOr2DContext</a> method.
- The `Scene3D` H3DU.Scene3D#useProgram method was deprecated and now does nothing.
- New <a href="H3DU.RenderPass3D.md">H3DU.RenderPass3D</a> class holds information about how a batch of 3D models is to be rendered. It replaces the `Scene3D` H3DU.Scene3D#useFilter method, which now does nothing.
- New <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a> class holds information about a frame buffer; it replaces <a href="H3DU.FrameBuffer.md">H3DU.FrameBuffer</a>.
- The `BufferedMesh`, `FrameBuffer`, and `ShaderProgram` classes are deprecated because they are too tightly coupled with a particular WebGL context. Instead, use <a href="H3DU.MeshBuffer.md">H3DU.MeshBuffer</a>, <a href="H3DU.FrameBufferInfo.md">H3DU.FrameBufferInfo</a>, and <a href="H3DU.ShaderInfo.md">H3DU.ShaderInfo</a>, respectively, which are not coupled to WebGL contexts.
- Rendering can make use of vertex array objects internally, if supported by the WebGL implementation.
- The <a href="H3DU.Shape.md">H3DU.Shape</a> object is no longer coupled to vertex buffers.
- The <a href="H3DU.LightSource.md">H3DU.LightSource</a> class now supports a radius of the light.
- The <a href="H3DU.TextureLoader.md">H3DU.TextureLoader</a> class was added for loading textures; a single object of this class can load and upload images from multiple WebGL contexts. This is unlike `BufferedMesh`, `FrameBuffer`, and `ShaderProgram`, which are tied to the WebGL context.
- `GLMath`, now <a href="H3DU.Math.md">H3DU.Math</a>, was expanded with many new methods. The documentation for it is now very detailed. New methods include <a href="H3DU.Math.md#H3DU.Math.vec3perp">H3DU.Math.vec3perp</a>, <a href="H3DU.Math.md#H3DU.Math.vec3toWindowPoint">H3DU.Math.vec3toWindowPoint</a>, and <a href="H3DU.Math.md#H3DU.Math.mat4projectVec3">H3DU.Math.mat4projectVec3</a>.
- Two new classes in the "extras" folder support 2D text rendering and texture atlases (as sprite sheets), namely, <a href="H3DU.TextFont.md">H3DU.TextFont</a> and <a href="H3DU.TextureAtlas.md">H3DU.TextureAtlas</a>.
- The "doc" folder contains the documentation to the library in the form of Markdown text files.
- The Camera class, now <a href="H3DU.Camera.md">H3DU.Camera</a>, was rewritten.
- A build script was included in the repository. This build includes a style checker which is run on the library's JavaScript files.
- Many methods were added to many classes. Some methods that didn't return a value now return the value of the object called on, for example, the `clear` method of `H3DU.Scene3D`.
- New demos, including _spinbox.html_ and _quatlerp.html_.  For example, the _gears.html_ demo was moved from the separate "html-gears" repository to here. Other demos were expanded or rewritten. Viewport `meta` tags were added to the demos.
- The underlying code used in `H3DU.toGLColor` was rewritten.  In particular, the "#RRGGBBAA" format is now supported.
- The JavaScript source code better conforms to a uniform code style.
- The experimental 2D canvas renderer in _surfaces2d.html_, was abandoned.
- Added `dispose` method to `H3DU.Scene3D`.
- Added `createPointedStar` and `createLathe` methods to `H3DU.Meshes`.
- Added `getBounds` and `toLinePath` methods to <a href="H3DU.GraphicsPath.md">H3DU.GraphicsPath</a>, an extra, as well
 as an extra that adds methods that compute the intersection, difference, union, and XOR of two
 polygons. Path triangulation now supports polygons with holes.
- The default light configuration is no lights when creating a <a href="H3DU.LightSource.md">H3DU.LightSource</a>. The exception, for compatibility purposes, is when using a <a href="H3DU.Scene3D.md">H3DU.Scene3D</a> without rendering a custom `Batch3D`, in which case the default is one light source with its default values.
- The default value for specular materials (<a href="H3DU.Material.md">H3DU.Material</a>) is now (0.1, 0.1, 0.1). The default value for shininess is now 32.
- The Mesh class no longer supports multiple primitive types (lines, triangles, points). Using different modes that use the same primitive type (for example, TRIANGLE_FAN and QUAD_STRIP) in the same mesh is still supported.
- Many of the tutorials were edited heavily to accommodate the new version. The `GraphicsPath` tutorial was added.
- There were also numerous bug fixes.
- A known issue: When using the <a href="H3DU.Camera.md">H3DU.Camera</a> in conjunction with the compatibility behavior of <a href="H3DU.Scene3D.md">H3DU.Scene3D</a>, only one side of the scene will appear lighted by default.

See [older version history](https://peteroupc.github.io/html3dutil/tutorial-history.html).

[Back to documentation index.](index.md)
