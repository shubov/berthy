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

function chatTitle(person) {
    let res = (person.firstName ? person.firstName+' ' : '') + (person.lastName ? person.lastName : '');
    return (person.firstName || person.lastName) ? res : ('id' + person.id);
}

// State initial object
const initialState = () => ({
    messages: [],
    chats: [],
    current: null,
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
    async getAllMyChats({commit, rootGetters}) {
        let response = await BerthyAPI.get('chats');
        if (response.data) {
            if (response.data.success) {
                commit('UPDATE_CHATS', {
                    chats: response.data.data,
                    myID: rootGetters['User/getID'],
                });
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    async startChat({commit}, accountId) {
        if (isNaN(accountId)) return false;
        let response = await BerthyAPI.post('chats', {accountId});
        if (response.data) {
            if (response.data.success) {
                commit('ADD_CHAT');
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    // async getChat({commit}, id) {
    //     if (isNaN(id)) return false;
    //     let response = await BerthyAPI.get(`chats/${id}`);
    //     if (response.data) {
    //         if (response.data.success) {
    //             return true;
    //         } else {
    //             return response.data.error.message || response.data.error;
    //         }
    //     }
    //     return false;
    // },
    async getChatMessages({commit}, {id, start, end, append}) {
        if (isNaN(id)) return false;

        let params = new URLSearchParams();
        params.append("offsetEnd", end);
        params.append("offsetStart", start);

        let response = await BerthyAPI.get(`chats/${id}/messages`, {params});
        if (response.data) {
            if (response.data.success) {
                if (append)
                    commit('APPEND_MESSAGES', response.data.data);
                else
                    commit('SET_MESSAGES', response.data.data);
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    async sendMessage({dispatch, rootGetters, commit}, {id, text}) {
        if (isNaN(id)) return false;
        let response = await BerthyAPI.post(`chats/${id}/messages`, {
            type: "TEXT",
            text: text,
        });
        if (response.data) {
            if (response.data.success) {
                let index = await dispatch('getChatIndexById', id);
                let msg = {
                    chatId: id,
                    message: {
                        type: 'TEXT',
                        text: text,
                        sendDateTime: (new Date()).toISOString(),
                        participantId: rootGetters['User/getID'],
                        id: state.chats[index].lastMessage.id + 1,
                        offset: state.chats[index].lastMessage.offset + 1,
                    }
                };
                await dispatch('onWebSocketMessage', msg);
                commit('UPDATE_CHAT_ACCOUNT_OFFSET', {index, offset: msg.message.offset})
                return true;
            } else {
                return response.data.error.message || response.data.error;
            }
        }
        return false;
    },
    getChatIndexById({state}, id) {
        return state.chats.findIndex(chat => {
            return chat.id===id;
        })
    },
    async onWebSocketMessage({dispatch, commit}, data) {
        if (state.current && (data.chatId === state.current.id)) {
            commit('ADD_MESSAGE', data.message);
        }
        let index = await dispatch('getChatIndexById', data.chatId);
        commit('UPDATE_CHAT', {index, message: data.message});
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
    UPDATE_CHATS(state, {chats, myID}) {
        chats.forEach(chat => {
            let index = chat.participants.findIndex(item => {
                return item.accountId !== myID;
            });
            chat.avatar = chat.participants[index].photoLink;
            chat.title = chatTitle(chat.participants[index]);
            if (chat.lastMessage)
                chat.ago = setTimes(chat.lastMessage.sendDateTime);
            else
                chat.ago = 'new';
        });
        state.chats = chats;
    },
    UPDATE_CHAT_TIMES(state) {
        state.chats.forEach(chat => {
            chat.ago = setTimes(chat.lastMessage.sendDateTime);
        });
    },
    UPDATE_CHAT(state, {index, message}) {
        state.chats[index].lastMessage = message;
        state.chats[index].totalOffset = message.offset;
        state.chats[index].ago = setTimes(message.sendDateTime);
    },
    SET_MESSAGES(state, messages) {
        state.messages = messages;
    },
    APPEND_MESSAGES(state, messages) {
        state.messages.unshift(...messages);
    },
    ADD_MESSAGE(state, message) {
        state.messages.push(message);
    },
    ADD_CHAT() {
    },
    SET_CURRENT(state, chat) {
        state.current = chat;
    },
    UPDATE_CHAT_ACCOUNT_OFFSET(state, {index, offset}) {
        state.chats[index].accountOffset = offset;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};