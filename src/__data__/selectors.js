import _ from 'lodash'
import { Map } from 'immutable'
import { createSelector } from 'reselect'

const getMachineState = _.identity

export const getImages = createSelector(getMachineState, (state) => state.get('images'))
export const getTotal = createSelector(getMachineState, (state) => state.get('total'))
export const getReels = createSelector(getMachineState, (state) => state.get('reels'))
export const getSpinningStatus = createSelector(getMachineState, (state) => state.get('isSpinning'))
export const getPayTable = createSelector(getMachineState, (state) => state.get('payTable'))
export const getWinState = createSelector(getMachineState, (state) => state.get('win'))
export const getDebug = createSelector(getMachineState, (state) => state.get('debug'))

export const getWinlines = createSelector(getWinState, (state) => state.get('winlines', Map()))
export const getScore = createSelector(getWinState, (state) => state.get('score', 0))
export const getWinPay = createSelector(getWinState, (state) => state.get('payTable', Map()))

export const getReelImages = createSelector([
    getImages,
    getReels
], (images, reels) =>
    (reelId) =>
        _.map(reels.getIn([reelId, 'value']), (imgId) => images.get(imgId))
)
