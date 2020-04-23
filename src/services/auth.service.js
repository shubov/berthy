/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in auth.service.js is proprietary and confidential.               *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(user) {
        return axios
                .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('access-token', JSON.stringify(response.data.accessToken));
                }
                if (response.data.refreshToken) {
                    localStorage.setItem('refresh-token', JSON.stringify(response.data.refreshToken));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();