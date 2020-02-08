export function Spin (duration, interval) {
    if (!(this instanceof Spin)) {
        return new Spin(duration, interval)
    }
    this.duration = duration
    this.interval = interval
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

Spin.prototype.action = function (action) {
    return new Promise((resolve) => {
        const startTime = Date.now()

        if (this.interval <= 0) {
            return resolve(startTime)
        }

        const spin = (duration) => {
            const coeff = this.getEasingCoefficient(duration)
            const newInterval = this.interval * (coeff + .1)
            
            action(coeff)
            
            return duration - newInterval <= 0
                ? resolve(startTime)
                : setTimeout(() => spin(duration - newInterval), newInterval)
        }

        spin(this.duration)
    })
}
