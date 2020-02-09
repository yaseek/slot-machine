import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../__data__/actions'
import * as selectors from '../__data__/selectors'

import style from './debug-reel.module.scss'

const positions = [
    'TOP LINE',
    'CENTER LINE',
    'BOTTOM LINE',
]

const mapStateToProps = (state, { reel }) => ({
    images: selectors.getImages(state),
    debug: selectors.getDebug(state).get(reel),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeDebugValue: actions.changeDebugValue,
}, dispatch)

const handleChangeDebugState = ({reel, debug, changeDebugValue}) => () =>
    changeDebugValue(reel, Boolean(debug))

const handleChangeDebugConfig = ({reel, debug, changeDebugValue }) => () =>
    changeDebugValue(reel, false, debug)

export const DebugReel = connect(mapStateToProps, mapDispatchToProps)(
    (props) => {
        const { reel, debug, images, changeDebugValue, disabled } = props

        return (
            <div className={style.debugReel}>
                <label>
                    <input
                        type="checkbox"
                        checked={Boolean(debug)}
                        onChange={handleChangeDebugState(props)}
                        disabled={disabled}
                    />
                    <span>{`${reel} reel is FIXED`}</span>
                </label>

                {debug && (<>
                    <fieldset className={style.debugFieldset}>
                        <legend>{'image'}</legend>
                        {images.toList().map((image, idx) => (
                            <label className={style.radioLabel} key={idx}>
                                <input
                                    type="radio"
                                    name={`images${reel}`}
                                    className={style.radioInput}
                                    checked={idx === _.first(debug)}
                                    onChange={handleChangeDebugConfig({
                                        reel,
                                        changeDebugValue,
                                        debug: [idx, _.last(debug) || 0]
                                    })}
                                    disabled={disabled}
                                />
                                <span className={style.radioContent}>
                                    <img src={image} alt={idx} />
                                </span>
                            </label>
                        ))}
                    </fieldset>

                    <fieldset className={style.debugFieldset}>
                        <legend>{'position'}</legend>
                        {_.map(positions, (title, idx) => (
                            <label className={style.radioLabel} key={idx}>
                                <input
                                    type="radio"
                                    name={`positions${reel}`}
                                    className={style.radioInput}
                                    checked={idx === _.last(debug)}
                                    onChange={handleChangeDebugConfig({
                                        reel,
                                        changeDebugValue,
                                        debug: [_.first(debug) || 0, idx]
                                    })}
                                    disabled={disabled}
                                />
                                <span className={style.radioContent}>
                                    {title}
                                </span>
                            </label>
                        ))}
                    </fieldset>
                </>)}
            </div>
        )
    }
)

DebugReel.propTypes = {
    reel: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
}

DebugReel.defaultProps = {
    disabled: false,
}
