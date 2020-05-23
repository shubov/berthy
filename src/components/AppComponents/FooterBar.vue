<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in FooterBar.vue is proprietary and confidential.                -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-footer
            app
            :color="this.$berthy_blue"
            class="white--text"
    >
        <span>Berthy</span>
        <v-spacer ></v-spacer>
        <span>&copy; 2020</span>
    </v-footer>
</template>

<script>
    export default {
        name: "FooterBar"
    }
</script>

<style scoped>

</style>