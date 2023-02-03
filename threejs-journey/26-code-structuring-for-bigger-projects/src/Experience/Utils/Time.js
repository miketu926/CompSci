import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor() {
        super()

        this.start = Date.now()
        this.current = this.start // current 
        this.elapsed = 0;
        this.delta = 16; // around 16ms between frames

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime;
        this.elapsed = this.current - this.start
        // console.log(this.elapsed) time that has elapsed since the start
        // reassign currentTime to new tick time
        // elapsed is how long it has been since the start
        // delta is the time diff between current (not start) and the previous current
        // console.log(this.delta)

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick() // this keeps context
        })
    }
}