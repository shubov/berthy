<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SignIn.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
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
                                    large
                                    @click="onSignInEmail()"
                                    color="primary"
                            >Sign In</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-btn
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
    
</template>
<script>
    import SignInForm from "../../components/Forms/SignInForm";
    import router from "../../router";
    export default {
        name: "SignIn",
        components: {SignInForm},
        data: function () {
            return {
                isInit: false,
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
                this.$gAuth.getAuthCode().then(async authCode => {
                    try {
                        if(await this.$auth.login_google(authCode)) {
                            this.onSignInSuccess();
                        }
                    } catch (e) {
                        console.log('Authorization Error', e)
                    }
                }).catch(e=>console.log('GAuth error', e));
            },
            onSignInEmail() {
                if(this.$auth.login_email(this.signInData)) {
                    this.onSignInSuccess();
                }
            },
            async onSignInSuccess(){
                router.push('/roles');
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