import _ from 'lodash'
import { Spin } from './classes'
import * as types from './action-types'
import { MIN_BALANCE, MAX_BALANCE } from './constants'

export const spinSingleReel = (reel, duration, interval) => (dispatch) =>
    Spin(duration, interval)
        .easing(Spin.easing.easeOutQuad)
        .action(
            () => dispatch({ type: types.REEL_STEP, reel })
        )

export const spinReels = (e) => (dispatch) => {
    e.preventDefault()

    dispatch({ type: types.REEL_START })

    Promise.all([
        dispatch(spinSingleReel(0, 2000, _.random(100, 200))),
        dispatch(spinSingleReel(1, 2500, _.random(100, 200))),
        dispatch(spinSingleReel(2, 3000, _.random(100, 200))),
    ])
        .then(() => {
            dispatch({ type: types.REEL_FINISH })
        })

}

export const setBalance = ({ nativeEvent }) => (dispatch) => {
    const value = _.get(nativeEvent, ['target', 'valueAsNumber']) || 0
    if (value >= MIN_BALANCE && value <= MAX_BALANCE) {
        dispatch({ type: types.SET_BALANCE, value })
    }
}

export const changeDebugValue = (reel, isFixed, debug) => (dispatch) => isFixed
    ? dispatch({ type: types.REMOVE_DEBUG_INFO, reel })
    : dispatch({ type: types.SET_DEBUG_INFO, reel, debug })
