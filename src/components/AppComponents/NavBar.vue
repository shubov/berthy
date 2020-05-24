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
            :mini-variant="$vuetify.breakpoint.smAndUp"
            app
            clipped
            floating
            mobile-break-point="600"
            v-model="menu"
    >
        <v-list>
            <v-list-item-group>
                <router-link v-for="(page,index) in pages"
                             :key="index"
                             :to="page.path"
                             exact
                             class="router-link-nav-bar"
                >
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item v-on="on" v-bind="attrs">
                                <v-list-item-icon>
                                    <v-icon>{{page.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{page.title}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <span>{{page.title}}</span>
                    </v-tooltip>
                </router-link>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mdiAccountGroup, mdiClipboardList, mdiCog, mdiForum, mdiViewDashboard} from "@mdi/js";

    export default {
        name: "NavBar",
        created() {
            this.$parent.$on('click-menu-icon', ()=>this.menu = !this.menu);
        },
        data: function () {
            return {
                menu: this.$vuetify.breakpoint.smAndUp,
                pages: [
                    { title: 'Dashboard', path: "/dashboard",icon: mdiViewDashboard },
                    { title: 'Requests', path: "requests",icon: mdiClipboardList },
                    { title: 'Messages', path: "messages",icon: mdiForum },
                    { title: 'Team', path: "team",icon: mdiAccountGroup},
                    { title: 'Marina Settings', path: "/settings", icon: mdiCog },
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
        methods: {
            onMenuClick(){
                this.menu = !this.menu;
                console.log(this.menu);
            }
        //     linkNavigation(path) {
        //         this.$router.push(path).catch(() => {});
        //     }
        }
    }
</script>

<style scoped>
    .router-link-nav-bar{
        text-decoration-line: none;
    }
</style>