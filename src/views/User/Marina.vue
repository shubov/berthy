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
                        <v-row align="center" justify="center" no-gutters>
                            <v-col cols="12" class="mb-2">
                                <v-icon class="contactsIcons">{{icons.star}}</v-icon>
                                <p class="d-inline text-left subtitle-1 font-weight-medium">
                                    {{marina.avgRating}} {{reviewsLength ? ` (${reviewsLength} reviews)` : ''}}
                                </p>
                            </v-col>
                            <v-col cols="12" class="mb-2">
                                <v-icon class="contactsIcons">{{icons.latitude}}</v-icon>
                                <p class="d-inline text-left subtitle-1 font-weight-medium">
                                    {{lat.dir}} {{lat.deg}}° {{lat.min}}' {{lat.sec}}''
                                </p>
                            </v-col>
                            <v-col cols="12"  class="mb-2">
                                <v-icon class="contactsIcons">{{icons.longitude}}</v-icon>
                                <p class="d-inline text-left subtitle-1 font-weight-medium">
                                    {{lng.dir}} {{lng.deg}}° {{lng.min}}' {{lng.sec}}''
                                </p>
                            </v-col>
                            <v-col cols="12" class="mb-2" v-if="address">
                                <v-icon class="contactsIcons">{{icons.compassOutline}}</v-icon>
                                <p class="d-inline text-left subtitle-1 font-weight-medium">
                                    {{address}}
                                </p>
                            </v-col>
                            <v-col cols="12" class="mb-2">
                                <v-icon class="contactsIcons">{{icons.radioHandheld}}</v-icon>
                                <p class="d-inline text-left subtitle-1 font-weight-medium">
                                    {{marina.radio}}
                                </p>
                            </v-col>
                            <v-col cols="12" v-if="marina.site">
                                <v-icon class="contactsIcons">{{icons.linkVariant}}</v-icon>
                                <a target="_blank"
                                   class="d-inline text-left subtitle-1 font-weight-medium"
                                   :href="marina.site"
                                >
                                    {{marina.site.toString().length>37
                                    ? (marina.site.toString().substr(0,34) + '...')
                                    : marina.site}}
                                </a>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-dialog
                                        v-if="boater || newUser"
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
                                            <v-icon>{{icons.calendarCheck}}</v-icon>
                                            Reserve a docking spot
                                        </v-btn>
                                    </template>
                                    <v-toolbar dark color="primary">
                                        <v-toolbar-title>Reservation</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn icon dark @click="dialogReservation = false">
                                            <v-icon>{{icons.close}}</v-icon>
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
                                            <v-icon>{{icons.mapMarkerOutline}}</v-icon>
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
                                                <v-icon>{{icons.close}}</v-icon>
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
                                :delimiter-icon="icons.minus"
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
                    <v-col
                            cols="12"
                            sm="6"
                    >
                        <p class="text-left title">Reviews</p>
                        <v-toolbar class="elevation-0 tile">
                            <span class="mr-5">
                                Rating: {{marina.avgRating}} {{reviewsLength ? ` (${reviewsLength} reviews)` : ''}}
                            </span>
                            <v-rating
                                    style="margin-left: -9px;padding-bottom: 18px;"
                                    x-large
                                    half-increments
                                    :value="marina.avgRating"
                                    readonly
                                    hover
                            ></v-rating>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialogReview"
                                      :fullscreen="isMobile"
                                      max-width="500px"
                                      persistent
                            >
                                <template v-slot:activator="{on}">
                                    <v-btn
                                            class="primary"
                                            v-on="on"
                                    >Write a review</v-btn>
                                </template>
                                <v-toolbar color="primary" dark>
                                    <v-toolbar-title>Add your review for {{marina.name}}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon @click="dialogReview=false">
                                        <v-icon>{{icons.close}}</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <ReviewForm
                                        :id="marina.id"
                                        @close-review-form="onCloseReviewForm"
                                ></ReviewForm>
                            </v-dialog>
                        </v-toolbar>
                        <v-list>
                            <v-list-item-group>
                                <template v-for="(item, index) in reviews">
                                    <v-hover
                                            v-slot:default="{ hover }"
                                            open-delay="300"
                                            :key="index"
                                    >
                                        <v-list-item three-line>
                                            <v-list-item-avatar>
                                                <v-img :src="item.reviewer.photoLink"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>{{item.reviewer.firstName}} {{item.reviewer.lastName}}</v-list-item-title>
                                                <v-list-item-subtitle>
                                                    <v-icon small>{{icons.star}}</v-icon>
                                                    {{item.rating}}
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>{{item.text}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-list-item-action-text>
                                                    {{item.dateTime}}
                                                </v-list-item-action-text>
                                                <v-btn
                                                        v-show="hover && userID === item.reviewer.accountId"
                                                        icon
                                                       @click="onDeleteReview(item.id)">
                                                    <v-icon color="primary">{{icons.delete}}</v-icon>
                                                </v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-hover>
                                </template>
                                <v-list-item v-if="reviewsLength<1">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            No reviews yet...
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogShip"
                  :fullscreen="isMobile"
                  max-width="900px"
                  persistent
        >
            <v-toolbar color="primary" dark>
                <v-toolbar-title>Add your boat</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogShip=false">
                    <v-icon>{{icons.close}}</v-icon>
                </v-btn>
            </v-toolbar>
            <ShipForm @close-ship-form="dialogShip=false"></ShipForm>
        </v-dialog>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {photoLink} from "../../assets/helperFunctions";
    import {
        mdiCalendarCheck,
        mdiClose,
        mdiCompassOutline, mdiDelete, mdiLatitude,
        mdiLinkVariant, mdiLongitude,
        mdiMapMarkerOutline, mdiMinus,
        mdiRadioHandheld, mdiStar
    } from "@mdi/js";
    
    export default {
        name: "Marina",
        components: {
            ReviewForm: ()=> import("../../components/MarinaPageComponents/ReviewForm"),
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
                            document.title = this.marina.name;
                            this.fetchReviews(id);
                            this.getAddress();
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
                icons: {
                    minus: mdiMinus,
                    latitude: mdiLatitude,
                    longitude: mdiLongitude,
                    compassOutline: mdiCompassOutline,
                    radioHandheld: mdiRadioHandheld,
                    linkVariant: mdiLinkVariant,
                    calendarCheck: mdiCalendarCheck,
                    close: mdiClose,
                    mapMarkerOutline: mdiMapMarkerOutline,
                    star: mdiStar,
                    delete: mdiDelete
                },
                dialog: false,
                dialogShip: false,
                dialogReview: false,
                dialogReservation: false,
            }
        },
        computed: {
            ...mapGetters('Marina', {
                marina: 'getPublicMarina',
                reviews: 'getReviews',
                reviewsLength: 'getReviewsLength',
                address: 'getPublicMarinaAddress'
            }),
            ...mapGetters('User', {
                userID: 'getID',
                boater: 'boater',
                newUser: 'newUser',
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
            ...mapActions('Marina', {
                fetchReviews: 'getMarinaReviews',
                deleteReview: "deleteReview",
                getAddress: 'getPublicMarinaAddress'
            }),
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
            onCloseReviewForm() {
                this.dialogReview = false;
                this.fetchReviews(this.marina.id);
            },
            async onDeleteReview(reviewID) {
                if(await this.deleteReview({
                    reviewID: reviewID,
                    marinaID: this.marina.id
                })) {
                    this.$store.dispatch('Dialog/set', 'Your review has been deleted!');
                } else {
                    this.$store.dispatch('snackbar','Something went wrong.');
                }
            }
        },
    }
</script>

<style scoped>
    .contactsIcons {
        margin-bottom: 5px;
    }
</style>