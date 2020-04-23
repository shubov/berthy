<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in LocoCard.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card
            class="mx-auto"
            max-width="344"
    >
        <v-card-text>
            <div>Device: {{locoInfo.device}}</div>
            <p class="display-1 text--primary">
                Loco №{{locoInfo.number}}
            </p>
            <p>Speed: {{locoInfo.speed}}</p>
            <div class="text--primary">
                Mileage: {{locoInfo.mileage}}<br>
                Sofis ID: {{locoInfo.sofis ? locoInfo.sofis: 'NO'}}
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn
                    text
                    color="deep-purple accent-4"
                    @click="$emit('close')"
            >
                Close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "LocoCard",
        props: {
            locoInfo: {
                type: Object,
                default: function () {
                    return {
                        number: 'number',
                        mileage: 'miles',
                        sofis: 'id',
                        speed: 'speed',
                        device: 'device',
                    }},
                required: true
            }
        }
    }
</script>