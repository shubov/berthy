import BerthyAPI from "../../services/berthy-api";

/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in dashboard.store.js is proprietary and confidential.            *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

// State initial object
const initialState = () => ({
    dashboard: [
        {
            code: 'year_revenue',
            data: [
                {
                    month: 'Jan',
                    year: '2020',
                    revenue: 200,
                },
                {
                    month: 'Jan',
                    year: '2020',
                    revenue: 100,
                },
                {
                    month: 'Jan',
                    year: '2020',
                    revenue: 250,
                },

            ],
            settings: {
                column: -1,
                row: -1,
                isVisible: false
            }
        },
        {
            code: 'reserved_percent',
            data: {
                reservedPlaceNum: 24,
                totalPlaceNum: 88,
            },
            settings: {
                column: -1,
                row: -1,
                isVisible: false
            }
        },
        {
            code: 'week_reserved_percent',
            data: [
                {
                    date: '2020-05-25',
                    percent: {
                        reservedPlaceNum: 0,
                        totalPlaceNum: 18
                    }
                },
                {
                    date: '2020-05-26',
                    percent: {
                        reservedPlaceNum: 0,
                        totalPlaceNum: 18
                    }
                },
                {
                    date: '2020-05-27',
                    percent: {
                        reservedPlaceNum: 0,
                        totalPlaceNum: 18
                    }
                },
                {
                    date: '2020-05-28',
                    percent: {
                        reservedPlaceNum: 7,
                        totalPlaceNum: 18
                    }
                },
                {
                    date: '2020-05-29',
                    percent: {
                        reservedPlaceNum: 4,
                        totalPlaceNum: 18
                    }
                },
                {
                    date: '2020-05-30',
                    percent: {
                        reservedPlaceNum: 0,
                        totalPlaceNum: 18
                    }
                },
                {
                    date: '2020-05-31',
                    percent: {
                        reservedPlaceNum: 10,
                        totalPlaceNum: 18
                    }
                }
            ],
            settings: {
                column: -1,
                row: -1,
                isVisible: true
            }
        },
        {
            code: 'rating_trend',
            data: {
                lastMonthRating: 4.6,
                totalRating: 4.8,
            },
            settings: {
                column: -1,
                row: -1,
                isVisible: true
            }
        },
        {
            code: 'place_booking_map',
            data: [
                {
                    place: {
                        id: 136,
                        name: '2',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 137,
                        name: '3',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 138,
                        name: '4',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 139,
                        name: '5',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 140,
                        name: '6',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 141,
                        name: '7',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 142,
                        name: '8',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 143,
                        name: '9',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 144,
                        name: '10',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 145,
                        name: '11',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 146,
                        name: '12',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 147,
                        name: '13',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 148,
                        name: '14',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 149,
                        name: '15',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 150,
                        name: '16',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 151,
                        name: '17',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 152,
                        name: '18',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                },
                {
                    place: {
                        id: 153,
                        name: '18',
                        length: 12,
                        draft: 3,
                        width: 6,
                        price: 100,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green '
                    }
                }
            ],
            settings: {
                column: -1,
                row: -1,
                isVisible: true
            }
        },
        {
            code: 'location',
            data: {
                me: {
                    Id: 28,
                    title: 'ertetgdtgr',
                    photo: {
                        fileId: 'f0ae32e1-9c31-11ea-b00a-dbc2cdb950f8',
                        fileName: '5e4fa3fef4577b8063b802d19d965e95fcf58c5f3a0731c456df2257a149e491.jpg',
                        fileLink: '/api/files/khnqF5zh26NOHFPF/f0ae32e1-9c31-11ea-b00a-dbc2cdb950f8'
                    },
                    lat: 40.82933237927668,
                    lng: 14.235983459552287,
                    rating: 0
                },
                radius: 20,
                neighbours: []
            },
            settings: {
                column: -1,
                row: -1,
                isVisible: true
            }
        }
    ],

    success: null,
    error: null,
    message: null,

    // year_revenue: null,
    // reserved_percent: null,
    // week_reserved_percent: null,
    // rating_trend: null,
    // place_booking_map: null,
    // location: null,
});


/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    year_revenue(state) {
        return state.dashboard.find(item=>item.code
            ? (item.code === 'year_revenue'
                && item.settings.isVisible===true)
            : false);
    },
    reserved_percent(state) {
        return state.dashboard.find(item=>item.code
            ? (item.code === 'reserved_percent'
                && item.settings.isVisible===true)
            : false);
    },
    week_reserved_percent(state) {
        return state.dashboard.find(item=>item.code
            ? (item.code === 'week_reserved_percent'
                && item.settings.isVisible===true)
            : false);
    },
    rating_trend(state) {
        return state.dashboard.find(item=>item.code
            ? (item.code === 'rating_trend'
            && item.settings.isVisible===true)
            : false);
    },
    place_booking_map(state) {
        return state.dashboard.find(item=>item.code
            ? (item.code === 'place_booking_map'
                && item.settings.isVisible===true)
            : false);
    },
    location(state) {
        return state.dashboard.find(item=>item.code
            ? (item.code === 'location'
                && item.settings.isVisible===true)
            : false);
    },

    getSettings(state) {
        let settings = [];
        // eslint-disable-next-line no-unused-vars
        state.dashboard.forEach(({data,...rest}) => {
            settings.push(rest);
        });
        return settings;
    },

    barchartSeries(state, getters) {
        let d = getters.week_reserved_percent;
        if (d!==undefined) return [{
            name: 'Week Reserved',
            data: d.data.map(({percent})=>{
                return percent.reservedPlaceNum
            })
        }]
        else return false
    },
    barchartOptions(state, getters) {
        let d = getters.week_reserved_percent;
        if (d!==undefined) return {
            xaxis: {
                categories: d.data.map(({date})=>{
                    return date
                })
            }
        }
        else return false
    },
    lineChartSeries(state, getters) {
        let d = getters.year_revenue;
        if (d!==undefined) return [{
            name: 'Revenue',
            data: d.data.map(({revenue})=>{
                return revenue;
            })
        }]
        else return false
    },
    lineChartOptions(state, getters) {
        let d = getters.year_revenue;
        if (d!==undefined) return {
            xaxis: {
                categories: d.data.map(({month, year})=>{
                    return `${month}-${year}`;
                })
            }
        }
        else return false
    },
    getReservedPlaceNum(state, getters) {
        return getters.reserved_percent.data.reservedPlaceNum;
    },
    getTotalPlaceNum(state, getters) {
        return getters.reserved_percent.data.totalPlaceNum;
    },
    getReservedPercent(state, getters) {
        return Math.floor(100* getters.getReservedPlaceNum / getters.getTotalPlaceNum);
    },
    getTotalRating(state, getters) {
        return getters.rating_trend.data.totalRating;
    },
    getLastMonthRating(state, getters) {
        return getters.rating_trend.data.lastMonthRating;
    },
    getRatingTrend(state, getters) {
        return getters.getTotalRating < getters.getLastMonthRating
            ? 'green'
            : 'red';
    }
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    async fetch({commit}, marinaID) {
        commit('FETCHING');
        let response = await BerthyAPI.get(`berths/${marinaID}/dashboard`);
        if (response.data) {
            if (response.data.success) {
                commit('UPDATE', response.data.data);
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async changeSettings({commit, getters, dispatch}, marinaID) {
        commit('FETCHING');
        let response = await BerthyAPI.post(`berths/${marinaID}/dashboard/settings`, getters.getSettings);
        if (response.data) {
            if (response.data.success) {
                return await dispatch('fetch', marinaID);
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    }
};


// VUEX MUTATIONS
const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    FETCHING(state) {
        state.success = null;
        state.error = null;
        state.message = null;
    },
    ERROR(state, msg) {
        state.success = false;
        state.error = true;
        state.message = msg;
    },
    UPDATE(state, dashboard) {
        state.dashboard=dashboard;
        state.success = true;
        state.error = false;
        state.message = null;
    },
    YEAR_REVENUE(state) {
        state.dashboard.forEach((item)=>{
            if (item.code==='year_revenue')
                item.settings.isVisible=!item.settings.isVisible;
        });
    },
    RESERVED_PERCENT(state) {
        state.dashboard.forEach((item)=>{
            if (item.code==='reserved_percent')
                item.settings.isVisible=!item.settings.isVisible;
        });
    },
    WEEK_RESERVED_PERCENT(state) {
        state.dashboard.forEach((item)=>{
            if (item.code==='week_reserved_percent')
                item.settings.isVisible=!item.settings.isVisible;
        });
    },
    RATING_TREND(state) {
        state.dashboard.forEach((item)=>{
            if (item.code==='rating_trend')
                item.settings.isVisible=!item.settings.isVisible;
        });
    },
    PLACE_BOOKING_MAP(state) {
        state.dashboard.forEach((item)=>{
            if (item.code==='place_booking_map')
                item.settings.isVisible=!item.settings.isVisible;
        });
    },
    LOCATION(state) {
        state.dashboard.forEach((item)=>{
            if (item.code==='location')
                item.settings.isVisible=!item.settings.isVisible;
        });
    },

    POS_YEAR_REVENUE(state, {x,y}) {
        state.dashboard.forEach((item)=>{
            if (item.code==='year_revenue') {
                item.settings.column=x;
                item.settings.row=y;
            }
        });
    },
    POS_RESERVED_PERCENT(state, {x,y}) {
        state.dashboard.forEach((item)=>{
            if (item.code==='reserved_percent') {
                item.settings.column=x;
                item.settings.row=y;
            }
        });
    },
    POS_WEEK_RESERVED_PERCENT(state, {x,y}) {
        state.dashboard.forEach((item)=>{
            if (item.code==='week_reserved_percent') {
                item.settings.column=x;
                item.settings.row=y;
            }
        });
    },
    POS_RATING_TREND(state, {x,y}) {
        state.dashboard.forEach((item)=>{
            if (item.code==='rating_trend') {
                item.settings.column=x;
                item.settings.row=y;
            }
        });
    },
    POS_PLACE_BOOKING_MAP(state, {x,y}) {
        state.dashboard.forEach((item)=>{
            if (item.code==='place_booking_map') {
                item.settings.column=x;
                item.settings.row=y;
            }
        });
    },
    POS_LOCATION(state, {x,y}) {
        state.dashboard.forEach((item)=>{
            if (item.code==='location') {
                item.settings.column=x;
                item.settings.row=y;
            }
        });
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};