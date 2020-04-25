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
                color="grey darken-2"
                dense
                dark
                app
                clippedLeft
        >
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>

            <v-img
                    id="siemens-logo"
                    max-width="111"
                    contain
                    src="https://new.siemens.com/etc.clientlibs/siemens-sites/components/content/header/clientlibs/resources/logo/siemens-logo-default.svg"
            ></v-img>

            <v-spacer></v-spacer>
            
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon to="faq" v-on="on">
                        <v-icon>mdi-help-circle</v-icon>
                    </v-btn>
                </template>
                <span>FAQ</span>
            </v-tooltip>
            
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon to="profile" v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <span>Profile</span>
            </v-tooltip>
    
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="onSignOut">
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </template>
                <span>Sign Out</span>
            </v-tooltip>

<!--            <v-menu-->
<!--                    left-->
<!--                    bottom-->
<!--            >-->
<!--                <template v-slot:activator="{ on }">-->
<!--                    <v-btn icon v-on="on">-->
<!--                        <v-icon>mdi-dots-vertical</v-icon>-->
<!--                    </v-btn>-->
<!--                </template>-->

<!--                <v-list>-->
<!--                    <v-list-item @click="onSignOut">-->
<!--                        <v-list-item-title>Sign Out</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                </v-list>-->
<!--            </v-menu>-->
        </v-app-bar>
</template>

<script>
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
                } catch (e) {
                    console.log('error', e);
                }
            }
        }
    }
</script>

<style scoped>
    #siemens-logo {
        -webkit-filter: grayscale(100%) brightness(2000%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%) brightness(2000%);
        margin-left: 5px;
    }
</style>
