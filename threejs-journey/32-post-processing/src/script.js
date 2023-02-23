import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'
import { EffectComposer } from 'three/examples/jsm//postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm//postprocessing/RenderPass'
import { DotScreenPass } from 'three/examples/jsm//postprocessing/DotScreenPass'
import { GlitchPass } from 'three/examples/jsm//postprocessing/GlitchPass'
import { RGBShiftShader } from 'three/examples/jsm//shaders/RGBShiftShader'
import { ShaderPass } from 'three/examples/jsm//postprocessing/ShaderPass'
import { GammaCorrectionShader } from 'three/examples/jsm//shaders/GammaCorrectionShader'
import { SMAAPass } from 'three/examples/jsm//postprocessing/SMAAPass'
import { SSAARenderPass } from 'three/examples/jsm//postprocessing/SSAARenderPass'
import { SSAOPass } from 'three/examples/jsm//postprocessing/SSAOPass'
import { UnrealBloomPass } from 'three/examples/jsm//postprocessing/UnrealBloomPass'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMapIntensity = 2.5
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

/**
 * Models
 */
gltfLoader.load(
    '/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(2, 2, 2)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    
    /// !!!! TOPIC!!! we need to handle resize like we do on renderer but now on effectComposer

    // Update effectComposer
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    
    
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 1, - 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1.5
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * !!!!! TOPIC!!! EFFECT COMPOSER!!!! POST-PROCESSING!
 */

// render target !!!
const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    // !!!!! TOPIC!!! EFFECT COMPOSER!!!! POST-PROCESSING!
    {
        // samples: 2, // reactivates anti-alias!!! for now 2, the higher the worse performance, 2 is the sweet spot. 
        // This won't work on all modern browsers. 
        samples: renderer.getPixelRatio() === 1 ? 2 : 0, // we don't need if pixelRatio > 1 (performance) . Always add this, will be 0 if
        // it's on webgl1, otherwise webgl2 uses this antialias samples. An if statement at SSAApass for older browsers added below which
        // is a check for !isWebGL2 and pixelRatio === 1
    }
)

const effectComposer = new EffectComposer(renderer, renderTarget);
effectComposer.setPixelRatio(renderer.getPixelRatio())
effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

const dotScreenPass = new DotScreenPass();
dotScreenPass.enabled = false;
effectComposer.addPass(dotScreenPass);

const glitchPass = new GlitchPass();
glitchPass.goWild = false;
glitchPass.enabled = false;
effectComposer.addPass(glitchPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.enabled = false;
effectComposer.addPass(rgbShiftPass)

const unrealBloomPass = new UnrealBloomPass();
unrealBloomPass.enabled = false;
unrealBloomPass.strength = 0.3
unrealBloomPass.radius = 1
unrealBloomPass.threshold = 0.6
effectComposer.addPass(unrealBloomPass)

gui.add(unrealBloomPass, 'enabled').name('unrealBloomPass');
gui.add(dotScreenPass, 'enabled').name('dotScreenPass');
gui.add(glitchPass, 'enabled').name('glitchPass');
gui.add(rgbShiftPass, 'enabled').name('rgbShiftPass');


// !!!! TOPIC!! CREATE YOUR OWN PASS (example: Tint Pass);
const TintShader = {
    uniforms: {
        tDiffuse: { value: null }, // this is required, effectComposer will check tDiffuse, if there is a previous renderTarget it'll put on this
        uTint : { value: null }, // custom rgb values passed in
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv; // uv exists as an attribute already
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uTint;

        varying vec2 vUv;
        
        void main() {
            vec4 color = texture2D(tDiffuse, vUv); // this is the previous render target texture that we can modify as a texture2D
            // color.r += 0.1;
            // color.b += 0.1;

            // now we use uTint as a dyanmic variable
            color.rgb += uTint;

            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // instead of this, assign it color
            gl_FragColor = color;
        }
    `,
}

const tintPass = new ShaderPass(TintShader);
tintPass.enabled = false;
tintPass.material.uniforms.uTint.value = new THREE.Vector3(); // uTint gets accessed here!!!!!
effectComposer.addPass(tintPass)

gui.add(tintPass, 'enabled').name('tintPass');
gui.add(tintPass.material.uniforms.uTint.value, 'x').min(-1).max(1).step(0.001).name('red');
gui.add(tintPass.material.uniforms.uTint.value, 'y').min(-1).max(1).step(0.001).name('green');
gui.add(tintPass.material.uniforms.uTint.value, 'z').min(-1).max(1).step(0.001).name('blue');

/// another custom displacement pass (makes it wavy animation)
const DisplacementShader = {
    uniforms: {
        tDiffuse: { value: null }, // this is required, effectComposer will check tDiffuse, if there is a previous renderTarget it'll put on this
        uTime: { value: null }, // null gets converted to 0
        uNormalMap: { value: null }, // send a custom texture!!!!
    },
    vertexShader: `
        varying vec2 vUv;

        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv; // uv exists as an attribute already
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform sampler2D uNormalMap;

        varying vec2 vUv;
        
        void main() {
            vec2 newUv = vUv; // make newUv;
            newUv = vec2(
                vUv.x,
                vUv.y + sin(vUv.x * 10.0 + uTime) * 0.1
            );

            newUv = vUv;

            // using uNormalMap as a custom texture being passed in
            vec3 normalColor = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
            // test by assigning gl_FragColor = normalColor and see if the loaded texture shows up

            newUv += normalColor.rg * 0.1; // 0.1 for softer

            vec4 color = texture2D(tDiffuse, newUv); // this is the previous render target texture that we can modify as a texture2D
            vec3 lightDirection = normalize(vec3(-1.0, 1.0, 0.0)); 
            float lightness = dot(normalColor, lightDirection); // this supposedly is 1 when normalColor and lightDirection points at each other (making it brighter)
            lightness = clamp(lightness, 0.0, 1.0); // this is 0 at bottom limit (not -1 because it shows up black) and 1 as top limit for light
            // and if pointing away from eachother it's -1 which is essentially black

            color.rgb += lightness * 2.0;

            
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // instead of this, assign it color
            gl_FragColor = color;
        }
    `,
}

const displacementShader = new ShaderPass(DisplacementShader);
displacementShader.enabled = false;
displacementShader.material.uniforms.uTime.value = 0;
effectComposer.addPass(displacementShader)
gui.add(displacementShader, 'enabled').name('displacementShader');

// sending in a custom texture!!!!!!
const displacementPass = new ShaderPass(DisplacementShader);
displacementPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png');
displacementPass.enabled = true;
effectComposer.addPass(displacementPass)
gui.add(displacementPass, 'enabled').name('displacementPass');

// !!!! TOPIC!! There is an issue with RGBShiftShader, renderer.outputEncoding = THREE.sRGBEncoding does not work but only works on regular renderer.
// we need to add this back somehow, via a pass. When we do passes, we add this at the very end of the pass as correction
const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
effectComposer.addPass(gammaCorrectionPass)

// !!! TOPIC!!! AntiAlias passes go LAST!!! EVEN AFTER GAMMA CORRECTION
// SMAA pass for older browsers, not using samples up top

if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
    const smaaaPass = new SMAAPass();
    effectComposer.addPass(smaaaPass)
    console.log('using SMAA')
}

// SSAA pass SSAARenderPass // try this but doesn't work... my own test
// const ssaaPass = new SSAARenderPass()
// effectComposer.addPass(ssaaPass)

// SSAO pass SSAOPass // try this but doesn't work.... my own test
// const ssaoPass = new SSAOPass()
// effectComposer.addPass(ssaoPass)


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    displacementShader.material.uniforms.uTime.value = elapsedTime;

    // Render
    // renderer.render(scene, camera)

    // !!!!TOPIC!!!!!! DON'T USE RENDER!!! USE EFFECTCOMPOSER NOW!!!!

    effectComposer.render()
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()