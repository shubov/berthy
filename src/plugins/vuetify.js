/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in vuetify.js is proprietary and confidential.                    *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#ae1d00',
                secondary: '#FF5252',
                accent: '#82B1FF',
                error: '#FB8C00',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            }
        },
    },
});
