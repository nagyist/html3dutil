The HTML 3D library includes a collection
of math functions for working with vectors, matrices, and quaternions.

Here is an overview of these data types.

<a id=Contents></a>

## Contents

- [**Contents**](#Contents)
- [**Vectors**](#Vectors)
    - [**Unit Vectors**](#Unit_Vectors)
- [**Matrices**](#Matrices)
    - [**Translation**](#Translation)
    - [**Scaling**](#Scaling)
    - [**Rotation**](#Rotation)
    - [**Combining Transforms**](#Combining_Transforms)
- [**Describing Rotations**](#Describing_Rotations)
    - [**Axis of Rotation**](#Axis_of_Rotation)
    - [**Quaternions**](#Quaternions)
        - [**Generating Quaternions**](#Generating_Quaternions)
        - [**Using Quaternions**](#Using_Quaternions)
        - [**Multiplying Quaternions**](#Multiplying_Quaternions)
    - [**Tait-Bryan angles**](#Tait_Bryan_angles)
    - [**4x4 Matrices**](#4x4_Matrices)
- [**Planes**](#Planes)
- [**Boxes**](#Boxes)
- [**Coordinate Systems**](#Coordinate_Systems)
    - [**Differences in Behavior**](#Differences_in_Behavior)
        - [**Projection and view matrices**](#Projection_and_view_matrices)
        - [**Rotation angles (such as used in `mat4rotate` and `quatRotate`)**](#Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate)
        - [**Cross product (`vec3cross`) and normals**](#Cross_product_vec3cross_and_normals)
    - [**Winding and face classification**](#Winding_and_face_classification)
        - [**Finding a triangle's winding**](#Finding_a_triangle_s_winding)

<a id=Vectors></a>

## Vectors

A vector is a line segment pointing in a certain _direction_ in space and
having a certain _length_ and an unspecified starting point.
A particular vector can instead be treated as describing a position
(by pointing to that position from an _origin_ (0,0,0)), or a color.

In `MathUtil`, vectors are stored in arrays of numbers (usually
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

<a id=Unit_Vectors></a>

### Unit Vectors

A _unit vector_ is a vector with a length of 1. (A vector's _length_,  or _norm_, is the square root
of the sum of the squares of its components.) A vector can be "normalized" to
a unit vector by dividing each of its components by its length (doing so won't change
the vector's direction).

The following functions normalize vectors and find their length.

* {@link MathUtil.vec3normalize} - Converts a 3-element vector to a unit vector.
* {@link MathUtil.vec4normalize} - Converts a 4-element vector to a unit vector.
* {@link MathUtil.vec3length} - Finds a 3-element vector's length.
* {@link MathUtil.vec4length} - Finds a 4-element vector's length.

Note that due to rounding error, normalizing a vector with a `MathUtil` method
might not necessarily result in a vector with a length of 1.

<a id=Matrices></a>

## Matrices

A matrix is a rectangular array that can describe a
transformation from one coordinate system to another. Transformations
include translation (shifting), scaling, and rotation.
Functions dealing with matrices begin with "mat".
A 3x3 or 4x4 matrix has 9 or 16 elements, respectively.
For more details, see the {@tutorial matrixdetails} tutorial.

<a id=Translation></a>

### Translation

A translation is a shifting of an object's position.

To create a translation matrix, use [MathUtil.mat4translated()]{@link MathUtil.mat4translated},
and specify the X-offset, the Y-offset, and the Z-offset. For example, an X-offset of 1 moves
an object 1 unit to the right, and a Y offset of -1 moves it 1 unit down.

To multiply an existing matrix by a translation, use
[MathUtil.mat4translate()]{@link MathUtil.mat4translate}. This will put the translation
before the other transformations.

<a id=Scaling></a>

### Scaling

Scaling changes an object's size.

To create a scaling matrix, use [MathUtil.mat4scaled()]{@link MathUtil.mat4scaled},
and specify the scaling factors for the X, Y, and Z axis. Each point is multiplied by the scaling
factors to change the object's size. For example, a Y-factor of 2 doubles an object's height.

To multiply an existing matrix by a scaling, use
[MathUtil.mat4scale()]{@link MathUtil.mat4scale}. This will put the scaling
before the other transformations.

<a id=Rotation></a>

### Rotation

Rotation changes an object's orientation.

To create a rotation matrix, use [MathUtil.mat4rotated()]{@link MathUtil.mat4rotated},
and specify the angle (in degrees) to rotate, and the [**axis of rotation**](#Axis_of_Rotation). For example:

* Specifying `(45, [1, 0, 0])` means a 45-degree rotation of the point around the X axis.
* Specifying `(80, [0, 2, 3])` means a 45-degree rotation of the point around the axis that
  starts at the origin (0, 0, 0) and points toward the point (0, 2, 3).

When describing an axis of rotation, <code>[1, 0, 0]</code> is the X axis,
 <code>[0, 1, 0]</code> is the Y axis, and  <code>[0, 0, 1]</code> is the Z axis.

To multiply an existing matrix by a rotation, use
[MathUtil.mat4rotate()]{@link MathUtil.mat4rotate}. This will put the rotation
before the other transformations.

<a id=Combining_Transforms></a>

### Combining Transforms

The order in which you do transforms is important. In general, scaling then translating is
not the same as translating then scaling. Assuming your geometry is centered at the origin
(0, 0, 0), you should create a transformation in this order:

* Call [`MathUtil.mat4identity()`]{@link MathUtil.mat4identity}, creating a matrix without a transformation.
* Do your translations if needed, using [`mat4translate()`]{@link MathUtil.mat4translate}.
* Do your rotations if needed, using [`mat4rotate()`]{@link MathUtil.mat4rotate}.
* Do your scalings if needed, using [`mat4scale()`]{@link MathUtil.mat4scale}.

This way, the scalings and rotations will affect the object while it's still centered, and
before the translations (shifts) take place.

You can also multiply transforms using [MathUtil.mat4multiply()]{@link MathUtil.mat4multiply}.
This takes two matrices and returns one combined matrix. The combined matrix will have the effect
of doing the second matrix's transform, then the first matrix's transform.

<a id=Describing_Rotations></a>

## Describing Rotations

Rotations in 3D space can be described in many ways, including
quaternions, Tait-Bryan angles, and an angle and axis.

<a id=Axis_of_Rotation></a>

### Axis of Rotation

A rotation of vectors or points can be described using an _angle_
and an _axis of rotation_, for example, in the {@link MathUtil.mat4rotate} method.

An axis of rotation is a vector pointing in a certain direction.  When a point (or vector)
is rotated at any angle around this axis, the new point (or vector) will lie
on the same plane as the previous point.  The axis of rotation describes
a vector that is perpendicular to that plane's surface (the plane's _normal_).
Here are examples of an axis of rotation.

* The X axis of rotation (upward or downward turn) is (1, 0, 0).
* The Y axis of rotation (leftward or rightward turn) is (0, 1, 0).
* The Z axis of rotation (side-by-side sway) is (0, 0, 1).

While the axis of rotation points backward from the "eye", if the angle's value
is positive and the [**coordinate system**](#Coordinate_Systems) is...

* ...right handed, then the angle runs counterclockwise.
* ...left handed, then the angle runs clockwise.

While the axis of rotation points backward from the "eye", if the angle's value
is negative, then the angle runs in the opposite direction.

Vectors that point in the same direction (for example, vectors (1, 0, 0) and (2, 0, 0))
describe the same axis of rotation.

Unless stated otherwise, an axis of rotation passed to a `MathUtil`
method need not be a [**unit vector**](#Unit_Vectors).

<a id=Quaternions></a>

### Quaternions

A quaternion is a 4-element vector that can describe a
3D rotation. Functions dealing with quaternions begin with "quat".

<a id=Generating_Quaternions></a>

#### Generating Quaternions

Functions that generate quaternions include:

* {@link MathUtil.quatIdentity} - Generates a quaternion describing an
absence of rotations.
* {@link MathUtil.quatFromVectors} - Generates a quaternion describing
a rotation from one vector to another.
* {@link MathUtil.quatFromMat4} - Generates a quaternion from a [**4x4 matrix**](#Matrices).
* {@link MathUtil.quatFromAxisAngle} - Generates a quaternion from an angle and [**axis of rotation**](#Axis_of_Rotation).
* {@link MathUtil.quatFromTaitBryan} - Generates a quaternion from Tait-Bryan angles.

<a id=Using_Quaternions></a>

#### Using Quaternions

For best results when using quaternions:

* Store the rotation of each object as a single quaternion.
* As rotations happen each frame, convert the rotation (which may be
  in pitch/yaw/roll or another form, depending on the input device) to a quaternion
  (see [**"Generating Quaternions"**](#Generating_Quaternions)
  and [multiply]{@link MathUtil.quatMultiply} that quaternion by the current
  quaternion to get the object's new rotation.
* Normalize the rotation quaternion (using [`quatNormalize()`]{@link MathUtil.quatNormalize}
 or [`quatNormalizeInPlace()`]{@link MathUtil.quatNormalizeInPlace})
  every few frames. (Quaternions that describe a 3D rotation should be [**unit vectors**](#Unit_Vectors).)

<a id=Multiplying_Quaternions></a>

#### Multiplying Quaternions

When two quaternions are multiplied (for example, with {@MathUtil.quatMultiply}),
the result is a combined rotation in which the second rotation happens
before the first rotation (when applied in the global coordinate frame).
Like matrix multiplication, the order in which you multiply quaternions is important.

<a id=Tait_Bryan_angles></a>

### Tait-Bryan angles

Pitch-yaw-roll angles (also called Tait-Bryan angles) describe three different rotations
of the same vector around three different axes, called the pitch, yaw, and roll axes
(or the X, Y, Z axes, respectively), which occur one after the other.  However:

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

* [MathUtil.quatFromTaitBryan()]{@link MathUtil.quatFromTaitBryan} -
Converts from Tait-Bryan angles to a quaternion
* [MathUtil.quatToTaitBryan()]{@link MathUtil.quatToTaitBryan} -
Converts from a quaternion to Tait-Bryan angles

<a id=4x4_Matrices></a>

### 4x4 Matrices

A 4x4 matrix can describe a 3D vector rotation; see [**"Rotation", above**](#Rotation).

<a id=Planes></a>

## Planes

A 4-element array can describe a plane in the following manner:

* The 4 elements, labeled A, B, C, and D in that order, describe a plane
 whose points satisfy the equation&mdash;

        Ax + By + Cz + D = 0

 where x, y, and z are the
 coordinates of any point lying on the plane.
* A, B, and C are
 the X, Y, and Z components of the plane's normal vector.
* D is the signed distance from the plane to the origin (0,0,0).
It's positive if the plane's normal points toward the origin, and
negative if it points away from the origin.
* D is the negative dot product of the
 plane's normal and any point on the plane.

There is one method that deals with planes:

* {@link MathUtil.planeNormalizeInPlace} - Converts the plane to a form in which
its normal has a length of 1.

<a id=Boxes></a>

## Boxes

An array of six numbers can describe an axis-aligned bounding box (AABB).
If it does, the first three numbers are the box's minimum X, Y, and Z coordinates,
and the last three numbers are the box's maximum X, Y, and Z coordinates.

If a minimum coordinate is greater than a maximum coordinate, then the
box is considered empty.

Methods that deal with boxes include:

* {@link MathUtil.boxCenter} - Finds a box's center.
* {@link MathUtil.boxDimensions} - Finds a box's dimensions.
* {@link MathUtil.boxIsEmpty} - Determines whether a box is empty.

<a id=Coordinate_Systems></a>

## Coordinate Systems

There are two conventions of 3D coordinate systems, left-handed and
right-handed:

* In a _left-handed_ coordinate system, the positive Z axis points _forward from the "eye"_ whenever the positive X axis points to the right and the positive Y axis points up.
* In a _right-handed_ coordinate system, the positive Z axis points _backward from the "eye"_ whenever the positive X axis points to the right and the positive Y axis points up.

To show this more visually, point one hand's thumb to your right and
its index finger up, and bend the other three fingers halfway down.  In a
coordinate system named after that hand (left-handed or
right-handed), if the positive X axis points in the thumb's
direction and the positive Y axis points in the index finger's direction, the Z axis will
point in the direction the other three fingers point.

As used here, the Z axis is the [cross product]{@link MathUtil.vec3cross}
of two perpendicular axes, namely the X axis and the Y axis, in that order.
Which of the X, Y, or Z axes is the right, up, or forward axis is
arbitrary; for example, some conventions may have the Z axis, rather than Y,
be the up axis.  Therefore, these three axes are defined here to avoid
confusion.

<a id=Differences_in_Behavior></a>

### Differences in Behavior

<a id=Projection_and_view_matrices></a>

#### Projection and view matrices

The difference between a left-handed and right-handed coordinate system
affects how 3D points are transformed, mainly in the projection and view
matrices.  The projection and view matrices returned by {@link Math}
matrix methods are designed for a right-handed coordinate system.  Their
documentation describes how to adjust them for a left-handed coordinate system.

<a id=Rotation_angles_such_as_used_in_mat4rotate_and_quatRotate></a>

#### Rotation angles (such as used in `mat4rotate` and `quatRotate`)

While the [**axis of rotation**](#Axis_of_Rotation) points backward from the "eye", if the angle's value
is positive and the [**coordinate system**](#Coordinate_Systems) is...

* ...right handed, then the angle runs counterclockwise.
* ...left handed, then the angle runs clockwise.

While the axis of rotation points backward from the "eye", if the angle's value
is negative, then the angle runs in the opposite direction.

<a id=Cross_product_vec3cross_and_normals></a>

#### Cross product (`vec3cross`) and normals

Given a triangle formed by...

* points (A minus C), (B minus C), and C, in that order, or
* points A, B, and (0, 0, 0), in that order,

the [cross product]{@link MathUtil.vec3cross} of the first point with the second,
in that order, is a _normal_ of that triangle (a vector that's perpendicular to the triangle's surface).

While this particular normal points backward from the "eye", the triangle's vertices
run in a counterclockwise path for right-handed coordinate systems, or a clockwise path
for left-handed systems. (In general, there are two possible choices for normals, which each
point in opposite directions.)

<a id=Winding_and_face_classification></a>

### Winding and face classification

A two-dimensional triangle has counterclockwise _winding_ if its vertices are ordered in a counterclockwise path from the first to second to third to first vertex. Otherwise, it has clockwise winding. If the triangle is in 3D space, it's first transformed into 2D _window coordinates_ before its winding is found. (Window coordinates roughly correspond to screen pixels.)

By default, in the GL pipeline, triangles with counterclockwise winding are _front faces_, and
other triangles are _back faces_.

<a id=Finding_a_triangle_s_winding></a>

#### Finding a triangle's winding

To find a triangle's winding, do the following calculation (X1, X2, X3 and Y1, Y2, Y3 are the window coordinates of its vertices). Note that half of the result will be the triangle's signed area.

    (X3 - X1) * (Y3 - Y2) - (X3 - X2) * (Y3 - Y1)

If the result is positive, and the window space X axis points right and the positive Y axis points...

* ...up (which is the case in WebGL), then the triangle
 has counterclockwise winding.
* ...down, then the triangle has clockwise winding.

If the result is negative, then the triangle has the opposite winding.
