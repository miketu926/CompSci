import '../style.css'
import * as THREE from 'three'
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import sources from './sources';
import Debug from './Utils/Debug';

// !!!! TOPIC!!! creating an singleton

let instance = null;


export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance;
        }
        window.experience = this;
        console.log(window.experience)
        instance = this /// this is to create a singleton!!!!


        // options
        this.canvas = canvas

        // setup
        this.debug = new Debug()
        this.debugFolder = this.debug.ui.addFolder('experience')

        this.debugObject = {
            destroy: () => this.destroy()
        }
        this.debugFolder.add(this.debugObject, 'destroy')

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // resize event
        this.sizes.on('resize', () => {
            // fat arrows does not lose context of this
            this.resize()
        })

        // time tick event
        this.time.on('tick', () => {
            this.update();
        })
    }

    resize() {
        // better to have resize event here and propagate to the children (or else you might face race conditions)
        console.log('i heard a resize')
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        // order matters
        this.camera.update()
        this.world.update()
        this.renderer.update()
        // console.log('update on tick or on requestAnimationFrame')
    }

    // read THREEJS HOW TO DISPOSE OF OBJ
    // read geometries, materials, textures, and then specific things like controls, passes, etc.
    destroy() {
        this.sizes.off('resize') // off removes event emitter
        this.time.off('tick')

        // have to check everything you have!!

        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material[key]
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        // make sure to dispose postprocessing (dispose EffectComposer its WebGLRenderTarger and any potential passes you are using)
        // dispose debug

        this.debug.ui.destroy()

        // removing the canvas could also be done. Once you dispose of everything an image will remain that is the canvas.
        // also remove eventListeners (this is just JS)
    }
}