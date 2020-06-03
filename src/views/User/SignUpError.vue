<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SignUpError.vue is proprietary and confidential.              -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 6 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" align="center">
                <v-icon x-large color="primary">{{failure}}</v-icon>
            </v-col>
            <v-col cols="12">
                <p class="display-1" align="center">
                    Something went wrong during your account confirmation. Try signing up again.
                </p>
            </v-col>
            <v-col cols="12" align="center">
                <v-btn to="/sign-up" class="primary">Sign Up</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mdiAlertOctagonOutline} from "@mdi/js";
    export default {
        name: "SignUpError",
        data: function () {
            return {
                failure: mdiAlertOctagonOutline
            }
        }
    }
</script>

<style scoped>

</style>