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
        <v-navigation-drawer id="left"
                             v-if="!isMobile"
                             app clipped permanent
                             :value="true"
        >
            <SearchCard @new-ship="dialogShip=true"></SearchCard>
        </v-navigation-drawer>
        <v-dialog
                v-else
                v-model="dialogSearch"
        >
            <SearchCard @new-ship="dialogShip=true"></SearchCard>
        </v-dialog>
    
        <SearchMap id="map"
                   @toggle-search="dialogSearch=!dialogSearch"
                   @toggle-list="dialogList=!dialogList"
        ></SearchMap>
        
        <v-navigation-drawer id="right"
                             v-if="!isMobile"
                             permanent app clipped right
                             :value="true">
            <SearchListCard></SearchListCard>
        </v-navigation-drawer>
        <v-dialog
                v-else
                v-model="dialogList"
        >
            <SearchListCard></SearchListCard>
        </v-dialog>
        
        <v-dialog v-model="dialogShip" max-width="800px">
            <ShipForm></ShipForm>
        </v-dialog>
    
        <v-bottom-sheet v-model="bottomSheet">
            <v-sheet class="text-center">
                <SearchMarinaCard></SearchMarinaCard>
            </v-sheet>
        </v-bottom-sheet>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Book",
        components: {
            SearchMarinaCard: () => import("../../components/Cards/SearchMarinaCard"),
            ShipForm: () => import("../../components/Forms/ShipForm"),
            SearchListCard: () => import("../../components/Cards/SearchListCard"),
            SearchCard: () => import("../../components/Cards/SearchCard"),
            SearchMap: () => import("../../components/Maps/SearchMap"),
        },
        watch: {
            getSelected(value) {
                if (value != null && this.isMobile)
                    this.bottomSheet =true;
            }
        },
        computed: {
            ...mapGetters('Reservation', {
                getSelected: 'getSelectedIndex',
            }),
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
        },
        data: function () {
            return {
                dialogSearch: false,
                dialogList: false,
                dialogShip: false,
                bottomSheet: false,
            }
        },
        methods: {
            updateHeight() {
                let h = window.innerHeight;
                document.getElementById('map').style.height = (h-84) + 'px';
            },
            
        },
    };
</script>
<style>
    .menu__content {
        z-index: 999
    }
</style>