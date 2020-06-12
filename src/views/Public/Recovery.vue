<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Recovery.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 6 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            fill-height
            class="py-2"
            :style="$store.state.bg"
    >
        <v-row align="center" justify="center">
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
                    class="px-2 py-0"
            >
                <v-card
                        tile
                        class="mx-auto elevation-4"
                        :min-width="304"
                        :max-width="400"
                >
                    <v-toolbar flat>
                        <a href="/">
                            <v-img
                                    id="berthy-logo"
                                    max-width="150"
                                    contain
                                    src="../../assets/berthy_logo_black.png"
                            ></v-img>
                        </a>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text class="pb-0 mb-0">
                        <v-tab-transition>
                            <v-text-field
                                    ref="email"
                                    label="Email"
                                    v-show="!firstStep && !secondStep"
                                    :prepend-icon="icons.email"
                                    :rules="[rules.required, rules.email]"
                                    type="email"
                                    v-model="email"
                            ></v-text-field>
                        </v-tab-transition>
                        <v-tab-transition>
                            <v-text-field
                                    label="Code"
                                    v-show="firstStep && !secondStep"
                                    :rules="[rules.required]"
                                    v-model="code"
                            ></v-text-field>
                        </v-tab-transition>
                        <v-tab-reverse-transition>
                            <v-text-field
                                    label="New password"
                                    name="password"
                                    v-show="!firstStep && secondStep"
                                    v-model="password1"
                                    :prepend-icon="icons.lock"
                                    :append-icon="show ? icons.eyeOff : icons.eye"
                                    :rules="[rules.required, rules.min]"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"
                            />
                        </v-tab-reverse-transition>
                        <v-tab-reverse-transition>
                            <v-text-field
                                    label="Repeat password"
                                    name="password-repeat"
                                    v-model="password2"
                                    v-show="!firstStep && secondStep"
                                    :prepend-icon="icons.lock"
                                    :append-icon="show2 ? icons.eyeOff : icons.eye"
                                    :rules="[rules.required, rules.min, rules.passwordsMatch]"
                                    :type="show2 ? 'text' : 'password'"
                                    @click:append="show2 = !show2"
                            />
                        </v-tab-reverse-transition>
                    </v-card-text>
                    <v-card-actions class="pt-0 mt-0">
                        <v-row>
                            <v-col cols="12">
                                <v-fade-transition>
                                    <v-btn
                                            v-show="!firstStep && !secondStep"
                                            :loading="checkingEmail"
                                            block
                                            large
                                            @click.stop="onGetCode()"
                                            color="primary"
                                    >Get Code</v-btn>
                                </v-fade-transition>
                                <v-fade-transition>
                                    <v-btn
                                            v-show="firstStep && !secondStep"
                                            :loading="resetting"
                                            block
                                            large
                                            @click.stop="onCheck()"
                                            color="primary"
                                    >Check Code</v-btn>
                                </v-fade-transition>
                                <v-fade-transition>
                                    <v-btn
                                            v-show="!firstStep && secondStep"
                                            :loading="resetting"
                                            block
                                            large
                                            @click.stop="onReset()"
                                            color="primary"
                                    >Reset Password</v-btn>
                                </v-fade-transition>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import BerthyAPI from "../../services/berthy-api";
    import {mdiEmail, mdiEye, mdiEyeOff, mdiLock} from "@mdi/js";

    export default {
        name: "Recovery",
        data: function() {
            return {
                checkingEmail: false,
                resetting: false,
                email: "",
                code: '',
                firstStep: false,
                secondStep: false,
                password1: '',
                password2: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Enter valid email',
                    passwordsMatch: value => this.password1 === value || "Passwords don't match"
                },
                show: false,
                show2: false,
                icons: {
                    email: mdiEmail,
                    lock: mdiLock,
                    eyeOff: mdiEyeOff,
                    eye: mdiEye,
                },
            }
        },
        methods: {
            onGetCode() {
                this.checkingEmail = true;
                setTimeout(async ()=>{
                    let resp = await BerthyAPI.post('auth/password/recovery', {
                        email: this.email,
                    })
                    if (resp.data.success) {
                        this.firstStep = true;
                        this.secondStep = false;
                    }else {
                        this.$store.dispatch("Snackbar/set");
                    }
                    this.checkingEmail = false;
                },0);
            },
            onCheck() {
                this.checkingEmail = true;
                setTimeout(async ()=>{
                    let resp = await BerthyAPI.post('auth/password/recovery/check', {
                        email: this.email,
                        recoveryCode: this.code
                    })
                    if (resp.data.success) {
                        this.firstStep = false;
                        this.secondStep = true;
                    } else {
                        this.$store.dispatch("Snackbar/set");
                    }
                    this.checkingEmail = false;
                },0);
            },
            onReset() {
                this.resetting = true;
                setTimeout(async ()=>{
                    let resp = await BerthyAPI.post('auth/password/change', {
                        email: this.email,
                        recoveryCode: this.code,
                        newPassword: this.password2
                    })
                    if (resp.data.success) {
                        this.$router.push('/sign-in');
                    }else {
                        this.$store.dispatch("Snackbar/set");
                    }
                    this.resetting = false;
                },0);
            }
        }
    }
</script>

<style scoped>

</style>