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
        <v-expansion-panel-header :disable-icon-rotate="valid != null">
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
            <template v-if="valid != null" v-slot:actions>
                <v-icon v-if="valid" color="teal">{{icons.checkCircle}}</v-icon>
                <v-icon v-else color="warning">{{icons.alertCircle}}</v-icon>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-form ref="form">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                                :value="defaultLength"
                                @input="defaultLength=$event"
                                :suffix="sizeSuffix"
                                type="number"
                                :rules="rules.rulesLength"
                                label="Default length"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                                :value="defaultWidth"
                                @input="defaultWidth=$event"
                                :suffix="sizeSuffix"
                                :rules="rules.rulesWidth"
                                type="number"
                                label="Default width"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                                :value="defaultDraft"
                                @input="defaultDraft=$event"
                                :suffix="sizeSuffix"
                                :rules="rules.rulesDraft"
                                type="number"
                                label="Default draft"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                                :value="defaultPrice"
                                @input="defaultPrice=$event"
                                :prepend-inner-icon="icons.cash100"
                                :prefix="currency"
                                :rules="rules.rulesPrice"
                                type="number"
                                label="Default Price"
                                hint="Default price will be applied if no price specified"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                                :value="number"
                                @input="number=$event"
                                :prepend-inner-icon="icons.counter"
                                :rules="rules.rulesNumber"
                                label="Number of places"
                                type="number"
                                hint="Number of docking spots in your marina"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-btn
                                id="editSpotsBtn"
                                block
                                x-large
                                color="primary"
                                :loading="dialogLoading"
                                :light="!btnActive"
                                :disabled="!btnActive"
                                @click="onEditSpots()"
                        >Edit spots{{model.length===0 ? '':'('+model.length+')'}}</v-btn>
                        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card>
                                <v-toolbar id="toolbar" dark color="primary">
                                    <v-btn icon dark @click="closeDialog">
                                        <v-icon>{{icons.close}}</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>Docking spots</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-btn
                                                text
                                                class="white--text"
                                                @click="$refs.dialog.addPlace()"
                                        >
                                            App spot
                                            <v-icon right dark>{{icons.plusCircle}}</v-icon>
                                        </v-btn>
                                        <v-btn dark text @click.stop="onSave()">Save</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <PlaceEditCard
                                        ref="dialog"
                                        :suffix="sizeSuffix"
                                        :currency="currency"
                                        add-mutation="Application/ADD_PLACE"
                                        edit-mutation="Application/EDIT_PLACE"
                                        remove-mutation="Application/REMOVE_PLACE"
                                        state="places"
                                ></PlaceEditCard>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-form>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import {mdiAlertCircle, mdiCash100, mdiCheckCircle, mdiClose, mdiCounter, mdiPlusCircle} from "@mdi/js";

    export default {
        name: "PlaceInput",
        components: {
            PlaceEditCard: ()=> import("./PlaceEditCard"),
        },
        props: {
            title: String,
            placeholder: String,
            caption: String,
            state: String,
            mutation: String,
            removeMutation: String,
            required: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            sizeSuffix () {
                if (this.localization ==='EU') {
                    return 'm';
                }
                if (this.localization ==='US') {
                    return 'ft';
                }
                return 'm';
            },
            currency(){
                if (this.localization ==='EU') {
                    return '€';
                }
                if (this.localization ==='US') {
                    return '$';
                }
                return '€';
            },
            btnActive() {
                return this.defaultsUpdated || !this.noPlaces;
            },
            noPlaces() {
                return this.model.length === 0;
            },
            defaultsUpdated() {
                return this.$store.getters['Application/getDefaultsUpdated'];
            },
            model: {
                get() {
                    return this.$store.state.Application[this.state];
                },
                set(value) {
                    this.$store.commit(this.mutation, value)
                }
            },
            defaultPrice: {
                get() {
                    return this.$store.state.Application.defaults.defaultPrice;
                },
                set(value) {
                    this.$store.commit('Application/UPDATE_PRICE', value);
                }
            },
            defaultLength: {
                get() {
                    return this.$store.state.Application.defaults.defaultLength;
                },
                set(value) {
                    this.$store.commit('Application/UPDATE_LENGTH', value);
                }
            },
            defaultWidth: {
                get() {
                    return this.$store.state.Application.defaults.defaultWidth;
                },
                set(value) {
                    this.$store.commit('Application/UPDATE_WIDTH', value);
                }
            },
            defaultDraft: {
                get() {
                    return this.$store.state.Application.defaults.defaultDraft;
                },
                set(value) {
                    this.$store.commit('Application/UPDATE_DRAFT', value);
                }
            },
            number: {
                get() {
                    return this.$store.state.Application.defaults.number;
                },
                set(value) {
                    this.$store.commit('Application/UPDATE_NUMBER', value);
                }
            },
            localization: {
                get() {
                    return this.$store.state.Application.defaults.localization;
                },
                set(value) {
                    this.$store.commit('Application/UPDATE_LOCALIZATION', value);
                }
            },
        },
        data: ()=> ({
            icons: {
                checkCircle: mdiCheckCircle,
                alertCircle: mdiAlertCircle,
                close: mdiClose,
                plusCircle: mdiPlusCircle,
                cash100: mdiCash100,
                counter: mdiCounter,
            },
            isUpdated: false,
            dialog: false,
            valid: null,
            dialogLoading: false,
            numberErrorMsg: [],
            rules: {
                rulesNumber: [
                    v => !!v || 'Parameter is required',
                    v => (!v || v && v <= 500) || 'Too many',
                    v => (!v || v && v > 0) || 'Number must be positive',
                ],
                rulesPrice: [
                    v => (!v || v && v >= 0) || 'Price cannot be negative',
                ],
                rulesName: [
                    v => (v && v.length <= 10) || 'Too long',
                ],
                rulesLength: [
                    v => (!v || v && v <= 200) || 'Value is too big',
                    v => (!v || v && v >= 0) || 'Length cannot be negative',
                ],
                rulesWidth: [
                    v => (!v || v && v <= 50) || 'Value is too big',
                    v => (!v || v && v >= 0) || 'Wdith cannot be negative',
                ],
                rulesDraft: [
                    v => (!v || v && v <= 10) || 'Value is too big',
                    v => (!v || v && v >= 0) || 'Draft cannot be negative',
                ],
            },
        }),
        methods: {
            closeDialog() {
                this.valid = this.model.length === 0 ? null : this.$refs.dialog.validate();
                this.dialog=false;
            },
            onEditSpots() {
                if (this.noPlaces || this.defaultsUpdated) {
                    this.valid = null;
                    this.dialogLoading = true;
                    setTimeout(async () => {
                        if (this.$refs.dialog) this.$refs.dialog.resetValidation();
                        await this.$store.dispatch('Application/generatePlaces');
                        setTimeout(()=> {
                            this.dialog = true;
                            this.dialogLoading = false;
                        }, 1000);
                    }, 1);
                } else {
                    this.dialog = true;
                }
            },
            onSave() {
                this.valid = this.model.length === 0 ? null : this.$refs.dialog.validate();
                this.dialog = this.valid != null ? !this.valid : false;
            }
        },
    }
</script>

<style scoped>
    #editSpotsBtn {
        height: 56.5px;
        margin-top: -0.5px;
    }
</style>