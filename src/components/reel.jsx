import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import style from './reel.module.scss'

export const Reel = ({ images }) => {
    return (
        <div className={style.reelWrapper}>
            <div className={style.reel}>
                <div className={style.aligner}>
                    <div className={style.imageWrapper}>
                        {_.map(images, (imgName) => (
                            <img
                                src={imgName}
                                className={style.position}
                                key={imgName}
                                alt="position"
                            />
                        ))}
                    </div>
                </div>
                <div className={style.shadow} />
            </div>
        </div>
    )
}

Reel.propTypes = {
    images: PropTypes.array,
}

Reel.defaultProps = {
    images: []
}
