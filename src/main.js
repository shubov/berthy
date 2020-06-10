/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in main.js is proprietary and confidential.                       *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from 'vue';
import VueRouter from "vue-router";
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import AuthService from './services/auth.service';
//import "./components/_globals";

Vue.config.productionTip = false;
Vue.prototype.$auth = AuthService;
Vue.prototype.$berthy_blue = '#000033';
Vue.prototype.$googleMapsApiKey=""

//********************************** Sentry ********************************************
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
if (process.env.NODE_ENV === 'production'){
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
    });
}
//********************************** Sentry ********************************************


//************************ Google OAuth 2.0 ********************************************
import GAuth from 'vue-google-oauth2';
const gauthOption = {
    clientId: process.env.GAUTH_CLIENT_ID,
    scope: 'profile email',
    prompt: 'select_account',
};
Vue.use(GAuth, gauthOption);
//************************ Google OAuth 2.0 ********************************************

Vue.use(VueRouter);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');
