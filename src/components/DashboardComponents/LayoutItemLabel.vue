<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in LayoutItemLabel.vue is proprietary and confidential.            -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container fill-height>
        <v-row align="center">
            <v-col>
                <p
                        class="display-2 font-weight-black grey--text mx-auto"
                        style="text-align: center;"
                >
                    {{text}}
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "LayoutItemLabel",
        props: ['text'],
    }
</script>