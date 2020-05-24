<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Dashboard.vue is proprietary and confidential.                -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <grid-layout
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="false"
            :is-resizable="false"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :auto-size="true"
            :use-css-transforms="true"
            :responsive="true"
    >
    
<!--        <grid-item v-for="item in layout"-->
<!--                   :x="item.x"-->
<!--                   :y="item.y"-->
<!--                   :w="item.w"-->
<!--                   :h="item.h"-->
<!--                   :i="item.i"-->
<!--                   :key="item.i">-->
<!--            {{item.i}}-->
<!--        </grid-item>-->
        <grid-item :x="0" :y="0" :w="4" :h="6" :i="0">
            <MapCard :latitude="0" :longitude="0"></MapCard>
        </grid-item>
        <grid-item :x="4" :y="0" :w="4" :h="6" :i="1">
            <v-card>
                <v-card-subtitle class="text-center">Reservation %</v-card-subtitle>
                <v-card-text class="text-center display-1 font-weight-black green--text darken-2">24%</v-card-text>
                <v-card-text class="text-center"><b>3</b> reserved / <b>18</b> total</v-card-text>
            </v-card>
        </grid-item>
        <grid-item :x="8" :y="0" :w="4" :h="4" :i="2">
            <v-card>
                <v-card-subtitle class="text-center">Rating</v-card-subtitle>
                <v-card-text class="text-center display-1 font-weight-black">4.5</v-card-text>
                <v-card-text class="text-center py-0">
                    <v-rating
                            size="45px"
                            :value="4.5"
                            color="yellow accent-4"
                            half-increments
                            readonly
                    ></v-rating>
                </v-card-text>
                <v-card-text class="text-center">
                    Last 30 days: <span style="color: #4CAF50">4.8 </span>
                    <v-icon small style="color: #4CAF50">{{icons.triangle}}</v-icon>
                </v-card-text>
            </v-card>
        </grid-item>
        <grid-item :x="0" :y="6" :w="4" :h="6" :i="3">
            <v-card>
                <v-card-text>
                    <chart type="bar" :options="options" :series="series"></chart>
                </v-card-text>
            </v-card>
        </grid-item>
        <grid-item :x="4" :y="6" :w="4" :h="6" :i="4">
            <v-card>
                <v-card-text>
                    <chart type="radialBar" :options="options2" :series="[70]"></chart>
                </v-card-text>
            </v-card>
        </grid-item>
        <grid-item :x="8" :y="6" :w="4" :h="6" :i="4">
            <v-card>
                <v-card-text>
                    <chart
                            type="line"
                            :options="options3"
                            :series="series3"
                    ></chart>
                </v-card-text>
            </v-card>
        </grid-item>
    </grid-layout>
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    import MapCard from "../../components/DashboardComponents/MapCard";
    import {mdiTriangle} from "@mdi/js";
    export default {
        name: "Dashboard",
        components: {
            chart: ()=>import('vue-apexcharts'),
            MapCard,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            
        },
        data: function() {
            return {
                colour: '#65b634',
                icons: {
                    triangle: mdiTriangle
                },
                options3: {
                    xaxis: {
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                    }
                },
                options: {
                    xaxis: {
                        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                    }
                },
                options2: {
                    labels: ['Reserved'],
                },
                series: [{
                    name: 'series-1',
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }],
                series3: [{
                    name: 'Revenue',
                    data: [70,30,30,44,45,67,53,54,66,66,33,77]
                }],
                layout: [
                    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
                    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
                    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
                    {"x":6,"y":0,"w":2,"h":3,"i":"3"},
                    {"x":8,"y":0,"w":2,"h":3,"i":"4"},
                    {"x":10,"y":0,"w":2,"h":3,"i":"5"},
                    {"x":0,"y":5,"w":2,"h":5,"i":"6"},
                    {"x":2,"y":5,"w":2,"h":5,"i":"7"},
                    {"x":4,"y":5,"w":2,"h":5,"i":"8"},
                    {"x":6,"y":3,"w":2,"h":4,"i":"9"},
                    {"x":8,"y":4,"w":2,"h":4,"i":"10"},
                    {"x":10,"y":4,"w":2,"h":4,"i":"11"},
                    {"x":0,"y":10,"w":2,"h":5,"i":"12"},
                    {"x":2,"y":10,"w":2,"h":5,"i":"13"},
                    {"x":4,"y":8,"w":2,"h":4,"i":"14"},
                    {"x":6,"y":8,"w":2,"h":4,"i":"15"},
                    {"x":8,"y":10,"w":2,"h":5,"i":"16"},
                    {"x":10,"y":4,"w":2,"h":2,"i":"17"},
                    {"x":0,"y":9,"w":2,"h":3,"i":"18"},
                    {"x":2,"y":6,"w":2,"h":2,"i":"19"}
                ],
            }
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
</style>