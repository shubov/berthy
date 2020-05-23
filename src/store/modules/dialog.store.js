/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in dialog.store.js is proprietary and confidential.               *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

// State initial object
const initialState = () => ({
    dialog: false,
    message: '',
});


/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    dialog(state) {
        return state.dialog;
    },
    message(state) {
        return state.message;
    }
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    set({commit}, message) {
        commit('SET', message);
    },
    close({commit}) {
        commit('CLOSE');
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
    SET(state, message) {
        state.dialog = true;
        state.message = message;
    },
    CLOSE(state) {
        state.dialog = false;
        state.message = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};