<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in PlaceEditCard.vue is proprietary and confidential.            -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row align="center" justify="center" class="ma-0">
        <v-col cols="11" sm="9" md="6" lg="4" xl="3"
               v-for="(place, index) in model"
               :key="index+Date.now()">
            <v-form ref="form">
                <v-card class="mb-5">
                    <v-toolbar dark flat tile color="#0000004d">
                        <v-row class="mt-4" align="center" justify="start">
                            <v-col>
                                <v-text-field
                                        dense
                                        @input="editPlace($event, index, 0)"
                                        :value="model[index].name"
                                        :rules="rules.rulesName"
                                        label="Name"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                        dense
                                        @input='editPlace($event, index, 1)'
                                        :value="model[index].price"
                                        :prefix="currency"
                                        :rules="rules.rulesPrice"
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
                                <v-col cols="12" sm="4" class="pb-0">
                                    <v-text-field
                                            dense
                                            @input='editPlace($event, index, 2)'
                                            :value="model[index].length"
                                            :rules="rules.rulesLength"
                                            :suffix="suffix"
                                            type="number"
                                            label="Length"
                                            outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" class="pb-0">
                                    <v-text-field
                                            dense
                                            @input='editPlace($event, index, 3)'
                                            :value="model[index].draft"
                                            :suffix="suffix"
                                            :rules="rules.rulesDraft"
                                            type="number"
                                            label="Draft"
                                            outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" class="pb-0">
                                    <v-text-field
                                            dense
                                            @input='editPlace($event, index, 4)'
                                            :value="model[index].width"
                                            :rules="rules.rulesWidth"
                                            :suffix="suffix"
                                            type="number"
                                            label="Width"
                                            outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "PlaceEditCard",
        props: {
            required: {
                type: Boolean,
                default: false
            },
            state: String,
            addMutation: String,
            editMutation: String,
            removeMutation: String,
            currency: String,
            suffix: String,
        },
        computed: {
            model: {
                get() {
                    return this.$store.state.Application[this.state];
                }
            }
        },
        data: () => ({
            rules: {
                rulesPrice: [
                    v => !!v || 'Parameter is required',
                    v => (!v || v && v >= 0) || 'Price cannot be negative',
                ],
                rulesName: [
                    v => !!v || 'Parameter is required',
                    v => (v && v.toString().length <= 10) || 'Too long',
                ],
                rulesLength: [
                    v => !!v || 'Parameter is required',
                    v => (!v || v && v <= 200) || 'Value is too big',
                    v => (!v || v && v >= 0) || 'Length cannot be negative',
                ],
                rulesWidth: [
                    v => !!v || 'Parameter is required',
                    v => (!v || v && v <= 50) || 'Value is too big',
                    v => (!v || v && v >= 0) || 'Width cannot be negative',
                ],
                rulesDraft: [
                    v => !!v || 'Parameter is required',
                    v => (!v || v && v <= 10) || 'Value is too big',
                    v => (!v || v && v >= 0) || 'Draft cannot be negative',
                ],
            },
        }),
        methods: {
            onRemove(index){
                this.$store.commit(this.removeMutation, index);
            },
            editPlace(value, index, key) {
                let place = {};
                Object.assign(place, this.model[index]);
                switch (key) {
                    case 0:
                        place.name = value;
                        break;
                    case 1:
                        place.price = value;
                        break;
                    case 2:
                        place.length = value;
                        break;
                    case 3:
                        place.draft = value;
                        break;
                    case 4:
                        place.width = value;
                        break;
                }
                this.$store.commit(this.editMutation, {index, place});
            },
            addPlace() {
                this.$store.commit(this.addMutation);
            },
            validate() {
                let res = true;
                this.$refs.form.forEach(form => {
                    if (!form.validate()) res = false;
                });
                return res;
            },
            resetValidation() {
                if (this.$refs.form) this.$refs.form.forEach(form => form.resetValidation());
            }
        }
    }
</script>