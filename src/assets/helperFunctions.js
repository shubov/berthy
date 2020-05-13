/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in helperFunctions.js is proprietary and confidential.            *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

export default {
    metersToFeet(m, decimalPoints) {
        return m ? (3.2808 * m).toFixed(decimalPoints): null;
    },
    feetToMeters(f, decimalPoints) {
        return f ? (f / 3.2808).toFixed(decimalPoints): null;
    }
}