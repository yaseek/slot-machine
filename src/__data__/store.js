import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { default as machine } from './reducer'

const devtoolsReducer = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (id) => id

export const store = createStore(
    machine,
    compose(
        applyMiddleware(thunk),
        devtoolsReducer
    )
)
