/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in index.js is proprietary and confidential.                      *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from "./routes";
import functions from "./functions";


Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach( async (to, from, next) => {
  functions.updatePageTitleAndMeta(document, to, next);
  await functions.handleUnauthotirizedAccess(to, next);
});

export default router
