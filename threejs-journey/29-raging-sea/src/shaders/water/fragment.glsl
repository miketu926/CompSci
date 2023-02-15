// can directly access uniforms from threejs

// uniforms
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uElevationOffsetForColor;
uniform float uMultiplierForColor;


// small perforamnce gain from passing in via varying
// varying vec3 vDepthColor;
// varying vec3 vSurfaceColor;
varying float vElevation;

void main() {

    // mix fn is taking uDpethColor or take uSurfaceColor based on elevation

    float mixStrength = (vElevation * uElevationOffsetForColor) * uMultiplierForColor;
    
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    gl_FragColor = vec4(color, 1.0);
}