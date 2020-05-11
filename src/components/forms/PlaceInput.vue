<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in PlaceInput.vue is proprietary and confidential.               -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->
<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <template v-slot:default="{open}">
                <v-row no-gutters>
                    <v-col cols="4">{{title}}</v-col>
                    <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                            <span v-if="open" key="0">{{caption}}</span>
                            <span v-else key="1">{{ model.length }}</span>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                            v-model="defaultLength"
                            placeholder="0.0"
                            suffix="meters"
                            type="number"
                            label="Default length"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                            v-model="defaultWidth"
                            placeholder="0.0"
                            suffix="meters"
                            type="number"
                            label="Default width"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                            v-model="defaultDraft"
                            placeholder="0.0"
                            suffix="meters"
                            type="number"
                            label="Default draft"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                            prepend-inner-icon="mdi-cash-100"
                            v-model="defaultPrice"
                            placeholder="0"
                            prefix="$"
                            type="number"
                            label="Default Price"
                            hint="Default price will be applied if no price specified"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                            prepend-inner-icon="mdi-counter"
                            v-model="number"
                            :placeholder="model.length.toString()"
                            label="Number of places"
                            type="number"
                            hint="Number of docking spots in your marina"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn
                            v-if="!readyToGenerateSpots"
                            color="primary"
                            block
                            x-large
                            disabled
                    >Edit spots</v-btn>
                    <v-dialog v-else v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    color="primary"
                                    dark
                                    v-on="on"
                                    block
                                    x-large
                                    @click.stop="onEditSpots"
                            >Edit spots</v-btn>
                        </template>
                        <v-card>
                            <v-toolbar id="toolbar" dark color="primary">
                                <v-btn icon dark @click="closeDialog">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-toolbar-title>Docking spots</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn dark text @click="closeDialog">Save</v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            <PlaceEditCard
                                    mutation="Application/EDIT_PLACES"
                                    remove-mutation="Application/REMOVE_PLACE"
                                    state="places"
                            ></PlaceEditCard>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import PlaceEditCard from "../Cards/PlaceEditCard";
    export default {
        name: "PlaceInput",
        components: {PlaceEditCard},
        props: {
            title: String,
            placeholder: String,
            caption: String,
            state: String,
            mutation: String,
            removeMutation: String
        },
        computed: {
            readyToGenerateSpots() {
                return !!this.number;
            },
            model: {
                get() {
                    return this.$store.state.Application[this.state];
                },
                set(value) {
                    this.$store.commit(this.mutation, value)
                }
            }
        },
        data: ()=> ({
            dialog: false,
            defaultPrice: null,
            number: null,
            defaultLength: null,
            defaultWidth: null,
            defaultDraft: null,
        }),
        methods: {
            closeDialog() {
                this.dialog=false;
                this.number=this.model.length;
            },
            onEditSpots() {
                let spots=[];
                let p = this.defaultPrice ? this.defaultPrice : 0;
                let l = this.defaultLength ? this.defaultLength : 0;
                let w = this.defaultWidth ? this.defaultWidth : 0;
                let d = this.defaultDraft ? this.defaultDraft : 0;
                for (let i = 0; i < this.number; i++) {
                    spots.push({
                        name: i,
                        length: l,
                        draft: d,
                        width: w,
                        price: p,
                        xCoord: 0,
                        yCoord: 0,
                        rotate: 0,
                        color: 'green'
                    });
                }
                this.model = spots;
            }
        }
    }
</script>