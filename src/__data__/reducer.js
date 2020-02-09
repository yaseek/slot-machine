import _ from 'lodash'
import { Map } from 'immutable'

import { getNextValue, calculateRoundScore, getFixedReelValue } from './helpers'
import { slotMachine } from './models'
import * as types from './action-types'

const initialState = slotMachine

export default (state = initialState, action) =>
    _.invoke({
        [types.REEL_START]: () => state
            .update('total', (total) => total - 1)
            .set('isSpinning', true)
            .set('win', Map()),

        [types.REEL_STEP]: (state, { reel }) => {
            const images = state.get('images')
            const value = state.getIn(['reels', reel, 'value'])
            const last = _.last(value)
            const newValue = value.length === 2
                ? _.concat(value, getNextValue(last, images.size))
                : _.slice(value, 1)
            return state
                .setIn(['reels', reel, 'value'], newValue)
        },

        [types.REEL_FINISH]: () => {
            const debug = state.get('debug')
            const reels = debug.size
                ? state.get('reels')
                    .update((prevReels) =>
                        prevReels.merge(
                            debug
                                .filter(_.negate(_.isEmpty))
                                .map((item, idx) =>
                                    prevReels.get(idx)
                                        .set('value', getFixedReelValue(item, state.get('images').size))
                                ))
                    )
                : state.get('reels')
            
            const winState = calculateRoundScore(reels)

            return state
                .set('reels', reels)
                .set('win', winState)
                .update('total', (total) => total + winState.get('score'))
                .set('isSpinning', false)
        },

        [types.SET_BALANCE]: () => state
            .set('total', action.value),

        [types.SET_DEBUG_INFO]: () => state
            .setIn(['debug', action.reel], action.debug || []),

        [types.REMOVE_DEBUG_INFO]: () => state
            .deleteIn(['debug', action.reel]),

    }, action.type, state, action) || state
