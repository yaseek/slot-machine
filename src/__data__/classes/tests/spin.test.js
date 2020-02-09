import { Spin } from '../spin'

describe('spin', () => {
    it('functionality', (done) => {
        const action = jest.fn()
        Spin(100, 10)
            .easing(Spin.easing.easeOutQuad)
            .action(action)
            .then(() => {
                expect(action).toHaveBeenCalled()
                done()
            })
    })
})
