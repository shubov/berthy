<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Book.vue is proprietary and confidential.                      -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container fluid v-resize="updateHeight" class="pa-0">
        <SearchMap id="map"></SearchMap>
        <v-navigation-drawer id="left" permanent app clipped :value="true">
    
        </v-navigation-drawer>
    
        <v-navigation-drawer id="right" permanent app clipped right :value="true">
    
        </v-navigation-drawer>
    </v-container>
</template>

<script>
    import SearchMap from "../../components/Maps/SearchMap";

    export default {
        name: "Book",
        components: {
            SearchMap,
        },
        data: function () {
            return {}
        },
        methods: {
            updateHeight() {
                let h = window.innerHeight;
                let w = window.innerWidth;
                let left_w =document.getElementById('left').style.width;
                let right_w =document.getElementById('right').style.width;
                document.getElementById('map').style.height = (h-84) + 'px';
                document.getElementById('map').style.width = (w-left_w-right_w) + 'px';
            },
        }
    };
</script>