<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Map.vue is proprietary and confidential.                      -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <l-map
            ref="map"
            :zoom="zoom"
            :center="position"
            :options="mapOptions"
            style="height: 911px"
    >
        <l-tile-layer
                :url="url"
                :attribution="attribution"
        />
        <l-marker
                :lat-lng="[lat, lng]"
        ></l-marker>
    </l-map>
</template>

<script>
    //********LEAFLET**
    import 'leaflet/dist/leaflet.css';
    import {LMap, LTileLayer, LMarker} from "vue2-leaflet";
    import {Icon} from 'leaflet';
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
            LMap, LTileLayer, LMarker
        },
        props: {
            position: Object,
        },
        data: () => ({
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            mapOptions: {
                zoomSnap: 0.5,
                boxZoom: false,
                scrollWheelZoom: 'center',
            },
            lat: 0,
            lng: 0,
            zoom: 4.5,
            bounds: {},
            attribution: '',//`Map data &#169; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
        }),
        mounted() {
            let map = this.$refs.map.mapObject;
            this.$nextTick(() => {
                map.invalidateSize();
            });
            map.on('move', () => {
                let center = map.getCenter();
                this.lat = center.lat;
                this.lng = center.lng;
            });
            map.on('moveend', () => {
                let center = map.getCenter();
                this.$emit('update:position', center);
            });
        },
    }
</script>

<style scoped>

</style>