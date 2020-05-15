<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in PublicMarinaMap.vue is proprietary and confidential.          -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <l-map
            ref="map"
            :center="position"
            :zoom="4.5"
            :options="mapOptions"
            style="height: inherit"
    >
        <l-tile-layer
                :url="url"
                :attribution="attribution"
        />
        <l-marker
                :lat-lng="position"
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
        name: "PublicMarinaMap",
        props: ['position'],
        components: {
            LMap, LTileLayer, LMarker
        },
        data: function () {
            return{
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution: '',
                mapOptions: {
                    zoomSnap: 0.5,
                    boxZoom: false,
                    scrollWheelZoom: 'center',
                },
            }
        },
        mounted() {
            let map = this.$refs.map.mapObject;
            this.$nextTick(() => {
                map.invalidateSize();
            });
        }
    }
</script>

<style scoped>

</style>