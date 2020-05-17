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
            <v-container
                    fluid
                    fill-height
                    class="py-2"
                    :style="pagesWithBg.includes($route.name) ? bg :''"
            >
                <router-view name="content" :key="$route.fullPath"/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            name: "Main",
            bg: {'background-image': `url(${require('./assets/background.jpg')})`},
            pagesWithBg: ['Sign In', 'Sign Up', "Role"]
        }),
    }
</script>
