<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in PlaceEditCard.vue is proprietary and confidential.            -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
        <v-row align="baseline" justify="center">
            <v-col cols="12" sm="9">
                <v-card
                        dense
                        class="mb-5"
                        v-for="(place, index) in model"
                        :key="index">
                    <v-toolbar dark flat tile color="#0000004d">
                        <v-row class="mt-4" align="center" justify="start">
                            <v-col>
                                <v-text-field
                                        dense
                                        v-model="place.name"
                                        label="Name"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                        dense
                                        v-model="place.price"
                                        prefix="$"
                                        type="number"
                                        label="Price"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-spacer></v-spacer>
                        <v-btn icon dark @click.stop="onRemove(index)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-row justify="center">
                        <v-col cols="11" class="pb-0">
                            <v-row>
                                <v-col cols="12" md="4" class="pb-0">
                                    <v-text-field
                                            v-model="place.length"
                                            suffix="meters"
                                            type="number"
                                            label="Length"
                                            outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" class="pb-0">
                                    <v-text-field
                                            
                                            v-model="place.draft"
                                            suffix="meters"
                                            type="number"
                                            label="Draft"
                                            outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" class="pb-0">
                                    <v-text-field
                                            v-model="place.width"
                                            suffix="meters"
                                            type="number"
                                            label="Width"
                                            outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
</template>

<script>
    export default {
        name: "PlaceEditCard",
        props: {
            state: String,
            mutation: String,
            removeMutation: String
        },
        computed: {
            model: {
                get() {
                    return this.$store.state.Application[this.state];
                },
                set(value) {
                    this.$store.commit(this.mutation, value)
                }
            }
        },
        methods: {
            onRemove(index){
                this.$store.commit(this.removeMutation, index);
            },
        }
    }
</script>

<style scoped>

</style>