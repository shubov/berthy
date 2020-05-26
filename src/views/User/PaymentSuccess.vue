<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in PaymentSuccess.vue is proprietary and confidential.           -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" align="center">
                <v-icon x-large color="green">{{success}}</v-icon>
            </v-col>
            <v-col cols="12">
                <p class="display-1" align="center">
                    Payment was succesful. Yor reservation proccess is now finished.
                </p>
            </v-col>
            <v-col cols="12" align="center">
                <v-btn class="primary" to="/trips">My trips</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mdiCheckboxMarkedCircleOutline} from "@mdi/js";

    export default {
        name: "PaymentSuccess",
        data: function () {
            return {
                success: mdiCheckboxMarkedCircleOutline
            }
        }
    }
</script>