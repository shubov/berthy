/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in helperFunctions.js is proprietary and confidential.            *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/


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