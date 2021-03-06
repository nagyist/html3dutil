The HTML 3D library includes a collection
of math functions for working with vectors, matrices, and quaternions.

Here is an overview of these data types.

## Contents <a id=Contents></a>

[Contents](#Contents)<br>[Vectors](#Vectors)<br>&nbsp;&nbsp;[Unit Vectors](#Unit_Vectors)<br>[Matrices](#Matrices)<br>&nbsp;&nbsp;[Translation](#Translation)<br>&nbsp;&nbsp;[Scaling](#Scaling)<br>&nbsp;&nbsp;[Rotation](#Rotation)<br>&nbsp;&nbsp;[Combining Transforms](#Combining_Transforms)<br>[Describing Rotations](#Describing_Rotations)<br>&nbsp;&nbsp;[Axis of Rotation](#Axis_of_Rotation)<br>&nbsp;&nbsp;[Quaternions](#Quaternions)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Generating Quaternions](#Generating_Quaternions)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Using Quaternions](#Using_Quaternions)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Multiplying Quaternions](#Multiplying_Quaternions)<br>&nbsp;&nbsp;[Tait-Bryan angles](#Tait_Bryan_angles)<br>&nbsp;&nbsp;[4x4 Matrices](#4x4_Matrices)<br>[Planes](#Planes)<br>[Boxes](#Boxes)<br>[Coordinate Systems](#Coordinate_Systems)<br>&nbsp;&nbsp;[Differences in Behavior](#Differences_in_Behavior)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Projection and view matrices](#Projection_and_view_matrices)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Rotation angles (such as used in `mat4rotate` and `quatRotate`)](#Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Cross product (`vec3cross`) and normals](#Cross_product_vec3cross_and_normals)<br>&nbsp;&nbsp;[Winding and face classification](#Winding_and_face_classification)<br>&nbsp;&nbsp;&nbsp;&nbsp;[Finding a triangle's winding](#Finding_a_triangle_s_winding)<br>

## Vectors <a id=Vectors></a>

A vector is a line segment pointing in a certain _direction_ and
having a certain _length_.  In addition to a direction, a vector can
describe a position (by pointing to that position from
a certain starting point), or a color.

In `H3DU.Math`, vectors are stored in arrays of numbers (usually
three or four numbers), and functions dealing with vectors begin
with "vec".

If a 4-element vector describes a position or direction, the elements
are given as X, Y, Z, and W, in that order.

If a 4-element vector describes a color, the elements are given as red, green,
blue, and alpha, in that order (where each element ranges from 0-1).

If a 3D _direction_ is used in a 4-element vector function (one beginning with "vec4"),
use 0 as the fourth element. If a 3D _position_ (point) is used in a 4-element vector
function, the fourth element is generally 1. (If the
fourth element is anything other than 0, the vector is in _homogeneous
coordinates_, where the 3D position equals the first three elements divided
by the fourth.)

### Unit Vectors <a id=Unit_Vectors></a>

A _unit vector_ is a vector with a length of 1. (A vector's _length_ is the square root
of the sum of the squares of its components.) A vector can be "normalized" to
a unit vector by dividing each of its components by its length (doing so won't change
the vector's direction).

The following functions normalize vectors and find their length.

* {@link H3DU.Math.vec3norm} - Converts a 3-element vector to a unit vector.
* {@link H3DU.Math.vec4norm} - Converts a 4-element vector to a unit vector.
* {@link H3DU.Math.vec3length} - Finds a 3-element vector's length.
* {@link H3DU.Math.vec4length} - Finds a 4-element vector's length.

Note that due to rounding error, normalizing a vector with an `H3DU.Math` method
might not necessarily result in a vector with a length of 1.

## Matrices <a id=Matrices></a>

A matrix is a 16- or 9-element array that can describe a
transformation from one coordinate system to another. Transformations
include translation (shifting), scaling, and rotation.
Functions dealing with matrices begin with "mat".
For more details, see the {@tutorial matrixdetails} tutorial.

### Translation <a id=Translation></a>

A translation is a shifting of an object's position.

To create a translation matrix, use [H3DU.Math.mat4translated()]{@link H3DU.Math.mat4translated},
and specify the X-offset, the Y-offset, and the Z-offset. For example, an X-offset of 1 moves
an object 1 unit to the right, and a Y offset of -1 moves it 1 unit down.

To multiply an existing matrix by a translation, use
[H3DU.Math.mat4translate()]{@link H3DU.Math.mat4translate}. This will put the translation
before the other transformations.

### Scaling <a id=Scaling></a>

Scaling changes an object's size.

To create a scaling matrix, use [H3DU.Math.mat4scaled()]{@link H3DU.Math.mat4scaled},
and specify the scaling factors for the X, Y, and Z axis. Each point is multiplied by the scaling
factors to change the object's size. For example, a Y-factor of 2 doubles an object's height.

To multiply an existing matrix by a scaling, use
[H3DU.Math.mat4scale()]{@link H3DU.Math.mat4scale}. This will put the scaling
before the other transformations.

### Rotation <a id=Rotation></a>

Rotation changes an object's orientation.

To create a rotation matrix, use [H3DU.Math.mat4rotated()]{@link H3DU.Math.mat4rotated},
and specify the angle (in degrees) to rotate, and the [axis of rotation](#Axis_of_Rotation). For example, specifying `(45, [1, 0, 0])` means a 45-degree rotation around the X axis, and `(80, [0, 2, 3])` means a 45-degree rotation around the axis that starts at the origin (0, 0, 0) and points toward the point (0, 2, 3).

To multiply an existing matrix by a rotation, use
[H3DU.Math.mat4rotate()]{@link H3DU.Math.mat4rotate}. This will put the rotation
before the other transformations.

### Combining Transforms <a id=Combining_Transforms></a>

The order in which you do transforms is important. In general, scaling then translating is
not the same as translating then scaling. Assuming your geometry is centered at the origin
(0, 0, 0), you should create a transformation in this order:

* Call [`H3DU.Math.mat4identity()`]{@link H3DU.Math.mat4identity}, creating a matrix without a transformation.
* Do your translations if needed, using [`mat4translate()`]{@link H3DU.Math.mat4translate}.
* Do your rotations if needed, using [`mat4rotate()`]{@link H3DU.Math.mat4rotate}.
* Do your scalings if needed, using [`mat4scale()`]{@link H3DU.Math.mat4scale}.

This way, the scalings and rotations will affect the object while it's still centered, and
before the translations (shifts) take place.

You can also multiply transforms using [H3DU.Math.mat4multiply()]{@link H3DU.Math.mat4multiply}.
This takes two matrices and returns one combined matrix. The combined matrix will have the effect
of doing the second matrix's transform, then the first matrix's transform.

## Describing Rotations <a id=Describing_Rotations></a>

Rotations in 3D space can be described in many ways, including
quaternions, Tait-Bryan angles, and an angle and axis.

### Axis of Rotation <a id=Axis_of_Rotation></a>

A rotation can be described using an _angle_ and an _axis of rotation_,
for example, in the {@link H3DU.Math.mat4rotate} method.

An axis of rotation is a 3-element vector or three numbers that describe a ray
that starts at the origin (0,0,0) and points toward a 3D point. The vector's elements are
the X, Y, and Z coordinates of that point, in that order. Here are examples.

* The X axis of rotation (upward or downward turn) is (1, 0, 0).
* The Y axis of rotation (leftward or rightward turn) is (0, 1, 0).
* The Z axis of rotation (side-by-side sway) is (0, 0, 1).

While the axis of rotation points toward the viewer, if the angle's value
is positive (resp. negative) and the [coordinate system](#Coordinate_Systems) is...

* ...right handed, then the angle runs counterclockwise (resp. clockwise).
* ...left handed, then the angle runs clockwise (resp. counterclockwise).

Vectors that point in the same direction (for example, vectors (1, 0, 0) and (2, 0, 0))
describe the same axis of rotation.

Unless stated otherwise, an axis of rotation passed to an `H3DU.Math`
method need not be a [unit vector](#Unit_Vectors).

### Quaternions <a id=Quaternions></a>

A quaternion is a 4-element vector that can describe a
3D rotation. Functions dealing with quaternions begin with
"quat".

#### Generating Quaternions <a id=Generating_Quaternions></a>

Functions that generate quaternions include:

* {@link H3DU.Math.quatIdentity} - Generates a quaternion describing an
absence of rotations.
* {@link H3DU.Math.quatFromVectors} - Generates a quaternion describing
a rotation from one vector to another.
* {@link H3DU.Math.quatFromMat4} - Generates a quaternion from a [4x4 matrix](#Matrices).
* {@link H3DU.Math.quatFromAxisAngle} - Generates a quaternion from an angle and [axis of rotation](#Axis_of_Rotation).
* {@link H3DU.Math.quatFromTaitBryan} - Generates a quaternion from Tait-Bryan angles.

#### Using Quaternions <a id=Using_Quaternions></a>

For best results when using quaternions:

* Store the rotation of each object as a single quaternion.
* As rotations happen each frame, convert the rotation (which may be
  in pitch/yaw/roll or another form, depending on the input device) to a quaternion
  and [multiply]{@link H3DU.Math.quatMultiply} that quaternion by the current
  quaternion to get the object's new rotation.
* Normalize the rotation quaternion (using [`quatNorm()`]{@link H3DU.Math.quatNorm}
 or [`quatNormInPlace()`]{@link H3DU.Math.quatNormInPlace})
  every few frames. (Quaternions that describe a 3D rotation should be [unit vectors](#Unit_Vectors).)

#### Multiplying Quaternions <a id=Multiplying_Quaternions></a>

When two quaternions are multiplied (for example, with {@H3DU.Math.quatMultiply}),
the result is a combined rotation in which the second rotation happens
before the first rotation (when applied in the global coordinate frame).
Like matrix multiplication, the order in which you multiply quaternions is important.

### Tait-Bryan angles <a id=Tait_Bryan_angles></a>

Pitch-yaw-roll angles (also called Tait-Bryan angles) describe three different rotations
around three different axes, called the pitch, yaw, and roll axes (or the X, Y, Z axes,
respectively), which occur one after the other.  However:

* There are multiple conventions for pitch-yaw-roll angles, including the order of
rotations (for example: pitch-roll-yaw, roll-pitch-yaw), and whether the rotations occur
around the object's original axes ("extrinsic") or its new axes ("intrinsic").
* Rotations are multiplied like in quaternions and matrices, so the order the rotations
occur is important.  For example, a 30-degree pitch followed by a 20-degree
roll is not the same as a 20-degree pitch followed by a 30-degree roll.
* Pitch-yaw-roll angles can cause a problem called "gimbal lock", in which a rotation along
one axis (say, a pitch) can cause a vector to be parallel to another axis (say, the roll
axis), so that a rotation along that axis will do nothing.

Related functions:

* [H3DU.Math.quatFromTaitBryan()]{@link H3DU.Math.quatFromTaitBryan} -
Converts from Tait-Bryan angles to a quaternion
* [H3DU.Math.quatToTaitBryan()]{@link H3DU.Math.quatToTaitBryan} -
Converts from a quaternion to Tait-Bryan angles

### 4x4 Matrices <a id=4x4_Matrices></a>

A 4x4 matrix can describe a 3D rotation; see ["Rotation", above](#Rotation).

## Planes <a id=Planes></a>

A 4-element array can describe a plane in the following manner:

* The 4 elements, labeled A, B, C, and D in that order, describe a plane
 whose points satisfy the equation:

        Ax + By + Cz + D = 0

 where x, y, and z are the
 coordinates of any point lying on the plane.
* A, B, and C are
 the X, Y, and Z components of the plane's normal vector.
* D is the negative dot product of the
 plane's normal and any point on the plane. D's absolute value
 is the distance from the plane to the origin (0,0,0).

There is one method that deals with planes:

* {@link H3DU.Math.planeNormInPlace} - Converts the plane to a form in which
its normal has a length of 1.

## Boxes <a id=Boxes></a>

An array of six numbers can describe an axis-aligned bounding box (AABB).
If it does, the first three numbers are the box's minimum X, Y, and Z coordinates,
and the last three numbers are the box's maximum X, Y, and Z coordinates.

If a minimum coordinate is greater than a maximum coordinate, then the
box is considered empty.

Methods that deal with boxes include:

* {@link H3DU.Math.boxCenter} - Finds a box's center.
* {@link H3DU.Math.boxDimensions} - Finds a box's dimensions.
* {@link H3DU.Math.boxIsEmpty} - Determines whether a box is empty.

## Coordinate Systems <a id=Coordinate_Systems></a>

There are two conventions of 3D coordinate systems, left-handed and
right-handed:

* In a _left-handed_ coordinate system, the Z axis points _away from
the viewer_ whenever the X axis points to the right and the Y axis points up.
* In a _right-handed_ coordinate system, the Z axis points _toward
the viewer_ whenever the X axis points to the right and the Y axis points up.

To show this more visually, point one hand's thumb to your right and
its index finger up, and bend the other three fingers halfway down.  In a
coordinate system named after that hand (left-handed or
right-handed), if the X axis points in the thumb's
direction and the Y axis points in the index finger's direction, the Z axis will
point in the direction the other three fingers point.

### Differences in Behavior <a id=Differences_in_Behavior></a>

#### Projection and view matrices <a id=Projection_and_view_matrices></a>

The difference between a left-handed and right-handed coordinate system
lies in how 3D points are transformed, mainly due to the projection and view
matrices.

The following methods return **projection matrices** for a right-handed coordinate system.
To adjust the matrices for a left-handed system, reverse the sign of the 9th, 10th, 11th, and
12th elements of the result (zero-based indices 8, 9, 10, and 11).

* {@link H3DU.Math.mat4perspective},
{@link H3DU.Math.mat4perspectiveHorizontal},
{@link H3DU.Math.mat4frustum},
{@link H3DU.Math.mat4ortho},
{@link H3DU.Math.mat4ortho2d},
{@link H3DU.Math.mat4orthoAspect},
{@link H3DU.Math.mat4ortho2dAspect}.

The {@link H3DU.Math.mat4lookat} method returns a **view matrix** for a right-handed
coordinate system. To adjust the matrix for a left-handed system,
reverse the sign of the 1st, 3rd, 5th, 7th, 9th, 11th,
13th, and 15th elements of the result (zero-based indices 0, 2, 4, 6, 8,
10, 12, and 14).

#### Rotation angles (such as used in `mat4rotate` and `quatRotate`) <a id=Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate></a>

While the [axis of rotation](#Axis_of_Rotation) points toward the viewer, if the angle's value
is positive (resp. negative) and the coordinate system is...

* ...right handed, then the angle runs counterclockwise (resp. clockwise).
* ...left handed, then the angle runs clockwise (resp. counterclockwise).

#### Cross product (`vec3cross`) and normals <a id=Cross_product_vec3cross_and_normals></a>

* Given a triangle formed by points A, B, and C, in that order, the [cross product]({@link H3DU.Math.vec3cross})
of the vector (A minus C) with (B minus C), in that order, is a _normal_ of that triangle (a vector that's perpendicular to the triangle's surface).
* By extension, given a triangle formed by point A, point B, and point (0,0,0), in that order, the cross product of A
with B, in that order, is a normal of that triangle.

In either case, while this particular normal points toward the viewer, the triangle's vertices
run in a counterclockwise path for right-handed coordinate systems, or a clockwise path for left-handed systems. (In general, there are two possible choices for normals, which each
point in opposite directions.)

### Winding and face classification <a id=Winding_and_face_classification></a>

A two-dimensional triangle has counterclockwise _winding_ if its vertices are ordered in a counterclockwise path from the first to second to third to first vertex. Otherwise, it has clockwise winding. If the triangle is in 3D space, it's first transformed into 2D _window coordinates_ before its winding is found. (Window coordinates roughly correspond to screen pixels.)

By default, triangles with counterclockwise winding are _front faces_, and
other triangles are _back faces_. To change which kinds of triangles are
front faces, call the [`frontFace` method of Scene3D]{@link H3DU.Scene3D#frontFace}.

#### Finding a triangle's winding <a id=Finding_a_triangle_s_winding></a>

To find a triangle's winding, do the following calculation (X1, X2, X3 and Y1, Y2, Y3 are the window coordinates of its vertices). Note that half of the result will be the triangle's signed area.

    (X3 - X1) * (Y3 - Y2) - (X3 - X2) * (Y3 - Y1)

If the result is positive (resp. negative), and the window space X axis points right and the Y axis points...

* ...up (which is the case in WebGL), then the triangle
 has counterclockwise (resp. clockwise) winding.
* ...down, then the triangle has clockwise (resp. counterclockwise) winding.
