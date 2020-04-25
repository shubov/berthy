<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SignIn.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            fill-height
    >
        <v-layout
                align-center
                justify-center
        >
            <v-flex
                    xs12
                    sm8
                    md4
            >
                <v-card class="elevation-4">
                    <v-toolbar
                            color="grey darken-2"
                            dark
                            flat
                    >
                        <v-toolbar-title class="font-weight-light">Sign In</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        href="#"
                                        icon
                                        large
                                        target="_blank"
                                        v-on="on"
                                >
                                    <v-icon>mdi-help-circle</v-icon>
                                </v-btn>
                            </template>
                            <span>Source</span>
                        </v-tooltip>
                    </v-toolbar>
                    <v-card-text class="pb-0 mb-0">
                        <SignInForm :user.sync="signInData"></SignInForm>
                    </v-card-text>
                    <v-card-actions class="pt-0 mt-0">
                        <v-row>
                            <v-col cols="6">
                                <v-btn
                                        to="/sign-up"
                                        block
                                        outlined
                                        large
                                        color="grey darken-2"
                                >Sign Up</v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn
                                        block
                                        outlined
                                        large
                                        @click="onSignInEmail()"
                                        color="deep-purple accent-4"
                                >Sign In</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn
                                        block
                                        outlined
                                        large
                                        color="grey darken-2"
                                        @click="onSignInGoogle()"
                                ><v-img contain
                                        class="google-logo mr-3"
                                        src="../assets/g.svg"/>
                                    Continue With Google
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn
                                        block
                                        large
                                        color="#1877f2"
                                        class="white--text"
                                        @click="onSignInFacebook()"
                                > <v-icon class="mr-3">mdi-facebook</v-icon>
                                    Continue With Facebook
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import SignInForm from "../components/forms/SignInForm";
    export default {
        name: "SignIn",
        components: {SignInForm},
        data: function () {
            return {
                signInData: {
                    email: "john@email.com",
                    password: "12345678",
                },
            }
        },
        methods: {
            async onSignInFacebook() {
                alert("Facebook login doesn't work. YET!");
            },
            async onSignInGoogle() {
                try {
                    const authCode = await this.$gAuth.getAuthCode();
                    await this.$auth.login_google(authCode);
                } catch (e) {
                    console.log('error', e);
                }
            },
            onSignInEmail() {
                this.$auth.login_email(this.signInData);
            }
        },
    }
</script>
<style scoped>
    .google-logo {
        /*noinspection CssInvalidPropertyValue*/
        max-height: -webkit-fill-available;
        max-width: 20px;
    }
</style>