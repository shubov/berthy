<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Role.vue is proprietary and confidential.                     -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            fill-height
            class="py-2"
            :style="$store.state.bg"
    >
        <v-row align="center" justify="center" >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
                    class="px-2 py-0"
            >
                <v-card
                        tile
                        class="mx-auto elevation-4"
                        :min-width="304"
                        :max-width="400"
                >
                    <v-card-actions>
                        <v-row  align="center" justify="center" >
                            <v-col cols="10">
                                <v-toolbar-title class="font-weight-light">Choose your role</v-toolbar-title>
                            </v-col>
                            <v-col cols="10">
                                <v-btn
                                        to="/book"
                                        block
                                        large
                                        color="primary"
                                >Boater</v-btn>
                            </v-col>
                            <v-col cols="10">
                                <v-btn
                                        @click.stop="onDockmaster()"
                                        block
                                        outlined
                                        large
                                >Dockmaster</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import router from "../../router";

    export default {
        name: "Role",
        methods: {
            async onDockmaster() {
                let res = await this.$store.dispatch('Marina/fetchMyMarinas');
                if (res) {
                    if (this.$store.getters['Marina/getNumOfMarinas']) {
                        router.push('/dashboard');
                    } else {
                        router.push('/marina-registration');
                    }
                } else {
                    this.$store.dispatch("snackbar", this.$store.state.Marina.message);
                }
            }
        },
    }
</script>

<style scoped>

</style>