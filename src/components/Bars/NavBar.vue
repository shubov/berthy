<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in NavBar.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-navigation-drawer
            mini-variant
            permanent
            app
            clipped
            floating
    >
        <v-list>
            <v-list-item-group>
                <router-link v-for="(page,index) in pages"
                             :key="index"
                             :to="page.path"
                             exact
                             class="router-link-nav-bar"
                >
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>{{page.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{page.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "NavBar",
        data: function () {
            return {
                pages: [
                    { title: 'Dashboard', path: "/",icon: 'mdi-view-dashboard' },
                    { title: 'Map', path: "/map",icon: 'mdi-map' }
                ]
            }
        },
        // computed: {
        //     activePage() {
        //         let self = this;
        //         function f({path}) {
        //             return path === self.$route.path;
        //         }
        //         return this.pages.findIndex(f);
        //     }
        // },
        // methods: {
        //     linkNavigation(path) {
        //         this.$router.push(path).catch(() => {});
        //     }
        // }
    }
</script>

<style scoped>
    .router-link-nav-bar{
        text-decoration-line: none;
    }
</style>