<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in MapCard.vue is proprietary and confidential.                  -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card id='map-card'>
        <l-map
                :zoom.sync="zoom"
                :center.sync="center"
                :options="mapOptions"
        >
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"
            />
            <l-marker
                    v-if="loco"
                    :lat-lng="loco.geo"
            >
                <l-tooltip>{{loco.device}}</l-tooltip>
            </l-marker>
        </l-map>
    </v-card>
</template>

<script>
    //LEAFLET********
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LTooltip} from "vue2-leaflet";
    import { Icon } from 'leaflet';
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    //***************

    
    export default {
        name: "MapCard",
        props: {
            loco: {
                validator: prop => typeof prop === 'object' || prop === null
            },
            zoom: {
                type: Number,
                default: 7,
            }
        },
        watch: {
            loco() {
                this.recenter(this.loco.geo.lat, this.loco.geo.lng);
            }
        },
        components: {
            LMap, LTileLayer, LMarker, LTooltip,
        },
        data: function () {
            return {
                mapHeight: 100,
                index: null,
                bounds: {},
                center: latLng(59.24, 49.13),
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                //url:  "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
                attribution: '',//`Map data &#169; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
                mapOptions: {
                    zoomSnap: 0.5
                }
            };
        },
        methods: {
            recenter: function (lat, lng) {
                this.center=latLng(lat,lng);
            },
            setZoom: function (zoom) {
                this.zoom = zoom;
            },
            // onResize(){
            //     document.getElementById('map-card').style.height = window.innerHeight/2 - window.innerHeight%2 + 'px';
            // }
        }
    };
</script>
<style scoped>
    #map-card {
        width: inherit;
        z-index: 0;
        height: 369.8px;
    }
</style>