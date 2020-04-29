<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Role.vue is proprietary and confidential.                     -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row>
        <v-col>
            <v-card class="elevation-4">
                <v-toolbar
                        color="grey darken-2"
                        dark
                        flat
                >
                    <v-toolbar-title class="font-weight-light">Choose your role</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-actions class="pt-0 mt-0">
                    <v-row>
                        <v-col cols="12">
                            <v-btn
                                    to="/book"
                                    block
                                    large
                                    color="primary"
                            >Boater</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-btn
                                    @click="onDockmaster()"
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
</template>

<script>
    import BerthyAPI from "../services/berthy-api";
    import router from "../router";

    export default {
        name: "Role",
        methods: {
            async onDockmaster() {
                console.log("e");
                try{
                    let response = await BerthyAPI.get('getMarinas');
                    if (response.data.success) {
                        if(response.data.data.marinas.length === 0) {
                            router.push('/marina');
                        } else {
                            router.push('/dashboard');
                        }
                    }
                } catch (e) {
                    console.log(e);
                    router.push('/marina');
                }
            }
        }
    }
</script>

<style scoped>

</style>