import _ from 'lodash'
import { createSelector } from 'reselect'

export const getImages = createSelector(_.identity, (state) => state.get('images'))
export const getTotal = createSelector(_.identity, (state) => state.get('total'))
export const getScore = createSelector(_.identity, (state) => state.get('score'))
export const getReels = createSelector(_.identity, (state) => state.get('reels'))
export const getSpinningStatus = createSelector(_.identity, (state) => state.get('isSpinning'))

export const getReelImages = createSelector([
    getImages,
    getReels
], (images, reels) =>
    (reelId) =>
        _.map(reels.getIn([reelId, 'value']), (imgId) => _.get(images, imgId))
)
