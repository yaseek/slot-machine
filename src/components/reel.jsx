import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './reel.css'

export const Reel = ({ images }) => {
    return (
        <div className="reel-wrapper">
            <div className="reel">
                <div className="aligner">
                    <div className="image-wrapper">
                        {_.map(images, (imgName) => (
                            <img
                                src={imgName}
                                className="position"
                                key={imgName}
                                alt="reel position"
                            />
                        ))}
                    </div>
                </div>
                <div className="shadow" />
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
