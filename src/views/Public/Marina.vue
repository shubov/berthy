<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Marina.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row align="baseline" justify="center">
        <v-col cols="11">
            <v-row>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <v-row no-gutters>
                        <v-col>
                            <v-chip label color="primary">Marina</v-chip>
                            <p class="text-left display-2">{{marina.name}}</p>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-rating
                                    class="d-inline"
                                    style="margin-left: -6px"
                                    :value="marina.avgRating"
                                    background-color="grey"
                                    color="yellow accent-4"
                                    half-increments
                                    hover
                                    readonly
                            ></v-rating>
                            <span class="grey--text text--lighten-2 caption mr-2">({{ marina.avgRating }})</span>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center" no-gutters>
                        <v-col cols="12" class="mb-2">
                            <v-icon class="contactsIcons">mdi-latitude</v-icon>
                            <p class="d-inline text-left subtitle-1 font-weight-medium">
                                {{lat.dir}} {{lat.deg}}° {{lat.min}}' {{lat.sec}}''
                            </p>
                        </v-col>
                        <v-col cols="12"  class="mb-2">
                            <v-icon class="contactsIcons">mdi-longitude</v-icon>
                            <p class="d-inline text-left subtitle-1 font-weight-medium">
                                {{lng.dir}} {{lng.deg}}° {{lng.min}}' {{lng.sec}}''
                            </p>
                        </v-col>
                        <v-col cols="12" class="mb-2">
                            <v-icon class="contactsIcons">mdi-compass-outline</v-icon>
                            <p class="d-inline text-left subtitle-1 font-weight-medium">
                                Moscow, Russia
                            </p>
                        </v-col>
                        <v-col cols="12" class="mb-2">
                            <v-icon class="contactsIcons">mdi-radio-handheld</v-icon>
                            <p class="d-inline text-left subtitle-1 font-weight-medium">
                                {{marina.radio}}
                            </p>
                        </v-col>
                        <v-col cols="12">
                            <v-icon class="contactsIcons">mdi-link-variant</v-icon>
                            <a target="_blank"
                                    class="d-inline text-left subtitle-1 font-weight-medium"
                                    :href="marina.site"
                            >
                                {{marina.site}}
                            </a>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" align="start" >
                            <v-btn
                                    color="primary"
                                    x-large
                                    class="mr-3 mb-3"
                                    :block="!$vuetify.breakpoint.smAndUp"
                            >
                                <v-icon>mdi-calendar-check</v-icon>
                                Reserve a docking spot
                            </v-btn>
                            <v-dialog
                                    v-model="dialog"
                                    :fullscreen="!$vuetify.breakpoint.mdAndUp"
                                    hide-overlay
                                    max-width="700px"
                                    transition="scale-transition">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                            :block="!$vuetify.breakpoint.smAndUp"
                                            color="info"
                                            x-large
                                            class="mr-3 mb-3"
                                            v-on="on"
                                    >
                                        <v-icon>mdi-map-marker-outline</v-icon>
                                        Open a map
                                    </v-btn>
                                </template>
                                <v-card v-resize="updateMapHeight">
                                    <v-toolbar
                                            id="toolbar"
                                            dark
                                            color="primary"
                                    >
                                        <v-toolbar-title>{{marina.name}}</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                icon
                                                dark
                                                @click="dialog = false"
                                        >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    </v-toolbar>
                                    <v-row align="center" justify="center" no-gutters>
                                        <v-col>
                                            <PublicMarinaMap
                                                    id="map"
                                                    :position="[marina.lat, marina.lng]"
                                            ></PublicMarinaMap>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <v-carousel
                            :continuous="true"
                            :show-arrows="true"
                            hide-delimiter-background
                            delimiter-icon="mdi-minus"
                            height="400"
                    >
                        <v-carousel-item
                                eager
                                v-for="(photo,i) in marina.photos"
                                :key="i"
                                :src="photoLink(photo.fileLink)"
                        ></v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <p class="text-left title">Description</p>
                    <p class="text-left">{{marina.description}}</p>
                </v-col>
                <v-col
                        cols="12"
                        sm="6"
                >
                    <p class="text-left title">Amenities</p>
                    <v-chip
                            v-for="(a, i) in marina.amenities"
                            large
                            :key="i"
                            class="mb-1 mr-1"
                    >
                        <v-avatar left>
                            <v-icon>{{a.icon}}</v-icon>
                        </v-avatar>
                        {{ a.value }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import BerthyAPI from "../../services/berthy-api";
    import {mapGetters} from 'vuex';
    import PublicMarinaMap from "../../components/PublicMarinaMap";
    
    export default {
        name: "Marina",
        components: {PublicMarinaMap},
        data: function () {
            return {
                dialog: false,
               
            }
        },
        computed: {
            ...mapGetters('Marina', {
                marina: 'getPublicMarina',
            }),
            lat(){
                return this.convertToDMS(this.marina.lat, false);
            },
            lng(){
                return this.convertToDMS(this.marina.lng, true);
            },
        },
        methods: {
            convertToDMS(D, lng){
                const M=0|(D%1)*60e7;
                return {
                    dir : D<0?lng?'W':'S':lng?'E':'N',
                    deg : 0|(D<0?D=-D:D),
                    min : 0|M/1e7,
                    sec : (0|M/1e6%1*6e4)/100
                };
            },
            photoLink(link) {
                return BerthyAPI.defaults.baseURL.slice(0, -5) + '' + link;
            },
            updateMapHeight() {
                //let h = window.innerHeight - document.getElementById('toolbar').style.height.substr(0,2);
                document.getElementById('map').style.height = window.innerHeight*0.6 + 'px';
            },
        },
    }
</script>

<style scoped>
    .contactsIcons {
        margin-bottom: 5px;
    }
</style>