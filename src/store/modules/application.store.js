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
    message: null,
    attachments: [],
    name: null,
    description: null,
    startOfSeason: null,
    endOfSeason: null,
    lat: null,
    lng: null,
    site:null,
    radio: null,
    phCode: null,
    phNumber: null,
    photos: [],
    amenities: [],
    places: [],
    defaults: {
        updated: false,
        defaultPrice: null,
        number: null,
        defaultLength: null,
        defaultWidth: null,
        defaultDraft: null,
        localization: 'US',
    }
});


/* Module application.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getDefaultsUpdated(state){
        return state.defaults.updated;
    },
    isValid(state){
        return state.name && state.lat && state.lng;
    },
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
        if (!getters.isValid) return false;
        let data = getters.getApplication;
        data.berth.amenities = await dispatch('Amenities/getAmenitiesByKeys', data.berth.amenities, {root:true});
        let response = await BerthyAPI.post('berths/applications', data);
        if (response.data ? response.data.success: false) {
            commit('SUCCESS');
            return true;
        } else {
            commit('ERROR', response.data.error.message);
        }
        return false;
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
    generatePlaces({state, commit}) {
        if (state.defaults.number < 1) {
            console.log('4');
            return false;
        }
        commit('GENERATE_PLACES');
        for (let i = 0; i < state.defaults.number; i++) {
            commit("ADD_PLACE");
        }
        return true;
    },
    onRemovePhoto({ commit }, index){
        commit('REMOVE_PHOTO', index);
    },
    onRemoveAttachment({ commit }, index){
        commit('REMOVE_ATTACHMENT', index);
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
    },
    GENERATE_PLACES(state){
        state.defaults.updated = false;
        state.places = [];
    },
    ADD_PLACE(state){
        state.places.push({
            name: 1 + state.places.length,
            length: state.defaults.defaultLength,
            draft: state.defaults.defaultDraft,
            width: state.defaults.defaultWidth,
            price: state.defaults.defaultPrice,
            xCoord: 0,
            yCoord: 0,
            rotate: 0,
            color: 'green'
        });
    },
    EDIT_PLACE(state, {index, place}){
        state.places[index] = place;
    },
    REMOVE_PLACE(state, index) {
        state.places.splice(index, 1);
        state.defaults.number--;
    },
    UPDATE_PRICE(state,value){
        state.defaults.defaultPrice =value;
        state.defaults.updated = true;
    },
    UPDATE_DRAFT(state,value){
        state.defaults.defaultDraft =value;
        state.defaults.updated = true;
    },
    UPDATE_WIDTH(state,value){
        state.defaults.defaultWidth =value;
        state.defaults.updated = true;
    },
    UPDATE_LENGTH(state,value){
        state.defaults.defaultLength =value;
        state.defaults.updated = true;
    },
    UPDATE_NUMBER(state,value){
        state.defaults.number =value;
        state.defaults.updated = true;
    },
    UPDATE_LOCALIZATION(state,value){
        state.defaults.localization =value;
        state.defaults.updated = true;
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};