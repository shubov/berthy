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
import axios from "axios";

// State initial object
const initialState = () => ({
    marinas: [],
    numOfMarinas: 0,
    current: null,

    success: null,
    error: null,
    message: null,

    reviews: [],
    reviewsLength: null,
    publicMarinaAddress: null,
    publicMarina: {},
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
    },
    getPublicMarinaLat(state) {
        let lat = state.publicMarina.lat;
        return lat ? lat : null;
    },
    getPublicMarinaLng(state) {
        let lng = state.publicMarina.lng;
        return lng ? lng : null;
    },
    getPublicMarinaAddress () {
        return state.publicMarinaAddress;
    },
    getReviews(state){
        return state.reviews;
    },
    getReviewsLength(state){
        return state.reviewsLength;
    },
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
                if(getters.getNumOfMarinas) {
                    await dispatch('selectMarina', null);
                }
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

    async selectMarina({commit, rootGetters}, index) {
        if (state.marinas[index]) setIcons(state.marinas[index].amenities, rootGetters);
        commit('SELECT_MARINA', index);
    },

    async getMarinaReviews({commit}, id) {
        commit('FETCHING');
        let response = await BerthyAPI.post(`berths/${id}/reviews/filter`, {
            pageNum: 0,
            pageSize: 10,
        });
        if (response.data) {
            if (response.data.success) {
                commit('SET_REVIEWS', response.data.data);
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },

    async sendReview({commit}, {id, text, rating}) {
        commit('FETCHING');
        let response = await BerthyAPI.post(`berths/${id}/reviews`, {text,rating});
        if (response.data) {
            if (response.data.success) {
                commit('ADD_REVIEW');
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async deleteReview({commit}, {marinaID, reviewID}) {
        commit('FETCHING');
        let response = await BerthyAPI.delete(`berths/${marinaID}/reviews/${reviewID}`);
        if (response.data) {
            if (response.data.success) {
                commit('DELETE_REVIEW');
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async getPublicMarinaAddress({commit, getters}) {
        if (!getters.getPublicMarinaLat || !getters.getPublicMarinaLng) return;
        commit('FETCHING');
        let response = await axios.get(
            `https://eu1.locationiq.com/v1/reverse.php?key=3d060ee2a41b88&lat=${
                getters.getPublicMarinaLat
            }&lon=${
                getters.getPublicMarinaLng
            }&format=json&zoom=14&accept-language=en`
        );
        if (response.status===200) {
            commit('SET_MARINA_ADDRESS', response.data.display_name);
        } else {
            commit('ERROR');
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
    SET_MY_MARINAS(state, data) {
        state.success = true;
        state.error = false;
        state.marinas = data;
        state.numOfMarinas = data.length;
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
        if (index == null) {
            let ls = JSON.parse(localStorage.getItem('current_marina'));
            if (ls != null && ls > -1 && ls < state.marinas.length)
                state.current = ls;
            else state.current = 0;
        } else {
            state.current = index;
        }
        localStorage.setItem('current_marina', state.current);
    },
    SET_REVIEWS(state, data) {
        state.reviews = data.items;
        state.reviewsLength = data.totalCount;
    },
    ADD_REVIEW() {},
    DELETE_REVIEW() {},
    SET_MARINA_ADDRESS(state, address) {
        state.publicMarinaAddress = address;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};