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
    data: [],

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
        return state.data.find(item=>item.code
            ? item.code === 'year_revenue'
            : false);
    },
    reserved_percent(state) {
        return state.data.find(item=>item.code
            ? item.code === 'reserved_percent'
            : false);
    },
    week_reserved_percent(state) {
        return state.data.find(item=>item.code
            ? item.code === 'week_reserved_percent'
            : false);
    },
    rating_trend(state) {
        return state.data.find(item=>item.code
            ? item.code === 'rating_trend'
            : false);
    },
    place_booking_map(state) {
        return state.data.find(item=>item.code
            ? item.code === 'place_booking_map'
            : false);
    },
    location(state) {
        return state.data.find(item=>item.code
            ? item.code === 'location'
            : false);
    },
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
    UPDATE(state, data) {
        state.data=data;
        state.success = true;
        state.error = false;
        state.message = null;
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};