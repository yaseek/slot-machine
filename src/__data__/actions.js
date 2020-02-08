import _ from 'lodash'
import { Spin } from './classes'
import * as types from './action-types'

export const spinSingleReel = (reel, duration, interval) => (dispatch) =>
    Spin(duration, interval)
        .easing(Spin.easing.easeOutQuad)
        .action(
            () => dispatch({ type: types.REEL_STEP, reel }),
            (startTime) => dispatch({ type: types.REEL_FINISH, reel, time: Date.now() - startTime }),
        )

export const spinReels = (e) => (dispatch) => {
    e.preventDefault()

    dispatch({ type: types.REEL_START })

    Promise.all([
        dispatch(spinSingleReel('0', 2000, _.random(100, 300))),
        dispatch(spinSingleReel('1', 2500, _.random(100, 300))),
        dispatch(spinSingleReel('2', 3000, _.random(100, 300))),
    ])
        .then(() => {
            console.log('FINISH')
        })

}
