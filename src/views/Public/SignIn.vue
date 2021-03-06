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
                        <SignInForm
                                ref="form"
                                v-model="signInData"
                                :reset-password="resetPassword"
                        ></SignInForm>
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
                                        :loading="onAuth"
                                        block
                                        large
                                        @click="onSignInEmail()"
                                        color="primary"
                                >Sign In</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn
                                        :loading="onGoogle"
                                        :disabled="!isInit"
                                        block
                                        outlined
                                        large
                                        color="grey darken-2"
                                        @click="onSignInGoogle()"
                                ><v-img contain
                                        class="google-logo mr-3"
                                        src="../../assets/g.svg"/>
                                    Continue With Google
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-btn
                                        :loading="onFacebook"
                                        block
                                        large
                                        color="#1877f2"
                                        class="white--text"
                                        @click="onSignInFacebook()"
                                > <v-icon class="mr-3">{{icons.facebook}}</v-icon>
                                    Continue With Facebook
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import router from "../../router";
    import {
        mdiFacebook, mdiHelpCircle
    } from "@mdi/js";
    
    export default {
        name: "SignIn",
        async created() {
            let code = this.$route.query.code;
            if (code) {
                try {
                    if(await this.$auth.login_facebook(code)) {
                        this.onSignInSuccess();
                    }
                } catch (e) {
                    await this.$store.dispatch("Snackbar/set", "Try another way of signing in");
                }
            }
        },
        components: {
            SignInForm: ()=>import("../../components/AuthComponents/SignInForm"),
        },
        data: function () {
            return {
                resetPassword: "Forgot your password?",
                isInit: false,
                signInData: {
                    email: '',
                    password: '',
                },
                snackbar: false,
                onAuth: false,
                onGoogle: false,
                onFacebook: false,
                icons: {
                    helpCircle: mdiHelpCircle,
                    facebook: mdiFacebook,
                }
            }
        },
        methods: {
            async onSignInFacebook() {
                this.onFacebook = true;
                setTimeout(async () => {
                    try {
                        window.location.href = `https://www.facebook.com/v7.0/dialog/oauth?`
                        +`client_id=801415917049566`
                        +`&redirect_uri=https://berthy.now.sh/sign-in`
                        +`&state={st=state123abc,ds=123456789}`
                        +`&response_type=code`
                        +`&scope=email`;
                    } catch (e) {
                        await this.$store.dispatch("Snackbar/set", e);
                    } finally {
                        this.onFacebook = false;
                    }
                }, 0);
            },
            async onSignInGoogle() {
                this.onGoogle = true;
                setTimeout(async () => {
                    this.$gAuth.getAuthCode()
                        .then(async authCode => {
                            try {
                                if(await this.$auth.login_google(authCode)) {
                                    this.onSignInSuccess();
                                }
                            } catch (e) {
                                await this.$store.dispatch("Snackbar/set", e);
                            }
                        })
                        .catch(async (e) => {
                            if (e.error !== "popup_closed_by_user")
                                await this.$store.dispatch("Snackbar/set", e.error || e);
                        })
                        .finally(()=>this.onGoogle = false);
                }, 0);
            },
            onSignInEmail() {
                if (this.$refs.form.$refs.form.validate()) {
                    this.onAuth = true;
                    setTimeout(async () => {
                        let res = await this.$auth.login_email(this.signInData);
                            if (res === true) {
                                this.onSignInSuccess();
                            } else if (res===false) {
                                await this.$store.dispatch("Snackbar/set");
                            } else {
                                await this.$store.dispatch("Snackbar/set",
                                    "Incorrect password. Please try again or click on the \"Forgot your password?\" link to reset it.");
                            }
                            this.onAuth = false;
                    }, 0);
                }
            },
            onSignInSuccess(){
                this.$store.dispatch("User/updateUserInfo");
                router.push(this.$route.query.redirect||'/roles');
            }
        },
        mounted(){
            let checkGauthLoad = setInterval(()=>{
                this.isInit = this.$gAuth.isInit;
                if (this.isInit)
                    clearInterval(checkGauthLoad);
            }, 300);
        }
    }
</script>
<style scoped>
    .google-logo {
        /*noinspection CssInvalidPropertyValue*/
        max-height: -webkit-fill-available;
        max-width: 20px;
    }
</style>