import _ from 'lodash'

import {
    IMG_BAR_3, IMG_BAR_2, IMG_BAR_1,
    IMG_SEVEN, IMG_CHERRY,
    TOP_LINE, CENTER_LINE, BOTTOM_LINE } from '../constants'

export const payTable = [
    {
        title: '3 CHERRY symbols on top line',
        cost: 2000,
        check: (lines) =>
            _.isEqual(_.get(lines, TOP_LINE, []), [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY])
                ? TOP_LINE
                : -1,
    },
    {
        title: '3 CHERRY symbols on center line',
        cost: 1000,
        check: (lines) =>
            _.isEqual(_.get(lines, CENTER_LINE, []), [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY])
                ? CENTER_LINE
                : -1,
    },
    {
        title: '3 CHERRY symbols on bottom line',
        cost: 4000,
        check: (lines) =>
            _.isEqual(_.get(lines, BOTTOM_LINE, []), [IMG_CHERRY, IMG_CHERRY, IMG_CHERRY])
                ? BOTTOM_LINE
                : -1,
    },
    {
        title: '3 7 symbols on any line',
        cost: 150,
        check: (lines) =>
            _.findIndex(_.map(lines, _.curry(_.isEqual, 2)([IMG_SEVEN, IMG_SEVEN, IMG_SEVEN]))),
    },
    {
        title: 'Any combination of CHERRY and 7 on any line',
        cost: 75,
        check: (lines) =>
            _.findIndex(_.map(lines, _.flowRight(
                (line) => _.eq(2, line.length),
                (line) => _.intersection(line, [IMG_SEVEN, IMG_CHERRY])
            ))),
    },
    {
        title: '3 3xBAR symbols on any line',
        cost: 50,
        check: (lines) =>
            _.findIndex(_.map(lines, _.curry(_.isEqual, 2)([IMG_BAR_3, IMG_BAR_3, IMG_BAR_3]))),
    },
    {
        title: '3 2xBAR symbols on any line',
        cost: 20,
        check: (lines) =>
            _.findIndex(_.map(lines, _.curry(_.isEqual, 2)([IMG_BAR_2, IMG_BAR_2, IMG_BAR_2]))),
    },
    {
        title: '3 BAR symbols on any line',
        cost: 10,
        check: (lines) =>
            _.findIndex(_.map(lines, _.curry(_.isEqual, 2)([IMG_BAR_1, IMG_BAR_1, IMG_BAR_1]))),
    },
    {
        title: 'Combination of any BAR symbols on any line',
        cost: 5,
        check: (lines) => _.compact(
            _.map(_.map(lines, (line) => _.includes(line, IMG_BAR_1)), (value, key) => value ? key : void 0),
        )
    },
]

/*
Pay-table
Pay-table must indicate winning combinations and payouts as:
3 CHERRY symbols on top line 2000
3 CHERRY symbols on center line 1000
3 CHERRY symbols on bottom line 4000
3 7 symbols on any line 150
Any combination of CHERRY and 7 on any line 75
3 3xBAR symbols on any line 50
3 2xBAR symbols on any line 20
3 BAR symbols on any line 10
Combination of any BAR symbols on any line 5
*/
