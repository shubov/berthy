/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in file.store.js is proprietary and confidential.                 *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

/* Module file.store.js */
import BerthyAPI from "../../services/berthy-api";

const initialState = () => ({
    success: null,
    error: null,
    fileToUpload: null,
    fileLink: null,
    fileId: null,
    fileName: null,
});

// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getFile(state) {
        return {
            fileId: state.fileId,
            fileLink: state.fileLink,
            fileName: state.fileName,
        }
    },
    isUploaded(state) {
        return !!state.success;
    },
    getError(state) {
        return state.error;
    }
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    async uploadFile({commit, state}, file) {
        commit('RESET');
        commit('SET_FILE_TO_UPLOAD', file);
        let response = await BerthyAPI.post('files', state.fileToUpload);
        if (response.data.success) {
            commit('FILE_IS_UPLOADED', response.data.data);
        } else {
            commit('ERROR', response.data.error.message);
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
    SET_FILE_TO_UPLOAD(state, file){
        state.fileToUpload = new FormData();
        state.fileToUpload.append('file', file);
    },
    FILE_IS_UPLOADED(state, {fileId, fileLink, fileName}) {
        state.fileId = fileId;
        state.fileLink = fileLink;
        state.fileName = fileName;
        state.success = true;
    },
    ERROR(state, msg) {
        state.success = false;
        state.error = msg
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};