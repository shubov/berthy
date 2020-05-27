<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Dashboard.vue is proprietary and confidential.                -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container fluid>
        <v-toolbar flat dense short>
            <v-toolbar-title>{{marina.name}}</v-toolbar-title>
            <v-btn icon v-if="!draggable" @click="onDragEnable">
                <v-icon>{{icons.arrowAll}}</v-icon>
            </v-btn>
            <v-btn icon v-else @click="saveLayout">
                <v-icon>{{icons.check}}</v-icon>
            </v-btn>
    
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>{{icons.plusCircle}}</v-icon>
                    </v-btn>
                </template>
        
                <v-list>
                    <v-list-item>
                        <v-checkbox
                                v-model="yearRevenue"
                                label="Year revenue"
                        ></v-checkbox>
                    </v-list-item>
                    <v-list-item>
                        <v-checkbox
                                v-model="geolocation"
                                label="Location"
                        ></v-checkbox>
                    </v-list-item>
                    <v-list-item>
                        <v-checkbox
                                v-model="reserved"
                                label="Reserved percent"
                        ></v-checkbox>
                    </v-list-item>
                    <v-list-item>
                        <v-checkbox
                                v-model="week"
                                label="Week reserved percent"
                        ></v-checkbox>
                    </v-list-item>
                    <v-list-item>
                        <v-checkbox
                                v-model="rating"
                                label="Rating"
                        ></v-checkbox>
                    </v-list-item>
                    <v-list-item>
                        <v-checkbox
                                v-model="map"
                                label="Marina places map"
                        ></v-checkbox>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
        <grid-layout
                :layout.sync="layout"
                :col-num="12"
                :row-height="20"
                :is-draggable="draggable"
                :is-resizable="false"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[10, 10]"
                :use-css-transforms="false"
                :responsive="true"
                :breakpoints="breakpoints"
        >
            <grid-item
                    v-if="geolocation"
                    :x="layout[0].x"
                    :y="layout[0].y"
                    :w="layout[0].w"
                    :h="layout[0].h"
                    :i="layout[0].i"
                    :class="displayItems ? 'elevation-2' : 'info'"
            >
                <MapCard
                        v-if="displayItems"
                        :latitude="location.data.me ? location.data.me.lat : 0"
                        :longitude="location.data.me ? location.data.me.lng : 0"
                        :class="draggable ? 'ondrag' : ''"
                ></MapCard>
                <LayoutItemLabel v-else text="Location Map"></LayoutItemLabel>
            </grid-item>
            
            <grid-item
                    v-if="reserved"
                    :x="layout[1].x"
                    :y="layout[1].y"
                    :w="layout[1].w"
                    :h="layout[1].h"
                    :i="layout[1].i"
                    :class="displayItems ? 'elevation-2' : 'primary'"
            >
                <v-container fill-height v-if="displayItems">
                    <chart
                            type="radialBar"
                            height="260px"
                            width="100%"
                            :options="{labels: ['Reserved']}"
                            :series="[getReservedPercent]"
                            :class="draggable ? 'ondrag' : ''"
                    ></chart>
                    <v-card-text class="text-center"><b>
                        {{getReservedPlaceNum}}
                    </b> reserved / <b>
                        {{getTotalPlaceNum}}
                    </b> total</v-card-text>
                </v-container>
                <LayoutItemLabel v-else text="Reservation Percentage"></LayoutItemLabel>
            </grid-item>
            <grid-item
                    v-if="rating"
                    :x="layout[2].x"
                    :y="layout[2].y"
                    :w="layout[2].w"
                    :h="layout[2].h"
                    :i="layout[2].i"
                    :class="displayItems ? 'elevation-2' : 'success'"
            >
                <v-container v-if="displayItems" fill-height>
                    <v-card-subtitle class="text-center">Rating</v-card-subtitle>
                    <v-card-text class="text-center display-1 font-weight-black">{{getTotalRating}}</v-card-text>
                    <v-card-text class="text-center py-0">
                        <v-rating
                                size="45px"
                                :value="getTotalRating"
                                color="yellow accent-4"
                                half-increments
                                readonly
                        ></v-rating>
                    </v-card-text>
                    <v-card-text :class="'text-center '+getRatingTrend+'--text'">
                        Last 30 days: <span>{{getLastMonthRating}}</span>
                        <v-icon small>{{getRatingTrend==='green'? icons.trendingUp : icons.trendingDown}}</v-icon>
                    </v-card-text>
                </v-container>
                <LayoutItemLabel v-else text="Rating"></LayoutItemLabel>
            </grid-item>
            <grid-item
                    v-if="week"
                    :x="layout[3].x"
                    :y="layout[3].y"
                    :w="layout[3].w"
                    :h="layout[3].h"
                    :i="layout[3].i"
                    :class="displayItems ? 'elevation-2' : 'warning'"
            >
                <chart
                        v-if="displayItems"
                        type="bar"
                        height="370px"
                        width="100%"
                        :options="barchartOptions"
                        :series="barchartSeries"
                        :class="draggable ? 'ondrag' : ''"
                ></chart>
                <LayoutItemLabel v-else text="Upcoming Week Reservations"></LayoutItemLabel>
            </grid-item>
            <grid-item
                    v-if="yearRevenue"
                    :x="layout[4].x"
                    :y="layout[4].y"
                    :w="layout[4].w"
                    :h="layout[4].h"
                    :i="layout[4].i"
                    :class="displayItems ? 'elevation-2' : 'secondary'"
            >
                <chart
                        v-if="displayItems"
                        type="line"
                        height="350px"
                        width="100%"
                        :options="lineChartOptions"
                        :series="lineChartSeries"
                        :class="draggable ? 'ondrag' : ''"
                ></chart>
                <LayoutItemLabel v-else text="Year Revenue"></LayoutItemLabel>
            </grid-item>
        </grid-layout>
    </v-container>
    
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    import {mdiArrowAll, mdiPlusCircle, mdiTrendingUp, mdiTrendingDown, mdiCheck} from "@mdi/js";
    import {mapActions, mapGetters} from "vuex";
    
    export default {
        name: "Dashboard",
        components: {
            LayoutItemLabel: ()=>import("../../components/DashboardComponents/LayoutItemLabel"),
            chart: ()=>import('vue-apexcharts'),
            MapCard: ()=>import("../../components/DashboardComponents/MapCard"),
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
        },
        computed: {
            ...mapGetters('Marina', ['getCurrent', 'getAll']),
            ...mapGetters('Dashboard', [
                'year_revenue',
                'reserved_percent',
                'week_reserved_percent',
                'rating_trend',
                'place_booking_map',
                'location',
                'barchartSeries',
                'barchartOptions',
                'lineChartOptions',
                'lineChartSeries',
                'getReservedPercent',
                'getTotalPlaceNum',
                'getReservedPlaceNum',
                'getRatingTrend',
                'getLastMonthRating',
                'getTotalRating'
            ]),
            marina() {
                return this.getAll[this.getCurrent];
            },
            rating: {
                get() { return this.rating_trend !== undefined },
                async set() { await this.setFunction('Dashboard/RATING_TREND') },
            },
            yearRevenue: {
                get() { return this.year_revenue !== undefined},
                async set() { await this.setFunction('Dashboard/YEAR_REVENUE') },
            },
            reserved: {
                get() { return this.reserved_percent !== undefined },
                async set() { await this.setFunction('Dashboard/RESERVED_PERCENT') },
            },
            week: {
                get() { return this.week_reserved_percent !== undefined },
                async set() { await this.setFunction('Dashboard/WEEK_RESERVED_PERCENT') },
            },
            geolocation: {
                get() { return this.location !== undefined },
                async set() { await this.setFunction('Dashboard/LOCATION') },
            },
            map: {
                get() { return this.place_booking_map !== undefined },
                async set() { await this.setFunction('Dashboard/PLACE_BOOKING_MAP') },
            },
        },
        data: function() {
            return {
                marinaID: 28,
                displayItems: false,
                draggable: false,
                icons: {
                    plusCircle: mdiPlusCircle,
                    arrowAll: mdiArrowAll,
                    trendingUp: mdiTrendingUp,
                    trendingDown: mdiTrendingDown,
                    check: mdiCheck,
                },
                layout: [
                    {x:0,y:0,w:4,h:11,i:0},
                    {x:4,y:0,w:2,h:11,i:1},
                    {x:8,y:0,w:2,h:7,i:2},
                    {x:0,y:6,w:4,h:14,i:3},
                    {x:8,y:6,w:4,h:14,i:4},
                    {x:4,y:6,w:2,h:9,i:5},
                ],
                breakpoints: {
                    xxs: 0,
                    xs: this.$vuetify.breakpoint.thresholds.xs,
                    sm: this.$vuetify.breakpoint.thresholds.sm,
                    md: this.$vuetify.breakpoint.thresholds.md,
                    lg: this.$vuetify.breakpoint.thresholds.lg,
                }
            }
        },
        methods: {
            ...mapActions('Marina', ['fetchMyMarinas']),
            onDragEnable() {
                this.draggable = true;
                this.displayItems = false;
            },
            setFunction(commit) {
                this.displayItems=false;
                this.$store.commit(commit);
                setTimeout(()=>{
                    //await this.$store.dispatch('Dashboard/changeSettings', this.marinaID);
                    if (!this.draggable) this.displayItems=true;
                },0);
            },
            commitLayoutPosition(commit, i) {
                this.$store.commit(commit, {
                    x: this.layout[i].x,
                    y: this.layout[i].y,
                });
            },
            async saveLayout() {
                this.draggable = false;
                this.displayItems = true;
                
                this.commitLayoutPosition('Dashboard/POS_LOCATION', 0);
                this.commitLayoutPosition('Dashboard/POS_RESERVED_PERCENT', 1);
                this.commitLayoutPosition('Dashboard/POS_RATING_TREND', 2);
                this.commitLayoutPosition('Dashboard/POS_WEEK_RESERVED_PERCENT', 3);
                this.commitLayoutPosition('Dashboard/POS_YEAR_REVENUE', 4);
                this.commitLayoutPosition('Dashboard/POS_PLACE_BOOKING_MAP', 5);
                
                //await this.$store.dispatch('Dashboard/changeSettings', this.marinaID);
            },
        },
        // async created() {
        //     if (this.getAll.length < 1)
        //         await this.fetchMyMarinas();
        // },
        mounted() {
            this.displayItems = true;
        },
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: transparent;
    }
    .ondrag {
        pointer-events: none
    }
</style>