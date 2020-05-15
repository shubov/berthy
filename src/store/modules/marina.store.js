/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in marina.store.js is proprietary and confidential.               *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                   *
 ******************************************************************************/

import BerthyAPI from "../../services/berthy-api";

// State initial object
const initialState = () => ({
    publicMarina: {
        name: 'City of Des Moines Marina',
        description: 'Welcome! The City of Des Moines Marina is a full service marina on majestic Puget Sound. We offer superior customer service to one-time visitors and our long-term tenants. Offering wet and dry moorage for 840 recreational vessels.\n\n​The Des Moines Marina is located on the east side of the East Passage of Puget Sound.\n\nIf you are interested in permanent wet moorage, slip sizes range from 20-50 feet, and you can chose from open or covered slips. Upland, we have 105 dry sheds for boats up to 20 long. For your convenience, we maintain a waiting list for all permanent moorage slips and the upland storage facilities. Contact the Marina office for more information.\n\nOur fuel dock offers gasoline, diesel, propane, lubricants, potable water, and snacks. There is a free waste pump-out station at the fuel dock. Other amenities include shore power 30A, cable television, showers and restrooms. A privately-operated boat repair yard can handle virtually all of your maintenance and repair needs and a privately owned boat brokerage.\n\nThe guest moorage area provides 1,500 feet of dock space for you and all your friends. Vessels up to 100 feet in length are welcome. Presently all guest moorage is available on a first-come basis, however, if your vessel is 32 feet or longer or if you have a group of 5 or more boats we will take reservations. A minimum of 1 week notice required in advance. When arriving, check in at the fuel dock near the marina entrance.',
        lat: 36.80736054609757,
        lng: 10.307579040527346,
        avgRating: 4.7,
        site: 'http://www.desmoinesmarina.com/',
        radio: 'VHF Ch. 16',
        phCode: 'US',
        phNumber: '+1 206-824-5700',
        photos: [
            {
                fileId: '5668e556-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/ytfLZZX0rbCSb5RA/5668e556-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: '5e4fa3fef4577b8063b802d19d965e95fcf58c5f3a0731c456df2257a149e491.jpg'
            },
            {
                fileId: '568a01e7-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/sfCbd0G4NHOpxKUU/568a01e7-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: '7c6418aecb104a79c6a6d9b2f6d90d41360825d1f950ad9130e1029c74d71a2a.jpg'
            },
            {
                fileId: '56b75378-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/b87duKFfjC6KDon0/56b75378-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: '2134b93c12fea780a7cb92ed587d9420d2e4fa8ad3cce8abfabd6ffe9c7bfed0.jpg'
            },
            {
                fileId: '57e943c9-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/NWmKp1cl0hAlSK3P/57e943c9-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: '42485d649b0fafef85c7ae277d22b6e94d60b4d69eefe71665b22dc0ae1a8b99.jpg'
            },
            {
                fileId: '585cc61a-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/jfuRsWWsE8wdE8A5/585cc61a-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: 'bae21244fed446f6355110c7363025a88659364f13129af559147e1f3e1f298d.jpg'
            },
            {
                fileId: '59993dbb-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/MCUx8adhk40RJWrT/59993dbb-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: 'd382c2f54bd10630bfd98cc37ca74b6236c4a50d2984f2b3aad526a7ecd687ba.jpg'
            },
            {
                fileId: '5ae25f8c-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/QUkomlTBCzh2VBi5/5ae25f8c-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: 'd495352becf10deea551ea8491c6769e5bd20f88904b2c743494c1c2dedafa30.jpg'
            },
            {
                fileId: '5b14ba2d-96c5-11ea-8c99-4f42a9c6c1d4',
                fileLink: '/api/files/cvABDxKtVgRpAmc0/5b14ba2d-96c5-11ea-8c99-4f42a9c6c1d4',
                fileName: 'db48dc244ec7fcedad401d86b89678cc5cf057543ef6c10de52b42a9a210cfaf.jpg'
            }
        ],
        amenities: [
            {
                key: 'accessible',
                value: 'Accessible',
                icon: 'mdi-wheelchair-accessibility'
            },
            {
                key: 'atm',
                value: 'ATM',
                icon: 'mdi-atm'
            },
            {
                key: 'bar',
                value: 'Bar',
                icon: 'mdi-glass-cocktail'
            },
            {
                key: 'bathtub',
                value: 'Shower',
                icon: 'mdi-shower-head'
            },
            {
                key: 'bicycle_rental',
                value: 'Bicycle rental',
                icon: 'mdi-bike'
            },
            {
                key: 'car_rental',
                value: 'Car rental',
                icon: 'mdi-car'
            },
            {
                key: 'ev_station',
                value: 'Electric charging station',
                icon: 'mdi-flash-circle'
            },
            {
                key: 'gas_station',
                value: 'Gas station',
                icon: 'mdi-gas-station'
            },
            {
                key: 'grocery_store',
                value: 'Grocery store',
                icon: 'mdi-storefront-outline'
            },
            {
                key: 'hotel',
                value: 'Hotel',
                icon: 'mdi-bed'
            },
            {
                key: 'parking',
                value: 'Parking',
                icon: 'mdi-parking'
            },
            {
                key: 'restaurant',
                value: 'Restaurant',
                icon: 'mdi-silverware-fork-knife'
            },
            {
                key: 'water',
                value: 'Water',
                icon: 'mdi-water'
            },
            {
                key: 'wifi',
                value: 'Wi-Fi',
                icon: 'mdi-wifi'
            }
        ],
        places: [
            {
                name: 1,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 2,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 3,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 4,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 5,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 6,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 7,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 8,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 9,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 10,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 11,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 12,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 13,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 14,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            },
            {
                name: 15,
                length: '35',
                draft: '6',
                width: '20',
                price: '100',
                xCoord: 0,
                yCoord: 0,
                rotate: 0,
                color: 'green'
            }
        ]
    },
    marinas: [],
    numOfMarinas: 0,
    current: null,
    success: null,
    error: null,
    message: null,
});


/* Module marina.store.js */


// VUEX STATE
const state = initialState();


// VUEX GETTERS
const getters = {
    getNumOfMarinas(state) {
        return state.numOfMarinas;
    },
    getAll(state) {
        return state.marinas;
    },
    getCurrent(state) {
        return state.current;
    },
    getPublicMarina(state){
        return state.publicMarina;
    }
};


// VUEX ACTIONS
const actions = {
    reset({ commit }) {
        commit('RESET');
    },
    async fetchMarinas({commit,dispatch}) {
        commit('FETCHING');
        let response = await BerthyAPI.get('berths');
        if (response.data ? response.data.success: false) {
            commit('SUCCESS', response.data.data);
            await dispatch('selectMarina', 0);
            return true;
        } else {
            commit('ERROR', response.data.error.message);
        }
        return false;
    },
    selectMarina({commit}, index) {
        commit('SELECT_MARINA', index);
    }
};


// VUEX MUTATIONS
const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    SUCCESS(state, data) {
        state.marinas = data;
        state.length = data.length;
        state.lastUpdate = Date.now();
    },
    FETCHING(state) {
        state.success = null;
        state.error = null;
    },
    ERROR(state, msg) {
        state.success = false;
        state.error = msg;
    },
    SELECT_MARINA(state, rootGetters, index) {
        state.marinas[index].amenities.forEach(amenity => {
            let icon = rootGetters['Amenities/getIcons'].get(amenity.key)
                ? rootGetters['Amenities/getIcons'].get(amenity.key)
                : rootGetters['Amenities/getIcons'].get("default");
            Object.defineProperty(amenity, 'icon', {value: icon});
        });
        state.current = index;
    }
};


export default {
    state,
    getters,
    actions,
    mutations
};