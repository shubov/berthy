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

const roles = store.state.roles;
const boater = store.state.usertypes.boater;
const dockmaster = store.state.usertypes.dockmaster;
const newUser = store.state.usertypes.newUser;


// async function getUserRoles() {
//     if (store.getters["User/getRoles"].length === 0) {
//         await store.dispatch('User/updateAccountInfo');
//     }
// }
//
// function defaultPagesForRole(moderator, user, next) {
//     if (moderator) next('/moderator');
//     else if (user) next('/profile');
// }

function pushSignIn(next, to) {
    next({
        name: "Sign In",
        query: {
            redirect: to.path,
        }
    });
}

function checkUserType(to, usertype, defaultUserTypePage, next) {
    if (to.meta.usertype && to.meta.usertype.includes(usertype)) {
        next();
    } else {
        next(defaultUserTypePage);
    }
}

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


    // async handleUnauthotirizedAccess(to, next) {
    //     let authRequired = to.meta.public !== true;
    //
    //     if (!authRequired) {
    //         if (to.name!=="Sign In")
    //             next();
    //         else {
    //             let userRoles = await getUserRoles();
    //             defaultPagesForRole(
    //                 userRoles.includes(roles.moderator),
    //                 userRoles.includes(roles.user),
    //                 next
    //             );
    //         }
    //     }
    //     else {
    //         let loggedIn = !!(await AuthService.checkAccessToken());
    //
    //         if (!loggedIn)
    //             next({
    //                 name: "Sign In",
    //                 query: {
    //                     redirect: to.path,
    //                 }
    //             });
    //         else {
    //             let userRoles = await getUserRoles();
    //             if (userRoles==null) {
    //                 next();
    //                 return;
    //             }
    //             let rolesNeeded = to.meta.roles;
    //
    //             let moderator = false;
    //             let user = false;
    //
    //             for (let i = 0; i < userRoles.length; i++) {
    //                 moderator = moderator ? true : userRoles[i] === roles.moderator;
    //                 user = user ? true : userRoles[i] === roles.user;
    //                 for (let j = 0; j < rolesNeeded.length; j++) {
    //                     if (rolesNeeded[j] === userRoles[i]) {
    //                         next();
    //                         return;
    //                     }
    //                 }
    //             }
    //             defaultPagesForRole(moderator, user, next);
    //         }
    //     }
    // },

    async handleUnauthotirizedAccess(to, next) {
        let authRequired = to.meta.public !== true;
        let loggedIn = !!AuthService.checkAccessToken();
        if (store.getters["User/getRoles"].length === 0)
            await store.dispatch('User/updateAccountInfo');

        if (!authRequired) {
            if (loggedIn && to.name==="Sign In")
                next('/moderator');
            else {
                next();
            }
        }
        else {
            if(!loggedIn) {
                pushSignIn(next, to);
            }
            else {
                if (store.getters["User/getRoles"].length === 0) {
                    pushSignIn(next, to);
                }
                else {
                    if (!store.getters['Sockets/getConnectionStatus'])
                        await store.dispatch('Sockets/init');

                    if(store.getters['User/moderator']) {
                        if (to.meta.roles.includes(roles.moderator)) {
                            next();
                        }
                        else {
                            next('/moderator');
                        }
                    }
                    else {
                        if (!store.getters['User/isUser']) {
                            pushSignIn(next, to);
                        }
                        else {
                            if (store.getters['User/boater']) {
                                checkUserType(to, boater, '/book', next)
                            }
                            else {
                                if (store.getters['User/dockmaster']) {
                                    checkUserType(to, dockmaster, '/dashboard', next)
                                }
                                else {
                                    checkUserType(to, newUser, '/roles', next)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
