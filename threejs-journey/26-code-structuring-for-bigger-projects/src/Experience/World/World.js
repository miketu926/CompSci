import Experience from "../Experience";
import Environment from './Environment';
import Floor from './Floor';
import Fox from './Fox';

export default class World {
    constructor() {
        this.experience = new Experience()
        console.log(' THE WORLD!')

        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // // test mesh

        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshStandardMaterial({
        //         color: 'blue',
        //     })
        // )

        // this.scene.add(testMesh)

        // the environment might not have been loaded because the env loads after the cube!

        this.resources.on('ready', () => {
            console.log('resources are ready!')

            // setup
            // we are creating the environment map when resources are ready
            // where and how you lisetn to the ready event is up to you
            this.floor = new Floor() // floor should come before the env because the env map is applied after things are added to scene
            this.fox = new Fox()
            // keep env map last
            this.environment = new Environment()
        })

    }

    update() {
        if (this.fox) {
            this.fox.update()
        }
    }
}