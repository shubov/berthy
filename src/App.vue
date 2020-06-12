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
        <router-view v-if="dockmaster" name="navbar"/>
        <router-view name="footer"/>
        <Snackbar></Snackbar>
        <Dialog></Dialog>
        <v-content style="padding-bottom: 35px">
            <router-view name="content" :key="$route.fullPath"/>
        </v-content>
    </v-app>
</template>

<script>
    import { mapGetters} from "vuex";

    export default {
        components: {
            Dialog: ()=>import("./components/AppComponents/Dialog"),
            Snackbar: ()=>import("./components/AppComponents/Snackbar"),
        },
        data: () => ({
            name: "Main",
        }),
        computed: {
            ...mapGetters('User', [
                'dockmaster'
            ]),
        },
    }
</script>
