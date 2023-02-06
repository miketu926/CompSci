precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture; // this is for textures!!!!!

// once we create the variable in vertex we can use it in fragment
varying float varyingRandom;
varying vec2 vUvCoords;
varying float vElevation;

// we need to decide the precision of the float
// highp (high precision) is slow and doesn't always work on all devices
// lowp is quicker but will cause bugs because its not enough precision
// we use mediump (when using ShaderMaterial it is automatically mediump)

void main() {
    // gl_FragColor = vec4(1.0, varyingRandom, 1.0, 0.5); // r g b a (alpha is the last letter)
    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
    // while looking at this, there is a vRandom on each of the vertex but the
    // edge connecting them gets interpolated between the 2 connected vertex colors


    // get colors of flag over to fragment vec4 b/c transparency is good too
    // we use fn texture2D to put textures on, first is the texture, 2nd param is
    // the where which colors get applied (uv coords!!!!!)

    gl_FragColor = vec4(uColor, 1.0); // uses uColor which is vecv3
    


    vec4 textureColor = texture2D(uTexture, vUvCoords); // switch over to jpg/png textures using fn texture2D
    // uUvCoords is the coordinates that a texture gets mapped over to so it knows where the colors go where

        // !!!!!! TOPIC!!!! LAST PARET 
    // exercise: passing random variables in (like vElevation)
    // to update lighting based on how close the flag is to the camera
    // the closer to the camera, the lighter
    // the further away from teh camera the darker

    textureColor *= vElevation * 2.0 + 0.75;


    // END OF LAST PART!!!
    
    
    gl_FragColor = textureColor; // texture2D returns a vec4


    // to test shader variables and values.. can pass into gl_FragColor and
    // see the obj change

}