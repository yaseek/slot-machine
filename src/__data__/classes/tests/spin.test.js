import { Spin } from '../spin'

describe('spin', () => {
    it('functionality', (done) => {
        const action = jest.fn()
        Spin(100)
            .easing(Spin.easing.easeOutQuad)
            .action(
                action,
                () => {
                    expect(action).toHaveBeenCalled()
                    done()
                }
            )
    })
})
