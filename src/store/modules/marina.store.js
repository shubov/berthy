/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in marina.store.js is proprietary and confidential.               *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../../services/berthy-api";

// State initial object
const initialState = () => ({
    marinas: [],
    numOfMarinas: 0,
    current: 0,
});


/* Module marina.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getNumOfMarinas(state) {
        return state.numOfMarinas;
    },
    getAll(state) {
        return state.marinas;
    },
    getCurrent(state) {
        return state.current;
    },
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    async fetchMarinas({commit,dispatch}) {
        let response = await BerthyAPI.get('berths');
        if (response.data.success) {
            commit('FETCH_MARINAS', response.data.data);
            await dispatch('selectMarina', 0);
        }
    },
    selectMarina({commit}, index) {
        commit('SELECT_MARINA', index);
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
    FETCH_MARINAS(state, data) {
        state.marinas = data;
        state.length = data.length;
        state.lastUpdate = Date.now();
    },
    SELECT_MARINA(state, rootGetters, index) {
        state.marinas[index].amenities.forEach(amenity => {
            let icon = rootGetters['Amenities/getIcons'].get(amenity.key)
                ? rootGetters['Amenities/getIcons'].get(amenity.key)
                : rootGetters['Amenities/getIcons'].get("default");
            Object.defineProperty(amenity, 'icon', {value: icon});
        });
        state.current = index;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};