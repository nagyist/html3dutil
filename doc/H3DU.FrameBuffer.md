# H3DU.FrameBuffer

[Back to documentation index.](index.md)

### H3DU.FrameBuffer(context, width, height) <a id='H3DU.FrameBuffer'></a>

<b>Deprecated: This class is likely to become a private class.
Use the FrameBufferInfo class instead, which is not coupled to WebGL
contexts.</b>

Represents an off-screen frame buffer.

When H3DU.FrameBuffer's
constructor is called, it will create a texture buffer with the given
width and height and a depth buffer with the same dimensions,
and will bind both to the frame buffer. The frame buffer currently
bound to the WebGL context will remain unchanged.

#### Parameters

* `context` (Type: WebGLRenderingContext | object)<br>
    WebGL context to associate with this buffer, or an object, such as H3DU.Scene3D, that implements a no-argument <code>getContext</code> method that returns a WebGL context.
* `width` (Type: Number)<br>
    Width, in pixels, of the frame buffer. Fractional values are rounded up.
* `height` (Type: Number)<br>
    Height, in pixels, of the frame buffer. Fractional values are rounded up.

### Members

* [height](#H3DU.FrameBuffer.height)<br>The frame buffer's height.
* [width](#H3DU.FrameBuffer.width)<br>The frame buffer's width.

### Methods

* [bind](#H3DU.FrameBuffer_H3DU.FrameBuffer_bind)<br>Has no effect.
* [dispose](#H3DU.FrameBuffer_H3DU.FrameBuffer_dispose)<br>Disposes all resources from this frame buffer object.
* [getContext](#H3DU.FrameBuffer_H3DU.FrameBuffer_getContext)<br>Gets the WebGL context associated with this frame buffer.
* [resize](#H3DU.FrameBuffer_H3DU.FrameBuffer_resize)<br>Resizes the frame buffer to a new width and height,
if either differs from the current width or height.
* [unbind](#H3DU.FrameBuffer_H3DU.FrameBuffer_unbind)<br>Has no effect.

### H3DU.FrameBuffer.height <a id='H3DU.FrameBuffer.height'></a>

The frame buffer's height.

### H3DU.FrameBuffer.width <a id='H3DU.FrameBuffer.width'></a>

The frame buffer's width.

### H3DU.FrameBuffer#bind() <a id='H3DU.FrameBuffer_H3DU.FrameBuffer_bind'></a>

Has no effect. (Previously, bound this frame buffer to the WebGL context associated with
it.)

#### Return Value

This object. (Type: <a href="H3DU.FrameBuffer.md">H3DU.FrameBuffer</a>)

### H3DU.FrameBuffer#dispose() <a id='H3DU.FrameBuffer_H3DU.FrameBuffer_dispose'></a>

Disposes all resources from this frame buffer object.

#### Return Value

Return value. (Type: void)

### H3DU.FrameBuffer#getContext() <a id='H3DU.FrameBuffer_H3DU.FrameBuffer_getContext'></a>

Gets the WebGL context associated with this frame buffer.

#### Return Value

Return value. (Type: WebGLRenderingContext)

### H3DU.FrameBuffer#resize(width, height) <a id='H3DU.FrameBuffer_H3DU.FrameBuffer_resize'></a>

Resizes the frame buffer to a new width and height,
if either differs from the current width or height.

#### Parameters

* `width` (Type: Number)<br>
    New width, in pixels, of the frame buffer. Fractional values are rounded up.
* `height` (Type: Number)<br>
    New height, in pixels, of the frame buffer. Fractional values are rounded up.

#### Return Value

This object. (Type: <a href="H3DU.FrameBuffer.md">H3DU.FrameBuffer</a>)

### H3DU.FrameBuffer#unbind() <a id='H3DU.FrameBuffer_H3DU.FrameBuffer_unbind'></a>

Has no effect. (Previously, unbound this frame buffer from its associated WebGL context.)

#### Return Value

Return value. (Type: void)
