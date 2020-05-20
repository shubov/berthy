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
    bookings: [
        {
            createdAt: null,
        }
    ],
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
    getApplications(state) {
        return state.bookings;
    },
    getCurrentApplication(state){
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
    async fetchApplications({state,commit}) {
        commit('FETCHING');
        let response = await BerthyAPI.post('management/berths/bookings', state.filter);
        if (response.data) {
            if (response.data.success) {
                commit('UPDATE_APPLICATIONS', response.data.data);
                commit('UPDATE_TIMES');
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async approve({state, commit}, id) {
        let response = await BerthyAPI.post(`management/berths/bookings/${id}/approve`, {
            decision: state.decision
        });
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
    async reject({state, commit}, id) {
        let response = await BerthyAPI.post(`management/berths/bookings/${id}/reject`, {
            decision: state.decision
        });
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
    UPDATE_BOOKINGS(state, {items, totalCount}) {
        state.success = true;
        state.error = false;
        state.applications = items;
        state.length = totalCount;
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