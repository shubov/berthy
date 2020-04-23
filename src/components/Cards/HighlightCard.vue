<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in HighlightCard.vue is proprietary and confidential.            -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card>
        <v-card-text :class="'display-1 text-center '+colour+'--text font-weight-black'">
                {{text}}
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "HighlightCard",
        props: {
            text: {
                type: String,
                default: '146%'
            },
            colour: {
                type: String,
                default: 'red'
            }
        }
    }
</script>