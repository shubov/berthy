/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in web-storage.js is proprietary and confidential.        *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/


import { v4 as uuidv4 } from 'uuid';


const accessTokenKey  = 'accessToken';
const refreshTokenKey = 'refreshToken';
const accessTokenExpiryKey = 'accessTokenExpiresAt';
const refreshTokenExpiryKey = 'refreshTokenExpiresAt';
const deviceIdKey = 'uuid';


class WebStorage {
    #storage=localStorage;
    constructor() {
        if (typeof this.#storage === 'object') {
            try {
                this.#storage.setItem('storage', 'item');
                this.#storage.removeItem('storage');
                //this.#storage = sessionStorage;
            } catch (e) {
                // //We're going to detect this and just silently drop any calls to setItem
                // //to avoid the entire page breaking, without having to do a check at each usage of Storage.
                // Storage.prototype._setItem = Storage.prototype.setItem;
                // Storage.prototype.setItem = function() {};

                alert('Your web browser does not support storing settings locally. ' +
                    'Some settings may not save or some features may not work properly for you. ' +
                    'If you are using "Private Browsing Mode", ' +
                    'you can disable it and try to access this website again.');
            }
        } else {
            alert('Your web browser does not support storing settings locally. ' +
                'Some settings may not save or some features may not work properly for you.');
        }
    }


    // GETTERS
    getAccessToken() {
        return JSON.parse(this.#storage.getItem(accessTokenKey));
    }
    getRefreshToken() {
        return JSON.parse(this.#storage.getItem(refreshTokenKey));
    }
    getAccessExpiry() {
        return JSON.parse(this.#storage.getItem(accessTokenExpiryKey));
    }
    getRefreshExpiry() {
        return JSON.parse(this.#storage.getItem(refreshTokenExpiryKey));
    }
    getDeviceId() {
        if (!this.#storage.getItem(deviceIdKey)) {
            this.#storage.setItem(deviceIdKey, uuidv4());
        }
        return this.#storage.getItem(deviceIdKey);
    }


    // SETTERS
    setAccessToken(accessToken) {
        this.#storage.setItem(accessTokenKey, JSON.stringify(accessToken));
    }
    setRefreshToken(refreshToken) {
        this.#storage.setItem(refreshTokenKey, JSON.stringify(refreshToken));
    }
    setAccessTokenExpiry(access_expiry) {
        this.#storage.setItem(accessTokenExpiryKey, JSON.stringify(access_expiry));
    }
    setRefreshTokenExpiry(refresh_expiry) {
        this.#storage.setItem(refreshTokenExpiryKey, JSON.stringify(refresh_expiry));
    }

    // REMOVERS
    removeAccessToken() {
        this.#storage.removeItem(accessTokenKey);
    }
    removeRefreshToken() {
        this.#storage.removeItem(refreshTokenKey);
    }
    removeAccessExpiry() {
        this.#storage.removeItem(accessTokenExpiryKey);
    }
    removeRefreshExpiry() {
        this.#storage.removeItem(refreshTokenExpiryKey);
    }
    removeDeviceId() {
        this.#storage.removeItem(deviceIdKey);
    }
    clear(){
        this.#storage.clear();
    }
}

export default new WebStorage();