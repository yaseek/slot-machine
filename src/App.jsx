import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as actions from './__data__/actions'
import * as selectors from './__data__/selectors'
import { MIN_BALANCE, MAX_BALANCE } from './__data__/constants'
import { Reel, Block, PayTable, DebugReel } from './components'
import style from './App.module.scss'

const mapStateToProps = (state) => ({
    getReelImages: selectors.getReelImages(state),
    isSpinning: selectors.getSpinningStatus(state),
    total: selectors.getTotal(state),
    score: selectors.getScore(state),
    winlines: selectors.getWinlines(state),
    payTable: selectors.getPayTable(state),
    winPay: selectors.getWinPay(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export const App = connect(mapStateToProps, mapDispatchToProps)(
    ({ getReelImages, spinReels, total, score, isSpinning, winlines, setBalance, payTable, winPay }) => {
        return (
            <div className={style.App}>

                <Block title="Score table">
                    <h2 className={style.scoreTable}>
                        <span>{`Balance: ${_.padStart(total, 5, '0')}`}</span>
                        <span>{`Round score: ${_.padStart(score, 5, '0')}`}</span>
                    </h2>
                </Block>

                <Block title="Pay table">
                    <PayTable {...{payTable, winPay}} />
                </Block>

                <Block title="Reels" flexBox className={style.reelsBlock} >
                    <div className={style.reels}>
                        <Reel images={getReelImages(0)} />
                        <Reel images={getReelImages(1)} />
                        <Reel images={getReelImages(2)} />

                        <div className={style.winArea}>
                            <div className={classnames(style.winLine, { [style.winLineActive]: winlines.get(0) })} />
                            <div className={classnames(style.winLine, { [style.winLineActive]: winlines.get(1) })} />
                            <div className={classnames(style.winLine, { [style.winLineActive]: winlines.get(2) })} />
                        </div>
                    </div>

                    <div className={style.controls}>
                        <button
                            type="button"
                            onClick={spinReels}
                            disabled={isSpinning || (total <= 0)}
                        >
                            {'SPIN'}
                        </button>
                    </div>
                </Block>

                <Block title="Balance area">
                    <label className={style.balance}>
                        <span>{'You may correct your balance here:'}</span>
                        <input
                            type="number"
                            onChange={setBalance}
                            required
                            min={MIN_BALANCE}
                            max={MAX_BALANCE}
                            value={total}
                            disabled={isSpinning}
                        />
                    </label>
                </Block>

                <Block title="Debug area" flexBox >
                    <DebugReel reel={0} disabled={isSpinning} />
                    <DebugReel reel={1} disabled={isSpinning} />
                    <DebugReel reel={2} disabled={isSpinning} />
                </Block>

            </div>
        )
    })
