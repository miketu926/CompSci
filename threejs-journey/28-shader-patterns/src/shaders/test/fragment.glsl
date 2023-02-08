#define PI 3.1415926535897932384626433832795 // caps for constants

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

//	!!!!!!! TOPIC!!! START => Classic Perlin 2D Noise 
//	by Stefan Gustavson

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}
//	!!!!!!! TOPIC!!! END => Classic Perlin 2D Noise 

void main()
{
    float strengthFromLeftToRight = vUv.x;
    float strengthFromBottomToTop = vUv.y; // can also do math, like multiply 10.0 so it gradiants faster from 0->1;
    // to get 1->0 or flip the gradiant 
    float strengthFromRightToLeft = 1.0 - vUv.x;
    float strengthFromTopToBottom = 1.0 - vUv.y;

    // !!!!!! TOPIC!!!!!! different gradiant patterns below
    gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0); // or use desctructure next line
    gl_FragColor = vec4(vUv, 1.0, 1.0); // this is the color of 0->1x and 0->1y and blue
    gl_FragColor = vec4(vUv, 0.0, 1.0); // this is the color of 0->1x and 0->1y and 0 blue (industry test sample of this color)
    gl_FragColor = vec4(strengthFromLeftToRight, strengthFromLeftToRight, strengthFromLeftToRight, 1.0); // grayscale gradiant from left to right 0->1x
    gl_FragColor = vec4(strengthFromBottomToTop, strengthFromBottomToTop, strengthFromBottomToTop, 1.0); // grayscale gradiant from Bottom to Top 0->1y
    gl_FragColor = vec4(strengthFromRightToLeft, strengthFromRightToLeft, strengthFromRightToLeft, 1.0); // grayscale gradiant from Right to Left 1->0x
    gl_FragColor = vec4(strengthFromTopToBottom, strengthFromTopToBottom, strengthFromTopToBottom, 1.0); // grayscale gradiant from Top to Bottom 1->0y

    // !!!!!! TOPIC!!!!!! step patterns -> restarting the pattern like a staircase step : this uses modulo
    float limitGradient = mod(vUv.y * 10.0, 1.0); // mod ia a fn and the 2nd param means once the limit is reached go back

    if (limitGradient < 0.5) {
        limitGradient = 0.0;
    } else {
        limitGradient = 1.0;
    } // if else is bad for performance, but can use if/else

    // ternary also works but same as if/else
    limitGradient = limitGradient < 0.5 ? 0.0 : 1.0;
    // use a step fn! this is better for performance
    // step takes in a limit and a lookup value. if the value is < limit, returns 0, or above returns 1
    limitGradient = step(0.5, limitGradient); // can change 0.5 for thickness
    gl_FragColor = vec4(limitGradient, limitGradient, limitGradient, 1.0); // step grayscale gradiant from Top to Bottom 0->1y    

    float verticalLimitGradient = mod(vUv.x * 10.0, 1.0);
    verticalLimitGradient = step(0.9, verticalLimitGradient);
    gl_FragColor = vec4(verticalLimitGradient, verticalLimitGradient, verticalLimitGradient, 1.0); // step grayscale gradiant from Left to Right 0->1x


    // !!!!!! TOPIC!!!!!!  pattern 11 - a crossword boxed pattern
    float verticalStep = mod(vUv.x * 10.0, 1.0);
    float horizontalStep = mod(vUv.y * 10.0, 1.0);
    float crosswordGradientStep = step(0.9, verticalStep); // first assign veritcal step
    crosswordGradientStep += step(0.9, horizontalStep); // then add to vertical step the horizontal step
    gl_FragColor = vec4(crosswordGradientStep, crosswordGradientStep, crosswordGradientStep, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 12 - crossword dot pattern
    float crossDotPattern = step(0.9, verticalStep);
    crossDotPattern *= step(0.9, horizontalStep);
    gl_FragColor = vec4(crossDotPattern, crossDotPattern, crossDotPattern, 1.0);
    
    // !!!!!! TOPIC!!!!!!  pattern 13 - dashes pattern
    float dashesPattern = step(0.2, verticalStep); // make vertical lines thicker
    dashesPattern *= step(0.9, horizontalStep);
    gl_FragColor = vec4(dashesPattern, dashesPattern, dashesPattern, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 14 - logical negation symbol pattern ¬ square angled brackets
    // first focus on dash pattern as barX, then veritcal bars as barY, then add the 2 together
    float barsX = step(0.2, verticalStep); // make vertical lines thicker
    barsX *= step(0.9, horizontalStep); // then squeeze horizontal steps
    float barsY = step(0.9, verticalStep); // make horizontal lines thicker
    barsY *= step(0.2, horizontalStep); // thhen squeese veritcal steps
    float squareAngledBrackets = barsX + barsY; // add the 2 bars together
    gl_FragColor = vec4(squareAngledBrackets, squareAngledBrackets, squareAngledBrackets, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 15 - plus signs patterns
    float offsetBarsX = step(0.2, mod(vUv.x * 10.0 + 0.65, 1.0));
    offsetBarsX *= step(0.9,  mod(vUv.y * 10.0, 1.0)); // add an offset by playing with +0.65

    float offsetBarsY = step(0.9, mod(vUv.x * 10.0, 1.0));
    offsetBarsY *= step(0.2, mod(vUv.y * 10.0 + 0.65, 1.0)); // add an offset by playing with +0.65

    float plusSignsPattern = offsetBarsX + offsetBarsY;
    gl_FragColor = vec4(plusSignsPattern, plusSignsPattern, plusSignsPattern, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 16 - gradiant from light to dark and then back to light
    // think of a scale from 0-1, then you would offset it by - 0.5 to get a scale of -0.5 to 0.5
    // then take the abs of -0.5 to become 0.5 to 0 to 0.5
    float anotherGradientX = abs(vUv.x - 0.5); // offset, then absolute
    gl_FragColor = vec4(anotherGradientX, anotherGradientX, anotherGradientX, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 17 - light dark then light, on both vertical and horizontal with a light x strip
    float anotherGradientXY = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    gl_FragColor = vec4(anotherGradientXY, anotherGradientXY, anotherGradientXY, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 18
    float anotherGradientXYusingMax = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    gl_FragColor = vec4(anotherGradientXYusingMax, anotherGradientXYusingMax, anotherGradientXYusingMax, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 19, step (aka limit at a certain point to turn into black)
    float anotherGradientXYusingStepMax = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    gl_FragColor = vec4(anotherGradientXYusingStepMax, anotherGradientXYusingStepMax, anotherGradientXYusingStepMax, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 20, smaller square frame compared to pattern 19
    float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float anotherGradientXYusingInverseStepMax = square1 * square2;
    gl_FragColor = vec4(anotherGradientXYusingInverseStepMax, anotherGradientXYusingInverseStepMax, anotherGradientXYusingInverseStepMax, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 21, step gradiant from left to right (rounding to the first decimal place maybe on the 10th place)
    float regularGradientX = floor(vUv.x * 10.0) / 10.0;
    gl_FragColor = vec4(regularGradientX, regularGradientX, regularGradientX, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 22, boxed gradiant on x and on y
    float regularGradientXY = floor(vUv.x * 10.0) / 10.0;
    regularGradientXY*= floor(vUv.y * 10.0) / 10.0;
    gl_FragColor = vec4(regularGradientXY, regularGradientXY, regularGradientXY, 1.0);

    // !!!!!! TOPIC!!!!!!  pattern 23 - using the random() created fn! - there is no random in glsl
    float randomPlane = random(vUv); // takes in a vec2
    gl_FragColor = vec4(randomPlane, randomPlane, randomPlane, 1.0);

    // more patterns reference https://threejs-journey.com/lessons/shader-patterns#pattern-10
    // ...

    // !!!!!! TOPIC!!!!!!  COLORS!!!!!
    float testPlane = random(vUv); // takes in a vec2
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 0.8); // chagne 2nd param nums to update colors
    vec3 mixedColor = mix(blackColor, uvColor, testPlane);
    // clamp fn!
    mixedColor = clamp(mixedColor, 0.0, 1.0); // this clamps the value between 0 and 1, cannot go above or below these numbers
    gl_FragColor = vec4(mixedColor, 1.0);

}