/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in auth.service.js is proprietary and confidential.               *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import axios from 'axios';
import storage from '../services/web-storage'
import store from '../store'


const API_URL = 'https://egehackbot.cf:8080/api/auth/';


class AuthService {


    generateDeviceId() {
        let navigator_info = window.navigator;
        let screen_info = window.screen;
        let uid = navigator_info.mimeTypes.length;
        uid += navigator_info.userAgent.replace(/\D+/g, '');
        uid += navigator_info.plugins.length;
        uid += screen_info.height || '';
        uid += screen_info.width || '';
        uid += screen_info.pixelDepth || '';
        return uid;
    }

    async onLoginSuccess(data) {
        if (data.accessToken)
            storage.setAccessToken(data.accessToken);

        if (data.refreshToken)
            storage.setRefreshToken(data.refreshToken);

        if (data.accessExpiresIn) {
            let t = Date.now() + data.accessExpiresIn - 5000;
            storage.setAccessTokenExpiry(t);
        }

        if (data.refreshExpiresIn) {
            let t = Date.now() + data.refreshExpiresIn - 5000;
            storage.setRefreshTokenExpiry(t);
        }
    }


    checkAccessToken() {
        if (!storage.getAccessToken()
            || !storage.getAccessExpiry()
            || !(Date.now() < storage.getAccessExpiry()))
        {
            if (this.token_refresh() !== true)
            {
                this.logout();
                return null;
            }
        }
        return storage.getAccessToken();
    }

    // USED BY Login and Refresh
    authentication({url, data}) {
        storage.getDeviceId();
        let uid = this.generateDeviceId();
        let config = {headers:{DeviceId:uid}};
        return axios.post(url, data, config)
            .then(response => {
                if (response.data.success) {
                    this.onLoginSuccess(response.data.data);
                    return true;
                } else {
                    return response.data.error.message;
                }
            })
            .catch(()=> {
                return false;
            });
    }

    login_email({email, password})
    {
        return this.authentication({
            url:API_URL + 'login/email',
            data: { email, password}
        });
    }


    login_google(code)
    {
        return this.authentication({
            url: API_URL + 'login/google',
            data:  {
                code: code,
                redirectUri: 'postmessage'
            }
        });
    }


    token_refresh() {
        if (!storage.getRefreshToken()
            || !storage.getRefreshExpiry()
            || !(Date.now() < storage.getRefreshExpiry())) {
            return false;
        }
        return this.authentication({
            url: API_URL + 'token/refresh',
            data: {
                refreshToken: storage.getRefreshToken()
            }
        });
    }


    registration({email, password}) {
        let data =
            {
                email: email,
                password: password
            };
        return axios.post(API_URL + 'registration', data)
            .then(response => {
                if (response.data.success) {
                    this.logout();
                    return true;
                } else {
                    return response.data.error.message;
                }
            })
            .catch(()=> {
                return false;
            });
    }


    logout() {
        //Session Store reset
        storage.removeAccessToken();
        storage.removeRefreshToken();
        storage.removeAccessExpiry();
        storage.removeRefreshExpiry();
        storage.removeDeviceId();
        //VUEX RESET
        store.dispatch('reset', null, { root: true });
    }
}


export default new AuthService();