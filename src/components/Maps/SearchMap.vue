<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SearchMap.vue is proprietary and confidential.                -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <l-map
            ref="map"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: inherit; z-index: 0"
    >
        <l-tile-layer
                :url="url"
                :attribution="attribution"
        />
        <l-circle-marker
                v-if="geolocationlat && geolocationlng"
                :lat-lng="[geolocationlat,geolocationlng]"
                :radius="6"
                color="#ae1d00"
        />
        <l-circle
                ref="circle"
                v-if="geolocationlat && geolocationlng"
                :lat-lng="[geolocationlat,geolocationlng]"
                :radius="(radius ? radius : 100) * 1000"
                color="#ae1d00"
        />
        <l-marker
                v-if="geolocationlat && geolocationlng"
                :lat-lng="[geolocationlat,geolocationlng]"
                color="#ae1d00"
        />
    </l-map>
</template>

<script>
    //********LEAFLET**
    import 'leaflet/dist/leaflet.css';
    import {LMap, LTileLayer, LCircleMarker, LCircle, LMarker} from "vue2-leaflet";
    import {Icon,  latLng} from 'leaflet';
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    //***************

    export default {
        name: "SearchMap",
        components: {
            LMap, LTileLayer, LCircleMarker, LCircle, LMarker
        },
        props: [
            'geolocationlat',
            'geolocationlng',
            'radius',
        ],
        watch: {
            geolocationlat() {
                this.updateMap();
            },
            geolocationlng() {
                this.updateMap();
            },
            radius() {
                this.updateMap();
            }
        },
        data: function () {
            return {
                mapOptions: {
                    zoomSnap: 0.5,
                    boxZoom: true,
                    scrollWheelZoom: 'center',
                },
                center: latLng(50,13),
                zoom: 4.5,
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution: '',
            }
        },
        methods: {
            updateMap() {
                if (this.geolocationlat && this.geolocationlng)
                    this.center = latLng(this.geolocationlat,this.geolocationlng);
            }
        },
        mounted() {
            let map = this.$refs.map.mapObject;
            setTimeout(()=>{
                map.invalidateSize();
            }, 0);
        },
    }
</script>

<style scoped>

</style>