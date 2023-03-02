uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // we are now using known variables to add randomness without having to pass new vars in
    // using modelPosition.x to pick a different spot on the x axies to start the sin wave
    // then aScale for the height of each 
    modelPosition.y += sin(uTime + modelPosition.x * 200.0) * aScale * 0.2; // the big particles are moving faster than small particles
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition; 
    
    gl_Position = projectionPosition;
    gl_PointSize =  uSize * aScale * uPixelRatio; // this is an exact pixel calculation for diff devices
    gl_PointSize *= (1.0 / - viewPosition.z); // this is for zooming in and out so that the pixel will update in size
    // aka sizeAttenuation. we will most likely always need this
    
}