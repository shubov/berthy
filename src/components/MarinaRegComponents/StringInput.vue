<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in StringInput.vue is proprietary and confidential.           -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-expansion-panel>
        <v-expansion-panel-header :disable-icon-rotate="valid != null">
            <template v-slot:default="{ open }">
                <v-row no-gutters>
                    <v-col cols="4">{{title}}</v-col>
                    <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                            <span v-if="open" key="0">{{caption}}</span>
                            <span v-else key="1">{{ model }}</span>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </template>
            <template v-if="valid != null" v-slot:actions>
                <v-icon v-if="valid" color="teal">{{icons.checkCircle}}</v-icon>
                <v-icon v-else color="warning">{{icons.alertCircle}}</v-icon>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-text-field
                    :prepend-icon="icon"
                    :value="model"
                    @input="model=$event"
                    :placeholder="placeholder"
            ></v-text-field>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import {mdiAlertCircle, mdiCheckCircle} from "@mdi/js";

    export default {
        name: "StringInput",
        props: {
            required: {
                type: Boolean,
                default: false
            },
            title: String,
            placeholder: String,
            caption: String,
            state: String,
            mutation: String,
            icon: String,
        },
        computed: {
            model: {
                get() {
                    return this.$store.state.Application[this.state];
                },
                set(value) {
                    this.$store.commit(this.mutation, value)
                }
            },
            valid(){
                return this.model
                    ? this.model.toString().length>0
                    : this.required ? false : null;
            }
        },
        data: function () {
            return {
                icons: {
                    checkCircle: mdiCheckCircle,
                    alertCircle: mdiAlertCircle,
                }
            }
        }
    }
</script>