# BSplineCurve

[Back to documentation index.](index.md)

<a name='BSplineCurve'></a>
### new BSplineCurve(controlPoints, knots, [bits])

**Augments:** <a href="Curve.md">Curve</a>

A <a href="Curve.md">curve evaluator object</a> for a B-spline (basis spline) curve.
A B-spline curve is a parametric curve based on polynomial functions.
Each polynomial is generated using one or more
<i>control points</i>, which more or less follow the path of the curve,
and a <i>knot vector</i>, which determines, more or less, where each control
point is spaced along the curve. Together with rational B-spline curves (see later), this makes B-spline curves very powerful,
since they can describe nearly all curves commonly used in computer
graphics, including line segments, circles, ellipses, parabolas, and
irregular smooth curves. With the B-spline curves supported here, a perspective transformation (including a rotation, translation, or scaling) of the curve's control points leads to the same transformation of the resulting curve.

<b>B&eacute;zier Curves</b>

A B&eacute;zier curve is defined by a series of control points, where
the first and last control points are the curve's end points, and
the remaining control points define the curve's shape, though they don't
necessarily cross the curve. An important property of these curves is
that the bounding box of the curve is contained within the bounding box
of the control points. Another important property is that the starting direction
is the same as the direction from the
first to the second control point, and the ending direction is the same as the
direction from the next-to-last to last control point.

B&eacute;zier curves are a subset of B-spline curves
(see <a href="BSplineCurve.md#BSplineCurve.fromBezierCurve">BSplineCurve.fromBezierCurve</a>).

Line segments are degree-1 B&eacute;zier curves with two control points.

A B&eacute;zier curve's knot vector consists of as many zeros as the number
of control points, followed by that many ones. For example, a degree-3 (cubic)
B&eacute;zier curve contains four control points and the following knot vector:
<code>[0, 0, 0, 0, 1, 1, 1, 1]</code>.

<b>Non-Uniform Curves</b>

A nonuniform B-spline curve is one whose knot vector is not evenly spaced,
that is, the difference between one knot and the next isn't the same.

<b>Rational Curves</b>

A rational B-spline curve is an N-dimensional curve with N plus one coordinates
per control point (<i>homogeneous coordinates</i>). B-spline algorithms
work the same way with homogeneous coordinates as with conventional
coordinates, but if N-dimensional points are wanted, use the <a href="BSplineCurve.md#BSplineCurve.DIVIDE_BIT">BSplineCurve.DIVIDE_BIT</a>
flag to divide each coordinate by the last (and omit the last coordinate)
to convert to N-dimensional points.

Rational B-spline curves can describe circles and ellipses, which nonrational B-spline curves can't.

Note that some B-spline packages define rational B-spline curves as using control points and weights, that is,
N-dimensional control points in conventional coordinates, along with a separate number, or <i>weight</i>,
for each control point. To convert such a control point to homogeneous coordinates, multiply each of its
conventional coordinates by its weight, then append the weight as the control point's last coordinate.

<b>NURBS Curves</b>

<i>NURBS</i> is an acronym for nonuniform rational B-spline curves.

<b>Polynomial Basis</b>

Any kind of polynomial curve can be converted to a different kind
of polynomial curve, having the same degree and describing the same path,
by transforming its control points. For example, a Hermite curve (another
kind of polynomial curve) can be converted to the equivalent
B-spline curve this way, or vice versa.

Each kind of polynomial curve (such as B-spline or B&eacute;zier) is
associated with a <i>basis matrix</i>, which defines the polynomial
coefficients for each control point in the curve. For a degree (N-1) curve,
the matrix will be N&times;N.

Each "column" of a basis matrix is a polynomial
containing the coefficients for each control point, and the columns are
arranged from left to right. Each polynomial consists of coefficients, ranging from the
highest order to the lowest, with respect to the parameter
<code>t</code> and the corresponding control point. For example, the
column <code>(3, 4, 2, 10)</code> describes the polynomial
3xt<sup>3</sup> + 4xt<sup>2</sup> + 2xt + 10x, where <code>x</code>
is the input control point. The polynomials
are added together to get the final coordinate of the curve at the
given <code>t</code> value.

The following JavaScript code shows an example of a basis matrix -- the
cubic B&eacute;zier basis matrix.<br>

    var bezierBasisMatrix = [
    // For the purposes of the Math matrix functions,
    // the polynomials are arranged "column-wise", like this:
    // P1, P2, P3, P4
    -1,3,-3,1,
    3,-6,3,0,
    -3,3,0,0,
    1,0,0,0]

For code that converts a curve from one kind to
another, see the example.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points. Each control point is an array with the same length as the other control points. It is assumed that the first control point's length represents the size of all the control points.
* `knots` (Type: Array.&lt;number>)<br>Knot vector of the curve. Its size must be at least 2 plus the number of control points and not more than twice the number of control points.<br> The length of this parameter minus 1, minus the number of control points, represents the <i>degree</i> of the B-spline curve. For example, a degree-3 (cubic) B-spline curve with four control points must contain eight knots, which is four (1 plus degree 3) more knots than the number of control points. A degree of 1 results in straight line segments.<br> The knot vector must be a nowhere increasing sequence, the first knot must not equal the last, and the same knot may not be repeated more than N+1 times at the beginning and end of the vector, or more than N times elsewhere, where N is the curve's degree. If the difference between one knot and the next isn't the same, the curve is considered a <i>nonuniform</i> B-spline curve. Usually the first knot will be 0 or less and the last knot will be 1 or greater. (Note that this class uses the definition of knot vectors given by <a href="https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/B-spline/bspline-curve.md">C.-K. Shene</a>. There are computer-aided design programs that use knot vectors in which the first and last knot are omitted; they can be converted to Shene's definition by repeating the first knot at the beginning and repeating the last knot at the end.)
* `bits` (Type: number) (optional)<br>Bits for defining input and controlling output. Zero or more of <a href="BSplineCurve.md#BSplineCurve.DIVIDE_BIT">BSplineCurve.DIVIDE_BIT</a>. If null, undefined, or omitted, no bits are set.

#### Examples

The following function can be used
to convert an array of control points, each consisting of conventional
coordinates and a weight, to homogeneous coordinates.
For example, the single-control point
'[[2, 3, 4, 0.1]]' becomes '[[0.2, 0.3, 0.4, 0.1]]'; the
return value can then be used in the BSplineCurve constructor
to create a rational B-Spline curve.

    function convertToHomogen(cp) {
    var ret = [];
    var cplen = cp[0].length;
    for(var i = 0; i < cp.length; i++) {
    var outp = [];
    var w = cp[i][cplen - 1];
    for(var j = 0; j < cplen - 1; j++) {
    outp[j] = cp[i][j] * w;
    }
    outp[cplen - 1] = w;
    ret.push(outp);
    }
    return ret;
    };

The following code converts a cubic (degree-3)
curve from one kind to another. The converted curve will generally
have the same path as the original curve.

    // "srcBasis" is a 4 &times; 4 basis matrix for the source curve type;
    // the control points will initially be of this type of curve.
    // var srcBasis = [ .... ]; // To be supplied or filled in.
    // "dstBasis" is a 4 &times; 4 basis matrix for the destination curve type.
    // It's defined here as the B&eacute;zier basis matrix for this example
    var dstBasis =[-1,3,-3,1, 3,-6,3,0, -3,3,0,0, 1,0,0,0];
    // Step 1: Invert the destination basis matrix
    var invertedDest=MathUtil.mat4invert(destBasis)
    // Step 2: Multiply the inverted destination matrix by the source
    // matrix
    var resultMatrix=MathUtil.mat4multiply(invertedDest,srcBasis)
    // Step 3: Convert the control points one dimension
    // at a time
    var newControlPoints=[[],[],[],[]]
    for(var i=0;i < controlPoints[0].length;i++) {
    var cp=[controlPoints[0][i],controlPoints[1][i],controlPoints[2][i],
    controlPoints[3][i]]
    // Transform the control points using the result matrix
    cp=MathUtil.vec4transform(resultMatrix,cp)
    // Set the new coordinates
    newControlPoints[0][i]=cp[0]
    newControlPoints[1][i]=cp[1]
    newControlPoints[2][i]=cp[2]
    newControlPoints[3][i]=cp[3]
    }
    // Finally, generate a B&eacute;zier curve (which is a special case
    // of a B-spline curve)
    var curve=new BSplineCurve(
    newControlPoints,
    [0,0,0,0,1,1,1,1] // cubic B&eacute;zier knot vector
    );
    // Alternatively, the curve could be generated with the
    // fromBezierCurve method:
    // var curve=BSplineCurve.fromBezierCurve(newControlPoints);

### Members

* [DIVIDE_BIT](#BSplineCurve.DIVIDE_BIT)<br>Indicates to divide each other coordinate of the returned point
by the last coordinate of the point and omit the last
coordinate.

### Methods

* [accel](#BSplineCurve_accel)<br>Finds an approximate acceleration vector at the given u-coordinate of this curve.
* [arcLength](#BSplineCurve_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.
* [changeEnds](#BSplineCurve_changeEnds)<br>Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same u-coordinates),
but has a different set of end points.
* [clamped](#BSplineCurve.clamped)<br>Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [clampedKnots](#BSplineCurve.clampedKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="BSplineCurve.md">BSplineCurve</a> or <a href="BSplineSurface.md">BSplineSurface</a> constructor,
except that with the knot vector the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.
* [endPoints](#BSplineCurve_endPoints)<br>Returns the starting and coordinates of this curve.
* [evaluate](#BSplineCurve_evaluate)<br>Evaluates the curve function based on a point
in a B-spline curve.
* [fitRange](#BSplineCurve_fitRange)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its u-coordinates remapped to fit the given range.
* [fromBezierCurve](#BSplineCurve.fromBezierCurve)<br>Creates a B-spline curve from the control points of a B&eacute;zier curve.
* [getControlPoints](#BSplineCurve_getControlPoints)<br>Gets a reference to the array of control points used
in this curve object.
* [getKnots](#BSplineCurve_getKnots)<br>Gets a reference to the array of knots used
in this curve object.
* [getLength](#BSplineCurve_getLength)<br>Convenience method for getting the total length of this curve.
* [getPoints](#BSplineCurve_getPoints)<br>Gets an array of positions on the curve at fixed intervals
of u-coordinates.
* [getPointsAsObjects](#BSplineCurve_getPointsAsObjects)<br>Gets an array of positions on the curve at fixed intervals
of u-coordinates.
* [jerk](#BSplineCurve_jerk)<br>Finds an approximate jerk vector at the given u-coordinate of this curve.
* [normal](#BSplineCurve_normal)<br>Finds an approximate principal normal vector at the given u-coordinate of this curve.
* [split](#BSplineCurve_split)<br>Splits this B-spline curve into two at the given point.
* [tangent](#BSplineCurve_tangent)<br>Convenience method for finding an approximate tangent vector of this curve at the given u-coordinate.
* [toArcLengthParam](#BSplineCurve_toArcLengthParam)<br>Gets a curve evaluator object for a curve that follows the same
path as this one but has its u-coordinates remapped to
an <i>arc length parameterization</i>.
* [uniform](#BSplineCurve.uniform)<br>Creates a B-spline curve with uniform knots.
* [uniformKnots](#BSplineCurve.uniformKnots)<br>Generates a knot vector with uniform knots, to be
passed to the <a href="BSplineCurve.md">BSplineCurve</a> or <a href="BSplineSurface.md">BSplineSurface</a> constructor.
* [velocity](#BSplineCurve_velocity)<br>Finds the velocity (derivative) of
this curve at the given point.

<a name='BSplineCurve.DIVIDE_BIT'></a>
### BSplineCurve.DIVIDE_BIT (constant)

Indicates to divide each other coordinate of the returned point
by the last coordinate of the point and omit the last
coordinate. This is used to convert
homogeneous coordinates to conventional coordinates.
If this bit is set, the length of each control point must be at least 2.

A B-spline curve that has control points whose last coordinate is other than
1 is a <i>rational</i> B-spline curve.

Default Value: `2`

<a name='BSplineCurve_accel'></a>
### BSplineCurve#accel(u)

Finds an approximate acceleration vector at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation using
the velocity vector.

The <b>acceleration</b> of a curve is a vector which is the second-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a glmath.

#### Parameters

* `u` (Type: number)<br>The Ucoordinate of a point on the curve.

#### Return Value

An array describing an acceleration vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='BSplineCurve_arcLength'></a>
### BSplineCurve#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>arcLength</code>
method if it implements it; otherwise, calculates a numerical integral using the velocity vector.

The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.

#### Parameters

* `u` (Type: number)<br>The Ucoordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given u-coordinate. (Type: number)

<a name='BSplineCurve_changeEnds'></a>
### BSplineCurve#changeEnds(ep1, ep2)

Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same u-coordinates),
but has a different set of end points.
For example, this method can be used to shrink the path of a curve
from [0, &pi;] to [0, &pi;/8].

Note, however, that in general, shrinking
the range of a curve will not shrink the length of a curve
in the same proportion, unless the curve's path runs at
constant speed with respect to time. For example, shrinking the range of a curve
from [0, 1] to [0, 0.5] will not generally result in a curve that's exactly half as
long as the original curve.

For some curves, this method can
also be used to grow the path of the curve.

#### Parameters

* `ep1` (Type: number)<br>New start point of the curve.
* `ep2` (Type: number)<br>New end point of the curve.

#### Return Value

Return value. (Type: <a href="Curve.md">Curve</a>)

<a name='BSplineCurve.clamped'></a>
### (static) BSplineCurve.clamped(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots, except that
the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>Array of control points as specified in the <a href="BSplineCurve.md">BSplineCurve</a> constructor.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="BSplineCurve.md">BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (Type: <a href="BSplineCurve.md">BSplineCurve</a>)

<a name='BSplineCurve.clampedKnots'></a>
### (static) BSplineCurve.clampedKnots(controlPoints, [degree])

Generates a knot vector with uniform knots, to be
passed to the <a href="BSplineCurve.md">BSplineCurve</a> or <a href="BSplineSurface.md">BSplineSurface</a> constructor,
except that with the knot vector the curve will start and end at the first and last control points and will
be tangent to the line between the first and second control points
and to the line between the next-to-last and last control points.

#### Parameters

* `controlPoints` (Type: number | Object)<br>Number of control points the curve will have, or an array of control points.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.

#### Return Value

A clamped uniform knot vector.
The first knot will be 0 and the last knot will be 1. (Type: Array.&lt;number>)

<a name='BSplineCurve_endPoints'></a>
### BSplineCurve#endPoints()

Returns the starting and coordinates of this curve.

#### Return Value

A two-element array containing
the starting and ending u-coordinates, respectively, of the curve. (Type: Array.&lt;number>)

<a name='BSplineCurve_evaluate'></a>
### BSplineCurve#evaluate(u)

Evaluates the curve function based on a point
in a B-spline curve.

#### Parameters

* `u` (Type: number)<br>Point on the curve to evaluate. This parameter is not scaled according to the curve's knot vector. To get the curve's extents, call this object's <code>endPoints</code> method.

#### Return Value

An array of the result of
the evaluation. Its length will be equal to the
length of a control point (minus 1 if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

#### Examples

    // Generate 11 points forming the curve.
    var points=[];
    for(var i=0;i<=10;i++) {
    points.push(curve.evaluate(i/10.0));
    }

<a name='BSplineCurve_fitRange'></a>
### BSplineCurve#fitRange(ep1, ep2)

Creates a curve evaluator object for a curve that follows the same
path as this one but has its u-coordinates remapped to fit the given range.
For example, this method can be used to shrink the range of u-coordinates
from [-&pi;, &pi;] to [0, 1] without shortening the path of the curve.
Here, -&pi; now maps to 0, and &pi; now maps to 1.

#### Parameters

* `ep1` (Type: number)<br>New value to use as the start point of the curve.
* `ep2` (Type: number)<br>New value to use as the end point of the curve.

#### Return Value

Return value. (Type: <a href="Curve.md">Curve</a>)

<a name='BSplineCurve.fromBezierCurve'></a>
### (static) BSplineCurve.fromBezierCurve(controlPoints, [bits])

Creates a B-spline curve from the control points of a B&eacute;zier curve.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>An array of control points. Each control point is an array with the same length as the other control points. It is assumed that:<ul> <li>The length of this parameter minus 1 represents the degree of the B&eacute;zier curve. For example, a degree-3 (cubic) curve contains 4 control points. A degree of 1 (two control points) results in a straight line segment. <li>The first control point's length represents the size of all the control points. </ul>
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="BSplineCurve.md">BSplineCurve</a> constructor.

#### Return Value

Return value. (Type: <a href="BSplineCurve.md">BSplineCurve</a>)

#### Examples

The following function generates a polygon curve using linear B&eacute;zier
curves.

    function polygonCurve(points) {
    var curves=[]
    for(var i=0;i < points.length;i++) {
    var cp=points[i]
    var np=(i==points.length-1) ? points[0] : points[i+1]
    curves.push(BSplineCurve.fromBezierCurve([cp,np]))
    }
    return new PiecewiseCurve(curves)
    }

<a name='BSplineCurve_getControlPoints'></a>
### BSplineCurve#getControlPoints()

Gets a reference to the array of control points used
in this curve object.

#### Return Value

An object described in the constructor to <a href="BSplineCurve.md">BSplineCurve</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='BSplineCurve_getKnots'></a>
### BSplineCurve#getKnots()

Gets a reference to the array of knots used
in this curve object.

#### Return Value

An object described in the constructor to <a href="BSplineCurve.md">BSplineCurve</a>. (Type: Array.&lt;Array.&lt;number>>)

<a name='BSplineCurve_getLength'></a>
### BSplineCurve#getLength()

Convenience method for getting the total length of this curve.

#### Return Value

The distance from the start of the curve to its end. (Type: number)

<a name='BSplineCurve_getPoints'></a>
### BSplineCurve#getPoints(count)

Gets an array of positions on the curve at fixed intervals
of u-coordinates. Note that these positions will not generally be
evenly spaced along the curve unless the curve uses
an arc-length parameterization.

#### Parameters

* `count` (Type: number)<br>Number of positions to generate. Throws an error if this number is 0. If this value is 1, returns an array containing the starting point of this curve.

#### Return Value

An array of curve positions. The first
element will be the start of the curve. If "count" is 2 or greater, the last element
will be the end of the curve. (Type: Array.&lt;Array.&lt;number>> | Array.&lt;Object>)

<a name='BSplineCurve_getPointsAsObjects'></a>
### BSplineCurve#getPointsAsObjects(count)

Gets an array of positions on the curve at fixed intervals
of u-coordinates. Note that these positions will not generally be
evenly spaced along the curve unless the curve uses
an arc-length parameterization. The positions will be in the form of objects with
up to four properties: x, y, z, and w retrieve the first, second, third,
and fourth coordinate of each position, respectively.

#### Parameters

* `count` (Type: number)<br>Number of positions to generate. Throws an error if this number is 0. If this value is 1, returns an array containing the starting point of this curve.

#### Return Value

An array of curve positions. The first
element will be the start of the curve. If "count" is 2 or greater, the last element
will be the end of the curve. (Type: Array.&lt;Array.&lt;number>> | Array.&lt;Object>)

#### Examples

The following example initializes a three.js BufferGeometry with the points retrieved by this method. This example requires the three.js library.

    var points=curve.getPointsAsObjects(50)
    var buffer=new THREE.BufferGeometry()
    .setFromPoints(points);

<a name='BSplineCurve_jerk'></a>
### BSplineCurve#jerk(u)

Finds an approximate jerk vector at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>jerk</code>
method if it implements it; otherwise, does a numerical differentiation using
the acceleration vector.

The <b>jerk</b> of a curve is a vector which is the third-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a glmath.

#### Parameters

* `u` (Type: number)<br>The Ucoordinate of a point on the curve.

#### Return Value

An array describing a jerk vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='BSplineCurve_normal'></a>
### BSplineCurve#normal(u)

Finds an approximate principal normal vector at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>normal</code>
method if it implements it; otherwise, does a numerical differentiation using the velocity vector.

The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
vector divided by that derivative's length. The normal returned by this method
<i>should</i> be "normalized" to a glmath. (Compare with <a href="Surface.md#Surface_gradient">Surface#gradient</a>.)

#### Parameters

* `u` (Type: number)<br>The Ucoordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='BSplineCurve_split'></a>
### BSplineCurve#split(u)

Splits this B-spline curve into two at the given point.

#### Parameters

* `u` (Type: number)<br>Point on the curve where this curve will be split.

#### Return Value

An array containing two B-spline curves: the
first is the part of the curve before the given point, and the second
is the part of the curve after the given point. The first element
will be null if <code>u</code> is at or before the start of the curve.
The second element
will be null if <code>u</code> is at or after the end of the curve. (Type: Array.&lt;<a href="BSplineCurve.md">BSplineCurve</a>>)

<a name='BSplineCurve_tangent'></a>
### BSplineCurve#tangent(u)

Convenience method for finding an approximate tangent vector of this curve at the given u-coordinate.
The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>The Ucoordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='BSplineCurve_toArcLengthParam'></a>
### BSplineCurve#toArcLengthParam()

Gets a curve evaluator object for a curve that follows the same
path as this one but has its u-coordinates remapped to
an <i>arc length parameterization</i>. Arc length
parameterization allows for moving along a curve's path at a uniform
speed and for generating points which are spaced evenly along that
path -- both features are more difficult with most other kinds
of curve parameterization.

The <i>end points</i> of the curve (obtained by calling the <code>endPoints</code>
method) will be (0, N), where N is the distance to the end of the curve from its
start.

When converting to an arc length parameterization, the curve
should be continuous and have a speed greater than 0 at every
point on the curve. The arc length parameterization used in
this method is approximate.

#### Return Value

Return value. Returns this object if this curve already uses an arc length parameterization. (Type: <a href="Curve.md">Curve</a>)

#### Examples

The following example uses the arc-length
parameterization to generate, uniformly at random, a point that lies anywhere
on a curve.

    var arclen = curve.toArcLengthParam();
    var point = arclen.evaluate(Math.random()*arclen.getLength())

<a name='BSplineCurve.uniform'></a>
### (static) BSplineCurve.uniform(controlPoints, [degree], [bits])

Creates a B-spline curve with uniform knots.

#### Parameters

* `controlPoints` (Type: Array.&lt;Array.&lt;number>>)<br>Array of control points as specified in the <a href="BSplineCurve.md">BSplineCurve</a> constructor.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.
* `bits` (Type: number) (optional)<br>Bits as specified in the <a href="BSplineCurve.md">BSplineCurve</a> constructor.

#### Return Value

Return value. The first
knot of the curve will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: <a href="BSplineCurve.md">BSplineCurve</a>)

<a name='BSplineCurve.uniformKnots'></a>
### (static) BSplineCurve.uniformKnots(controlPoints, [degree])

Generates a knot vector with uniform knots, to be
passed to the <a href="BSplineCurve.md">BSplineCurve</a> or <a href="BSplineSurface.md">BSplineSurface</a> constructor.

#### Parameters

* `controlPoints` (Type: number | Object)<br>Number of control points the curve will have, or an array of control points.
* `degree` (Type: number) (optional)<br>Degree of the B-spline curve. For example, 3 means a degree-3 (cubic) curve. If null, undefined, or omitted, the default is 3.

#### Return Value

A uniform knot vector. The first
knot will be 0 and the last knot will be 1. (This is a change from previous
versions.) (Type: Array.&lt;number>)

<a name='BSplineCurve_velocity'></a>
### BSplineCurve#velocity(u)

Finds the velocity (derivative) of
this curve at the given point.

#### Parameters

* `u` (Type: number)<br>Point on the curve to evaluate.

#### Return Value

An array giving the velocity vector.
It will have as many elements as a control point (or one fewer
if DIVIDE_BIT is set), as specified in the constructor. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)
