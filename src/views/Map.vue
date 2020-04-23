<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Map.vue is proprietary and confidential.                      -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <l-map
            :zoom.sync="zoom"
            :center.sync="center"
            :options="mapOptions"
            style="height: 100%; z-index:0"
    >
        <l-tile-layer
                :url="url"
                :attribution="attribution"
        />
        <l-marker
                v-for="(loco, index) in this.fleet"
                :key="index"
                :lat-lng="loco.geo"
                @click="markerClick(index)"
        >
            <l-tooltip>{{loco.device}}</l-tooltip>
        </l-marker>
        <l-control v-if="showLocoInfo">
            <LocoCard
                    v-bind:locoInfo="this.locoInfo? this.locoInfo : '' "
                    @close="showLocoInfo=false"
            ></LocoCard>
        </l-control>
    </l-map>
</template>

<script>
    import { mapGetters } from 'vuex'
    import LocoCard from "../components/Cards/LocoCard";

    //LEAFLET********
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LTooltip, LControl} from "vue2-leaflet";
    import { Icon } from 'leaflet';
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    //***************

    export default {
        name: "Map",
        components: {
            LMap, LTileLayer, LMarker, LTooltip, LControl,

            LocoCard,
        },
        mounted: function () {
            this.$root.$on('select-loco', (index) => {
                this.markerClick(index);
            })
        },
        computed: {
            ...mapGetters({
                fleet: 'Fleet/getFleet',
                lastUpdateTime: 'Sockets/getLastUpdateTime'
            }),
        },
        watch: {
            lastUpdateTime() {
                let {lat, lng} = this.center;
                this.center = {lat, lng};
            }
        },
        data: function () {
            return {
                showLocoInfo: false,
                locoInfo: {},
                zoom: 4,
                bounds: {},
                center: latLng(59.24, 49.13),
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                //url:  "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
                attribution:
                    `Map data &#169; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
                mapOptions: {
                    zoomSnap: 0.5
                }
            };
        },
        methods: {
            markerClick: async function (index) {
                this.showLocoInfo = true;
                this.locoInfo = {
                    number: this.fleet[index].message.locoNo,
                    mileage: this.fleet[index].message.mileage,
                    sofis: this.fleet[index].message.falarm,
                    speed: this.fleet[index].message.speed,
                    device: this.fleet[index].device,
                };
                this.setZoom(17);
                await this.$nextTick()
                this.recenter(this.fleet[index].geo.lat, this.fleet[index].geo.lng);
            },
            recenter: function (lat, lng) {
                this.center=latLng(lat,lng);
            },
            setZoom: function (zoom) {
                this.zoom = zoom;
            }
        }
    };
</script>