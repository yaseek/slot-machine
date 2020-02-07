export function Spin (duration) {
    if (!(this instanceof Spin)) {
        return new Spin(duration)
    }
    this.duration = duration,
    this.interval = duration * .2
    this.getEasingCoefficient = Spin.easing.linear.bind(this)
}

Spin.easing = {
    linear: () => 1,
    easeInOutQuad: function (duration) {
        return (((this.duration - duration) / this.duration * 2) - 1) ** 2
    },
    easeOutQuad: function (duration) {
        return (((this.duration - duration) / this.duration)) ** 2
    }
}

Spin.prototype.easing = function (fn) {
    this.getEasingCoefficient = fn.bind(this)
    return this
}

Spin.prototype.action = function (action, stop) {
    this.startTime = Date.now()

    if (this.interval <= 0) {
        return this
    }

    const spin = (duration) => {
        const coeff = this.getEasingCoefficient(duration)
        const newInterval = this.interval * (coeff + .1)
        
        action(coeff)
        
        return duration <= 0
            ? stop(this.startTime)
            : setTimeout(() => spin(duration - newInterval), newInterval)
    }

    action('start')
    spin(this.duration)
    return this
}
