/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in functions.js is proprietary and confidential.                  *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import AuthService from '../services/auth.service';
import store from '../store';

const roles = {
    user: 'USER',
    moderator: 'MODERATOR',
    admin: 'ADMIN',
};

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


    async handleUnauthotirizedAccess(to, next) {
        let authRequired = to.meta.public !== true;
        let loggedIn = !!AuthService.checkAccessToken();
        console.log(authRequired, loggedIn);
        if (!authRequired)
            next();
        else
            if (!loggedIn)
                next('/sign-in');
            else {
                let userRoles = JSON.parse(JSON.stringify(store.getters["User/getRoles"]));
                if (userRoles.length === 0) {
                    await store.dispatch('User/updateAccountInfo');
                    userRoles = JSON.parse(JSON.stringify(store.getters["User/getRoles"]));
                }
                let rolesNeeded = to.meta.roles;

                let moderator = false;
                let user = false;

                for (let i = 0; i < userRoles.length; i++) {
                    moderator = moderator ? true : userRoles[i] === roles.moderator;
                    user = user ? true : userRoles[i] === roles.user;
                    for (let j = 0; j < rolesNeeded.length; j++) {
                        if (rolesNeeded[j] === userRoles[i]) {
                            next();
                            return;
                        }
                    }
                }
                if (moderator) next('/moderator')
                else if (user) next('/');
            }
    }
};
