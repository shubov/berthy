/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in berthy-api.js is proprietary and confidential.              *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

//import router from "../router";
import store from "../store"
import axios from 'axios';
import AuthService from '../services/auth.service';

const BerthyAPI = axios.create({
    baseURL: process.env.VUE_APP_BERTHY_API,
});

BerthyAPI.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + AuthService.checkAccessToken();
    return config;
}, function(error) {
    return Promise.reject(error);
});

BerthyAPI.interceptors.response.use(function (response) {
    // if (!response.data.success
    //     && response.data.error.code===401
    //     && router.currentRoute.name !== 'Sign In')
    // {
    //     store.dispatch('Snackbar/set', "Sign in to access the page");
    //     router.push('/sign-in');
    // }
    return response;
}, function (error) {
    if (!error.status)
        store.dispatch('Snackbar/set', "Network Error");
    return Promise.reject(error);
});

export default BerthyAPI;
