/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in chat.store.js is proprietary and confidential.                 *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 6 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../../services/berthy-api";
import {setTimes} from "../../assets/helperFunctions";


// State initial object
const initialState = () => ({
    messages: [],
    chats: [],
    current: null,

    error: null,
});


/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getMyChats(state) {
        return state.chats;
    },
    getMessages(state) {
        return state.messages;
    },
    getCurrent(state) {
        return state.current;
    }
};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    async getAllMyChats({commit}) {
        let response = await BerthyAPI.get('chats');
        if (response.data) {
            if (response.data.success) {
                commit('UPDATE_CHATS', response.data.data);
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    async startChat({commit}, accountID) {
        if (isNaN(accountID)) return false;
        let response = await BerthyAPI.post('chats', accountID);
        if (response.data) {
            if (response.data.success) {
                commit('ADD_CHAT', response.data.data);
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    async getChat({commit}, id) {
        if (isNaN(id)) return false;
        let response = await BerthyAPI.get(`chats/${id}`);
        if (response.data) {
            if (response.data.success) {
                commit('ADD_CHAT', response.data.data);
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    async getChatMessages({commit}, id) {
        if (isNaN(id)) return false;

        let params = new URLSearchParams();
        params.append("offsetEnd", '100');
        params.append("offsetStart", '0');

        let response = await BerthyAPI.get(`chats/${id}/messages`, {params});
        if (response.data) {
            if (response.data.success) {
                commit('SET_MESSAGES', response.data.data);
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    async sendMessage({commit}, {id, text}) {
        if (isNaN(id)) return false;
        let response = await BerthyAPI.post(`chats/${id}/messages`, {
            type: "TEXT",
            text: text,
        });
        if (response.data) {
            if (response.data.success) {
                commit('ADD_MESSAGE', response.data.data);
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    // async updateChatOffset({commit}, {id, offset}) {
    //     if (isNaN(id)) return false;
    //     let response = await BerthyAPI.post(`chats/${id}/offset/${offset}`);
    //     if (response.data) {
    //         if (response.data.success) {
    //             return true;
    //         } else {
    //             return response.data.error.message || response.data.error;
    //         }
    //     }
    //     return false;
    // },
}

// VUEX MUTATIONS
const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    UPDATE_CHATS(state, chats) {
        state.chats = chats;
        state.chats.forEach(chat => {
            chat.ago = setTimes(chat.lastMessage.sendDateTime);
        })
    },
    SET_MESSAGES(state, messages) {
        state.messages = messages;
    },
    ADD_MESSAGE() {
        //state.messages.push(message);
    },
    ADD_CHAT(state, chat) {
        chat.ago = setTimes(chat.lastMessage.sendDateTime);
        //state.chats.push(chat);
    },
    SET_CURRENT(state, chat) {
        state.current = chat;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};