/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in functions.js is proprietary and confidential.                  *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import AuthService from '@/services/auth.service';

export default {
    updatePageTitleAndMeta(document, to, next) {
        const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
        const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
        if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
        Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
        if (!nearestWithMeta) return next();
        nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');
            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });
            tag.setAttribute('data-vue-router-controlled', '');
            return tag;
        }).forEach(tag => document.head.appendChild(tag));
        next();
    },
    handleUnauthotirizedAccess(publicPages, to, next) {
        const authRequired = !publicPages.includes(to.path);

        if (authRequired) {
            AuthService.checkAccessToken();
        } else {
            next();
        }
    }
};
