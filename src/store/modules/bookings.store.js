import BerthyAPI from "../../services/berthy-api";

/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in bookings.store.js is proprietary and confidential.             *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

// State initial object
const initialState = () => ({
    bookings: [],
    length: 0,
    lastUpdate: null,
    current: null,
    error: null,
    success: null,
    message: null,
});


/* Module .store.js */



// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getBookings(state) {
        return state.bookings;
    },
    getCurrentBooking(state){
        return state.bookings[state.current];
    }
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    updateCurrent({commit}, id) {
        if (id>state.length-1) return false;
        commit("SET_CURRENT", id);
        return true;
    },
    async fetchBookings({commit}, marinaID) {
        commit('FETCHING');
        let response = await BerthyAPI.get(`bookings/berths/${marinaID}`);
        if (response.data) {
            if (response.data.success) {
                commit('UPDATE_BOOKINGS', response.data.data);
                commit('UPDATE_TIMES');
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async approve({commit}, id) {
        let response = await BerthyAPI.put(`bookings/${id}/approve`);
        if (response.data) {
            if (response.data.success) {
                commit("APPROVE");
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async reject({commit}, id) {
        let response = await BerthyAPI.put(`bookings/${id}/reject`);
        if (response.data) {
            if (response.data.success) {
                commit("REJECT");
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
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
    APPROVE() {
    },
    REJECT() {
    },
    UPDATE_BOOKINGS(state, data) {
        state.success = true;
        state.error = false;
        state.bookings = data;
        state.length = data.length;
        state.lastUpdate = Date.now();
    },
    SET_CURRENT(state, index) {
        state.current = index;
    },
    UPDATE_TIMES(state){
        state.bookings.forEach(booking=> {
            let date = new Date(booking.createdAt);
            let delta =  new Date() - date;
            let res;
            let s = Math.floor(delta/1000);
            if (s>59) {
                let m = Math.floor(delta/60000);
                if (m>59) {
                    let h = Math.floor(delta/3600000);
                    if (h>23) {
                        res = date.toDateString();
                    } else {
                        res = h + "h ago";
                    }
                } else {
                    res = m + "m ago";
                }
            } else {
                res = s + "s ago";
            }
            booking.ago = res;
        })
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};