/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in amenities.store.js is proprietary and confidential.            *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../../services/berthy-api";

// State initial object
const initialState = () => ({
    amenities: [],
    lastUpdate: null,
    length: 0,
});


/* Module amenities.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getAmenity: (state) => (index) => {
        return state.amenities[index];
    },
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    async availableAmenities({ commit }) {
        let response = await BerthyAPI.get('amenities');
        if (response.data.success) {
            commit('UPDATE_AMENITIES', response.data.data);
        }
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
    UPDATE_AMENITIES(state,data) {
        state.amenities = data;
        state.length = data.length;
        state.lastUpdate = Date.now();
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};
