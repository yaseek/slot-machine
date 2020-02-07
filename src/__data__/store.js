import { createStore } from 'redux'

import { default as machine } from './reducer'

const devtoolsReducer = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (id) => id

export const store = createStore(
    machine,
    devtoolsReducer
)
