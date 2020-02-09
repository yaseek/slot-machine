import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import style from './block.module.scss'

export const Block = ({ title, children, className, flexBox }) => (
    <div className={classnames(style.block, className, { [style.flex]: flexBox })}>
        {title && <span className={style.blockTitle}>{title}</span>}
        {children}
    </div>
)

Block.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    flexBox: PropTypes.bool,
    className: PropTypes.string,
}

Block.defaultProps = {
    title: '',
    children: null,
    flexBox: false,
    className: '',
}
