<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in AppBar.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-app-bar
            :color="this.$berthy_blue"
            dense
            dark
            app
            clippedLeft
    >
        <v-btn v-if="!$vuetify.breakpoint.smAndUp" icon @click="$parent.$emit('click-menu-icon')">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    
        <v-img
                id="berthy-logo"
                max-width="150"
                contain
                src="../../assets/berthy_logo.png"
        ></v-img>
    
        <v-spacer></v-spacer>
        
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" to="/faq" v-on="on">
                    <v-icon>mdi-help-circle</v-icon>
                </v-btn>
            </template>
            <span>FAQ</span>
        </v-tooltip>
    
        <v-menu>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>
    
            <v-list>
                <v-list-item @click="onSwitch()">
                    <v-list-item-title >Switch role</v-list-item-title>
                </v-list-item>
                <v-list-item @click="onProfileClick()">
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs" @click="onSignOut">
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </template>
            <span>Sign Out</span>
        </v-tooltip>
    </v-app-bar>
</template>

<script>
    import router from "../../router";

    export default {
        name: "AppBar",
        data: function() {
            return {
                icons: [
                    { icon: "mdi-help-circle", path:"", tip:""},
                    { icon: "mdi-account", path:"", tip:""},
                    { icon: "", path:"", tip:""}
                ]
            }
        },
        methods: {
            async onSignOut() {
                try {
                    this.$auth.logout();
                    router.push('sign-in');
                } catch (e) {
                    console.log('error', e);
                }
            },
            onSwitch() {
                router.push('/');
            },
            onProfileClick() {
                router.push('/profile')
            }
        }
    }
</script>

<style scoped>
    #berthy-logo {
        margin-top: 4px;
    }
</style>
