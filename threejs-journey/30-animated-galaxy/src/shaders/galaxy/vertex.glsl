uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // because we want to modify position, use modelPosition and angles and uTime
    // to retreive an angle - use atan (arcTangent)
    float angle = atan(modelPosition.x, modelPosition.z);
    float distToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distToCenter) * uTime * 0.2;
    angle += angleOffset;

    modelPosition.x = cos(angle) * distToCenter;
    modelPosition.z = sin(angle) * distToCenter;

    // !!!! Randomness (cont.)
    // modelPosition.x += aRandomness.x;
    // modelPosition.y += aRandomness.y;
    // modelPosition.z += aRandomness.z;
    // same
    modelPosition.xyz += aRandomness;

    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    // test uTime
    // projectionPosition.y += uTime;




    gl_Position = projectionPosition;                

    // !!!! TOPIC!! POINTSIZE GETS SET BECAUSE THIS IS A POINTS!!!
    // this is a fragment size
    gl_PointSize = uSize * aScale;

    // this is attenutation in vertex glsl from shaderLib in threejs
    // mv here means model and view, same as viewPosition!
    // gl_PointSize *= ( scale / - mvPosition.z );

    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}