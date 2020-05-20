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
                        <v-toolbar-title class="font-weight-light">Sign In</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        href="/faq"
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
                                > <v-icon class="mr-3">mdi-facebook</v-icon>
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
    import SignInForm from "../../components/Forms/SignInForm";
    import router from "../../router";
    export default {
        name: "SignIn",
        components: {SignInForm},
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
            }
        },
        methods: {
            async onSignInFacebook() {
                this.onFacebook = true;
                setTimeout(async () => {
                    try {
                        await this.$store.dispatch("snackbar", "Facebook login doesn't work. YET!");
                    } catch (e) {
                        await this.$store.dispatch("snackbar", e);
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
                                await this.$store.dispatch("snackbar", e);
                            }
                        })
                        .catch(async (e) => {
                            await this.$store.dispatch("snackbar", e);
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
                                await this.$store.dispatch("snackbar");
                            } else {
                                await this.$store.dispatch("snackbar",
                                    "Incorrect password. Please try again or click on the \"Forgot your password?\" link to reset it.");
                            }
                            this.onAuth = false;
                    }, 0);
                }
            },
            onSignInSuccess(){
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