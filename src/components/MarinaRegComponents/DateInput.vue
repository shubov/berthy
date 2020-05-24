<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in DateInput.vue is proprietary and confidential.                -
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
                            <span v-if="open">{{caption}}</span>
                            <v-row v-else no-gutters style="width: 100%">
                                <v-col cols="6">Start date: {{ start || 'Not set' }}</v-col>
                                <v-col cols="6">End date: {{ end || 'Not set' }}</v-col>
                            </v-row>
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
            <v-row
                    justify="space-around"
                    no-gutters
            >
                <v-col cols="3">
                    <v-menu
                            ref="startMenu"
                            :close-on-content-click="false"
                            :return-value.sync="start"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="start"
                                    label="Start date"
                                    :prepend-icon="icons.calendar"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.startMenu.isActive = false"
                            >Cancel</v-btn>
                            <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.startMenu.save(date)"
                            >OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
        
                <v-col cols="3">
                    <v-menu
                            ref="endMenu"
                            :close-on-content-click="false"
                            :return-value.sync="end"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="end"
                                    label="End date"
                                    :prepend-icon="icons.calendar"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.endMenu.isActive = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.endMenu.save(date)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import {mdiAlertCircle, mdiCalendar, mdiCheckCircle} from "@mdi/js";

    export default {
        name: "DateInput",
        props: {
            title: String,
            placeholder: String,
            caption: String,
            required: {
                type: Boolean,
                default: false
            },
            icons: {
                checkCircle: mdiCheckCircle,
                alertCircle: mdiAlertCircle,
            }
        },
        computed: {
            start: {
                get() {
                    return this.$store.state.Application['startOfSeason'];
                },
                set(value) {
                    this.$store.commit('Application/EDIT_START_OF_SEASON', value)
                }
            },
            end: {
                get() {
                    return this.$store.state.Application['endOfSeason'];
                },
                set(value) {
                    this.$store.commit('Application/EDIT_END_OF_SEASON', value)
                }
            },
            valid() {
                return (!!this.start && !!this.end) ? this.start < this.end : null;
            }
        },
        data: () => ({
            date: null,
            icons: {
                calendar: mdiCalendar,
            }
        }),
    }
</script>