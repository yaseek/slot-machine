import { Spin } from './classes'
import * as types from './action-types'

export const spinReel = (reel, duration) => (dispatch) => {
    Spin(duration)
        .action(
            () => dispatch({ action: types.SPIN_REEL_STEP, reel }),
            () => dispatch({ action: types.SPIN_REEL_STOP, reel }),
        )
}