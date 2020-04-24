/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in main.js is proprietary and confidential.                       *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from 'vue';

import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import AuthService from '@/services/auth.service';
import "./components/Base/_globals";
import 'leaflet/dist/leaflet.css';


Vue.config.productionTip = false;
Vue.prototype.$auth = AuthService;


//********************************** Sentry ********************************************
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
Sentry.init({
    dsn: 'https://ebe70e3d42494fca8d2660baea73eaaf@o382880.ingest.sentry.io/5212428',
    integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
});
//********************************** Sentry ********************************************



//************************ Google OAuth 2.0 ********************************************
import GAuth from 'vue-google-oauth2';
const gauthOption = {
    clientId: '265366447857-s71rp9r5t5ff8qa2nqhfku21rq9kk929.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account',
};
Vue.use(GAuth, gauthOption);
//************************ Google OAuth 2.0 ********************************************


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
