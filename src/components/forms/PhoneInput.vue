<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in PhoneInput.vue is proprietary and confidential.               -
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
                            <span v-else key="1">{{ number }}</span>
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
            <vue-tel-input
                    :value="number"
                    @validate="number=$event"
            ></vue-tel-input>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import { VueTelInput } from 'vue-tel-input'
    export default {
        name: "PhoneInput",
        components: {
            VueTelInput,
        },
        props: {
            required: {
                type: Boolean,
                default: false
            },
            title: String,
            placeholder: String,
            caption: String,
            numState: String,
            codeState: String,
            codeMutation: String,
            numMutation:String,
            icon: String,
        },
        computed: {
            code: {
                get() {
                    return this.$store.state.Application[this.codeState];
                },
                set(value) {
                    console.log(value);
                    this.$store.commit(this.codeMutation, value)
                }
            },
            number: {
                get() {
                    return this.$store.state.Application[this.numState];
                },
                set(value) {
                    this.valid = !!value.isValid;
                    if (this.valid && value.canBeInternationallyDialled) {
                        this.$store.commit(this.numMutation, value.number.international);
                    } else {
                        this.$store.commit(this.numMutation, value.number.input);
                    }
                    this.code = value.regionCode;
                }
            },
        },
        data: ()=> ({
            valid: null,
        }),
        mounted() {
            this.valid = this.number ? false : null;
        }
    }
</script>