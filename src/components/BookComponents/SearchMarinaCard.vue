<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SearchMarinaCard.vue is proprietary and confidential.         -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card
            :class="'pa-2 '+(elevation ? 'elevation-1' : 'elevation-0')"
            :max-width="!isMobile?'350px':''"
    >
        <v-img
                :src="marina.photos.length ? toLink(marina.photos[0].fileLink): marinaImg"
                :lazy-src="marinaLazy"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
        >
            <v-card-title>{{marina.name}}</v-card-title>
        </v-img>
        <v-card-actions>
            <v-btn
                    color="primary"
                    :to="`/marina/${marina.id}`"
                    target="_blank"
            >
                <v-icon>{{icons.calendarCheck}}</v-icon>
                Reserve
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { photoLink } from "../../assets/helperFunctions";
    import {mapGetters} from "vuex";
    import {mdiCalendarCheck} from "@mdi/js";

    export default {
        name: "SearchMarinaCard",
        props: {
            elevation: {
                type: Boolean,
                default: false,
            }
        },
        data: function () {
            return {
                marinaImg: require("../../assets/marina.jpg"),
                marinaLazy: require("../../assets/marina.webp"),
                icons:{calendarCheck: mdiCalendarCheck},
            }
        },
        computed: {
            ...mapGetters('Reservation', {
                marinas: 'getFilteredMarinas',
                getSelected: 'getSelectedIndex',
            }),
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
            marina() {
                return this.marinas[this.getSelected];
            },
        },
        methods: {
            toLink(link) {
                return photoLink(link);
            },
        }
    }
</script>