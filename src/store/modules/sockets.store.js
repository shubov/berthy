/******************************************************************************
 * Copyright (c)  - 2020 - Mikhail Shubov.                                    *
 * All Rights Reserved.                                                       *
 * The code in sockets.store.js is part of Berthy project.                    *
 * Unauthorized copying of the file and any parts as well as the project itself of it is strictly prohibited.
 * Proprietary and confidential.                                              *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 2020                     *
 *                                                                            *
 ******************************************************************************/

// State initial object
const initialState = () => ({
    connected: false,
    error: '',
    message: '',
    time: '',
});


/* Module sockets.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getConnectionStatus( state ) {
        return state.connected;
    },
    getError( state ) {
        return state.error;
    },
    getMessage( state ) {
        return state.message;
    },
    getLastUpdateTime() {
        return state.time;
    }
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    SOCKET_CONNECT({commit}) {
        commit('SOCKET_CONNECT');
    },
    SOCKET_DISCONNECT({commit}) {
        commit('SOCKET_DISCONNECT');
    },
    SOCKET_MESSAGE({dispatch, commit}, payload) {
        let {message, time, device} = JSON.parse(payload.data);
        commit('SOCKET_MESSAGE', {message, time, device});
        dispatch('Fleet/updateFleet', {message, time, device}, {root:true});
    },
    SOCKET_ERROR({commit}, message) {
        commit('SOCKET_ERROR', message);
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
    SOCKET_CONNECT(state) {
        state.connected = true
    },
    SOCKET_DISCONNECT(state) {
        state.connected = false
    },
    SOCKET_MESSAGE(state, {message, time, device}) {
        state.time = time;
        state.message = {message, device};
    },
    SOCKET_ERROR(state, error) {
        state.error = error
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};