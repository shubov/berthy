/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in index.js is proprietary and confidential.                      *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// import the auto exporter
import modules from './modules';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules, // all modules automatically imported
    state: () => ({
        roles: {
            user: 'USER',
            moderator: 'MODERATOR',
            admin: 'ADMIN',
        },
        usertypes: {
            boater: 'BOATER',
            dockmaster: 'DOCKMASTER',
            newUser: 'NEW_USER',
        },
        bg: {
            'background': `url(${require('../assets/background.jpg')})`,
            'background-size': 'cover',
            'background-repeat': 'no-repeat' ,
            '-o-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-webkit-background-size': 'cover',
        },

    }),
    actions: {
        reset({commit}) {
            // resets state of all the modules
            Object.keys(modules).forEach(moduleName => {
                commit(`${moduleName}/RESET`);
            })
        },
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [] // set logger only for development
});