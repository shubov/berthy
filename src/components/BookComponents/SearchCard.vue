<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SearchCard.vue is proprietary and confidential.               -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-0" tile>
            <v-card-title>Search</v-card-title>
            <v-card-text>
                <v-select
                        dense
                        outlined
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
                                <v-icon>mdi-sail-boat</v-icon>
                                NEW Boat
                            </v-btn>
                        </v-list-item>
                    </template>
                </v-select>
                <v-menu
                        v-model="dateMenuFrom"
                        max-width="290px"
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
                        max-width="290px"
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
                <v-select
                        v-model="amenitiesSearch"
                        :items="amenities"
                        chips
                        dense
                        label="Amenities"
                        outlined
                        return-object
                        multiple
                >
                    <template v-slot:selection="data">
                            <span
                                    v-if="data.index===0"
                            >{{ amenitiesSearch.length }} selected</span>
                    </template>
                    <template v-slot:item="data">
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
                <v-select dense outlined
                          :items="getSortOptions"
                          v-model="sortBy"
                          label="Sort by"
                ></v-select>
            </v-card-text>
        </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "SearchCard",
        computed: {
            ...mapGetters('Reservation', {
                getDateTo: 'getDateTo',
                getDateFrom: 'getDateFrom',
                getSearchAmenities: 'getSearchAmenities',
                getShip: 'getShip',
                getSortBy: 'getSortBy',
                getSortOptions: 'getSortOptions',
            }),
            ...mapGetters('Amenities', {
                amenities: 'getAmenities',
            }),
            ...mapGetters('Ships', {
                ships: 'getShips',
            }),
            ship: {
                get() {
                    return this.getShip;
                },
                set(value) {
                    this.$store.commit('Reservation/UPDATE_SHIP', value);
                    this.updateSearch();
                }
            },
            dateTo: {
                get() {
                    return this.getDateTo;
                },
                set(value) {
                    this.$store.commit('Reservation/UPDATE_DATE_TO', value);
                    this.updateSearch();
                }
            },
            dateFrom: {
                get() {
                    return this.getDateFrom;
                },
                set(value) {
                    this.$store.commit('Reservation/UPDATE_DATE_FROM', value);
                }
            },
            amenitiesSearch: {
                get() {
                    return this.getSearchAmenities;
                },
                set(value) {
                    this.$store.commit('Reservation/UPDATE_AMENITIES', value);
                    this.updateSearch();
                }
            },
            sortBy: {
                get() {
                    return this.getSortBy;
                },
                set(value) {
                    this.$store.commit('Reservation/UPDATE_SORT', value);
                    this.updateSearch();
                }
            },
        },
        data: function () {
            return {
                dateMenuFrom: false,
                dateMenuTo: false,
                rules: [val=>!isNaN(val) || 'Not a number'],
            }
        },
        methods: {
            ...mapActions('Reservation', {
                updateSearch: 'updateSearch'
            }),
            ...mapActions('Amenities', {
                updateAmenities: 'availableAmenities'
            }),
            ...mapActions('Ships', {
                updateShips: 'fetchShips'
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
        },
        async mounted() {
            if (!this.amenities.length)
                await this.updateAmenities();
            if (!this.ships.length)
                await this.updateShips();
        },
    }
</script>

<style scoped>

</style>