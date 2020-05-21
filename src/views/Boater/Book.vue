<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Book.vue is proprietary and confidential.                      -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container fluid v-resize="updateHeight" class="pa-0">
        <SearchMap
                id="map"
                :geolocationlat="latitude"
                :geolocationlng="longitude"
                :radius="radius"
        ></SearchMap>
        <v-navigation-drawer id="left" permanent app clipped :value="true">
            <v-card class="elevation-0" tile>
                <v-card-title>Search</v-card-title>
                <v-card-text>
                    <v-btn
                            class="primary mb-6"
                            block
                            height="40px"
                    >
                        <v-icon>mdi-sail-boat</v-icon>
                        NEW SHIP
                    </v-btn>
                    <v-select
                            dense
                            outlined
                            v-model='ship'
                            :items="ships"
                    ></v-select>
                    <v-menu
                            v-model="dateMenuFrom"
                            transition="slide-x-transition"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    dense
                                    outlined
                                    label="Date From"
                                    :value="dateFrom"
                                    readonly
                                    prepend-inner-icon="mdi-calendar"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="dateFrom"
                                no-title
                                :allowed-dates="allowedDatesFrom"
                                @change="()=>{dateMenuFrom = false; dateTo=null;}"
                        ></v-date-picker>
                    </v-menu>
                    <v-menu
                            v-model="dateMenuTo"
                            transition="slide-x-transition"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    dense
                                    outlined
                                    label="Date To"
                                    :value="dateTo"
                                    readonly
                                    prepend-inner-icon="mdi-calendar"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="dateTo"
                                no-title @change="dateMenuTo = false"
                                :allowed-dates="allowedDatesTo"
                        ></v-date-picker>
                    </v-menu>
                    <v-checkbox
                            v-model="trackLocation"
                            label="Enable geolocation"
                    ></v-checkbox>
                    <v-text-field
                            dense
                            outlined
                            type="number"
                            :rules="rules"
                            label="Geolocation lattitude"
                            :disabled="trackLocation"
                            v-model="latitude"
                    ></v-text-field>
                    <v-text-field
                            dense
                            outlined
                            type="number"
                            :rules="rules"
                            label="Geolocation longitude"
                            :disabled="trackLocation"
                            v-model="longitude"
                    ></v-text-field>
                    <v-text-field
                            dense
                            outlined
                            type="number"
                            :rules="rules"
                            placeholder="100"
                            label="Search Radius"
                            :disabled="!latitude || !longitude"
                            v-model="radius"
                            suffix="km"
                    ></v-text-field>
                    <v-select
                            v-model="amenitiesSearch"
                            :items="amenities"
                            chips
                            dense
                            label="Amenities"
                            outlined
                            multiple
                    >
                        <template v-slot:selection="data">
                            <v-chip v-if="amenitiesSearch.length === 1 && data.index===0">
                                <v-avatar left>
                                    <v-icon>{{data.item.icon}}</v-icon>
                                </v-avatar>
                                {{ data.item.value }}
                            </v-chip>
                            <span
                                    v-else-if="data.index===0"
                            >{{ amenitiesSearch.length }} selected</span>
                        </template>
                        <template v-slot:item="data" z-index="999">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                                <v-list-item-icon>
                                    <v-icon>{{data.item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-html="data.item.value"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </template>
                    </v-select>
                </v-card-text>
            </v-card>
        </v-navigation-drawer>
    
        <v-navigation-drawer id="right" permanent app clipped right :value="true">
    
        </v-navigation-drawer>
    </v-container>
</template>

<script>
    import SearchMap from "../../components/Maps/SearchMap";

    export default {
        name: "Book",
        components: {
            SearchMap,
        },
        watch: {
            trackLocation(value) {
                if (value) {
                    this.watchGeolocation();
                } else if(this.geolocationWatcher){
                    this.stopWatching();
                }
            }
        },
        computed: {
            amenities() {
                return this.$store.getters['Amenities/getAmenities'];
            },
        },
        data: function () {
            return {
                ships: ['Ship1', 'Ship2'],
                ship: 'Ship',
                
                dateFrom: null,
                dateTo: null,
                dateMenuFrom: false,
                dateMenuTo: false,

                trackLocation: false,
                geolocationWatcher: null,
                options: {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                },
                
                rules: [val=>!isNaN(val) || 'Not a number'],
                latitude: null,
                longitude: null,
                radius: null,

                amenitiesSearch:[],
            }
        },
        methods: {
            updateHeight() {
                let h = window.innerHeight;
                let w = window.innerWidth;
                let left_w =document.getElementById('left').style.width;
                let right_w =document.getElementById('right').style.width;
                document.getElementById('map').style.height = (h-84) + 'px';
                document.getElementById('map').style.width = (w-left_w-right_w) + 'px';
            },
            
            allowedDatesFrom: val => {
                let now = new Date();
                now.setDate(now.getDate() - 1);
                return new Date(val) > now;
            },
            allowedDatesTo(val) {
                let date = new Date(val);
                if (this.dateFrom) {
                    return date > new Date(this.dateFrom);
                } else {
                    let now = new Date();
                    now.setDate(now.getDate() - 1);
                    return date > Date.now();
                }
            },
            
            watchGeolocation() {
                this.geolocationWatcher = navigator.geolocation.watchPosition(
                    this.onGeolocationSuccess,
                    this.onGeolocationError,
                    this.options
                );
            },
            stopWatching() {
                navigator.geolocation.clearWatch(this.geolocationWatcher);
            },
            onGeolocationSuccess(position) {
                this.latitude  = position.coords.latitude;
                this.longitude = position.coords.longitude;
                console.log(position);
            },
            async onGeolocationError(err) {
                await this.$store.dispatch("snackbar", 'ERROR(' + err.code + '): ' + err.message);
            }
        },
        async mounted() {
            if (!this.amenities.length)
                await this.$store.dispatch("Amenities/availableAmenities");
        },
        beforeDestroy() {
            if (this.geolocationWatcher) this.stopWatching();
        },
    };
</script>
<style>
    .menu__content {
        z-index: 999
    }
</style>