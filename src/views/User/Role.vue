<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Role.vue is proprietary and confidential.                     -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row  align="center" justify="center" >
        <v-col>
            <v-card tile class="mx-auto elevation-4" min-width="400px" style="width: 400px">
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
</template>

<script>
    import router from "../../router";

    export default {
        name: "Role",
        methods: {
            async onDockmaster() {
                if (await this.$store.dispatch('Marina/fetchMyMarinas')) {
                    if (this.$store.state.Marina.numOfMarinas === 0) {
                        router.push('/marina-registration');
                    } else {
                        router.push('/dashboard');
                    }
                } else {
                    router.push('/marina/9');
                }
            }
        }
    }
</script>

<style scoped>

</style>