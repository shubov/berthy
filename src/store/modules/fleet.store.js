/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in fleet.store.js is proprietary and confidential.                *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

//import Vue from 'vue';

// State initial object
const initialState = () => ({
    fleet: [],
    length: 0,
    lastUpdate: null
});


/* Module fleet.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getIndex(locoNo) {
        for (let i = 0; i<state.length; i++) {
            if (state.fleet[i].message.locoNo === locoNo) return i;
        }
        return -1;
    },
    getLocoInfoByLocoNo: (state) => (locoNo) => {
        let i = getters.getIndex(locoNo);
        if (i >= 0) return state.fleet[getters.getIndex(locoNo)];
        return undefined;
    },
    getLocoInfoByIndex: (state) => (index) => {
        return state.fleet[index];
    },
    getFleet () {
        return state.fleet;
    },
    getLength () {
        return state.length;
    },
    getLastUpdateTime: (state) => (index) => {
        return state.fleet[index].time;
    },
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    updateFleet({ commit }, data) {
        let {message, time, device} = data;
        let index = getters.getIndex(message.locoNo);
        if (index >= 0) commit('UPDATE_FLEET', {message, time, device, index});
        if (index === -1) commit('ADD_FLEET', {message, time, device});
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
    ADD_FLEET(state, {message, time, device}) {
        let lat = message.GEO.lat / 100000000 * 180 / Math.PI;
        let lng = message.GEO.lon / 100000000 * 180 / Math.PI;
        state.length = state.fleet.push({message, time, device, geo: {lat, lng}});
        state.lastUpdate = time;
    },
    UPDATE_FLEET(state, {message, time, device, index}) {
        let lat = message.GEO.lat / 100000000 * 180 / Math.PI;
        let lng = message.GEO.lon / 100000000 * 180 / Math.PI;
        state.fleet.splice(index, 1, {message, time, device, geo: {lat, lng}});
        state.lastUpdate = time;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};