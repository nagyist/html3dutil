# Curve

[Back to documentation index.](index.md)

<a name='Curve'></a>
### new Curve(curve, [curveParam])

A curve evaluator object for a parametric curve.

A parametric curve is a curve whose points are based on a
parametric curve function. A curve function takes a number
(U) and returns a point (in 1 or more dimensions, but
usually 2 or 3) that lies on the curve. For example, in 3
dimensions, a curve function has the following form:

<b>F</b>(u) = [ x(u), y(u), z(u) ]

where x(u) returns an x-coordinate, y(u) a y-coordinate,
and z(u) returns a z-coordinate.

Classes or JavaScript objects defining parametric curves should implement
the <code>evaluate</code> method and, optionally, the other methods mentioned in the "curve" parameter below.

#### Parameters

* `curve` (Type: Object)<br>A <b>curve evaluator object</b>, which is an object that must contain an <code>evaluate</code> method and may contain an <code>endPoints</code>, <code>velocity</code>, <code>accel</code>, <code>jerk</code>, <code>normal</code>, and/or <code>arcLength</code> method, as described in the corresponding methods of this class.
* `curveParam` (Type: Object) (optional)<br>An object for reparameterizing a curve object. It implements a method named <code>endPoints</code>, which has the same meaning as <a href="Curve.md#Curve_endPoints">Curve#endPoints</a> and whose return value takes precedence over the given curve's <code>endPoints</code> method. It also implements a method named <code>getCoordinate(u)</code>, which converts a u-coordinate in the old parameterization to a u-coordinate in the new parameterization.

#### Examples

The following is a simple example of a parametric curve.

    var simpleCurve = new Curve({
    "evaluate":function(u) {
    return [Math.cos(u) * 1.5, Math.sin(u) * 0.8, 0];
    },
    "endPoints":function() {
    return [-Math.PI, Math.PI];
    }
    });

The following function defines a parametric circle curve. It demonstrates how all methods
defined for curve evaluator objects can be implemented.

    var circle=new Curve({"evaluate":function(u) {
    "use strict";
    return [Math.cos(u),Math.sin(u),0]
    },
    "velocity":function(u) {
    return [-Math.sin(u),Math.cos(u),0]
    },
    "accel":function(u) {
    return [-Math.cos(u),-Math.sin(u),0]
    },
    "jerk":function(u) {
    return [Math.sin(u),-Math.cos(u),0]
    },
    "normal":function(u) {
    // NOTE: The velocity vector will already be a
    // unit vector, so we use the accel vector instead
    return MathUtil.vec3normalize(this.accel(u));
    },
    "arcLength":function(u) {
    return u;
    },
    "endPoints":function(u) {
    return [0,Math.PiTimes2]
    }
    });

The following method
starts a curve at a different offset and wraps the portion
of the curve behind that offset at the end of the original
curve. This is useful for offsetting the points retrieved
with the getPoints method.

    function wrapAtOffset(curve, offset) {
     "use strict";
    var c=curve
    if(offset!=0) {
    var ep=curve.endPoints();
    c=new Curve({
    evaluate:function(u) {curves.evaluate(
    u+offset>ep[1] ? (u+offset)-ep[1] : (u+offset))},
    endPoints:function() {return ep;}
    });
    }
    return c;
    }

### Methods

* [accel](#Curve_accel)<br>Finds an approximate acceleration vector at the given u-coordinate of this curve.
* [arcLength](#Curve_arcLength)<br>Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.
* [changeEnds](#Curve_changeEnds)<br>Creates a curve evaluator object for a curve that is generated using
the same formula as this one (and uses the same u-coordinates),
but has a different set of end points.
* [endPoints](#Curve_endPoints)<br>Returns the starting and ending u-coordinates of this curve.
* [evaluate](#Curve_evaluate)<br>Finds the position of this curve at the given u-coordinate.
* [fitRange](#Curve_fitRange)<br>Creates a curve evaluator object for a curve that follows the same
path as this one but has its u-coordinates remapped to fit the given range.
* [getLength](#Curve_getLength)<br>Convenience method for getting the total length of this curve.
* [getPoints](#Curve_getPoints)<br>Gets an array of positions on the curve at fixed intervals
of u-coordinates.
* [getPointsAsObjects](#Curve_getPointsAsObjects)<br>Gets an array of positions on the curve at fixed intervals
of u-coordinates.
* [jerk](#Curve_jerk)<br>Finds an approximate jerk vector at the given u-coordinate of this curve.
* [normal](#Curve_normal)<br>Finds an approximate principal normal vector at the given u-coordinate of this curve.
* [tangent](#Curve_tangent)<br>Convenience method for finding an approximate tangent vector of this curve at the given u-coordinate.
* [toArcLengthParam](#Curve_toArcLengthParam)<br>Gets a curve evaluator object for a curve that follows the same
path as this one but has its u-coordinates remapped to
an <i>arc length parameterization</i>.
* [velocity](#Curve_velocity)<br>Finds an approximate velocity vector at the given u-coordinate of this curve.

<a name='Curve_accel'></a>
### Curve#accel(u)

Finds an approximate acceleration vector at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>accel</code>
method if it implements it; otherwise, does a numerical differentiation using
the velocity vector.

The <b>acceleration</b> of a curve is a vector which is the second-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>The u-coordinate of a point on the curve.

#### Return Value

An array describing an acceleration vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='Curve_arcLength'></a>
### Curve#arcLength(u)

Finds an approximate arc length (distance) between the start of this
curve and the point at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>arcLength</code>
method if it implements it; otherwise, calculates a numerical integral using the velocity vector.

The <b>arc length</b> function returns a number; if the curve is "smooth", this is the integral, from the starting point to <code>u</code>, of the length of the velocity vector.

#### Parameters

* `u` (Type: number)<br>The u-coordinate of a point on the curve.

#### Return Value

The approximate arc length of this curve at the given u-coordinate. (Type: number)

<a name='Curve_changeEnds'></a>
### Curve#changeEnds(ep1, ep2)

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

<a name='Curve_endPoints'></a>
### Curve#endPoints()

Returns the starting and ending u-coordinates of this curve.

#### Return Value

A two-element array. The first element is the starting coordinate of
the curve, and the second is its ending coordinate.
Returns <code>[0, 1]</code> if the evaluator doesn't implement an <code>endPoints</code>
method.

<a name='Curve_evaluate'></a>
### Curve#evaluate(u)

Finds the position of this curve at the given u-coordinate.

#### Parameters

* `u` (Type: number)<br>The u-coordinate of a point on the curve.

#### Return Value

An array describing a position. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='Curve_fitRange'></a>
### Curve#fitRange(ep1, ep2)

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

<a name='Curve_getLength'></a>
### Curve#getLength()

Convenience method for getting the total length of this curve.

#### Return Value

The distance from the start of the curve to its end. (Type: number)

<a name='Curve_getPoints'></a>
### Curve#getPoints(count)

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

<a name='Curve_getPointsAsObjects'></a>
### Curve#getPointsAsObjects(count)

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

<a name='Curve_jerk'></a>
### Curve#jerk(u)

Finds an approximate jerk vector at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>jerk</code>
method if it implements it; otherwise, does a numerical differentiation using
the acceleration vector.

The <b>jerk</b> of a curve is a vector which is the third-order derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>The u-coordinate of a point on the curve.

#### Return Value

An array describing a jerk vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='Curve_normal'></a>
### Curve#normal(u)

Finds an approximate principal normal vector at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>normal</code>
method if it implements it; otherwise, does a numerical differentiation using the velocity vector.

The <b>principal normal</b> of a curve is the derivative of the "normalized" velocity
vector divided by that derivative's length. The normal returned by this method
<i>should</i> be "normalized" to a unit vector. (Compare with <a href="Surface.md#Surface_gradient">Surface#gradient</a>.)

#### Parameters

* `u` (Type: number)<br>The u-coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='Curve_tangent'></a>
### Curve#tangent(u)

Convenience method for finding an approximate tangent vector of this curve at the given u-coordinate.
The <b>tangent vector</b> is the same as the velocity vector, but "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>The u-coordinate of a point on the curve.

#### Return Value

An array describing a normal vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

<a name='Curve_toArcLengthParam'></a>
### Curve#toArcLengthParam()

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

<a name='Curve_velocity'></a>
### Curve#velocity(u)

Finds an approximate velocity vector at the given u-coordinate of this curve.
The implementation in <a href="Curve.md">Curve</a> calls the evaluator's <code>velocity</code>
method if it implements it; otherwise, does a numerical differentiation using
the position (from the <code>evaluate</code> method).

The <b>velocity</b> of a curve is a vector which is the derivative of the curve's position at the given coordinate. The vector returned by this method <i>should not</i> be "normalized" to a unit vector.

#### Parameters

* `u` (Type: number)<br>The u-coordinate of a point on the curve.

#### Return Value

An array describing a velocity vector. It should have at least as many
elements as the number of dimensions of the underlying curve. (Type: Array.&lt;number>)

[Back to documentation index.](index.md)
