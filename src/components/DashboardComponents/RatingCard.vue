<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in RatingCard.vue is proprietary and confidential.               -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container>
        <v-card-subtitle class="text-center py-0">Rating</v-card-subtitle>
        <v-card-text class="text-center display-1 font-weight-black">{{getTotalRating}}</v-card-text>
        <v-card-text class="text-center py-0">
            <v-rating
                    size="45px"
                    :value="getTotalRating"
                    color="yellow accent-4"
                    half-increments
                    readonly
            ></v-rating>
        </v-card-text>
        <v-card-text :class="'text-center '+getRatingTrend+'--text'">
            Last 30 days: <span>{{getLastMonthRating}}</span>
            <v-icon small>{{getRatingTrend==='green'? icons.trendingUp : icons.trendingDown}}</v-icon>
        </v-card-text>
    </v-container>
</template>

<script>
    import {mdiTrendingDown, mdiTrendingUp} from "@mdi/js";

    export default {
        name: "RatingCard",
        props: ['getTotalRating', 'getRatingTrend', 'getLastMonthRating'],
        data: function () {
            return {
                icons: {
                    trendingUp: mdiTrendingUp,
                    trendingDown: mdiTrendingDown,
                },
            }
        }
    }
</script>

<style scoped>

</style>