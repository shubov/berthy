<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in LocoDashboardCard.vue is proprietary and confidential.        -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card
            :style="'width: ' + width + 'px'"
            @click="$emit('select-loco', locoInfo.index)"
            :color="colour"
    >
        <v-card-text>
            <div>Device: {{locoInfo.device}}</div>
            <p class="title text--primary">
                №{{locoInfo.number}}
            </p>
            <p>
                <strong
                        v-if="locoInfo.speed !== 0"
                        class="blue--text text--darken-4">
                    Speed: {{locoInfo.speed}}
                </strong>
            </p>
            <p v-if="locoInfo.speed === 0">
                Speed: {{locoInfo.speed}}
            </p>
            <div class="text--primary">
                Mileage: {{mileage}}<br>
                Sofis ID: {{locoInfo.sofis ? locoInfo.sofis: 'NO'}}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "LocoDashboardCard",
        props: {
            locoInfo: {
                type: Object,
                default: function () {
                    return {
                        index: 'id',
                        number: 'number',
                        mileage: 'miles',
                        sofis: 'id',
                        speed: 'speed',
                        device: 'device',
                    }},
                required: true
            },
            width: {
                type: Number,
                default: 135
            },
            colour: {
                type: String,
                default: '',
            }
        },
        computed: {
            mileage: function () {
                let n = Math.floor(this.locoInfo.mileage/1000);
                let r = this.locoInfo.mileage % 1000;
                return this.locoInfo.mileage > 99999
                    ? n + 'k'
                    : n + ',' + r;
            }
        }
    }
</script>