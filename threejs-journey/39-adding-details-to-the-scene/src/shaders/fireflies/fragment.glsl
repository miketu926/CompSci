

void main() {
    // can get every point coord by accessing gl_PointCoor vec2
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

    float strength = 0.05 / distanceToCenter; // we will still see edges
    // so we need to subtract the strength and double
    strength -= 0.05 * 2.0;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}