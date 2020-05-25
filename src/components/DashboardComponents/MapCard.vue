<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in MapCard.vue is proprietary and confidential.                  -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card
            id='map-card'
            style="height: inherit"
            :options="{dragging: dragging}"
    >
        <l-map
                ref="map"
                :center="location"
                :zoom="4"
                style="height: inherit; z-index: 0"
        >
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"
            />
            <l-marker
                    v-if="location"
                    :lat-lng="location"
            >
                <l-tooltip>{{latitude}}; {{longitude}}</l-tooltip>
            </l-marker>
        </l-map>
    </v-card>
</template>

<script>
    //LEAFLET********
    import 'leaflet/dist/leaflet.css';
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
        props: ['latitude', 'longitude', 'dragging'],
        components: {
            LMap, LTileLayer, LMarker, LTooltip,
        },
        computed: {
            location() {
                return latLng(this.latitude, this.longitude);
            },
        },
        data: function () {
            return {
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution: '',
            };
        },
        mounted() {
            this.map = this.$refs.map.mapObject;
            setTimeout(()=>{
                this.map.invalidateSize();
            }, 0);
        }
    };
</script>
<style scoped>
    #map-card {
        width: inherit;
        z-index: 0;
    }
</style>