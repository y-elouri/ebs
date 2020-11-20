import * as _ from './utils';

const shipDatesConfidence = [
    { 'ship date': '23 Sep 2020', 'probability': 0.09 },
    { 'ship date': '24 Sep 2020', 'probability': 0.81 },
    { 'ship date': '25 Sep 2020', 'probability': 0.09 },
    { 'ship date': '28 Sep 2020', 'probability': 0.01 },
]
shipDatesConfidence.reduce(_.deepReducer('probability'), []);

const timesheet = [
    { 'issue': '#1', 'dev': 'a', 'estimated': 2, 'actual': 3 },
    { 'issue': '#2', 'dev': 'a', 'estimated': 3, 'actual': 4 },
    { 'issue': '#3', 'dev': 'a', 'estimated': 5, 'actual': 8 },
    { 'issue': '#4', 'dev': 'a', 'estimated': 6, 'actual': 12 },
    { 'issue': '#5', 'dev': 'b', 'estimated': 2,'actual': 5 },
    { 'issue': '#6', 'dev': 'b', 'estimated': 6, 'actual': 7 },
    { 'issue': '#7', 'dev': 'b', 'estimated': 3, 'actual': 4 },
    { 'issue': '#8', 'dev': 'b', 'estimated': 1, 'actual': 2 },
    { 'issue': '#9', 'dev': 'c', 'estimated': 5, 'actual': 16 },
    { 'issue': '#10', 'dev': 'c', 'estimated': 4, 'actual': 10},
]

// const devFutures = [
//     { 'dev': 'a', 'ship dates': ['24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '25 Sep 2020', '23 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '25 Sep 2020', '25 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020', '24 Sep 2020'] },
//     { 'dev': 'b', 'ship dates': ['23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '24 Sep 2020', '24 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020'] },
//     { 'dev': 'c', 'ship dates': ['22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '22 Sep 2020', '23 Sep 2020', '22 Sep 2020', '22 Sep 2020'] },
// ]

const devFutures = [
    { 'dev': 'a', 'ship dates': [1,2,3,4,1,2,3,4] },
    { 'dev': 'b', 'ship dates': [4,5,6,7,8,4,5,6] },
    { 'dev': 'c', 'ship dates': [1,3,4,5,7,4,9,7] },
]

export { shipDatesConfidence, timesheet, devFutures };
