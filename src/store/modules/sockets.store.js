/******************************************************************************
 * Copyright (c)  - 2020 - Mikhail Shubov.                                    *
 * All Rights Reserved.                                                       *
 * The code in sockets.store.js is part of Berthy project.                    *
 * Unauthorized copying of the file and any parts as well as the project itself of it is strictly prohibited.
 * Proprietary and confidential.                                              *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 2020                     *
 *                                                                            *
 ******************************************************************************/

import storage from '../../services/web-storage'

// State initial object
const initialState = () => ({
    url: 'wss://egehackbot.cf:8080/socket?accessToken=',
    ws: null,
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
    },
    getWsUrl() {
        return state.url;
    }
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    send({state}, data) {
        state.ws.send(data);
    },
    init({getters, dispatch, commit}){
        if (!storage.getAccessToken()) return false;
        let ws = new WebSocket(getters.getWsUrl+storage.getAccessToken());
        ws.onopen = function() {
            dispatch('onConnect');
        };
        ws.onclose = function(event) {
            dispatch('onDisconnect', event);
        };
        ws.onmessage = function(message) {
            dispatch('onMessage', message);
        };
        ws.onerror = function(message) {
            dispatch('onError', message);
        };
        commit('INIT', ws);
        return true;
    },
    onConnect({commit}) {
        commit('SOCKET_CONNECT');
    },
    onDisconnect({commit}) {
        commit('SOCKET_DISCONNECT');
    },
    async onMessage({dispatch}, payload) {
        let message = JSON.parse(payload.data);
        if (message.event === "CHAT_MESSAGE") {
            let title = await dispatch('Chat/onWebSocketMessage', message.data, {root: true});
            title = title ? title+': ' : 'Message: ';
            title += message.data.message.text;
            dispatch('Snackbar/push', title, {root: true});
        } else {
            dispatch('Snackbar/push', null, {root: true});
        }

    },
    onError({commit}, message) {
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
    INIT(state, ws) {
        state.ws = ws;
    },
    SOCKET_CONNECT(state) {
        state.connected = true;
    },
    SOCKET_DISCONNECT(state) {
        state.connected = false;
    },
    SOCKET_MESSAGE(state, {message, time, device}) {
        state.time = time;
        state.message = {message, device};
    },
    SOCKET_ERROR(state, error) {
        state.error = error
        state.connected = false
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};