import _ from 'lodash'
import { Map } from 'immutable'

import * as types from './action-types'

const initialState = Map({
    score: 0
})

export default (state = initialState, action) =>
    _.invoke({
        [types.START]: () =>
            state
    }, action.type, state, action) || state
