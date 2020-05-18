/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in moderator.store.js is proprietary and confidential.            *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/
import BerthyAPI from "../../services/berthy-api";
//import {setIcons} from "../../assets/helperFunctions";

// State initial object
const initialState = () => ({
    error: null,
    success: null,
    message: null,
    filter: {
        onlyMy: null,
        status: null,
        dateFrom: null,
        dateTo: null,
        pageNum: 0,
        pageSize: 10,
    },
    length: 0,
    applications: [
        {
            id: 0,
            berthId: 0,
            applicantId: 0,
            createdAt: '2020-05-16T18:32:58.201Z',
            status: 'NEW',
            title: 'TITLE',
            description: 'DESCRIPTION',
            attachments: [
                {
                    fileId: 'string',
                    fileName: 'string',
                    fileLink: 'string'
                }
            ],
            decision: 'DECISION',
            moderatorId: 0
        }
    ],
    lastUpdate: null,
});


/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getApplications(state) {
        return state.applications;
    }
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    async fetchApplications({state,commit}) {
        commit('FETCHING');
        let response = await BerthyAPI.post('management/berths/applications/filter', state.filter);
        console.log(response);
        if (response.data) {
            if (response.data.success) {
                commit('UPDATE_APPLICATIONS', response.data.data);
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
    UPDATE_APPLICATIONS(state, {items, totalCount}) {
        state.success = true;
        state.error = false;
        state.applications = items;
        state.length = totalCount;
        state.lastUpdate = Date.now();
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};