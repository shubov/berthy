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
            <v-menu v-if="getAll.length>1">
                <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-btn icon v-on="{ ...tooltip, ...menu }" v-bind="attrs">
                                <v-icon>{{icons.clipboardMultipleOutline}}</v-icon>
                            </v-btn>
                        </template>
                        <span>Switch to another marina</span>
                    </v-tooltip>
                </template>
                <v-list>
                    <v-subheader>My marinas</v-subheader>
                    <v-list-item
                            v-for="(marina, index) in getAll"
                            :key="index"
                            @click="changeMarina(index)"
                    >
                        <v-list-item-title>{{marina.name}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-toolbar-title>{{marina ? marina.name : ''}}</v-toolbar-title>
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
                :margin="[10, 10]"
                :use-css-transforms="true"
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
                    class="elevation-1"
            >
                <MapCard
                        v-if="displayItems"
                        :latitude="location.data ? location.data.me.lat : 0"
                        :longitude="location.data ? location.data.me.lng : 0"
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
                    class="elevation-1"
            >
                <v-container
                        fill-height
                        v-if="displayItems && (getTotalPlaceNum!=null) && (getReservedPlaceNum!=null)"
                >
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
                <LayoutItemLabel v-else :text="(getTotalPlaceNum==null || getReservedPlaceNum==null)
                ? 'Reservation Percentage (no data)': 'Reservation Percentage'"></LayoutItemLabel>
            </grid-item>
            <grid-item
                    v-if="rating"
                    :x="layout[2].x"
                    :y="layout[2].y"
                    :w="layout[2].w"
                    :h="layout[2].h"
                    :i="layout[2].i"
                    class="elevation-1"
            >
                <RatingCard
                        v-if="displayItems && getTotalRating && getLastMonthRating"
                        :getTotalRating="getTotalRating"
                        :getRatingTrend="getRatingTrend"
                        :getLastMonthRating="getLastMonthRating"
                ></RatingCard>
                <LayoutItemLabel v-else :text="(!getTotalRating || !getLastMonthRating)
                ? 'Rating (no data)': 'Rating'"></LayoutItemLabel>
            </grid-item>
            <grid-item
                    v-if="week"
                    :x="layout[3].x"
                    :y="layout[3].y"
                    :w="layout[3].w"
                    :h="layout[3].h"
                    :i="layout[3].i"
                    class="elevation-1"
            >
                <chart
                        v-if="displayItems && barchartOptions && barchartSeries"
                        type="bar"
                        height="370px"
                        width="100%"
                        :options="barchartOptions"
                        :series="barchartSeries"
                        :class="draggable ? 'ondrag' : ''"
                ></chart>
                <LayoutItemLabel v-else :text="(!barchartOptions || !barchartSeries)
                ? 'Upcoming Week Reservations (no data)': 'Upcoming Week Reservations'"></LayoutItemLabel>
            </grid-item>
            <grid-item
                    v-if="yearRevenue"
                    :x="layout[4].x"
                    :y="layout[4].y"
                    :w="layout[4].w"
                    :h="layout[4].h"
                    :i="layout[4].i"
                    class="elevation-1"
            >
                <chart
                        v-if="displayItems && lineChartSeries && lineChartOptions"
                        type="line"
                        height="350px"
                        width="100%"
                        :options="lineChartOptions"
                        :series="lineChartSeries"
                        :class="draggable ? 'ondrag' : ''"
                ></chart>
                <LayoutItemLabel v-else :text="(!lineChartSeries || !lineChartOptions)
                ? 'Year Revenue (no data)': 'Year Revenue'"></LayoutItemLabel>
            </grid-item>
        </grid-layout>
    </v-container>
    
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    import {
        mdiArrowAll,
        mdiPlusCircle,
        mdiTrendingUp,
        mdiTrendingDown,
        mdiCheck,
        mdiClipboardMultipleOutline
    } from "@mdi/js";
    import {mapActions, mapGetters} from "vuex";
    import RatingCard from "../../components/DashboardComponents/RatingCard";
    
    export default {
        name: "Dashboard",
        components: {
            RatingCard,
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
                displayItems: false,
                draggable: false,
                icons: {
                    plusCircle: mdiPlusCircle,
                    arrowAll: mdiArrowAll,
                    trendingUp: mdiTrendingUp,
                    trendingDown: mdiTrendingDown,
                    check: mdiCheck,
                    clipboardMultipleOutline: mdiClipboardMultipleOutline,
                },
                layout: [
                    {x:0,y:0,w:2,h:11,i:0},
                    {x:2,y:0,w:2,h:11,i:1},
                    {x:4,y:0,w:2,h:7,i:2},
                    {x:6,y:0,w:4,h:13,i:3},
                    {x:10,y:0,w:4,h:12,i:4},
                    {x:14,y:0,w:2,h:9,i:5},
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
            ...mapActions('Dashboard', ['fetch']),
            onDragEnable() {
                this.draggable = true;
                this.displayItems = false;
            },
            setFunction(commit) {
                this.displayItems=false;
                this.$store.commit(commit);
                setTimeout(async ()=>{
                    await this.$store.dispatch('Dashboard/changeSettings', this.marina.id);
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
                
                await this.$store.dispatch('Dashboard/changeSettings', this.marina.id);
            },
            updateLayout(index, {column, row}) {
                let newVal = this.layout[index];
                newVal.x=column;
                newVal.y=row;
                this.$set(this.layout, index, newVal);
            },
            async changeMarina(index) {
                this.$store.commit('Marina/SELECT_MARINA', index);
                setTimeout(async () => {
                    await this.updateDashboard();
                },0);
            },
            async updateDashboard() {
                this.displayItems = false;
                if (await this.fetch(this.marina.id)) {
                    setTimeout(() => {
                        if (this.location)
                            this.updateLayout(0, this.location.settings);
                        if (this.reserved_percent)
                            this.updateLayout(1, this.reserved_percent.settings);
                        if (this.rating_trend)
                            this.updateLayout(2, this.rating_trend.settings);
                        if (this.week_reserved_percent)
                            this.updateLayout(3, this.week_reserved_percent.settings);
                        if (this.year_revenue)
                            this.updateLayout(4, this.year_revenue.settings);
                        setTimeout(() => {
                            this.displayItems = true;
                        }, 0);
                    }, 0)
                }
            }
        },
        async created() {
            if (this.getAll.length < 1)
                await this.fetchMyMarinas();
            setTimeout(async () => {
                await this.updateDashboard();
            },0);
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