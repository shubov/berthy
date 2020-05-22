<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SearchMarinaCard.vue is proprietary and confidential.         -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-1" :max-width="!isMobile?'350px':''">
        <v-img
                :src="marina.photos.length ? toLink(marina.photos[0].fileLink): marinaImg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
        >
            <v-card-title>{{marina.name}}</v-card-title>
        </v-img>
        <v-card-actions>
            <v-btn
                    class="primary"
                    :to="`/marina/${marina.id}`"
                    target="_blank"
            >More Info</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {photoLink} from "../../assets/helperFunctions";
    import {mapGetters} from "vuex";

    export default {
        name: "SearchMarinaCard",
        data: function () {
            return {
                marinaImg: require("../../assets/marina.jpg"),
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