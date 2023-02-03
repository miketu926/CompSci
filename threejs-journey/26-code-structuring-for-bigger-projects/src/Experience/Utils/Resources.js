import * as THREE from 'three'
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Resources extends EventEmitter {
    constructor(sources) {
        super() // loading bars can go here too, anything loading related (even a loading manager)

        // this is for all loading resources purposes
        // each resources in teh array will be defined by an obj
        // with name, type and path

        // options
        this.sources = sources

        // in the resources class we will have
        // items, toLoad, loaded

        // setup
        this.items = {} // once it's loaded we will add it here
        this.toLoad = this.sources.length
        this.loaded = 0

        // add loaders
        this.setLoaders()
        this.startLoading()

    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading() {
        // load each source
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            console.log('asset loaded and ready!')
            this.trigger('ready')
        }
    }
}