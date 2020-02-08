import _ from 'lodash'
import { Map } from 'immutable'

import * as img from '../assets'

import { getNextValue } from './helpers'
import { RANDOM, FIXED } from './constants'
import * as types from './action-types'

const initialState = Map({
    images: [
        img.barx3,
        img.barx2,
        img.barx1,
        img.seven,
        img.cherry,
    ],
    isSpinning: false,
    total: 1,
    score: 0,
    reels: Map({
        0: Map({
            value: [
                0,
                1,
            ],
            config: {
                mode: RANDOM,
                /* For fixed position it looks like that:
                mode: FIXED,
                value: 0
                position: TOP,
                */
            }
        }),
        1: Map({
            value: [
                0,
                1,
            ],
            config: {
                mode: RANDOM,
            }
        }),
        2: Map({
            value: [
                0,
                1,
            ],
            config: {
                mode: RANDOM,
            }
        }),
    })
})

export default (state = initialState, action) =>
    _.invoke({
        [types.REEL_START]: () => state
            .set('isSpinning', true),

        [types.REEL_STEP]: (state, { reel }) => {
            const images = state.get('images')
            const value = state.getIn(['reels', reel, 'value'])
            const last = _.last(value)
            const newValue = value.length === 2
                ? _.concat(value, getNextValue(last, images.length))
                : _.slice(value, 1)
            return state
                .setIn(['reels', reel, 'value'], newValue)
        },

        [types.REEL_START]: () => {
            const score = 0
            return state
                .set('')
                .set('isSpinning', false)
        },

    }, action.type, state, action) || state
