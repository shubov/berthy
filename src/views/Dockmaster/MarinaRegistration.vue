<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in MarinaRegistration.vue is proprietary and confidential.       -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row>
        <v-col cols="12">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">Marina name</v-col>
                                <v-col
                                        cols="8"
                                        class="text--secondary"
                                >
                                    <v-fade-transition leave-absolute>
                                        <span
                                                v-if="open"
                                        >
                                            Enter the name for your new marina
                                        </span>
                                            <span v-else
                                            >
                                          {{ marina.name }}
                                        </span>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field
                                v-model="marina.name"
                                placeholder="Name of your marina"
                        ></v-text-field>
                    </v-expansion-panel-content>
                </v-expansion-panel>
    
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">Description</v-col>
                                <v-col
                                        cols="8"
                                        class="text--secondary"
                                >
                                    <v-fade-transition leave-absolute>
                                        <span
                                                v-if="open"
                                        >
                                            Describe how amazing your marina is
                                        </span>
                                        <span v-else
                                        >
                                          {{ marina.description }}
                                        </span>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field
                                v-model="marina.description"
                                placeholder="Description"
                        ></v-text-field>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                            <v-col cols="4">Location</v-col>
                            <v-col
                                    cols="8"
                                    class="text--secondary"
                            >
                                <v-fade-transition leave-absolute>
                                    <span v-if="open">
                                        Select marina's location
                                    </span>
                                    <span v-else>{{ marina.location }}</span>
                                </v-fade-transition>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-col cols="5">
                                <l-map
                                        :zoom.sync="zoom"
                                        :center.sync="center"
                                        :options="mapOptions"
                                        style="height: 300px; width: 345px"
                                >
                                    <l-tile-layer
                                            :url="url"
                                            :attribution="attribution"
                                    />
                                    <l-marker
                                            :lat-lng.sync="marina.location"
                                            :draggable="true"
                                    >
                                    </l-marker>
                                </l-map>
                            </v-col>
                    
                            <v-divider
                                    vertical
                                    class="mx-4"
                            ></v-divider>
                    
                            <v-col cols="3">
                                Put the marker at the exact location of your marina
                                <br>
                                <a href="javascript:void(0)">Learn more</a>
                            </v-col>
                        </v-row>
                
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    text
                                    color="secondary"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                    text
                                    color="primary"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-expansion-panel-content>
                </v-expansion-panel>
    
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">Default price</v-col>
                                <v-col
                                        cols="8"
                                        class="text--secondary"
                                >
                                    <v-fade-transition leave-absolute>
                                        <span
                                                v-if="open"
                                        >
                                            Enter the default price for booking
                                        </span>
                                        <span v-else
                                        >
                                          {{ marina.price }}
                                        </span>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field
                                v-model="marina.price"
                                placeholder="55"
                        ></v-text-field>
                    </v-expansion-panel-content>
                </v-expansion-panel>
    
                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                            <v-col cols="4">Amenities</v-col>
                            <v-col
                                    cols="8"
                                    class="text--secondary"
                            >
                                <v-fade-transition leave-absolute>
              <span
                      v-if="open"
                      key="0"
              >
                Select additional amenities at your marina
              </span>
                                    <span
                                            v-else
                                            key="1"
                                    >
                {{ marina.amenities }}
              </span>
                                </v-fade-transition>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-col cols="5">
                                <v-select
                                        v-model="marina.amenities"
                                        :items="amenitiesList"
                                        chips
                                        multiple
                                        flat
                                >{{}}</v-select>
                            </v-col>
                
                            <v-divider
                                    vertical
                                    class="mx-4"
                            ></v-divider>
                
                            <v-col cols="3">
                                Select the amenities you provide
                                <br>
                                <a href="javascript:void(0)">Learn more</a>
                            </v-col>
                        </v-row>
            
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    text
                                    color="secondary"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                    text
                                    color="primary"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                            <v-col cols="4">Start and end of season</v-col>
                            <v-col
                                    cols="8"
                                    class="text--secondary"
                            >
                                <v-fade-transition leave-absolute>
                                    <span v-if="open">When do you want to travel?</span>
                                    <v-row
                                            v-else
                                            no-gutters
                                            style="width: 100%"
                                    >
                                        <v-col cols="6">Start date: {{ marina.start || 'Not set' }}</v-col>
                                        <v-col cols="6">End date: {{ marina.end || 'Not set' }}</v-col>
                                    </v-row>
                                </v-fade-transition>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row
                                justify="space-around"
                                no-gutters
                        >
                            <v-col cols="3">
                                <v-menu
                                        ref="startMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="marina.start"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="marina.start"
                                                label="Start date"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            v-model="date"
                                            no-title
                                            scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="$refs.startMenu.isActive = false"
                                        >Cancel</v-btn>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="$refs.startMenu.save(date)"
                                        >OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                    
                            <v-col cols="3">
                                <v-menu
                                        ref="endMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="marina.end"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="marina.end"
                                                label="End date"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            v-model="date"
                                            no-title
                                            scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="$refs.endMenu.isActive = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="$refs.endMenu.save(date)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-col cols="12" align="center">
            <v-btn color="primary" @click="onSubmit()">Submit</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    //LEAFLET********
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker} from "vue2-leaflet";
    import { Icon } from 'leaflet';
    import BerthyAPI from "../../services/berthy-api";
    import router from "../../router";
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    //***************
    
    export default {
        name: "MarinaRegistration",
        components: {
            LMap, LTileLayer, LMarker,
        },
        methods: {
            async onSubmit(){
                try {
                    let data = {
                        name: '',
                        description: '',
                        location: '',
                        price: 0,
                        amenities: [],
                        spots: [],
                        photos: []
                    }
                    let response = await BerthyAPI.post('submitMarina', data);
                    if (response.data.success) {
                        router.push('/dashboard');
                    }
                } catch (e) {
                    console.log('error on submit marina' + e);
                    router.push('/dashboard');
                }
                
            }
        },
        data: () => ({
            date: null,
            marina: {
                name: '',
                description: '',
                location: latLng(0, 0),
                price: 0,
                amenities: [],
                spots: [],
                start: null,
                end: null,
            },
            locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Equador', 'France'],
            location: latLng(0, 0),
            zoom: 2,
            bounds: {},
            center: latLng(49, -59),
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            //url:  "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
            attribution:
                `Map data &#169; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
            mapOptions: {
                zoomSnap: 0.5
            },
            amenitiesList: [
                "Restaurant","Bar","Hotel","Water","Electricity","Gas station","Wi-Fi","Shower","Accessible","Store","Parking","ATM"
            ],
            conveniences: [
                {
                    id: 1,
                    code: "restaurant",
                    name: "Restaurant"
                },
                {
                    id: 2,
                    code: "local_bar",
                    name: "Bar"
                },
                {
                    id: 3,
                    code: "local_hotel",
                    name: "Hotel"
                },
                {
                    id: 4,
                    code: "waves",
                    name: "Water"
                },
                {
                    id: 5,
                    code: "ev_station",
                    name: "Electricity"
                },
                {
                    id: 6,
                    code: "local_gas_station",
                    name: "Gas station"
                },
                {
                    id: 7,
                    code: "wifi",
                    name: "Wi-Fi"
                },
                {
                    id: 8,
                    code: "bathtub",
                    name: "Shower"
                },
                {
                    id: 9,
                    code: "accessible",
                    name: "Accessible"
                },
                {
                    id: 10,
                    code: "local_grocery_store",
                    name: "Store"
                },
                {
                    id: 11,
                    code: "directions_car",
                    name: "Parking"
                },
                {
                    id: 12,
                    code: "local_atm",
                    name: "ATM"
                }
            ],
        }),
    }
</script>

<style scoped>

</style>