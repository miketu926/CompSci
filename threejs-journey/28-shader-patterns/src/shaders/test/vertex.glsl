varying vec2 vUv; // passing this in to fragment, using the already defined uv because we're using ShaderMaterial and not RawShaderMaterial
// we will be using uv coords to draw shapes

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
}