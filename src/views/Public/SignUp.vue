<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SignUp.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            fill-height
            class="py-2"
            :style="$store.state.bg"
    >
        <v-row align="center" justify="center" >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
                    class="px-2 py-0"
            >
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Email Confirmation</v-card-title>
                        <v-card-text>Berthy sent link to <b>{{signUpData.email}}</b>. Check your mailbox and follow the link to confirm your account.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="onOkDialog()">Ok</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
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
                        <v-btn text to="/sign-in">Sign In</v-btn>
<!--                        <v-tooltip bottom>-->
<!--                            <template v-slot:activator="{ on }">-->
<!--                                <v-btn-->
<!--                                        href="/faq"-->
<!--                                        icon-->
<!--                                        large-->
<!--                                        target="_blank"-->
<!--                                        v-on="on"-->
<!--                                >-->
<!--                                    <v-icon>{{icons.helpCircle}}</v-icon>-->
<!--                                </v-btn>-->
<!--                            </template>-->
<!--                            <span>Source</span>-->
<!--                        </v-tooltip>-->
                    </v-toolbar>
                    <v-card-text class="pb-0 mb-0">
                        <SignUpForm ref="form" v-model="signUpData"></SignUpForm>
                    </v-card-text>
                    <v-card-actions class="pt-0 mt-0">
                        <v-row>
                            <v-col cols="12">
                                <v-btn
                                        :loading="submitting"
                                        block
                                        large
                                        @click.stop="onSignUp()"
                                        color="primary"
                                >Sign Up</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>
<script>
    import {mdiHelpCircle} from "@mdi/js";

    export default {
        name: "SignUp",
        components: {
            SignUpForm: ()=>import("../../components/AuthComponents/SignUpForm"),
        },
        data: function () {
            return {
                dialog: false,
                errorMsg: "Try again.",
                signUpData: {
                    email: '',
                    password: '',
                },
                submitting: false,
                icons: {
                    helpCircle: mdiHelpCircle,
                },
            }
        },
        methods: {
            onOkDialog() {
                this.dialog = false;
                this.$router.push('/sign-in')
            },
            async onSignUp() {
                if (this.$refs.form.$refs.form.validate()) {
                    this.submitting = true;
                    setTimeout(async () => {
                        let res = await this.$auth.registration(this.signUpData);
                        if (res === true) {
                            this.dialog = true;
                        } else if (res===false) {
                            this.$store.dispatch("Snackbar/set");
                        } else {
                            this.$store.dispatch("Snackbar/set", res);
                        }
                        this.submitting = false;
                    }, 0);
                }
            }
        },
    }
</script>