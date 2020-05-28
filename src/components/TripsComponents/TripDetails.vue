<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in TripDetails.vue is proprietary and confidential.              -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-card class="elevation-1">
                        <v-list-item color="rgba(0, 0, 0, .4)">
                            <v-list-item-content>
                                <v-list-item-title>
                                    Place {{booking.berthPlaceName}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item color="rgba(0, 0, 0, .4)">
                            <v-list-item-content>
                                <v-list-item-title>
                                    Total Price <b>{{booking.totalPrice}} €</b>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-actions>
                            <v-btn
                                    class="primary"
                                    v-if="booking.status==='APPROVED'"
                                    @click.once="$emit('pay')"
                            >
                                Pay €{{booking.serviceFee}}
                            </v-btn>
                            <v-btn
                                    text
                                    v-if="booking.status!=='REJECTED' && booking.status!=='CANCELLED'"
                                    @click.once="$emit('cancel')"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                    text
                                    :to="`/marina/${booking.berth.id}`"
                            >
                                {{booking.berth.name}}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-date-picker
                            class="d-block"
                            :value="[booking.startDate,booking.endDate]"
                            :landscape="!isMobile"
                            disabled
                            :selected-items-text="`
                            ${booking.startDate.substr(8,2)} -
                            ${booking.endDate.substr(8,2)}`"
                            multiple
                            readonly
                    ></v-date-picker>
                </v-col>
                <v-col>
                    <v-card class="elevation-1">
                        <v-img
                                :src="booking.ship.photos.length ? toLink(booking.ship.photos[0].fileLink)
                                                     : booking.ship.type==='SAIL'
                                                     ? sailImg
                                                     : powerImg"
                                :lazy-src="booking.ship.type==='SAIL' ? sailLazy : powerLazy"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px"
                        >
                            <v-card-title>{{booking.ship.model.producer}} ({{booking.ship.model.model}})</v-card-title>
                        </v-img>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <p class="subtitle-1">Length: {{booking.ship.dimensions.length}} m</p>
                                    <p class="subtitle-1">Width: {{booking.ship.dimensions.width}} m</p>
                                    <p class="subtitle-1">Draft: {{booking.ship.dimensions.draft}} m</p>
                                </v-col>
                                <v-col cols="6">
                                    <p class="subtitle-1">Type: {{booking.ship.type}}</p>
                                    <p class="subtitle-1">Insurance: {{booking.ship.insurance.expire}}</p>
                                    <p class="subtitle-1">Registration: {{booking.ship.registration.expire}}</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import {photoLink} from "../../assets/helperFunctions";

    export default {
        name: "TripDetails",
        props: ['booking'],
        computed: {
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
        },
        data: function() {
            return {
                sailImg: require("../../assets/sailBoat.jpg"),
                powerImg: require("../../assets/powerBoat.jpg"),
                sailLazy: require("../../assets/sailBoat.webp"),
                powerLazy: require("../../assets/powerBoat.webp"),
            }
        },
        methods: {
            toLink(link) {
                return photoLink(link);
            },
        }
    }
</script>

<style scoped>

</style>