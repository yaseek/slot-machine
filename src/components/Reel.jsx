import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import * as img from '../assets'
import './reel.css'

const images = [
    img.barx1,
    img.cherry,
    img.barx2
]

export const Reel = ({ value }) => {

    return (
        <div className="reel">
            <div className="aligner">
                <div className="image-wrapper">
                    {_.map(images, (imgName) => (
                        <img src={imgName} className="position" key={imgName} />
                    ))}
                </div>
            </div>
        </div>
    )
}
/*
*/

Reel.propTypes = {
    value: PropTypes.array.isRequired,
    images: PropTypes.array,
}

Reel.defaultProps = {
    images: []
}
