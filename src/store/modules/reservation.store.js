/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in reservation.store.js is proprietary and confidential.          *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

import {latLng} from "leaflet";
import BerthyAPI from "../../services/berthy-api";

// State initial object
const initialState = () => ({
    marinas: [],
    indexSelected: null,
    lastSearch: null,
    map: {
        mapOptions: {
            zoomSnap: 0.5,
            boxZoom: true,
            scrollWheelZoom: 'center',
        },
        center: latLng(50,13),
        zoom: 4.5,
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '',
    },
    booking: {
        ship: null,
        dateFrom: null,
        dateTo: null,
        radius: 1000,
        amenities: [],
        sortBy: 'PRICE',
        spotID: null,
        places: null,
    },
    sortOptions: ['PRICE', 'RATING', 'DISTANCE'],
    geolocation: {
        lat: null,
        lng: null,
        geolocationWatcher: null,
        options: {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        },
    },
});


/* Module .store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    isGeolocationEnabled (state) {
        return state.geolocation.geolocationWatcher != null
    },
    isGeoAvailable() {
        return state.geolocation.lat && state.geolocation.lng;
    },
    getGeolocation (state) {
        return latLng(state.geolocation.lat,state.geolocation.lng);
    },
    getGeoOptions(state) {
        return state.geolocation.options;
    },

    getMap(state) {
        return state.map;
    },
    getMapCenter(state) {
        return state.map.center;
    },

    datesValid(state) {
        return state.booking.dateFrom && state.booking.dateTo;
    },
    getDateFrom(state) {
        return state.booking.dateFrom;
    },
    getDateTo(state) {
        return state.booking.dateTo;
    },
    getSearchAmenities(state) {
        return state.booking.amenities;
    },
    getShip(state) {
        return state.booking.ship;
    },
    getSortOptions(state) {
        return state.sortOptions;
    },
    getSortBy(state) {
        return state.booking.sortBy;
    },
    getSearchData(state, getters) {
        return {
            startDate: getters.datesValid ? state.booking.dateFrom : null,
            endDate: getters.datesValid ? state.booking.dateTo : null,
            sorting: state.booking.sortBy,
            rad: state.booking.radius,
            amenities: state.booking.amenities,
            shipId: state.booking.ship,
            lat: state.map.center.lat,
            lng: state.map.center.lng,
        }
    },
    getSpotId(state) {
        return state.booking.spotID;
    },
    getPlaces(state) {
        return state.booking.places;
    },
    getBooking(state) {
        return {
            shipId: state.booking.ship,
            startDate: state.booking.dateFrom,
            endDate: state.booking.dateTo,
            berthPlaceId: state.booking.spotID,
        }
    },

    getFilteredMarinas(state) {
        return state.marinas;
    },
    getLastSearchTime(state) {
        return state.lastSearch;
    },
    getSelectedIndex(state) {
        return state.indexSelected;
    },

};


// VUEX ACTIONS
const actions = {
    reset({commit}) {
        commit('RESET');
    },
    async updateSearch({commit, getters}) {
        if (Date.now() - getters.getLastSearchTime < 100) return false;
        commit('FETCHING');
        let data = getters.getSearchData;
        let response = await BerthyAPI.post('bookings/search', data);
        if (response.data) {
            if (response.data.success) {
                commit('UPDATE_MARINAS', response.data.data);
                commit('STORE_LOCAL_COPY', data);
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
        return false;
    },
    async book({commit, getters}) {
        let data = getters.getBooking;
        let response = await BerthyAPI.post('bookings', data);
        if (response.data) {
            if (response.data.success) {
                return true;
            } else {
                commit('ERROR', response.data.error.message);
            }
        }
    },
    watchGeolocation({commit, dispatch, getters}) {
        let watcher = navigator.geolocation.watchPosition(
            (position)=>dispatch('onGeolocationSuccess', position),
            (error)=>dispatch('snackbar', error.message, {root: true}),
            getters['getGeolocation']
        );
        commit("WATCH_GEOLOCATION", watcher);
    },
    stopWatching({commit, getters}) {
        if(getters["isGeolocationEnabled"])
            commit('STOP_WATCHING');
    },
    onGeolocationSuccess({commit, getters}, position) {
        let updateMap = false;
        if (getters['isGeoAvailable']) updateMap = true;
        commit('UPDATE_GEOLOCATION_LAT',position.coords.latitude);
        commit('UPDATE_GEOLOCATION_LNG',position.coords.longitude);
        if (updateMap) commit("UPDATE_MAP_CENTER", getters['getGeolocation']);
    },
};


// VUEX MUTATIONS
const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    FETCHING(state) {
        state.success = null;
        state.error = null;
        state.message = null;
    },
    UPDATE_MARINAS(state, value) {
        state.marinas = value;
        state.success = true;
        state.error = false;
        state.message = null;
        state.lastSearch = Date.now();
    },
    ERROR(state, msg) {
        state.success = false;
        state.error = true;
        state.message = msg;
    },
    SELECT_MARINA(state, index) {
        state.indexSelected=index;
    },
    UNSELECT_MARINA(state) {
        state.indexSelected=null;
    },

    WATCH_GEOLOCATION(state, watcher) {
        state.geolocation.geolocationWatcher = watcher;
    },
    STOP_WATCHING(state) {
        navigator.geolocation.clearWatch(state.geolocation.geolocationWatcher);
        state.geolocation.geolocationWatcher = null;
        state.geolocation.lat=null;
        state.geolocation.lng=null;
    },
    UPDATE_GEOLOCATION_LAT(state, value) {
        state.geolocation.lat=value;
    },
    UPDATE_GEOLOCATION_LNG(state, value) {
        state.geolocation.lng=value;
    },

    UPDATE_MAP_CENTER(state, value) {
        state.map.center = value;
    },
    UPDATE_RADIUS(state, value) {
        state.booking.radius = value;
    },

    UPDATE_SHIP(state, value) {
        state.booking.ship = value;
    },
    UPDATE_DATE_TO(state, value) {
        state.booking.dateTo = value;
    },
    UPDATE_DATE_FROM(state, value) {
        state.booking.dateFrom = value;
    },
    UPDATE_AMENITIES(state, value) {
        state.booking.amenities = value;
    },
    UPDATE_SORT(state, value) {
        state.booking.sortBy = value;
    },
    UPDATE_SPOT(state, id) {
        state.booking.spotID = id;
    },

    STORE_LOCAL_COPY(state) {
        let data = {
            shipId: state.booking.ship,
            endDate: state.booking.dateTo,
            startDate: state.booking.dateFrom,
        };
        localStorage.setItem('searchData',  JSON.stringify(data));
    },
    GET_LOCAL_COPY(state){
        let data = localStorage.getItem('searchData');
        localStorage.removeItem('searchData');
        if (data != null) {
            data =  JSON.parse(data);
            state.booking.dateFrom = data.startDate ? data.startDate: state.booking.dateFrom;
            state.booking.dateTo = data.endDate ? data.endDate: state.booking.dateTo;
            state.booking.ship = data.shipId ? data.shipId: state.booking.ship;
        }
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};