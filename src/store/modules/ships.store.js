/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in ships.store.js is proprietary and confidential.                *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../../services/berthy-api";

// State initial object
const initialState = () => ({
    ships: [],
    numOfShips: 0,
    success: null,
    error: null,
    message: null,
    shipToCreate: {
        name: null,
        type: null,
        length: null,
        width: null,
        draft: null,
        producer: null,
        model: null,
        year: null,
        insCompany: null,
        insExpiry: null,
        insNumber: null,
        insFile: null,
        regNumber: null,
        regExpiry: null,
        regFile: null,
        photos: [],
    }
});

/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getShips(state) {
        return state.ships;
    },
    getShip(state) {
        return state.ships[state.current];
    },
    getNumOfShips(state) {
        return state.numOfShips;
    },
    getShipDto(state) {
        return {
            name: state.shipToCreate.name,
            type: state.shipToCreate.type,
            dimensions: {
                length: state.shipToCreate.length,
                width: state.shipToCreate.width,
                draft: state.shipToCreate.draft,
            },
            model: {
                producer: state.shipToCreate.producer,
                model: state.shipToCreate.model,
                year: state.shipToCreate.year,
            },
            insurance: {
                company: state.shipToCreate.insCompany,
                expire: state.shipToCreate.insExpiry,
                number: state.shipToCreate.insNumber,
                file: state.shipToCreate.insFile,
            },
            registration: {
                number: state.shipToCreate.regNumber,
                expire: state.shipToCreate.regExpiry,
                file: state.shipToCreate.regFile,
            },
            photos: state.shipToCreate.photos,
        }
    }
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    getShipIdByIndex({getters}, index) {
        return getters.ships[index].id;
    },
    getShipById({state}, id) {
        let res;
        state.ships.forEach(ship=>{
            if (ship.id===id) res = ship;
        });
        return res;
    },
    async uploadFile({commit, dispatch, rootGetters}, {file, commitType}) {
        await dispatch('File/uploadFile', file, {root:true});
        if (rootGetters['File/isUploaded'])
            commit(commitType, rootGetters['File/getFile']);
    },
    async fetchShips({commit}) {
        commit('PENDING');
        let response = await BerthyAPI.get('ships');

        if (response.data) {
            if (response.data.success) {
                commit('SUCCESS');
                commit('SET_SHIPS', response.data.data);
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async createShip({commit, dispatch, getters}) {
        commit('PENDING');
        let response = await BerthyAPI.post('ships', getters.getShipDto);

        if (response.data) {
            if (response.data.success) {
                commit('SUCCESS');
                dispatch('fetchShips');
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async updateShip({commit, dispatch}, index) {
        commit('PENDING');
        let id = dispatch('getShipIdByIndex', index);
        let response = await BerthyAPI.put(`ships/${id}`);

        if (response.data) {
            if (response.data.success) {
                commit('SUCCESS');
                dispatch('fetchShips');
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async deleteShip({commit, dispatch}, index) {
        commit('PENDING');
        let id = dispatch('getShipIdByIndex', index);
        let response = await BerthyAPI.delete(`ships/${id}`);

        if (response.data) {
            if (response.data.success) {
                commit('SUCCESS');
                dispatch('fetchShips');
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
    PENDING(state) {
        state.success = null;
        state.error = null;
        state.message = null;
    },
    ERROR(state, msg) {
        state.success = false;
        state.error = true;
        state.message = msg;
    },
    SUCCESS(state) {
        state.success = true;
        state.error = false;
        state.message = null;
    },
    SET_SHIPS(state, value) {
      state.ships = value;
    },
    NAME(state, value) {
        state.shipToCreate.name = value;
    },
    TYPE(state, value) {
        state.shipToCreate.type = value;
    },
    LENGTH(state, value) {
        state.shipToCreate.length = value;
    },
    WIDTH(state, value) {
        state.shipToCreate.width = value;
    },
    DRAFT(state, value) {
        state.shipToCreate.draft = value;
    },
    PRODUCER(state, value) {
        state.shipToCreate.producer = value;
    },
    MODEL(state, value) {
        state.shipToCreate.model = value;
    },
    YEAR(state, value) {
        state.shipToCreate.year = value;
    },
    INS_COMPANY(state, value) {
        state.shipToCreate.insCompany = value;
    },
    INS_EXPIRY(state, value) {
        state.shipToCreate.insExpiry = value;
    },
    INS_NUMBER(state, value) {
        state.shipToCreate.insNumber = value;
    },
    REG_NUMBER(state, value) {
        state.shipToCreate.regNumber = value;
    },
    REG_EXPIRY(state, value) {
        state.shipToCreate.regExpiry = value;
    },
    INS_FILE(state, value) {
        state.shipToCreate.insFile = value;
    },
    REG_FILE(state, value) {
        state.shipToCreate.regFile = value;
    },
    ADD_PHOTO(state, value) {
        state.shipToCreate.photos.push(value);
    },
    REMOVE_PHOTO(state, index) {
        state.shipToCreate.photos.splice(index, 1);
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};