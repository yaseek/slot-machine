import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './__data__/actions'
import * as selectors from './__data__/selectors'
import { Reel } from './components'
import './App.css'

const mapStateToProps = (state) => ({
    getReelImages: selectors.getReelImages(state),
    isSpinning: selectors.getSpinningStatus(state),
    total: selectors.getTotal(state),
    score: selectors.getScore(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export const App = connect(mapStateToProps, mapDispatchToProps)(
    ({ getReelImages, spinReels, total, score }) => {
        return (
            <div className="App">

                <h2 className="score-table">
                    <span>{`Total: ${_.padStart(total, 5, '0')}`}</span>
                    <span>{`Round score: ${_.padStart(score, 5, '0')}`}</span>
                </h2>

                <div className="reels">
                    <Reel images={getReelImages('0')} />
                    <Reel images={getReelImages('1')} />
                    <Reel images={getReelImages('2')} />
                </div>

                <div className="controls">
                    <button
                        type="button"
                        onClick={spinReels}
                    >
                        {'Start'}
                    </button>
                </div>
            </div>
        )
    })
