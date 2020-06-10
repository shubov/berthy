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
            clipped-right
    >
        <v-btn
                v-if="isMobile && dockmaster"
                @click="$parent.$emit('click-menu-icon')"
                icon
        >
            <v-icon>{{icons.menu}}</v-icon>
        </v-btn>
        <a href="/">
            <v-img
                    id="berthy-logo"
                    max-width="150"
                    contain
                    src="../../assets/berthy_logo.png"
            ></v-img>
        </a>
        <v-toolbar-title v-show="!isMobile" class="ml-8">{{$route.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
<!--        <v-tooltip bottom v-if="isFaqIcon">-->
<!--            <template v-slot:activator="{ on, attrs }">-->
<!--                <v-btn icon v-bind="attrs" v-on="on" to="/faq">-->
<!--                    <v-icon>{{icons.helpCircle}}</v-icon>-->
<!--                </v-btn>-->
<!--            </template>-->
<!--            <span>FAQ</span>-->
<!--        </v-tooltip>-->
        <v-tooltip bottom v-if="isAccountIcon">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" to="/profile">
                    <v-icon>{{icons.account}}</v-icon>
                </v-btn>
            </template>
            <span>Profile</span>
        </v-tooltip>
        <v-btn v-if="isSignInBtn"
                to="/sign-in"
                color="primary"
        >Sign In</v-btn>
        <v-tooltip bottom v-if="isLogoutIcon">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="onSignOut()">
                    <v-icon>{{icons.logout}}</v-icon>
                </v-btn>
            </template>
            <span>Sign Out</span>
        </v-tooltip>
        <v-menu v-if="isRightMenuIcon" offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>{{icons.menu}}</v-icon>
                </v-btn>
            </template>
    
            <v-list v-if="boater">
                <v-list-item to="/book">
                    <v-list-item-icon>
                        <v-icon>{{icons.magnify}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Explore</v-list-item-title>
                </v-list-item>
                <v-list-item to="/trips">
                    <v-list-item-icon>
                        <v-icon>{{icons.shipWheel}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Trips</v-list-item-title>
                </v-list-item>
                <v-list-item to="/messages">
                    <v-list-item-icon>
                        <v-icon>{{icons.forum}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Chat</v-list-item-title>
                </v-list-item>
                <v-list-item to="/profile">
                    <v-list-item-icon>
                        <v-icon>{{icons.account}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title >Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="onSignOut">
                    <v-list-item-icon>
                        <v-icon>{{icons.logout}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
            </v-list>
    
            <v-list v-if="moderator">
                <v-list-item to="/moderator">
                    <v-list-item-icon>
                        <v-icon>{{icons.clipboardTextMultiple}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Applications</v-list-item-title>
                </v-list-item>
                <v-list-item to="/messages">
                    <v-list-item-icon>
                        <v-icon>{{icons.forum}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Chat</v-list-item-title>
                </v-list-item>
                <v-list-item @click="onSignOut">
                    <v-list-item-icon>
                        <v-icon>{{icons.logout}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
    import router from "../../router";
    import {
        mdiMenu,
        mdiHelpCircle,
        mdiAccount,
        mdiLogout,
        mdiForum,
        mdiMagnify,
        mdiShipWheel,
        mdiClipboardTextMultiple
    } from '@mdi/js'
    import {mapGetters} from "vuex";
    export default {
        name: "AppBar",
        computed: {
            ...mapGetters('User', [
                'isUser', 'isModerator', 'isLoggedIn',
                'dockmaster', 'boater', 'moderator', 'newUser'
            ]),
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
            
            isFaqIcon() {
                return !this.moderator;
            },
            isSignInBtn() {
                return !this.isLoggedIn;
            },
            isAccountIcon() {
                return this.dockmaster;
            },
            isLogoutIcon() {
                return this.dockmaster || this.newUser;
            },
            isRightMenuIcon() {
                return this.boater || this.moderator;
            }
        },
        data: function () {
            return {
                icons: {
                    account: mdiAccount,
                    helpCircle: mdiHelpCircle,
                    logout: mdiLogout,
                    menu: mdiMenu,
                    forum: mdiForum,
                    magnify: mdiMagnify,
                    shipWheel: mdiShipWheel,
                    clipboardTextMultiple: mdiClipboardTextMultiple
                }
            }
        },
        methods: {
            async onSignOut() {
                try {
                    this.$auth.logout();
                    if (this.$route.meta.public !== true) router.go('/sign-in');
                } catch (e) {
                    console.log('error', e);
                }
            },
            toDefaultPage() {
                if (this.boater) {
                    router.push('/book');
                    return;
                }
                if (this.dockmaster) {
                    router.push('/dashboard');
                    return;
                }
                if (this.moderator) {
                    router.push('/moderator');
                }
                router.push('/');
            }
        },
    }
</script>

<style scoped>
    #berthy-logo {
        margin-top: 4px;
    }
</style>
