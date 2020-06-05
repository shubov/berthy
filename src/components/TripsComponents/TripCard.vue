<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in TripCard.vue is proprietary and confidential.            -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-3">
        <v-img
                @click="$router.push(`/marina/${trip.berth.id}`)"
                :src="trip.berth.photos.length ? toLink(trip.berth.photos[0].fileLink) : marinaImg"
                :lazy-src="marinaLazy"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
        >
            <v-chip
                    label
                    dark
                    class="elevation-4"
                    style="float:right; margin: 0 5px 163px 0;"
                    :color="statusColor(trip.status)"
            >{{statusLabel(trip.status)}}</v-chip>
        </v-img>
        <v-card-title>{{trip.berth.name}}</v-card-title>
        <v-card-subtitle>From {{trip.startDate}} to {{trip.endDate}}</v-card-subtitle>
        <v-card-actions>
            <v-dialog
                    v-model="dialogDetails"
                    max-width="900px"
            >
                <template v-slot:activator="{on}">
                    <v-btn v-on="on" text>More Info</v-btn>
                </template>
                <v-toolbar
                        class="elevation-0"
                        color="primary" dark
                >
                    <v-toolbar-title>
                        {{trip.berth.name}}
                    </v-toolbar-title>
                    <v-chip
                            class="ml-2"
                            label
                            dark
                            :color="statusColor(trip.status)"
                    >{{statusLabel(trip.status)}}</v-chip>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogDetails=false">
                        <v-icon>{{icons.close}}</v-icon>
                    </v-btn>
                </v-toolbar>
                <TripDetails
                        :booking="trip"
                        @pay="onPay(trip.id)"
                        @cancel="onCancel()"
                ></TripDetails>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-btn
                    class="primary"
                    v-if="trip.status==='APPROVED'"
                    @click="onPay(trip.id)"
            >
                Pay €{{trip.serviceFee}}
            </v-btn>
            <v-btn
                    text
                    v-if="trip.status!=='REJECTED' && trip.status!=='CANCELLED'"
                    @click.once="onCancel"
            >
                Cancel
            </v-btn>
        </v-card-actions>
        <v-dialog :value="paymentDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Proceed to Tinkoff</v-card-title>
                <v-card-text>
                    Procceed to Tinkoff bank website to finish payment for the service fee of €{{trip.serviceFee}} and finalize your reservation at the {{trip.berth.name}} marina.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            text
                            @click.once="paymentDialog=false"
                    >Cancel</v-btn>
                    <v-btn
                            color="primary"
                            text
                            @click="goToTinkoff"
                    >Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    import {photoLink} from "../../assets/helperFunctions";
    import {mapActions} from "vuex";
    import {mdiClose} from "@mdi/js";

    export default {
        name: "TripCard",
        components: {
            TripDetails: ()=> import("./TripDetails"),
        },
        props: ['trip'],
        computed: {
        },
        data: function () {
            return {
                marinaLazy: require("../../assets/marina.webp"),
                marinaImg: require("../../assets/marina.jpg"),
                paymentDialog: false,
                tinkoffLink: null,
                dialogDetails: false,
                icons: {
                    close: mdiClose,
                }
            }
        },
        methods: {
            ...mapActions('Bookings',{
                pay: 'pay',
                cancel: 'cancel',
            }),
            toLink(link) {
                return photoLink(link);
            },
            statusColor(status) {
                switch (status) {
                    case ('NEW'):
                        return 'yellow darken-1';
                    case ('REJECTED'):
                        return 'red lighten-3';
                    case ('APPROVED'):
                        return 'blue lighten-3';
                    case ('PAYED'):
                        return 'green lighten-1';
                    case ('CANCELLED'):
                        return 'grey';
                }
            },
            statusLabel(status) {
                switch (status) {
                    case ('NEW'):
                        return 'Pending';
                    case ('REJECTED'):
                        return 'Rejected';
                    case ('APPROVED'):
                        return 'Confirmed';
                    case ('PAYED'):
                        return 'Paid';
                    case ('CANCELLED'):
                        return 'Cancelled';
                }
            },
            async onCancel(){
                if (await this.cancel(this.trip.id)) {
                    await this.$store.dispatch("Dialog/set", `Your reservation has been cancelled.`)
                } else {
                    await this.$store.dispatch("Snackbar/set", `Something is wrong cancelling your reservation.`)
                }
            },
            async onPay(id) {
                let link = await this.pay(id);
                if (link === false) {
                    await this.$store.dispatch("Snackbar/set", `Something is wrong with the payment.`)
                } else {
                    this.tinkoffLink = link;
                    this.paymentDialog = true;
                }
            },
            goToTinkoff() {
                this.paymentDialog = false;
                window.location.href = this.tinkoffLink;
            }
        }
    }
</script>

<style scoped>

</style>