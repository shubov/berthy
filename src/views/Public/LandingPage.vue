<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in LandingPage.vue is proprietary and confidential.              -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row align="center" justify="center">
        <v-col cols="11" md="8">
            <h1 class="display-2 primary--text">Landing Page</h1>
            
            <p>The page is a landing page</p>
            
            <v-btn
                    to='/sign-in'
                    color="primary"
                    outlined
            >
                Sign In!
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "LandingPage"
    }
</script>

<style scoped>

</style>