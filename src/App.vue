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
        <Snackbar></Snackbar>
        <Dialog></Dialog>
        <v-content>
            <router-view name="content" :key="$route.fullPath"/>
        </v-content>
    </v-app>
</template>

<script>
    import Snackbar from "./components/AppComponents/Snackbar";
    import Dialog from "./components/AppComponents/Dialog";
    export default {
        components: {Dialog, Snackbar},
        data: () => ({
            name: "Main",
        }),
    }
</script>
