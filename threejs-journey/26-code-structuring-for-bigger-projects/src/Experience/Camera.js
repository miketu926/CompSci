import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from "./Experience";

export default class Camera {
    constructor(experience) {
        // this.experience = experience; // when we create the camera, we need width and height
        // there are 3 ways to perform this, 1 is from window
        // another is a parameter
        // third is a singleton
        // this is an institation, but will only have 1 single institation.

        this.experience = new Experience() // this gets access to the SINGLETON value of Experience!!!!
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(
            this.instance,
            this.canvas
        )
        this.controls.enableDamping = true;
    }

    resize() {
        console.log('resize on the camera listening top level')
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        // also updates and listens in at top level for this update fn
        this.controls.update()
    }
}