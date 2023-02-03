import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
    constructor() {
        super()

        // setup
        this.width = window.innerWidth;
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)


        // resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight

            // yells something happen
            this.trigger('resize')
        })

        // event emitter => when a resize occurs, emit an event to renderer, camera, etc.

    }
}