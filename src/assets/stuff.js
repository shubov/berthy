/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in stuff.js is proprietary and confidential.                      *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

//Vue.directive('click-outside', {
//     bind: function (el, binding, vnode) {
//         el.clickOutsideEvent = function (event) {
//             if (!(el === event.target || el.contains(event.target))) {
//                 vnode.context[binding.expression](event);
//             }
//         };
//         document.body.addEventListener('click', el.clickOutsideEvent)
//     },
//     unbind: function (el) {
//         document.body.removeEventListener('click', el.clickOutsideEvent)
//     },
// });
//let loco = {
//     message:{
//         locoType:null,
//         locoNo:null,
//         trainNo:null,
//         time:{
//             hour:null,
//             min:null,
//             sec:null,
//             day:null,
//             month:null,
//             year:null,
//             full:null,
//         },
//         tabn:null,
//         speed:null,
//         dir:null,
//         pwr:null,
//         mileage:null,
//         wagCount:null,
//         axisCount:null,
//         freightMas:null,
//         press:{
//             v0:null,
//             v1:null,
//             v2:null,
//         },
//         als:null,
//         rc:null,
//         ifperiod:null,
//         cock395:null,
//         km:null,
//         busdata:null,
//         falarm:null,
//         csq:null,
//         imsi:null,
//         alarm:null,
//         genA:null,
//         genV:null,
//         akbV:null,
//         genE:null,
//         dfreqDis:null,
//         freqDis:null,
//         tempWater:null,
//         tempOil:null,
//         pressFuel:null,
//         pressOil:null,
//         pressTurbo:null,
//         UTC:{
//             day:null,
//             month:null,
//             year:null,
//             hour:null,
//             min:null,
//             sec:null,
//         },
//         GEO:{
//             lat:null,
//             lon:null,
//             ati:null,
//         },
//         FUEL:{
//             vol:null,
//             vol20:null,
//             temp:null,
//             dens:null,
//             mass:null,
//         },
//         esumeng:null,
//         esumsec:null,
//         imei:null,
//         events:[],
//         stendTimeInSeconds:null,
//     },
//     time:null,
//     device:null,
// }
// // State initial object
// const initialState = () => ({
// });
//
//
// /* Module XXXXXXX.store.js */
//
//
// // VUEX STATE
// const state = initialState();
//
//
// // VUEX GETTERS
// const getters = {
//
// };
//
//
// // VUEX ACTIONS
// const actions = {
//     reset({ commit }) {
//         commit('RESET');
//     },
//
// };
//
//
// // VUEX MUTATIONS
// const mutations = {
//     RESET(state) {
//         const newState = initialState();
//         Object.keys(newState).forEach(key => {
//             state[key] = newState[key]
//         });
//     },
// };
//
//
// export default {
//     state,
//     getters,
//     actions,
//     mutations
// };
