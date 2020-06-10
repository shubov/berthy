<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in TripsComponents.vue is proprietary and confidential.               -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container>
        <v-row v-if="trips.length">
            <v-col
                    cols="12" sm="6" md="4" lg="3"
                    v-for="(trip, index) in trips"
                    :key="index"
            >
                <TripCard :trip="trip" :key="index"></TripCard>
            </v-col>
        </v-row>
        <v-row v-else align="center" justify="center">
            <v-col align="center">
                <h3 class="text-center">You have no trips yet. Make your first booking!</h3>
                <v-btn class="primary text-center"  to="/book">Book</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Trips",
        props: ['paymentSuccessful'],
        components: {
            TripCard:()=>import("../../components/TripsComponents/TripCard"),
        },
        computed: {
            ...mapGetters('Bookings', {
                trips: 'getTrips',
            }),
        },
        data: function() {
            return {
            
            }
        },
        methods: {
            ...mapActions('Bookings', {
                fetchTrips: 'fetchTrips'
            })
        },
        async created() {
            if (this.trips.length < 1)
                await this.fetchTrips();
        },
        mounted() {
            if (this.paymentSuccessful != null) {
                if (this.paymentSuccessful) {
                    this.$store.dispatch('Dialog/set', "Payment was succesful. Yor reservation proccess is now finished.")
                } else {
                    this.$store.dispatch("Snackbar/set", `Payment wasn't finished. Try again.`)
                }
            }
        }
    }
</script>

<style scoped>

</style>