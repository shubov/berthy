<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in LandingPage.vue is proprietary and confidential.              -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            fill-height
            :style="$store.state.bg"
            class="my-0"
    >
        <v-row align="center" justify="center">
            <v-col cols="11" md="6">
                <h1 class="display-3 font-weight-light white--text text-center mb-10">Book a docking spot</h1>
                <h1 class="text display-3 font-weight-light white--text text-center">Make your marina visible</h1>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "LandingPage"
    }
</script>

<style scoped>
    .text {
        align-items:center;
        background-color:rgb(174, 29, 0);
        border-radius:4px;
        border-color:rgb(174, 29, 0);
        box-sizing:border-box;
        padding: 8px 0 8px 0;
        color:rgb(255, 255, 255);
    }
</style>