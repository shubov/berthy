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
    email: null,
    id: null,
    kind: null,
    permissions: [],
    roles: [],
    firstName: null,
    lastName: null,
    phCode: null,
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
    getRoles(){
        return state.roles;
    },
    isLoggedIn() {
        return state.roles.length>0;
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
            commit('SET_ACCOUNT_INFO', {
                email: response.data.data.email,
                id: response.data.data.id,
                kind: response.data.data.kind,
                permissions: response.data.data.permissions,
                roles: response.data.data.roles
            });
        }

    },
    async updateUserInfo({commit}) {
        let response = await BerthyAPI.get("accounts/userInfo");
        if (response.data.success) {
            commit('SET_USER_INFO', {
                firstName: response.data.data.firstName,
                lastName: response.data.data.lastName,
                phCode: response.data.data.phCode,
                phNumber: response.data.data.phNumber,
                photo: response.data.data.photo
            });
        }

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
    SET_ACCOUNT_INFO(state, {email, id, kind, permissions, roles}){
        state.email = email;
        state.id = id;
        state.kind = kind;
        state.permissions = permissions;
        state.roles = roles;
    },
    SET_USER_INFO(state, {firstName, lastName, phCode, phNumber, photo}){
        state.firstName = firstName;
        state.lastName = lastName;
        state.phCode = phCode;
        state.phNumber = phNumber;
        state.photo = photo;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};
