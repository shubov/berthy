<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in LocationInput.vue is proprietary and confidential.            -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-expansion-panel>
        <v-expansion-panel-header  :disable-icon-rotate="valid != null">
            <template v-slot:default="{ open }">
                <v-row no-gutters>
                    <v-col cols="4">{{title}}</v-col>
                    <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                            <span v-if="open" key="0">{{caption}}</span>
                            <span v-else key="1">
                                Latitude: {{ (lat?(Math.round(lat * 1000) / 1000).toFixed(3):'') }}...
                                Longitude: {{(lng?(Math.round(lng * 1000) / 1000).toFixed(3):'') }}...
                            </span>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </template>
            <template v-if="valid != null" v-slot:actions>
                <v-icon v-if="valid" color="teal">{{icons.checkCircle}}</v-icon>
                <v-icon v-else color="warning">{{icons.alertCircle}}</v-icon>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-text-field
                    :value="lat"
                    @input="lat=$event"
                    :placeholder="placeholder"
                    :prepend-icon="icons.latitude"
            ></v-text-field>
            <v-text-field
                    :value="lng"
                    @input="lng=$event"
                    :placeholder="placeholder"
                    :prepend-icon="icons.longitude"
            ></v-text-field>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Use Map</v-btn>
                </template>
                <v-card v-resize="updateMapHeight">
                    <v-toolbar id="toolbar" dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>{{icons.close}}</v-icon>
                        </v-btn>
                        <v-toolbar-title>Location</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="dialog = false">Close</v-btn>
                            <v-btn dark text @click="onSave">Save</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-row align="center" justify="center" no-gutters>
                        <v-col>
                            <Map id='map' :position.sync="position"></Map>
                        </v-col>
                    </v-row>
                </v-card>
            </v-dialog>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import {latLng} from "leaflet";
    import {mdiAlertCircle, mdiCheckCircle, mdiClose, mdiLatitude, mdiLongitude} from "@mdi/js";

    export default {
        name: "LocationInput",
        components: {
            Map: () => import('./MarinaRegistrationMap'),
        },
        props: {
            required: {
                type: Boolean,
                default: false
            },
            title: String,
            placeholder: String,
            caption: String,
            state: String,
            mutation: String,
        },
        computed: {
            lat: {
                get() {
                    return this.$store.state.Application.lat;
                },
                set(value) {
                    this.$store.commit('Application/EDIT_LAT', value);
                },
            },
            lng: {
                get() {
                    return this.$store.state.Application.lng;
                },
                set(value) {
                    this.$store.commit('Application/EDIT_LNG', value);
                },
            },
            valid() {
                return !!this.lat && !!this.lng;
            }
        },
        data: () => ({
            dialog: false,
            zoom: 11,
            position: latLng(50, 13),
            icons: {
                checkCircle: mdiCheckCircle,
                alertCircle: mdiAlertCircle,
                close: mdiClose,
                latitude: mdiLatitude,
                longitude: mdiLongitude,
            }
        }),
        methods: {
            onSave(){
                this.lat = this.position.lat;
                this.lng = this.position.lng;
                this.dialog = false;
            },
            updateMapHeight() {
                let h = window.innerHeight - document.getElementById('toolbar').style.height.substr(0,2);
                document.getElementById('map').style.height = h + 'px';
            },
        },
        
    }
</script>