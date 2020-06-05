/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in snackbar.store.js is proprietary and confidential.             *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 6 / 2020                   *
 ******************************************************************************/

// State initial object
const initialState = () => ({
    status: false,
    message: "",
    color: 'error',
});


/* Module snackbar.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    set({dispatch}, message) {
        dispatch('openSnackbar', {
            color: 'error',
            message: message ? message : 'Try again'
        });
    },
    push({dispatch}, message) {
        dispatch('openSnackbar', {
            color: 'info',
            message: message ? message : 'New notification'
        });
    },
    openSnackbar({commit}, {color, message}) {
        commit('SET_SNACKBAR', false);
        commit('SET_SNACKBAR_MESSAGE', message);
        commit('SET_SNACKBAR_COLOR', color);
        setTimeout(()=>{
            commit('SET_SNACKBAR', true);
        }, 0);
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
    SET_SNACKBAR(state, value){
        state.status = value;
    },
    SET_SNACKBAR_MESSAGE(state, value){
        state.message = value;
    },
    SET_SNACKBAR_COLOR(state, value) {
        state.color = value;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};