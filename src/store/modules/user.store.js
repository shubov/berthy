/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in user.store.js is proprietary and confidential.                 *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../../services/berthy-api";

// State initial object
const initialState = () => ({
    success: null,
    error: null,
    message: null,
    email: null,
    id: null,
    kind: null,
    hasBerths: false,
    hasShips: false,
    permissions: [],
    roles: [],
    firstName: null,
    lastName: null,
    phCode: null,
    phNumber: null,
    photo: {
        fileId: null,
        fileLink: null,
        fileName: null
    },
});


/* Module user.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getError(state) {
        return state.message;
    },

    getName(state) {
        if (state.firstName && state.lastName)
            return `${state.firstName} ${state.lastName}`
        else
            return '';
    },
    getFirstName(state) {
        return state.firstName;
    },
    getLastName(state) {
        return state.lastName;
    },
    getPhoto(state) {
        if (state.photo)
            return state.photo.fileLink;
        else return null;
    },
    getEmail(state) {
        return state.email;
    },
    getPhone(state) {
        return state.phNumber;
    },
    getID(state) {
        return state.id;
    },

    isUser(state) {
        return state.roles.includes("USER");
    },
    isModerator(state) {
        return state.roles.includes("MODERATOR");
    },
    isLoggedIn(state) {
        return state.roles.length>0;
    },
    getRoles(state){
        return state.roles;
    },

    moderator(state, getters) {
        return getters.isLoggedIn && getters.isModerator;
    },
    dockmaster(state, getters) {
        return getters.isLoggedIn && !getters.isModerator && state.hasBerths;
    },
    boater(state, getters) {
        return getters.isLoggedIn && !getters.isModerator && state.hasShips && !state.hasBerths;
    },
    newUser(state, getters) {
        return getters.isLoggedIn && !getters.isModerator && !state.hasShips && !state.hasBerths;
    },
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    async updateAccountInfo({commit}) {
        let response = await BerthyAPI.get("accounts/info");
        if (response.data.success) {
            commit('SET_ACCOUNT_INFO', response.data.data);
        }
    },
    async updateUserInfo({commit,dispatch}) {
        commit("FETCHING");
        let response = await BerthyAPI.get("accounts/userInfo");
        return await dispatch('setUserInfo', response);
    },
    async editUserInfo({commit,dispatch}, data) {
        commit("FETCHING");
        let response = await BerthyAPI.put("accounts/userInfo", data)
        return await dispatch('setUserInfo', response);
    },
    async setUserInfo({commit}, response) {
        if (response.data) {
            if (response.data.success) {
                commit('SET_USER_INFO', response.data.data);
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
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
    SET_ACCOUNT_INFO(state, {email, id, kind, permissions, roles, hasBerths, hasShips}) {
        state.email = email;
        state.id = id;
        state.kind = kind;
        state.permissions = permissions;
        state.roles = roles;
        state.hasBerths = hasBerths;
        state.hasShips = hasShips;

        state.success = true;
        state.error = false;
        state.message = null;
    },
    SET_USER_INFO(state, {firstName, lastName, phCode, phNumber, photo}){
        state.firstName = firstName;
        state.lastName = lastName;
        state.phCode = phCode;
        state.phNumber = phNumber;
        state.photo = photo;
        state.success = true;
        state.error = false;
        state.message = null;
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};
