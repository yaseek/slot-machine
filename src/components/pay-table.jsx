import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Map } from 'immutable'
import classnames from 'classnames'

import style from './pay-table.module.scss'

export const PayTable = ({ payTable, winPay }) => (
    <div className={style.payTable}>
        <div className={style.row}>
            <span className={style.label}>
                <b>{'Winning combination'}</b>
            </span>
            <span className={style.value}>
                <b>{'Payout'}</b>
            </span>
        </div>

        {_.map(payTable, ({ title, cost }, idx) => (
            <div key={idx} className={classnames(style.row, { [style.blinking]: winPay.get(idx) })}>
                <span className={style.label}>
                    {title}
                </span>
                <span className={style.value}>
                    {cost}
                </span>
            </div>
        ))}
    </div>
)

PayTable.propTypes = {
    payTable: PropTypes.array,
    winPay: PropTypes.instanceOf(Map),
}

PayTable.defaultProps = {
    payTable: [],
    winPay: Map(),
}
