<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in App.vue is proprietary and confidential.                      -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-app>
        <router-view name="appbar"/>
        <router-view name="navbar"/>
        <router-view name="footer"/>
        <v-content>
            <v-container fill-height>
                    <router-view name="content" :key="$route.fullPath"/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props: {
            source: String,
        },
        data: () => ({
            name: "Main",
            ws: null,
        }),
        methods: {
            ...mapActions("Sockets", [
                `SOCKET_CONNECT`,
                `SOCKET_DISCONNECT`,
                `SOCKET_MESSAGE`,
                `SOCKET_ERROR`
            ]),
        },
        mounted: function() {
        
        //     let self = this;
        //     this.ws = new WebSocket('ws://uralchem-navigator.southcentralus.cloudapp.azure.com');
        //     this.ws.onopen = function() {
        //         self.SOCKET_CONNECT();
        //     };
        //     this.ws.onclose = function(event) {
        //         self.SOCKET_DISCONNECT(event);
        //     };
        //     this.ws.onmessage = function(message) {
        //         self.SOCKET_MESSAGE(message);
        //     };
        //     this.ws.onerror = function(message) {
        //         self.SOCKET_ERROR(message);
        //     }
        },
    }
</script>