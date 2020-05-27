<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in ModeratorFilter.vue is proprietary and confidential.          -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card>
        <v-card-title>Filter</v-card-title>
        <v-card-text>
            <v-list>
                <v-subheader>Status</v-subheader>
                <v-item-group v-model="status" >
                    <v-item
                            v-for="status in statuses"
                            :key="status"
                    >
                        <v-chip
                                slot-scope="{active,toggle}"
                                :input-value="active"
                                @click="toggle"
                                :color="active ? 'primary' : ''"
                                :text-color="active ? 'white' : ''"
                                class="mb-1 mr-1"
                        >
                            {{status}}
                        </v-chip>
                    </v-item>
                </v-item-group>
            </v-list>
            
            <v-subheader>
                Only my
            </v-subheader>
            <v-checkbox
                    class="mt-0"
                    v-model="onlyMy"
                    label="Only my applications"
            ></v-checkbox>
            
            <v-subheader>
                Date Range
            </v-subheader>
            <v-menu>
                <template v-slot:activator="{on}">
                    <v-text-field
                            v-model="dateRangeText"
                            label="Date range"
                            :prepend-icon="icons.calendar"
                            readonly
                            v-on="on"
                    >
                    </v-text-field>
                </template>
                <v-date-picker
                        v-model="dates"
                        range
                        no-title
                        scrollable
                ></v-date-picker>
            </v-menu>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="$emit('close-filter')">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="onDefaultFilter">Default</v-btn>
            <v-btn class="primary"  @click="saveFilter">Filter</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mdiCalendar} from "@mdi/js";

    export default {
        name: "ModeratorFilter",
        computed: {
            dateRangeText () {
                return this.dates.join(' ~ ')
            },
        },
        data: function () {
            return {
                statuses: ["NEW", "IN_PROGRESS", 'REJECTED', 'APPROVED'],
                onlyMy: null,
                status: null,
                dateFrom: null,
                dateTo: null,
                dates: [],
                icons: {
                    calendar: mdiCalendar,
                }
            }
        },
        methods: {
            onDefaultFilter() {
                this.$store.commit('Moderator/UPDATE_FILTER', {
                    onlyMy: null,
                    status: null,
                    dateFrom: null,
                    dateTo: null
                });
                this.$emit('save-filter');
            },
            saveFilter() {
                if (this.dates.length === 2) {
                    if (this.dates[0]<this.dates[1]) {
                        this.dateFrom = (new Date(this.dates[0])).toISOString();
                        this.dateTo = (new Date(this.dates[1])).toISOString();
                    } else {
                        this.dateFrom = (new Date(this.dates[1])).toISOString();
                        this.dateTo = (new Date(this.dates[0])).toISOString();
                    }
                }
                this.$store.commit('Moderator/UPDATE_FILTER', {
                    onlyMy: this.onlyMy,
                    status: this.status ? this.statuses[this.status] : null,
                    dateFrom: this.dateFrom,
                    dateTo: this.dateTo
                });
                this.$emit('save-filter');
            }
        },
    }
</script>

<style scoped>

</style>