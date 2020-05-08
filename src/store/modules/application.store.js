/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in application.store.js is proprietary and confidential.          *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

// State initial object
const initialState = () => ({
    message: '',
    attachments: [],
    name: '',
    description: '',
    lat: 0,
    lng: 0,
    site: '',
    radio: '',
    phCode: '',
    phNumber: '',
    photos: [],
    amenities: [],
    places: [],
});


/* Module application.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {

};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    onMessage({ commit }) {
        commit('EDIT_MESSAGE');
    },
    uploadAttachment({ commit }) {
        commit('EDIT_ATTACHMENTS');
    },
    onMarinaName({ commit }) {
        commit('EDIT_MARINA_NAME');
    },
    onMarinaDescription({ commit }) {
        commit('EDIT_MARINA_DESCRIPTION');
    },
    onMarinaLat({ commit }) {
        commit('EDIT_MARINA_LAT');
    },
    onMarinaLng({ commit }) {
        commit('EDIT_MARINA_LNG');
    },
    onMarinaSite({ commit }) {
        commit('EDIT_MARINA_SITE');
    },
    onMarinaRadio({ commit }) {
        commit('EDIT_MARINA_RADIO');
    },
    onMarinaPhCode({ commit }) {
        commit('EDIT_MARINA_PH_CODE');
    },
    onMarinaPhNumber({ commit }) {
        commit('EDIT_MARINA_PH_NUMBER');
    },
    uploadPhotos({commit}) {
        commit('EDIT_MARINA_PHOTOS');
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
    EDIT_MESSAGE(state, message) {
        state.description = message;
    },
    EDIT_ATTACHMENTS() {

    },
    EDIT_NAME(state, name) {
        state.name = name;
    },
    EDIT_DESCRIPTION(state, description) {
        state.description = description;
    },
    EDIT_LAT(state, lat) {
        state.lat = lat;
    },
    EDIT_LNG(state, lng) {
        state.lng = lng;
    },
    EDIT_SITE(state, site) {
        state.site = site;
    },
    EDIT_RADIO(state, radio) {
        state.radio = radio;
    },
    EDIT_PH_CODE(state, code) {
        state.phCode = code;
    },
    EDIT_PH_NUMBER(state, number) {
        state.phNumber = number;
    },
    EDIT_PHOTOS() {

    },
};


export default {
    state,
    getters,
    actions,
    mutations
};