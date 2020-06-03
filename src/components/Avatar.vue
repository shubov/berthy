<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Avatar.vue is proprietary and confidential.                   -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 6 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-avatar
            :size="size"
            color="#00000099"
    >
        <v-img v-if="photo" :src="avatarLink(photo)"/>
        <span v-else-if="name" class="display-3 white--text">{{name.substr(0,1)}}</span>
        <v-icon v-else dark>{{icons.accountCircle}}</v-icon>
    </v-avatar>
</template>

<script>
    import BerthyAPI from "../services/berthy-api";
    import {mdiAccountCircle} from "@mdi/js";

    export default {
        name: "Avatar",
        props: ['photo', 'name', 'size'],
        methods: {
            avatarLink(link) {
                if (link.substr(0,10)==='/api/files') {
                    return BerthyAPI.defaults.baseURL.slice(0, -5) + '' + link;
                } else {
                    return link;
                }
            }
        },
        data: function () {
            return {
                icons: {
                    accountCircle: mdiAccountCircle,
                }
            }
        }
    }
</script>