// gl_PointCoord is available and is specific to particles

// how to make thsee particles a 'disc' like shape

// 1. get dist from center to point
// 2. apply a step fn limit of 0.5, if it's below 0.5 it'll be 0, otherwise above it'll be 1
//   2a. then invert so it's 1 below 0.5 and 0 above 0.5

varying vec3 vColor;

void main() {
    // the center is 0.5 on x and y (if the plane is x y and starts at 0 to 1)
    // disc point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = step(0.5, strength);
    strength = 1.0 - strength;

    // diffuse point
    strength = distance(gl_PointCoord, vec2(0.5));
    strength *= 2.0;
    strength = 1.0 - strength;

    // light point button
    strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);


    // Final color of points
    // mix

    vec3 color = mix(vec3(0.0), vColor, strength);
    
    gl_FragColor = vec4(color, 1.0);
}