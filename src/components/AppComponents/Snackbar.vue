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
            v-model="status"
            :color="$store.state.Snackbar.color"
            :multi-line="!isMobile"
            :timeout="6000"
            :vertical="isMobile"
            top
    >
        <p>{{ $store.state.Snackbar.message }}</p>
        <v-btn
                dark
                text
                @click="onClose"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar",
        computed:{
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
            status:{
                get(){
                    return this.$store.state.Snackbar.status;
                },
                set(value) {
                    this.$store.commit('Snackbar/SET_SNACKBAR', value);
                }
            },
        },
        methods: {
            playSound() {
                let src = require("../../assets/notification.mp3");
                (new Audio(src)).play();
            },
            onClose() {
                this.status = false;
                this.playSound();
            }
        }
    }
</script>

<style scoped>

</style>