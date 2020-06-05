/******************************************************************************
 * Copyright (c)  - 2020 - Mikhail Shubov.                                    *
 * All Rights Reserved.                                                       *
 * The code in sockets.store.js is part of Berthy project.                    *
 * Unauthorized copying of the file and any parts as well as the project itself of it is strictly prohibited.
 * Proprietary and confidential.                                              *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 2020                     *
 *                                                                            *
 ******************************************************************************/

// vue.config.js     https://github.com/shubov/berthy/blob/master/vue.config.js
// .gitignore        https://github.com/shubov/berthy/blob/master/.gitignore
// README.md         https://github.com/shubov/berthy/blob/master/README.md
// babel.config.js   https://github.com/shubov/berthy/blob/master/babel.config.js
// package-lock.json https://github.com/shubov/berthy/blob/master/package-lock.json
// package.json      https://github.com/shubov/berthy/blob/master/package.json
//
// Public
// android-chrome-[X]x[X].png
// apple-touch-icon-[X]x[X]-precomposed.png
// apple-touch-icon-[X]x[X].png
// favicon-32x32.png
// mstile-70x70.png
// safari-pinned-tab.svg
// https://github.com/shubov/berthy/blob/master/public/browserconfig.xml
// https://github.com/shubov/berthy/blob/master/public/index.html
// https://github.com/shubov/berthy/blob/master/public/site.webmanifest
//
// https://github.com/shubov/berthy/blob/master/src/App.vue
// https://github.com/shubov/berthy/blob/master/src/main.js
//
// Assets
//     background.webp        https://github.com/shubov/berthy/blob/master/src/assets/background.webp
//     berthy_logo.png        https://github.com/shubov/berthy/blob/master/src/assets/berthy_logo.png
//     berthy_logo_black.png  https://github.com/shubov/berthy/blob/master/src/assets/berthy_logo_black.png
//     g.svg                  https://github.com/shubov/berthy/blob/master/src/assets/g.svg
//     helperFunctions.js     https://github.com/shubov/berthy/blob/master/src/assets/helperFunctions.js
//     marina.jpg             https://github.com/shubov/berthy/blob/master/src/assets/marina.jpg
//     marina.webp            https://github.com/shubov/berthy/blob/master/src/assets/marina.webp
//     notification.mp3       https://github.com/shubov/berthy/blob/master/src/assets/notification.mp3
//     powerBoat.jpg          https://github.com/shubov/berthy/blob/master/src/assets/powerBoat.jpg
//     powerBoat.webp         https://github.com/shubov/berthy/blob/master/src/assets/powerBoat.webp
//     sailBoat.jpg           https://github.com/shubov/berthy/blob/master/src/assets/sailBoat.jpg
//     sailBoat.webp          https://github.com/shubov/berthy/blob/master/src/assets/sailBoat.webp
//
// Components
//
// https://github.com/shubov/berthy/blob/master/src/components/Avatar.vue
//
//     AppComponents
//     https://github.com/shubov/berthy/blob/master/src/components/AppComponents/AppBar.vue
//     https://github.com/shubov/berthy/blob/master/src/components/AppComponents/Dialog.vue
//     https://github.com/shubov/berthy/blob/master/src/components/AppComponents/FooterBar.vue
//     https://github.com/shubov/berthy/blob/master/src/components/AppComponents/NavBar.vue
//     https://github.com/shubov/berthy/blob/master/src/components/AppComponents/Snackbar.vue
//
//     AuthComponents
//     https://github.com/shubov/berthy/blob/master/src/components/AuthComponents/SignInForm.vue
//     https://github.com/shubov/berthy/blob/master/src/components/AuthComponents/SignUpForm.vue
//
//
//     https://github.com/shubov/berthy/blob/master/src/components/BookComponents/ReservationCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/BookComponents/SearchCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/BookComponents/SearchListCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/BookComponents/SearchMap.vue
//     https://github.com/shubov/berthy/blob/master/src/components/BookComponents/SearchMarinaCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/BookComponents/ShipForm.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/ChatComponents/ChatCard.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/DashboardComponents/HighlightCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/DashboardComponents/LayoutItemLabel.vue
//     https://github.com/shubov/berthy/blob/master/src/components/DashboardComponents/MapCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/DashboardComponents/RatingCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/DashboardComponents/Table.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaBookingsComponents/BookingCard.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaComponents/PublicMarinaMap.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaComponents/ReviewForm.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/DateInput.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/FileInput.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/LocationInput.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/MarinaRegistrationMap.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/PhoneInput.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/PlaceEditCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/PlaceInput.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/SelectAmenities.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/StringInput.vue
//     https://github.com/shubov/berthy/blob/master/src/components/MarinaRegComponents/TextInput.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/ModeratorComponents/MarinaApplicationCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/ModeratorComponents/ModeratorFilter.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/ProfileComponents/EditProfileCard.vue
//
//     https://github.com/shubov/berthy/blob/master/src/components/TripsComponents/TripCard.vue
//     https://github.com/shubov/berthy/blob/master/src/components/TripsComponents/TripDetails.vue
//
//
// https://github.com/shubov/berthy/blob/master/src/plugins/vuetify.js
//
// https://github.com/shubov/berthy/blob/master/src/router/functions.js
// https://github.com/shubov/berthy/blob/master/src/router/index.js
// https://github.com/shubov/berthy/blob/master/src/router/routes.js
//
// https://github.com/shubov/berthy/blob/master/src/services/auth.service.js
// https://github.com/shubov/berthy/blob/master/src/services/berthy-api.js
// https://github.com/shubov/berthy/blob/master/src/services/web-storage.js
//
// https://github.com/shubov/berthy/blob/master/src/store/index.js
//
// https://github.com/shubov/berthy/blob/master/src/store/modules/amenities.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/application.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/bookings.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/chat.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/dashboard.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/dialog.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/file.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/index.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/marina.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/moderator.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/reservation.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/ships.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/snackbar.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/sockets.store.js
// https://github.com/shubov/berthy/blob/master/src/store/modules/user.store.js
//
// https://github.com/shubov/berthy/blob/master/src/views/Boater/Book.vue
// https://github.com/shubov/berthy/blob/master/src/views/Boater/Trips.vue
//
// https://github.com/shubov/berthy/blob/master/src/views/Dockmaster/Bookings.vue
// https://github.com/shubov/berthy/blob/master/src/views/Dockmaster/Dashboard.vue
// https://github.com/shubov/berthy/blob/master/src/views/Dockmaster/MarinaRegistration.vue
// https://github.com/shubov/berthy/blob/master/src/views/Dockmaster/Settings.vue
// https://github.com/shubov/berthy/blob/master/src/views/Dockmaster/Team.vue
//
// https://github.com/shubov/berthy/blob/master/src/views/Moderator/Applications.vue
//
// https://github.com/shubov/berthy/blob/master/src/views/Public/FAQ.vue
// https://github.com/shubov/berthy/blob/master/src/views/Public/FourOFour.vue
// https://github.com/shubov/berthy/blob/master/src/views/Public/LandingPage.vue
// https://github.com/shubov/berthy/blob/master/src/views/Public/SignIn.vue
// https://github.com/shubov/berthy/blob/master/src/views/Public/SignUp.vue
//
// https://github.com/shubov/berthy/blob/master/src/views/User/Marina.vue
// https://github.com/shubov/berthy/blob/master/src/views/User/Messages.vue
// https://github.com/shubov/berthy/blob/master/src/views/User/PaymentFailure.vue
// https://github.com/shubov/berthy/blob/master/src/views/User/PaymentSuccess.vue
// https://github.com/shubov/berthy/blob/master/src/views/User/Profile.vue
// https://github.com/shubov/berthy/blob/master/src/views/User/Role.vue
// https://github.com/shubov/berthy/blob/master/src/views/User/SignUpError.vue





import storage from '../../services/web-storage'

// State initial object
const initialState = () => ({
    url: 'wss://egehackbot.cf:8080/socket?accessToken=',
    ws: null,
    connected: false,
    error: '',
    message: '',
    time: '',
});


/* Module sockets.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getConnectionStatus( state ) {
        return state.connected;
    },
    getError( state ) {
        return state.error;
    },
    getMessage( state ) {
        return state.message;
    },
    getLastUpdateTime() {
        return state.time;
    },
    getWsUrl() {
        return state.url;
    },
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    send({state}, data) {
        state.ws.send(JSON.stringify(data));
    },
    init({getters, dispatch, commit}){
        if (!storage.getAccessToken()) return false;
        let ws = new WebSocket(getters.getWsUrl+storage.getAccessToken());
        ws.onopen = function() {
            dispatch('onConnect');
        };
        ws.onclose = function(event) {
            dispatch('onDisconnect', event);
        };
        ws.onmessage = function(message) {
            dispatch('onMessage', message);
        };
        ws.onerror = function(message) {
            dispatch('onError', message);
        };
        commit('INIT', ws);
        return true;
    },
    onConnect({commit}) {
        commit('SOCKET_CONNECT');
    },
    onDisconnect({commit}) {
        commit('SOCKET_DISCONNECT');
    },
    async onMessage({dispatch}, payload) {
        let message = JSON.parse(payload.data);
        if (message.event === "CHAT_MESSAGE") {
            let title = await dispatch('Chat/onWebSocketMessage', message.data, {root: true});
            title = title ? title+': ' : 'Message: ';
            title += message.data.message.text;
            dispatch('Snackbar/push', title, {root: true});
        } else {
            dispatch('Snackbar/push', null, {root: true});
        }

    },
    onError({commit}, message) {
        commit('SOCKET_ERROR', message);
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
    INIT(state, ws) {
        state.ws = ws;
    },
    SOCKET_CONNECT(state) {
        state.connected = true;
    },
    SOCKET_DISCONNECT(state) {
        state.connected = false;
    },
    SOCKET_MESSAGE(state, {message, time, device}) {
        state.time = time;
        state.message = {message, device};
    },
    SOCKET_ERROR(state, error) {
        state.error = error
        state.connected = false
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};