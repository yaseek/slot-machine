import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { RANDOM, FIXED } from './__data__/constants'

export const Reel = (props) => {
    return <div />
}

Reel.propTypes = {
    mode: PropTypes.oneOf([RANDOM, FIXED])
}

Reel.defaultProps = {
    mode: RANDOM
}
