<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SelectAmenities.vue is proprietary and confidential.          -
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
                            <span v-else key="1">{{ model.length }} / {{amenities.length}} amenities selected</span>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </template>
            <template v-if="valid != null" v-slot:actions>
                <v-icon v-if="valid" color="teal">mdi-check-circle</v-icon>
                <v-icon v-else color="warning">mdi-alert-circle</v-icon>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row no-gutters>
                <v-col>
                    <v-autocomplete
                            v-model="model"
                            :items="amenities"
                            chips
                            item-text="value"
                            item-value="key"
                            multiple
                            :placeholder="placeholder"
                    >
                        <template v-slot:selection="data">
                            <v-chip
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    close
                                    :key="data.index"
                                    @click="data.select"
                                    @click:close="remove(data.index)"
                            >
                                <v-avatar left>
                                    <v-icon>{{data.item.icon}}</v-icon>
                                </v-avatar>
                                {{ data.item.value }}
                            </v-chip>
                        </template>
                        <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                                <v-list-item-icon>
                                    <v-icon>{{data.item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-html="data.item.value"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "SelectAmenities",
        props: {
            required: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                required: true,
            },
            caption: {
                type: String,
                required: true,
            },
            module: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            removeMutation: {
                type: String,
                required: true,
            },
            mutation: {
                type: String,
                required: true,
            },
            getter: {
                type: String,
                required: true,
            },
            getAmenitiesAction: {
                type: String,
                required: true,
            },
        },
        async mounted() {
            await this.$store.dispatch(this.getAmenitiesAction);
            this.valid = this.model.length === 0 ? null : true;
        },
        computed: {
            amenities() {
                return this.$store.getters[this.getter];
            },
            model: {
                get() {
                    return this.$store.state[this.module][this.state];
                },
                set(value) {
                    this.valid = value.length === 0 ? null : true;
                    this.$store.commit(this.mutation, value);
                }
            }
        },
        data: () => ({
            valid: null,
        }),
        methods: {
            remove (index) {
                this.$store.commit(this.removeMutation, index);
            },
        },
    }
</script>