<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in BookingCard.vue is proprietary and confidential.              -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card
            tile
            :class="!showClose ? 'overflow-y-auto elevation-0' : ''"
            :style="!showClose ? 'overflow: hidden' : ''"
            :max-height="height"
    >
        <v-toolbar
                class="elevation-0"
                tile
        >
            <v-toolbar-title>
                {{
                booking.renter.firstName+
                ' '+booking.renter.lastName+
                ': '+booking.ship.model.producer+
                ' '+booking.ship.model.model
                }}
            </v-toolbar-title>
            <v-chip
                    class="ml-2"
                    label
                    dark
                    :color="statusColor(booking.status)"
            >{{booking.status}}</v-chip>
            <v-spacer></v-spacer>
            <v-btn v-show="showClose" icon @click="$emit('close')">
                <v-icon>{{icons.close}}</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-row>
                <v-col cols="12" lg="6" class="py-0">
                    <v-row>
                        <v-col>
                            <v-card class="elevation-1">
                                <v-list-item color="rgba(0, 0, 0, .4)">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Place {{booking.berthPlace.name}}
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Length<b> {{booking.berthPlace.length}} m</b>,
                                            Width <b>{{booking.berthPlace.width}} m  </b>,
                                            Draft <b>{{booking.berthPlace.draft}} m  </b>
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
                                    <v-btn large class="success" @click="onApprove(booking.id)">
                                        <v-icon>{{icons.thumbUpOutline}}</v-icon>
                                        Approve
                                    </v-btn>
                                    <v-btn large class="secondary" @click="onReject(booking.id)">
                                        <v-icon>{{icons.thumbDownOutline}}</v-icon>
                                        Reject
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-date-picker
                                    :value="[booking.startDate,booking.endDate]"
                                    landscape
                                    disabled
                                    :selected-items-text="`From:</br>
                            ${booking.startDate.substr(5,5).replace('-','.')}</br>
                            To:</br>
                            ${booking.endDate.substr(5,5).replace('-','.')}`"
                                    multiple
                                    readonly
                            ></v-date-picker>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" lg="6" class="py-0">
                    <v-row>
                        <v-col>
                            <v-card class="elevation-1">
                                <v-row
                                        align="end"
                                        class="fill-height"
                                >
                                    <v-col
                                            align-self="start"
                                            class="py-0"
                                    >
                                        <v-avatar
                                                class="profile"
                                                color="grey"
                                                size="164"
                                                style="float: left; border-bottom-left-radius: 4px; border-top-left-radius: 4px"
                                                tile
                                        >
                                            <v-img :src="booking.renter.photo.fileLink ? booking.renter.photo.fileLink:''"></v-img>
                                        </v-avatar>
                                        <v-list-item color="rgba(0, 0, 0, .4)">
                                            <v-list-item-content>
                                                <v-list-item-title class="title">
                                                    {{booking.renter.firstName+' '+booking.renter.lastName}}
                                                </v-list-item-title>
                                                <v-list-item-subtitle>{{booking.renter.phNumber}}</v-list-item-subtitle>
                                                <v-list-item-subtitle>Reservation created: {{(new Date(booking.createdAt)).toDateString()}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
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
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {mdiClose, mdiThumbDownOutline, mdiThumbUpOutline} from "@mdi/js";
    import {photoLink} from "../../assets/helperFunctions";

    export default {
        name: "BookingCard",
        props:['showClose', 'height'],
        computed: {
            ...mapGetters('Marina', ['getCurrent', 'getAll']),
            ...mapGetters('Bookings', {
                booking: 'getCurrentBooking',
            }),
        },
        data: function () {
            return {
                icons: {
                    close: mdiClose,
                    thumbUpOutline: mdiThumbUpOutline,
                    thumbDownOutline: mdiThumbDownOutline,
                },
                sailImg: require("../../assets/sailBoat.jpg"),
                powerImg: require("../../assets/powerBoat.jpg"),
                sailLazy: require("../../assets/sailBoat.webp"),
                powerLazy: require("../../assets/powerBoat.webp"),
            }
        },
        methods: {
            ...mapActions('Bookings', ['approve', 'reject', 'fetchBookings']),
            ...mapActions('File', ['downloadFile']),
            display(value) {
                return value? value : '—';
            },
            displayArray(value) {
                return this.isValidArray(value) ? value.length  : "—"
            },
            isValidArray(value) {
                return value ? value.length > 0 : false;
            },
            async onReject(id) {
                await this.reject(id);
                await this.fetchBookings(this.getAll[this.getCurrent].id);
            },
            async onApprove(id) {
                await this.approve(id);
                await this.fetchBookings(this.getAll[this.getCurrent].id);
            },
            statusColor(status) {
                switch (status) {
                    case ('NEW'):
                        return 'blue lighten-3';
                    case ('REJECTED'):
                        return 'red lighten-3';
                    case ('APPROVED'):
                        return 'green lighten-3';
                    case ('IN_PROGRESS'):
                        return 'yellow ';
                }
            },
            toLink(link) {
                return photoLink(link);
            },
        }
    }
</script>

<style scoped>

</style>