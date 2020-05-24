<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in ShipForm.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-0" tile>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                            dense
                            v-model="name"
                            hide-details
                            label="Name"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                            dense
                            v-model="type"
                            hide-details
                            :items="['POWER','SAIL']"
                            label="Type"
                            filled
                            rounded
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-file-input
                            v-model="photos"
                            multiple
                            filled
                            hide-details
                            rounded
                            dense
                            label="Photos"
                            :clearable="false"
                            accept="image/*"
                            :loading="photosLoading"
                    >
                        <template v-slot:selection="{ index }">
                            <v-chip
                                    class="ma-2"
                                    close
                                    v-if="photos[index]"
                                    :key="index"
                                    @click:close="onRemovePhoto(index)"
                            >
                                {{fileNameDisplay(photos[index].fileName, 9)}}
                            </v-chip>
                        </template>
                    </v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-label>Dimensions</v-label>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                            dense
                            hide-details
                            v-model="length"
                            label="Length  (meters)"
                            type="number"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                            dense
                            hide-details
                            v-model="draft"
                            label="Draft (meters)"
                            type="number"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                            dense
                            hide-details
                            v-model="width"
                            label="Width  (meters)"
                            type="number"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-label>Model</v-label>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                            dense
                            hide-details
                            v-model="producer"
                            label="Producer"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                            dense
                            hide-details
                            v-model="model"
                            label="Model"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                            dense
                            hide-details
                            v-model="year"
                            label="Year"
                            type="number"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-label>Registration</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                            dense
                            hide-details
                            label="Number"
                            v-model="regNumber"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-menu v-model="registrationMenu" max-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    dense
                                    hide-details
                                    :value="regExpiry"
                                    label="Expiry"
                                    filled
                                    rounded
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                no-title
                                v-model="regExpiry"
                                @change="registrationMenu = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                    <v-file-input
                            v-model="regFile"
                            filled
                            rounded
                            dense
                            hide-details
                            label="File"
                            :clearable="true"
                            accept="image/*,application/pdf"
                            :loading="regFileLoading"
                            @click:clear="$store.commit('Ships/REG_FILE', null)"
                    >
                        <template v-slot:selection>
                            <span v-if="regFile">
                                {{fileNameDisplay(regFile.fileName,  $vuetify.breakpoint.mdOnly ? 15 : 27)}}
                            </span>
                        </template>
                    </v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-label>Insurance</v-label>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-text-field
                            dense
                            hide-details
                            label="Company"
                            v-model="insCompany"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-text-field
                            dense
                            hide-details
                            label="Number"
                            v-model="insNumber"
                            filled
                            rounded
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-menu v-model="insuranceMenu" max-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    dense
                                    hide-details
                                    label="Expiry"
                                    :value="insExpiry"
                                    filled
                                    rounded
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                no-title
                                v-model="insExpiry"
                                @change="insuranceMenu = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <v-file-input
                            v-model="insFile"
                            filled
                            hide-details
                            rounded
                            dense
                            label="File"
                            :clearable="true"
                            accept="image/*,application/pdf"
                            :loading="insFileLoading"
                            @click:clear="$store.commit('Ships/INS_FILE', null)"
                    >
                        <template v-slot:selection>
                             <span v-if="insFile">
                                {{fileNameDisplay(insFile.fileName, $vuetify.breakpoint.mdOnly ? 9 : 17)}}
                            </span>
                        </template>
                    </v-file-input>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn
                    block
                    color="primary"
                    @click="onSubmit()"
                    x-large
                    :loading="submitting"
            >Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        name: "ShipForm",
        computed: {
            name: {
                get() {
                    return this.$store.state.Ships.shipToCreate.name;
                },
                set(value) {
                    this.$store.commit('Ships/NAME', value);
                }
            },
            type: {
                get() {
                    return this.$store.state.Ships.shipToCreate.type;
                },
                set(value) {
                    this.$store.commit('Ships/TYPE', value);
                }
            },
            length: {
                get() {
                    return this.$store.state.Ships.shipToCreate.length;
                },
                set(value) {
                    this.$store.commit('Ships/LENGTH', value);
                }
            },
            draft: {
                get() {
                    return this.$store.state.Ships.shipToCreate.draft;
                },
                set(value) {
                    this.$store.commit('Ships/DRAFT', value);
                }
            },
            width: {
                get() {
                    return this.$store.state.Ships.shipToCreate.width;
                },
                set(value) {
                    this.$store.commit('Ships/WIDTH', value);
                }
            },
            producer: {
                get() {
                    return this.$store.state.Ships.shipToCreate.producer;
                },
                set(value) {
                    this.$store.commit('Ships/PRODUCER', value);
                }
            },
            model: {
                get() {
                    return this.$store.state.Ships.shipToCreate.model;
                },
                set(value) {
                    this.$store.commit('Ships/MODEL', value);
                }
            },
            year: {
                get() {
                    return this.$store.state.Ships.shipToCreate.year;
                },
                set(value) {
                    this.$store.commit('Ships/YEAR', value);
                }
            },
            insCompany: {
                get() {
                    return this.$store.state.Ships.shipToCreate.insCompany;
                },
                set(value) {
                    this.$store.commit('Ships/INS_COMPANY', value);
                }
            },
            insExpiry: {
                get() {
                    return this.$store.state.Ships.shipToCreate.insExpiry;
                },
                set(value) {
                    this.$store.commit('Ships/INS_EXPIRY', value);
                }
            },
            insNumber: {
                get() {
                    return this.$store.state.Ships.shipToCreate.insNumber;
                },
                set(value) {
                    this.$store.commit('Ships/INS_NUMBER', value);
                }
            },
            regNumber: {
                get() {
                    return this.$store.state.Ships.shipToCreate.regNumber;
                },
                set(value) {
                    this.$store.commit('Ships/REG_NUMBER', value);
                }
            },
            regExpiry: {
                get() {
                    return this.$store.state.Ships.shipToCreate.regExpiry;
                },
                set(value) {
                    this.$store.commit('Ships/REG_EXPIRY', value);
                }
            },
            photos: {
                get() {
                    return this.$store.state.Ships.shipToCreate.photos;
                },
                async set(files) {
                    this.photosLoading = true;
                    for(let i=0;i<files.length;i++) {
                        if (files[i] instanceof File && this.isImage(files[i]))
                            await this.$store.dispatch('Ships/uploadFile',
                                {
                                    file: files[i],
                                    commitType: 'ADD_PHOTO'
                                });
                    }
                    this.photosLoading = false;
                }
            },
            insFile: {
                get() {
                    return this.$store.state.Ships.shipToCreate.insFile;
                },
                async set(file) {
                    this.insFileLoading = true;
                    if (file instanceof File && (this.isImage(file) || this.isPdf(file)))
                        await this.$store.dispatch('Ships/uploadFile',
                            {
                                file: file,
                                commitType: 'INS_FILE'
                            });
                    this.insFileLoading = false;
                }
            },
            regFile: {
                get() {
                    return this.$store.state.Ships.shipToCreate.regFile;
                },
                async set(file) {
                    this.regFileLoading = true;
                    if (file instanceof File && (this.isImage(file) || this.isPdf(file)))
                        await this.$store.dispatch('Ships/uploadFile',
                            {
                                file: file,
                                commitType: 'REG_FILE'
                            });
                    this.regFileLoading = false;
                }
            },
        },
        data: function () {
            return {
                insuranceMenu: false,
                registrationMenu: false,
                photosLoading: false,
                insFileLoading: false,
                regFileLoading: false,
                submitting: false,
            }
        },
        methods: {
            onRemovePhoto(index){
                this.$store.commit('Ships/REMOVE_PHOTO', index)
            },
            isImage(file) {
                return !!file.type.match('image.*');
            },
            isPdf(file) {
                console.log(file.type);
                return file.type==='application/pdf';
            },
            onSubmit(){
                this.submitting = true;
                setTimeout(async ()=> {
                    if(await this.$store.dispatch('Ships/createShip')) {
                        this.$emit('close-ship-form');
                        this.$store.dispatch('Dialog/set', this.name + ' boat was succesfully created');
                    } else this.$store.dispatch('snackbar', 'Fill all the fields to create a boat');
                    this.submitting = false;
                }, 0);
            },
            fileNameDisplay(fileName, length) {
                return fileName.length > length ? fileName.substr(0,length)+'...' : fileName;
            }
        }
    }
</script>

<style scoped>

</style>