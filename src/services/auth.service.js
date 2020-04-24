/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in auth.service.js is proprietary and confidential.               *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import axios from 'axios';
import router from '../router';
import storage from '@/services/web-storage'


const API_URL = 'https://egehackbot.cf:8080/api/auth/';


class AuthService {


    onLoginSuccess(data) {

        if (data.accessToken)
            storage.setAccessToken(data.accessToken);

        if (data.refreshToken)
            storage.setRefreshToken(data.refreshToken);

        if (data.expiresIn) {
            let t = Date.now() + data.expiresIn;
            storage.setExpiry(t);
        }

        router.push('/');
    }


    checkAccessToken() {
        if (!storage.getAccessToken()
            || !storage.getExpiry()
            || !(Date.now() < storage.getExpiry()))
        {
            if (this.token_refresh() !== true)
            {
                this.logout();
                return null;
            }
        }
        return storage.getAccessToken();
    }


    login_email({email, password})
    {
        let data =
            {
                email: email,
                password: password
            };

        return axios.post(API_URL + 'login/email', data)
            .then(response => {
                this.onLoginSuccess(response.data);
                return true;
            });
    }


    login_google(code)
    {
        let data =
        {
            code: code,
            redirectUri: 'postmessage'
        };
        return axios.post(API_URL + 'login/google', data)
            .then(response => {
                this.onLoginSuccess(response.data);
                return true;
            });
    }


    registration({email, password}) {
        let data =
            {
                email: email,
                password: password
            };
        return axios.post(API_URL + 'registration', data)
            .then(() => {
                this.logout();
                return true;
            });
    }


    token_refresh() {
        if (!storage.getRefreshToken()) {
            return false;
        }
        let data = {
            refreshToken: storage.getRefreshToken()
        }

        return axios.post(API_URL + 'token/refresh', data)
            .then(response => {
                this.onLoginSuccess(response.data);
                return true;
            }).catch(()=> {return false;})
    }


    logout() {
        storage.removeAccessToken();
        storage.removeRefreshToken();
        storage.removeExpiry();
        router.push('/sign-in');
    }
}


export default new AuthService();