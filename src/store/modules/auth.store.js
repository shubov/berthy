/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in auth.store.js is proprietary and confidential.                 *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import AuthService from '@/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

// State initial object
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };


/* Module auth.store.js */


// VUEX STATE
const state = initialState;


// VUEX GETTERS
const getters = {};


// VUEX ACTIONS
const actions = {
    login({ commit }, user) {
        return AuthService.login(user).then(
            user => {
                commit('LOGIN_SUCCESS', user);
                return Promise.resolve(user);
            },
            error => {
                commit('LOGIN_FAILURE');
                return Promise.reject(error);
            }
        );
    },
    logout({ commit }) {
        AuthService.logout();
        commit('LOGOUT');
    },
    register({ commit }, user) {
        return AuthService.register(user).then(
            response => {
                commit('REGISTER_SUCCESS');
                return Promise.resolve(response.data);
            },
            error => {
                commit('REGISTER_FAILURE');
                return Promise.reject(error);
            }
        );
    }
};


// VUEX MUTATIONS
const mutations = {
    LOGIN_SUCCESS(state, user) {
        state.status.loggedIn = true;
        state.user = user;
    },
    LOGIN_FAILURE(state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    LOGOUT(state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    REGISTER_SUCCESS(state) {
        state.status.loggedIn = false;
    },
    REGISTER_FAILURE(state) {
        state.status.loggedIn = false;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};