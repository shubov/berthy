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
        
        <v-dialog v-model="dialogShip"
                  :fullscreen="isMobile"
        >
            <v-toolbar color="primary" dark>
                <v-toolbar-title>Add your boat</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogShip=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <ShipForm></ShipForm>
        </v-dialog>
    
        <v-bottom-sheet
                v-if="getSelected !=null"
                v-model="bottomSheet"
        >
            <v-sheet class="text-center px-3 pt-3" tile>
                <SearchMarinaCard></SearchMarinaCard>
            </v-sheet>
        </v-bottom-sheet>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";
    import SearchMap from "../../components/BookComponents/SearchMap";

    export default {
        name: "Book",
        components: {
            SearchMap,
            SearchMarinaCard: () => import("../../components/BookComponents/SearchMarinaCard"),
            ShipForm: () => import("../../components/BookComponents/ShipForm"),
            SearchListCard: () => import("../../components/BookComponents/SearchListCard"),
            SearchCard: () => import("../../components/BookComponents/SearchCard"),
        },
        watch: {
            getSelected(value) {
                if (value != null && this.isMobile)
                    this.bottomSheetFlag = true;
            }
        },
        computed: {
            ...mapGetters('Reservation', {
                getSelected: 'getSelectedIndex',
            }),
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
            bottomSheet: {
                get() {
                    return this.bottomSheetFlag;
                },
                set(value) {
                    if (!value) this.$store.commit('Reservation/SELECT_MARINA', null)
                    this.bottomSheetFlag = value;
                }
            }
        },
        data: function () {
            return {
                dialogSearch: false,
                dialogList: false,
                dialogShip: false,
                bottomSheetFlag: false,
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