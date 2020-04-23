/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in main.js is proprietary and confidential.                       *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from 'vue';

import "./components/Base/_globals";
import 'leaflet/dist/leaflet.css';

// import Axios from 'axios';
// Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

import GAuth from 'vue-google-oauth2';
const gauthOption = {
    clientId: '265366447857-s71rp9r5t5ff8qa2nqhfku21rq9kk929.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account',
};
Vue.use(GAuth, gauthOption);
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import App from './App.vue';
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
