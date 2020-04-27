<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in FourOFour.vue is proprietary and confidential.                -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row>
        <v-col>
            <v-row align="center">
                <v-col>
                    <h1 class="display-2 primary--text">Whoops, 404</h1>
            
                    <p>The page you were looking for does not exist</p>
            
                    <v-btn
                            to='/'
                            color="primary"
                            outlined
                    >
                        Get me out of here!
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'FourOFour',
        created () {
            this.$ssrContext && this.$ssrContext.res.status(404)
        },
    }
</script>