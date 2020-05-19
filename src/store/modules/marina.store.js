/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in marina.store.js is proprietary and confidential.               *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../../services/berthy-api";
import {setIcons} from "../../assets/helperFunctions";

// State initial object
const initialState = () => ({
    publicMarina: {},
    marinas: [],
    numOfMarinas: 0,
    current: null,
    success: null,
    error: null,
    message: null,
});


/* Module marina.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getNumOfMarinas(state) {
        let  num = state.numOfMarinas;
        return num === 0 ? null : num;
    },
    getAll(state) {
        return state.marinas;
    },
    getCurrent(state) {
        return state.current;
    },
    getPublicMarina(state){
        return state.publicMarina;
    },
    getPublicMarinaName(state) {
        let name = state.publicMarina.name;
        return name ? name : 'Marina';
    }
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },

    async fetchMyMarinas({getters,commit,dispatch}) {
        commit('FETCHING');
        let response = await BerthyAPI.get('berths');
        if (response.data) {
            if (response.data.success) {
                commit('SET_MY_MARINAS', response.data.data);
                if(getters.getNumOfMarinas)
                    await dispatch('selectMarina', 0);
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }

        return false;
    },

    async fetchMarina({commit, rootGetters}, id) {
        commit('FETCHING');

        let params = new URLSearchParams();
        params.append("include", 'amenities');
        params.append("include", 'places');

        let response = await BerthyAPI.get('berths/'+id,{params: params});

        if (response.data) {
            if (response.data.success) {
                setIcons(response.data.data.amenities, rootGetters)
                commit('SET_MARINA', response.data.data);
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }

        return false;
    },

    selectMarina({commit, rootGetters}, index) {
        setIcons(state.marinas[index].amenities, rootGetters);
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
    SET_MY_MARINAS(state, data) {
        state.success = true;
        state.error = false;
        state.marinas = data;
        state.length = data.length;
        state.lastUpdate = Date.now();
    },
    SET_MARINA(state, marina) {
        state.success = true;
        state.error = false;
        state.publicMarina = marina;
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
    SELECT_MARINA(state, index) {
        state.current = index;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};