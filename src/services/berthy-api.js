/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in berthy-api.js is proprietary and confidential.              *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import axios from 'axios';
import AuthService from '@/services/auth.service';

const BerthyAPI = axios.create({
    baseURL: 'https://egehackbot.cf:8080/api/',
    withCredentials: true
});

BerthyAPI.interceptors.request.use(function (config) {
    config.headers.Authorization = AuthService.checkAccessToken();

    return config;
}, function(error) {
    return Promise.reject(error);
});

export default BerthyAPI;
