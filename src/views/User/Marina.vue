<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Marina.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            fill-height
    >
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
                            <v-col cols="12">
                                <v-dialog
                                        v-model="dialogReservation"
                                        :fullscreen="!$vuetify.breakpoint.mdAndUp"
                                        max-width="700px"
                                        persistent
                                        transition="dialog-bottom-transition">
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                                color="primary"
                                                x-large
                                                class="mr-3 mb-3"
                                                :block="!$vuetify.breakpoint.smAndUp"
                                                v-on="on"
                                        >
                                            <v-icon>mdi-calendar-check</v-icon>
                                            Reserve a docking spot
                                        </v-btn>
                                    </template>
                                    <v-toolbar dark color="primary">
                                        <v-toolbar-title>Reservation</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon dark @click="dialogReservation = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                    <ReservationCard
                                            @new-ship="dialogShip=true"
                                            @close-reg-form="dialogReservation = false"
                                    ></ReservationCard>
                                </v-dialog>
                                
                                <v-dialog
                                        v-model="dialog"
                                        :fullscreen="!$vuetify.breakpoint.mdAndUp"
                                        max-width="700px"
                                        persistent
                                        transition="dialog-bottom-transition">
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
                                    :src="toLink(photo.fileLink)"
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
        <v-dialog v-model="dialogShip"
                  :fullscreen="isMobile"
        >
            <v-toolbar color="primary" dark>
                <v-toolbar-title>Add your boat</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogShip=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <ShipForm></ShipForm>
        </v-dialog>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {photoLink} from "../../assets/helperFunctions";
    
    export default {
        name: "Marina",
        components: {
            ShipForm: ()=>import("../../components/BookComponents/ShipForm"),
            ReservationCard: ()=> import("../../components/BookComponents/ReservationCard"),
            PublicMarinaMap: ()=>import("../../components/MarinaPageComponents/PublicMarinaMap"),
        },
        async beforeCreate() {
            let id = this.$route.params.id;
            if (!isNaN(id)) {
                this.$store.dispatch("Marina/fetchMarina", id)
                    .then(response=>{
                        if(response) {
                            document.title = this.$store.getters['Marina/getPublicMarina'].name;
                        } else {
                            this.$router.push('/404');
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                        this.$router.push('/404');
                    })
            } else {
                this.$router.push('/404');
            }
        },
        data: function () {
            return {
                dialog: false,
                dialogShip: false,
                dialogReservation: false,
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
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
        },
        methods: {
            convertToDMS(D1, lng){
                const D = D1<0?-D1:D1;
                const M=0|(D%1)*60e7;
                return {
                    dir : D1<0?lng?'W':'S':lng?'E':'N',
                    deg : 0|D,
                    min : 0|M/1e7,
                    sec : (0|M/1e6%1*6e4)/100
                };
            },
            toLink(link) {
                return photoLink(link);
            },
            updateMapHeight() {
                let h;
                if (this.$vuetify.breakpoint.mdAndUp) {
                    h = window.innerHeight*0.6;
                } else {
                    h = window.innerHeight - document.getElementById('toolbar').style.height.substr(0,2);
                }
                document.getElementById('map').style.height = h + 'px';
            },
        },
    }
</script>

<style scoped>
    .contactsIcons {
        margin-bottom: 5px;
    }
</style>