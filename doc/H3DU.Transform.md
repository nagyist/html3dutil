# H3DU.Transform

[Back to documentation index.](index.md)

<a name='H3DU.Transform'></a>
### new H3DU.Transform()

A class offering a convenient way to set a transformation
from one coordinate system to another.

### Methods

* [copy](#H3DU.Transform_copy)<br>Makes a copy of this transform.
* [getMatrix](#H3DU.Transform_getMatrix)<br>Gets the transformation matrix used by an object.
* [getPosition](#H3DU.Transform_getPosition)<br>Returns a copy of a three-element array giving the x-, y-, and z-coordinates of the position
of an object relative to its original position.
* [getQuaternion](#H3DU.Transform_getQuaternion)<br>Returns a copy of the rotation of an object in the form of a <a href="tutorial-glmath.md">quaternion</a>.
* [getScale](#H3DU.Transform_getScale)<br>Returns a copy of a three-element array giving the scaling for an object's width,
height, and depth, respectively.
* [isIdentity](#H3DU.Transform_isIdentity)<br>Returns whether this transform is the identity transform.
* [movePosition](#H3DU.Transform_movePosition)<br>Moves the relative position of an object from its original
position.
* [multQuaternion](#H3DU.Transform_multQuaternion)<br>Combines an object's current rotation with another rotation
described by a <a href="tutorial-glmath.md">quaternion</a> (a 4-element array
for describing 3D rotations).
* [multRotation](#H3DU.Transform_multRotation)<br>Combines an object's current rotation with another rotation
in the form of an angle and an axis of
rotation.
* [reset](#H3DU.Transform_reset)<br>Resets this transform to the untransformed state.
* [setMatrix](#H3DU.Transform_setMatrix)<br>Sets this transform's transformation matrix.
* [setPosition](#H3DU.Transform_setPosition)<br>Sets the relative position of an object from its original
position.
* [setQuaternion](#H3DU.Transform_setQuaternion)<br>Sets this transform's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a> (a 4-element array
for describing 3D rotations).
* [setRotation](#H3DU.Transform_setRotation)<br>Sets this transform's rotation in the form of an angle and an axis of
rotation.
* [setScale](#H3DU.Transform_setScale)<br>Sets the scale of an object relative to its original
size.

<a name='H3DU.Transform_copy'></a>
### H3DU.Transform#copy()

Makes a copy of this transform. The copied object
will have its own version of the rotation, scale,
position, and matrix data.

#### Return Value

A copy of this transform. (Type: Transform)

<a name='H3DU.Transform_getMatrix'></a>
### H3DU.Transform#getMatrix()

Gets the transformation matrix used by an object. Depending
on the state of this transform, will return either:<ul>
<li>The 4 &times; 4 matrix passed to Transform#setMatrix, if the
matrix was defined with that method
and the transform wasn't reset yet with Transform#resetTransform.
<li>The matrix resulting from the position, rotation, and scale properties,
multiplied in that order, otherwise.
</ul>

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Transform_getPosition'></a>
### H3DU.Transform#getPosition()

Returns a copy of a three-element array giving the x-, y-, and z-coordinates of the position
of an object relative to its original position.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Transform_getQuaternion'></a>
### H3DU.Transform#getQuaternion()

Returns a copy of the rotation of an object in the form of a <a href="tutorial-glmath.md">quaternion</a>.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Transform_getScale'></a>
### H3DU.Transform#getScale()

Returns a copy of a three-element array giving the scaling for an object's width,
height, and depth, respectively.
For each component, 1 means no scaling.

#### Return Value

Return value. (Type: Array.&lt;number>)

<a name='H3DU.Transform_isIdentity'></a>
### H3DU.Transform#isIdentity()

Returns whether this transform is the identity transform.

#### Return Value

Return value. (Type: boolean)

<a name='H3DU.Transform_movePosition'></a>
### H3DU.Transform#movePosition(x, y, z)

Moves the relative position of an object from its original
position. Has no effect if a matrix was defined with Transform#setMatrix
and the transform wasn't reset yet with Transform#resetTransform.

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>Number to add to the x-coordinate, If "y" and "z" are null, undefined, or omitted, this is instead a 3-element array giving the numbers to add to the x-, y-, and z-coordinates, or a single number to add to all three coordinates.
* `y` (Type: number)<br>Number to add to the y-coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: number)<br>Number to add to the z-coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: Transform)

<a name='H3DU.Transform_multQuaternion'></a>
### H3DU.Transform#multQuaternion(quat)

Combines an object's current rotation with another rotation
described by a <a href="tutorial-glmath.md">quaternion</a> (a 4-element array
for describing 3D rotations). The combined rotation will have the
same effect as the new rotation followed by the existing rotation.
Has no effect if a matrix was defined with Transform#setMatrix
and the transform wasn't reset yet with Transform#resetTransform.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A four-element array describing the rotation. A quaternion is returned from the methods MathUtil.quatFromAxisAngle or MathUtil.quatFromTaitBryan.

#### Return Value

This object. (Type: Transform)

#### Examples

    // Combine an object's rotation with a rotation 20 degrees about the x-axis
    transform.multQuaternion(MathUtil.quatFromAxisAngle(20,1,0,0));
    // Combine an object's rotation with identity
    transform.multQuaternion(MathUtil.quatIdentity());
    // Combine an object's rotation with 30 degree pitch multiplied
    // by 40 degree roll
    transform.multQuaternion(MathUtil.quatFromTaitBryan(30,0,40));

<a name='H3DU.Transform_multRotation'></a>
### H3DU.Transform#multRotation(angle, v, vy, vz)

Combines an object's current rotation with another rotation
in the form of an angle and an axis of
rotation. The combined rotation will have the
same effect as the new rotation followed by the existing rotation.
Has no effect if a matrix was defined with Transform#setMatrix
and the transform wasn't reset yet with Transform#resetTransform.

#### Parameters

* `angle` (Type: Array.&lt;number> | number)<br>The desired angle to rotate in degrees. See Transform#setRotation.
* `v` (Type: Array.&lt;number> | number)<br>X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively.
* `vy` (Type: number)<br>Y-component of the point lying on the axis of rotation.
* `vz` (Type: number)<br>Z-component of the point lying on the axis of rotation.

#### Return Value

This object. (Type: Transform)

<a name='H3DU.Transform_reset'></a>
### H3DU.Transform#reset()

Resets this transform to the untransformed state.

#### Return Value

This object. (Type: Transform)

<a name='H3DU.Transform_setMatrix'></a>
### H3DU.Transform#setMatrix(value)

Sets this transform's transformation matrix. This method
will set the position, rotation, and scale properties
accordingly to the matrix given.

#### Parameters

* `value` (Type: Array.&lt;number>)<br>A 4 &times; 4 matrix. This method will copy the value of this parameter.

#### Return Value

This object. (Type: Transform)

<a name='H3DU.Transform_setPosition'></a>
### H3DU.Transform#setPosition(x, [y], [z])

Sets the relative position of an object from its original
position. Has no effect if a matrix was defined with Transform#setMatrix
and the transform wasn't reset yet with Transform#resetTransform.

#### Parameters

* `x` (Type: Array.&lt;number> | number)<br>The x-coordinate. If "y" and "z" are null, undefined, or omitted, this is instead a 3-element array giving the x-, y-, and z-coordinates, or a single number giving the coordinate for all three dimensions.
* `y` (Type: number) (optional)<br>The y-coordinate. If "x" is an array, this parameter may be omitted.
* `z` (Type: number) (optional)<br>The z-coordinate. If "x" is an array, this parameter may be omitted.

#### Return Value

This object. (Type: Transform)

#### Examples

    // Set the relative position to 2 units along x-axis, 4 units along y-axis,
    // and 5 units along z-axis
    transform.setPosition(2,4,5);
    // same, but passing an array
    transform.setPosition([2,4,5]);

<a name='H3DU.Transform_setQuaternion'></a>
### H3DU.Transform#setQuaternion(quat)

Sets this transform's rotation in the form of a <a href="tutorial-glmath.md">quaternion</a> (a 4-element array
for describing 3D rotations). Has no effect if a matrix was defined with Transform#setMatrix
and the transform wasn't reset yet with Transform#resetTransform.

#### Parameters

* `quat` (Type: Array.&lt;number>)<br>A four-element array describing the rotation. A quaternion is returned from the methods MathUtil.quatFromAxisAngle and MathUtil.quatFromTaitBryan, among others.

#### Return Value

This object. (Type: Transform)

#### Examples

    // Set an object's rotation to 30 degrees about the x-axis
    transform.setQuaternion(MathUtil.quatFromAxisAngle(20,1,0,0));
    // Set an object's rotation to identity (the object isn't transformed)
    transform.setQuaternion(MathUtil.quatIdentity());
    // Set an object's rotation to 30 degree pitch multiplied
    // by 40 degree roll
    transform.setQuaternion(MathUtil.quatFromTaitBryan(30,0,40));
    // Set an object's rotation to 40 units about x-axis, 20 units about y-axis,
    // and 50 units about z-axis
    transform.setQuaternion(H3DU.MathUtil.quatFromTaitBryan(40,20,50));
    // Set an object's rotation to 20 units about y-axis
    transform.setQuaternion(H3DU.MathUtil.quatFromAxisAngle(20,0,1,0));

<a name='H3DU.Transform_setRotation'></a>
### H3DU.Transform#setRotation(angle, v, vy, vz)

Sets this transform's rotation in the form of an angle and an axis of
rotation. Has no effect if a matrix was defined with Transform#setMatrix
and the transform wasn't reset yet with Transform#resetTransform.

#### Parameters

* `angle` (Type: Array.&lt;number> | number)<br>The desired angle to rotate in degrees. If "v", "vy", and "vz" are omitted, this can instead be a 4-element array giving the axis of rotation as the first three elements, followed by the angle in degrees as the fourth element. If the axis of rotation points toward the viewer, a positive value means the angle runs in a counterclockwise direction for right-handed coordinate systems and in a clockwise direction for left-handed systems.
* `v` (Type: Array.&lt;number> | number)<br>X-component of the point lying on the axis of rotation. If "vy" and "vz" are omitted, this can instead be a 3-element array giving the axis of rotation in x, y, and z, respectively.
* `vy` (Type: number)<br>Y-component of the point lying on the axis of rotation.
* `vz` (Type: number)<br>Z-component of the point lying on the axis of rotation.

#### Return Value

This object. (Type: Transform)

<a name='H3DU.Transform_setScale'></a>
### H3DU.Transform#setScale(x, [y], [z])

Sets the scale of an object relative to its original
size. Has no effect if a matrix was defined with Transform#setMatrix
and the transform wasn't reset yet with Transform#resetTransform.

#### Parameters

* `x` (Type: number | Array.&lt;number>)<br>x-axis scaling factor for this transform. If "y" and "z" are null, undefined, or omitted, this is instead a 3-element array giving the scaling factors for X, Y, and Z dimensions, respectively, or a single number giving the scaling factor for all three dimensions.
* `y` (Type: number) (optional)<br>y-axis scaling factor for this transform.
* `z` (Type: number) (optional)<br>z-axis scaling factor for this transform.

#### Return Value

This object. (Type: Transform)

#### Examples

    // scale coordinates by 2x in all axes
    transform.setScale(2,2,2);
    // same, but passing an array
    transform.setScale([2,2,2]);

[Back to documentation index.](index.md)
