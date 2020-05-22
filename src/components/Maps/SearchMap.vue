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
            :zoom="getMap.zoom"
            :center.sync="center"
            :options="getMap.mapOptions"
            style="height: inherit; z-index: 0"
    >
        <l-tile-layer
                :url="getMap.url"
                :attribution="getMap.attribution"
        />
        <l-control-scale position="topright" :imperial="true"></l-control-scale>
        <l-control position="bottomleft">
            <v-btn large icon
                   v-if="isMobile"
                   @click.stop="$emit('toggle-search')"
            ><v-icon>mdi-magnify</v-icon></v-btn>
        </l-control>
        <l-control position="bottomright">
            <v-btn large icon
                   v-if="isMobile"
                   @click.stop="$emit('toggle-list')"
            ><v-icon>mdi-sort-variant</v-icon></v-btn>
        </l-control>
        <l-control position="topright">
            <v-btn large icon color="info" class="pulsation"
                   v-if="isGeoOn"
                   @click.stop="stopWatching"
            ><v-icon>mdi-compass</v-icon></v-btn>
            <v-btn large icon
                   v-else
                   @click.stop="watchGeolocation"
            ><v-icon>mdi-compass-outline</v-icon></v-btn>
        </l-control>
        <l-control
                v-if="selected != null && !isMobile"
                position="bottomright"
        >
            <SearchMarinaCard></SearchMarinaCard>
        </l-control>
        <l-circle-marker
                v-if="isGeoAvailable"
                :lat-lng="geolocation"
        />
        <l-marker ref="marker"
                v-for="(marina, index) in marinas"
                :key="marina.name+index"
                :lat-lng="[marina.lat, marina.lng]"
                @click="selected=index"
                :icon="selectionIcon"
        >
            <l-tooltip>{{marina.name}}</l-tooltip>
        </l-marker>
    </l-map>
</template>

<script>
    //********LEAFLET**
    import 'leaflet/dist/leaflet.css';
    import {LMap, LTileLayer, LCircleMarker, LMarker, LControl, LControlScale, LTooltip} from "vue2-leaflet";
    import {Icon} from 'leaflet';
    import {mapActions, mapGetters} from "vuex";
    import SearchMarinaCard from "../Cards/SearchMarinaCard";
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
            SearchMarinaCard,
            LMap, LTileLayer, LCircleMarker, LMarker,  LControl, LControlScale, LTooltip
        },
        computed: {
            ...mapGetters('Reservation', {
                isGeoOn: 'isGeolocationEnabled',
                isGeoAvailable: 'isGeoAvailable',
                geolocation: 'getGeolocation',
                getMap: 'getMap',
                getMapCenter: 'getMapCenter',
                marinas: 'getFilteredMarinas',
                getSelected: 'getSelectedIndex',
            }),
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
            center: {
                get() {
                    return this.getMapCenter;
                },
                async set(value) {
                    this.$store.commit("Reservation/UPDATE_MAP_CENTER", value);
                    let mapBoundNorthEast = this.map.getBounds().getNorthEast();
                    let mapDistance = mapBoundNorthEast.distanceTo(value);
                    this.$store.commit("Reservation/UPDATE_RADIUS", mapDistance/1000);
                    this.updateSearch();
                }
            },
            selected: {
                get() {
                    return this.getSelected;
                },
                set(index) {
                    this.$store.commit('Reservation/SELECT_MARINA', index);
                }
            }
        },
        data: function () {
            return {
                map: null,
                selectionIcon: null,
            }
        },
        methods: {
            ...mapActions('Reservation', {
                stopWatching: 'stopWatching',
                watchGeolocation: 'watchGeolocation',
                updateSearch: 'updateSearch',
            }),
        },
        mounted() {
            this.map = this.$refs.map.mapObject;
            setTimeout(()=>{
                this.map.invalidateSize();
            }, 0);
        },
        beforeDestroy() {
            this.stopWatching();
        },
    }
</script>

<style scoped>
    .pulsation {
        animation: animate 3s linear infinite;
    }
    @keyframes animate {
        0% {
            box-shadow: inset 0 0 0 10px rgba(33, 150, 243, 0.7);
        }
        40% {
            box-shadow: inset 0 0 0 5px rgba(33, 150, 243, 0.4);
        }
        80% {
            box-shadow: inset 0 0 0 0 rgba(33, 150, 243, 0);
        }
        100% {
            box-shadow: inset 0 0 0 0 rgba(33, 150, 243, 0);
        }
    }
    /*.selection {*/
    /*    animation: jump 1.2s infinite;*/
    /*}*/
    /*@keyframes jump {*/
    /*    0% { transform: translate(-50%, -50%) scale(1.25, 0.75); }*/
    /*    50% { transform: translate(-50%, -150%) scale(1, 1); }*/
    /*    55% { transform: translate(-50%, -150%) rotate(15deg); }*/
    /*    60% { transform: translate(-50%, -150%) rotate(-15deg); }*/
    /*    65% { transform: translate(-50%, -150%) rotate(15deg); }*/
    /*    70% { transform: translate(-50%, -150%) rotate(-15deg); }*/
    /*    100% { transform: translate(-50%, -50%) scale(1.25, 0.75); }*/
    /*}*/
</style>