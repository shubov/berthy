/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in application.store.js is proprietary and confidential.          *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/
import BerthyAPI from "../../services/berthy-api";

// State initial object
const initialState = () => ({
    success: null,
    error: null,
    message: '',
    attachments: [],
    name: '',
    description: '',
    startOfSeason: null,
    endOfSeason: null,
    lat: null,
    lng: null,
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
    getApplication(state) {
        return {
            description: state.message,
            attachments: state.attachments,
            berth: {
                name:  state.name,
                description:  state.description,
                lat:  state.lat,
                lng:  state.lng,
                site:  state.site,
                radio:  state.radio,
                phCode:  state.phCode,
                phNumber:  state.phNumber,
                photos:  state.photos,
                amenities:  state.amenities,
                places:  state.places,
            }
        }
    }
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    async submitApplication({getters, commit, dispatch}){
        commit('SUBMITTING');
        let data = getters.getApplication;
        console.log(data.berth.amenities);
        data.berth.amenities = await dispatch('Amenities/getAmenitiesByKeys', data.berth.amenities, {root:true});
        console.log(data.berth.amenities);
        let response = await BerthyAPI.post('berths/applications', data);
        if (response.data.success) {
            commit('SUCCESS');
        } else {
            commit('ERROR', response.data.error.message);
        }
    },
    async uploadAttachment({ commit, dispatch, rootGetters }, file) {
        await dispatch('File/uploadFile', file, {root:true});
        if (rootGetters['File/isUploaded'])
            commit('ADD_ATTACHMENT', rootGetters['File/getFile']);
    },
    async uploadPhoto({commit, dispatch, rootGetters}, file) {
        await dispatch('File/uploadFile', file, {root:true});
        if (rootGetters['File/isUploaded'])
            commit('ADD_PHOTO', rootGetters['File/getFile']);
    },
    // editAmenities({commit, dispatch}, value) {
    //     commit('EDIT_AMENITIES', dispatch('Amenities/getAmenitiesByKeys', value, {root:true}));
    // },
    onRemovePhoto({ commit }, index){
        commit('REMOVE_PHOTO', index);
    },
    onRemoveAttachment({ commit }, index){
        commit('REMOVE_ATTACHMENT', index);
    },
    onMessage({ commit }) {
        commit('EDIT_MESSAGE');
    },
    onMarinaName({ commit }) {
        commit('EDIT_NAME');
    },
    onMarinaDescription({ commit }) {
        commit('EDIT_DESCRIPTION');
    },
    onMarinaLat({ commit }) {
        commit('EDIT_LAT');
    },
    onMarinaLng({ commit }) {
        commit('EDIT_LNG');
    },
    onMarinaSite({ commit }) {
        commit('EDIT_SITE');
    },
    onMarinaRadio({ commit }) {
        commit('EDIT_RADIO');
    },
    onMarinaPhCode({ commit }) {
        commit('EDIT_PH_CODE');
    },
    onMarinaPhNumber({ commit }) {
        commit('EDIT_PH_NUMBER');
    },
};


// VUEX MUTATIONS
const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    SUBMITTING(state) {
        state.success = null;
        state.error = null;
    },
    SUCCESS(state) {
        state.success = true;
        state.error = null;
    },
    ERROR(state, msg) {
        state.success = false;
        state.error = msg;
    },
    EDIT_MESSAGE(state, message) {
        state.message = message;
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
    EDIT_START_OF_SEASON(state, date) {
        state.startOfSeason = date;
    },
    EDIT_END_OF_SEASON(state, date) {
        state.endOfSeason = date;
    },
    ADD_PHOTO(state, photo) {
        state.photos.push(photo);
    },
    REMOVE_PHOTO(state, index){
        state.photos.splice(index, 1);
    },
    ADD_ATTACHMENT(state, attachment) {
        state.attachments.push(attachment);
    },
    REMOVE_ATTACHMENT(state, index){
        state.attachments.splice(index, 1);
    },
    EDIT_AMENITIES(state, value) {
        state.amenities = value;
    },
    REMOVE_AMENITY(state, index) {
        state.amenities.splice(index, 1);
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};