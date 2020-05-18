<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Snackbar.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-snackbar
            v-model="snackbar"
            color="error"
            multi-line
            :timeout="6000"
            top
    >
        {{ this.$store.state.snackbarMessage }}
        <v-btn
                dark
                text
                @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar",
        computed:{
            snackbar:{
                get(){
                    return this.$store.state.snackbar;
                },
                set(value) {
                    this.$store.commit('SET_SNACKBAR', value);
                }
            }
        }
    }
</script>

<style scoped>

</style>