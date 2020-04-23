/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in index.js is proprietary and confidential.                      *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from 'vue'
import VueRouter from 'vue-router'
import functions from "./functions";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
});
const publicPages = [
    '/sign-in',
    '/sign-up',
];

router.beforeEach((to, from, next, Vue) => {
  functions.updatePageTitleAndMeta(document, to, next);
  functions.handleUnauthotirizedAccess(publicPages,to, next, Vue);
});

export default router
