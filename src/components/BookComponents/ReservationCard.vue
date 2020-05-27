<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in ReservationCard.vue is proprietary and confidential.          -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-0 pt-6" tile>
        <v-card-subtitle>Check the dates and the boat you selected again.
            In case you don't have a boat, create one.
            It is necessary for the dockmaster accepting your
            reservation to know parameters of your boat.<br/>
            Select one the docking spots available for you at {{marina.name}}.
            Naming of the places is saved.
        </v-card-subtitle>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-menu
                            v-model="dateMenuFrom"
                            transition="slide-x-transition"
                            max-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    rounded
                                    filled
                                    dense
                                    label="Date From"
                                    :value="dateFrom"
                                    readonly
                                    :prepend-inner-icon="icons.calendar"
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
                </v-col>
                <v-col cols="12" sm="6">
                    <v-menu
                            v-model="dateMenuTo"
                            transition="slide-x-transition"
                            max-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    dense
                                    rounded
                                    filled
                                    label="Date To"
                                    :value="dateTo"
                                    readonly
                                    :prepend-inner-icon="icons.calendar"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="dateTo"
                                no-title @change="dateMenuTo = false"
                                :allowed-dates="allowedDatesTo"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                            dense
                            rounded
                            filled
                            label="Boat"
                            v-model='ship'
                            :items="ships"
                            item-text="name"
                            item-value="id"
                            menu-props="{z-index: 200}"
                    >
                        <template v-slot:append-item>
                            <v-list-item>
                                <v-btn
                                        class="primary"
                                        block
                                        @click.stop="$emit('new-ship')"
                                >
                                    <v-icon>{{icons.sailBoat}}</v-icon>
                                    NEW Boat
                                </v-btn>
                            </v-list-item>
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        dense
                        label="Select a docking spot"
                        rounded
                        filled
                        v-model='berthPlaceId'
                        :items="places"
                        item-text="name"
                        item-value="id"
                        menu-props="{z-index: 200}"
                ></v-select>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    :block="isMobile"
                    color="primary"
                    @click="onSubmit()"
                    x-large
                    :loading="submitting"
            >Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mdiCalendar, mdiSailBoat} from '@mdi/js';
    import {mapActions, mapGetters} from "vuex";
    import {latLng} from "leaflet";

    export default {
        name: "ReservationCard",
        computed: {
            ...mapGetters('Reservation', {
                getDateTo: 'getDateTo',
                getDateFrom: 'getDateFrom',
                getShip: 'getShip',
                spotId: 'getSpotId',
                marinas: 'getFilteredMarinas',
            }),
            ...mapGetters('Ships', {
                ships: 'getShips',
            }),
            ...mapGetters('Marina', {
                marina: 'getPublicMarina',
            }),
            ship: {
                get() {
                    return this.getShip;
                },
                async set(value) {
                    this.$store.commit('Reservation/UPDATE_SHIP', value);
                    await this.updatePlaces();
                }
            },
            dateTo: {
                get() {
                    return this.getDateTo;
                },
                async set(value) {
                    this.$store.commit('Reservation/UPDATE_DATE_TO', value);
                    await this.updatePlaces();
                }
            },
            dateFrom: {
                get() {
                    return this.getDateFrom;
                },
                async set(value) {
                    this.$store.commit('Reservation/UPDATE_DATE_FROM', value);
                    await this.updatePlaces();
                }
            },
            berthPlaceId: {
                get() {
                    return this.getSpotId;
                },
                set(value) {
                    this.$store.commit('Reservation/UPDATE_SPOT', value);
                },
            },
            confirmationMessage() {
                if (this.ships.length && this.marina && this.dateFrom && this.dateTo && this.ship)
                    return `The dockmaster of
                    ${this.marina.name} was just notified about your reservation for
                    ${this.shipName} from
                    ${this.dateFrom} to
                    ${this.dateTo}`;
                else return '';
            },
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
        },
        data: function() {
            return {
                dateMenuFrom: false,
                dateMenuTo: false,
                submitting: false,
                places: [],
                shipName: null,
                icons: {
                    sailBoat: mdiSailBoat,
                    calendar: mdiCalendar,
                }
            }
        },
        methods: {
            ...mapActions('Ships', {
                updateShips: 'fetchShips',
                getShipById: 'getShipById'
            }),
            ...mapActions('Reservation', {
                updateSearch: 'updateSearch'
            }),
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
            onSubmit(){
                this.submitting = true;
                setTimeout(async ()=> {
                    if(await this.$store.dispatch('Reservation/book')) {
                        this.$emit('close-reg-form');
                        this.shipName = (await this.getShipById(this.ship)).name;
                        this.$store.dispatch('Dialog/set',this.confirmationMessage);
                    } else {
                        this.$store.dispatch('snackbar','Fill all the fields to make a reservation.');
                    }
                    this.submitting = false;
                }, 0);
            },
            async updatePlaces() {
                this.berthPlaceId = null;
                if (await this.updateSearch() && this.marinas.length)
                    this.places = this.marinas[0].places;
                else {
                    this.places = [];
                    await this.$store.dispatch('snackbar',
                        'No places available at the marina for these dates and size of your boat');
                }
            },
            onOkDialog() {
                this.dialogConfirmation = false;
            }
        },
        async mounted() {
            if (!this.ships.length)
                await this.updateShips();
            this.$store.commit("Reservation/GET_LOCAL_COPY");
            this.$store.commit("Reservation/UPDATE_MAP_CENTER", latLng(this.marina.lat, this.marina.lng));
            this.$store.commit("Reservation/UPDATE_RADIUS", 1);
            await this.updatePlaces();
        }
    }
</script>

<style scoped>

</style>