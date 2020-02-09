import _ from 'lodash'
import { Map } from 'immutable'

import { payTable } from './models'
import { TOP_LINE, CENTER_LINE, BOTTOM_LINE } from './constants'

/**
 * Gets current element number and returns previous element number by round robin
 *
 * @param { Number } current -- Current element number
 * @return { Number } -- calculated previous number
 */
export const getPrevValue = (current, imagesLength) => !current
    ? imagesLength - 1
    : current - 1

/**
 * Gets current element number and returns next element number by round robin
 *
 * @param { Number } current -- Current element number
 * @return { Number } -- calculated next number
 */
export const getNextValue = (current, imagesLength) => current === imagesLength - 1
    ? 0
    : current + 1

/**
 * Gets combination of current reels result by lines
 *
 * @param { Array } lines -- Always array of three lines (TOP, MIDDLE, BOTTOM)
 * @return { Map } -- Immutable Map of the win combination (winlines, payTable, score)
 */
export const getReelWinState = (lines) =>
    _.reduce(payTable, (map, { check, cost }, idx) => {
        const line = check(lines)
        return _.isArray(line)
            ? map
                .update('winlines', (winLines) =>
                    winLines.merge(
                        Map(_.map(line, (lineId) =>
                            [lineId, _.isUndefined(winLines.get(lineId)) ? true : winLines.get(lineId)]
                        ))
                    )
                )
                .setIn(['payTable', idx], line.length > 0)
                .update('score', (score) => line.length > 0 ? score + (cost * line.length) : score)
            : map
                .updateIn(['winlines', line], (value) =>
                    _.isUndefined(value) ? true : value)
                .setIn(['payTable', idx], _.gte(line, 0))
                .update('score', (score) => _.gte(line, 0) ? score + cost : score)
    }, Map({
        winlines: Map(),
        payTable: Map(),
        score: 0
    }))

/**
 * Transposes reel values to lines and calculates win result
 *
 * @param { OrderedMap } reels -- reels map from the store
 * @return { Map } -- answer of getReelWinState
 */
export const calculateRoundScore = (reels) =>
    getReelWinState(reels
        .map((reel) => reel.get('value', []))
        .reduce((acc, value) =>
            value.length === 2
                ? [
                    _.concat(acc[0], value[0]),
                    acc[1],
                    _.concat(acc[2], value[1])
                ]
                : [
                    acc[0],
                    _.concat(acc[1], value[1]),
                    acc[2],
                ]
        , [[], [], []]))

/**
 * Calculates new reel value for the given debug configuration
 *
 * @param { DebugInfo } [item, position] -- Debug info for required configuration
 * @param { Number } imagesSize -- the quantity of existed images
 * @return { Array } -- value for using in the reel configuration
 */
export const getFixedReelValue = ([item, position], imagesSize) =>
    _.invoke({
        [TOP_LINE]: () => [
            item,
            getNextValue(item, imagesSize),
        ],

        [CENTER_LINE]: () => [
            getPrevValue(item, imagesSize),
            item,
            getNextValue(item, imagesSize),
        ],

        [BOTTOM_LINE]: () => [
            getPrevValue(item, imagesSize),
            item,
        ],
    }, position)
