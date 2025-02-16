# module:extras/meshes/gearmesh

[Back to documentation index.](index.md)

<a name='extras_meshes_gearmesh'></a>
### module:extras/meshes/gearmesh()

The <code>extras/meshes/gearmesh.js</code> module.
To import all symbols in this module, either of the following can be used:

    import * from "extras/meshes/gearmesh.js";
    // -- or --
    import * as CustomModuleName from "extras/meshes/gearmesh.js";

### Methods

* [createGear](#extras_meshes_gearmesh.createGear)<br>Builds a mesh buffer representing a gear centered at the origin.

<a name='extras_meshes_gearmesh.createGear'></a>
### (static) module:extras/meshes/gearmesh.createGear(innerRadius, outerRadius, thickness, teeth, toothDepth)

Builds a mesh buffer representing a gear centered at the origin.

#### Parameters

* `innerRadius` (Type: number)<br>Inner radius of the gear wheel
* `outerRadius` (Type: number)<br>Outer radius of the gear wheel, at the valleys between teeth.
* `thickness` (Type: number)<br>Thickness of the gear
* `teeth` (Type: number)<br>Number of teeth.
* `toothDepth` (Type: number)<br>Depth of each gear tooth.

#### Return Value

Return value. (Type: *)

[Back to documentation index.](index.md)
