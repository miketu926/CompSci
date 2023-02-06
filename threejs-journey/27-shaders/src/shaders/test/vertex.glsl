// uniforms coming from threejs 
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 uFrequency; // can be floats, vec2s, vec3s etc.
uniform float uTime; // can be floats, vec2s, vec3s etc.

// attributes coming from threejs
attribute vec3 position;
attribute vec2 uv;
attribute float aRandom; // this comes from geometry.setAttributes('aRandom') in threejs

// create this vRandom var to pass into fragment
varying float varyingRandom;
varying vec2 vUvCoords;
varying float vElevation;

// !!!!!!!! topic function!!!!!! (go to main() first this fn is later at the end)


// uniforms are useful for having same shader but differnet results
// so create 1 shader, but that shader gets passed different vals
// depending on the different objs created
// change or animate the uniforms
// we can use the uniforms in both vertex and fragment


float lorenIpsum(float testA, float testB) {
    float a = 1.0;
    float b = 2.0;

    // can also take in parameters
    return a + b;  
}

void main() {  // this void is required and will be called automatically, no returns.


    ///// !!!! TOPIC SYNTAX FOR GLSL
    float a = 1.0; // this is a typed lang. example of var declaration
    int testBar = 1;
    float b = 2.0;
    float c = a/b; // we dont use int usually b/c we see floats all the time

    float conversion = a / float(testBar); // conversion to float

    bool foo = true;
    bool bar = false;

    vec2 testVec2 = vec2(1.0, 2.0);
    vec3 testVec3 = vec3(1.0, 2.0, 2.0);

    // can change modify
    testVec2.x = 3.0;

    // an operation that can work with all keys inside a vec
    testVec2 *= 2.0; // this results in all keys being multiplied across x will be 6.0 and y will be 4.0

    // vec 3 notes:
    vec3 testVector3 = vec3(0.0); // this fills all vec 3 items
    
    vec3 purpleColor = vec3(0.0);
    purpleColor.r = 0.5; // just can use x or r / aliases for vec3 (xyz, rgb)
    purpleColor.b = 1.0;

    // can create a vec3 using a vec2

    vec2 creatingVec3From2 = vec2(1.0, 2.0);
    vec3 creatingVec3 = vec3(creatingVec3From2, 3.0);

    // can create vec2 using vec3 first 2 values
    vec2 createVec2FromVec3 = testVec3.xz; // called swizzle, can reorder and asign any x y or z

    // vec4
    vec4 testVec4 = vec4(1.0, 2.0, 3.0, 4.0);
    float vec4x = testVec4.x;
    float vec4y = testVec4.y;
    float vec4z = testVec4.z;
    float vec4w = testVec4.w; // 4th one after z is w!!!!!! can also use RGBA


    // there are other types like mat2, mat3, mat4, sampler2D etc.


    /// !!!! TOPIC!! can create fn, this fn is delcared up top!
    float result = lorenIpsum(1.0, 2.0);

    // has access to sin, cos, max, min, pow, excp, mod, clamp
    // cross, dot, mix, step, smoothstep, length, distance, reflect, refract, normalize
    // END TOPIC SYNTAX!!!!!!!!!



    // NOW FOR VOID()!!!!!!!!!!!!!!! and VERTEX!!!!!!!!!!!!
    // gl_Position - this var already exists and reassigning it.
    // will contain the position of the vertex of the screen/render


    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); /// this line is part of void main()


    // gl_Position is a vec4
    // gl_Position.x *= 0.5; // don't change things like this but it can be done
    // position comes from the top attribute vec3 position, this comes from the threejs Geometry (xyz attribute from this)

    // each matrix will transform the position of each matrix until we get the clip space coordinates
    // the clip space is the view from the camera into the 3d scene

    // modelMatrix = applies transformations relative to the Mesh (position, rotation, scale)
    // this comes in from geometry.position.x = 1 (this gets applied in modelMatrix and multiptlied to get an updated gl_Position)
    
    // viewMatrix applies transomations relative to the Camera (position, rotation, field of view, near and far)
    // projectionMatrix transform the coordinates into the clip space coordinates (in the order from vec4(position), then modelMatrix, then viewMatrix, and then lastly it's projectionMatrix)

    // we will break down gl_Position now

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // modelPosition.y += 1.0; // now we can modify the Mesh
    // modelPosition.z += 0.5; // move it towards the camera

    // we can now use uFrequency because it was passed in via threejs
    // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    /////////// TOPIC!!! lets pass in stuff into fragmnet (like making colors lighter or darker further away from camera)
    // make var and then point it to the 2 sins above
    // this is a variable now that we can pass in!!
    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1; 


    modelPosition.z += elevation;

    modelPosition.z += aRandom * 0.1; // way too strong so multiply by 0.1
    // now that a rand value has been applied to every single vertex, we will color it based
    // on the height of this, sending data to fragment using varying!!!!!!!!

    // !! TOPIC !!!!! ANIMATINO FROM UNIFORMS PASSED IN 
    // test:
    // modelPosition.y += uTime; // uTime comes in!!
    // now add uTime to sin


    

    vec4 viewPosition = viewMatrix * modelPosition; // no need to multiply by vec4 because it is already a vec4
    vec4 projectedPosition = projectionMatrix * viewPosition;

    // then at the end the result of gl_Position is the same as gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectedPosition;

    varyingRandom = aRandom; // set it to aRandom so it matches, then send varyingRandom to fragment
    vUvCoords = uv;
    vElevation = elevation;

    // to get uvCoords, we cannot pass uvCoords to textures in fragment via attributes
    // so we need to copy uvCoords as attributes and pass it as varying


    
    
}

