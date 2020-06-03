/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in helperFunctions.js is proprietary and confidential.            *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../services/berthy-api";


export function metersToFeet(m, decimalPoints) {
    return m ? (3.2808 * m).toFixed(decimalPoints): null;
}

export function feetToMeters(f, decimalPoints) {
    return f ? (f / 3.2808).toFixed(decimalPoints): null;
}

export function setIcons(amenities, rootGetters) {
    if (amenities) {
        amenities.forEach(amenity => {
            let icon = rootGetters['Amenities/getIcons'].get(amenity.key)
                ? rootGetters['Amenities/getIcons'].get(amenity.key)
                : rootGetters['Amenities/getIcons'].get("default");
            Object.defineProperty(amenity, 'icon', {value: icon});
        });
    }
}

export function photoLink(link) {
    return BerthyAPI.defaults.baseURL.slice(0, -5) + '' + link;
}

export function setTimes(createdAt) {
    let date = new Date(createdAt);
    let delta =  new Date() - date;
    let res;
    let s = Math.floor(delta/1000);
    if (s>59) {
        let m = Math.floor(delta/60000);
        if (m>59) {
            let h = Math.floor(delta/3600000);
            if (h>23) {
                res = date.toDateString();
            } else {
                res = h + "h ago";
            }
        } else {
            res = m + "m ago";
        }
    } else {
        res = s + "s ago";
    }
    return res;
}