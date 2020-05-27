<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Profile.vue is proprietary and confidential.                  -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
    >
        <v-row align="start" justify="center">
            <v-col>
                <v-card tile class="elevation-0">
                    <v-card-text>
                        <v-row align="start" justify="center" no-gutters>
                            <v-col>
                                <v-avatar
                                        style="float: left"
                                        size="116px"
                                        class="mr-4"
                                >
                                    <v-img :src="photo ? photo : ''"/>
                                </v-avatar>
                                <p class="subtitle-1 font-weight-bold mb-0">
                                    {{type}} {{subtitle}}
                                </p>
                                <p class="display-3 font-weight-black mb-0">
                                    {{name}}
                                </p>
                                
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-dialog v-model="dialogEditProfile"
                                  :fullscreen="isMobile"
                                  max-width="600px"
                        >
                            <template v-slot:activator="{on}">
                                <v-btn text v-on="on">
                                    <v-icon>{{icons.pencil}}</v-icon>
                                    Edit Account
                                </v-btn>
                            </template>
                            <v-toolbar color="primary" dark>
                                <v-toolbar-title>Edit Account</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="dialogEditProfile=false">
                                    <v-icon>{{icons.close}}</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <EditProfileCard @close-edit-profile="dialogEditProfile=false"></EditProfileCard>
                        </v-dialog>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-if="dockmaster">
                <v-row>
                    <v-col cols="12"><p class="font-weight-black title">My Marinas</p></v-col>
                    <v-col
                            v-for="(marina, index) in marinas"
                            :key="index"
                            cols="12" sm="6" md="4" lg="3"
                    >
                        <v-card class="elevation-1">
                            <v-img
                                    :src="marina.photos.length ? toLink(marina.photos[0].fileLink) : marinaImg"
                                    :lazy-src="marinaLazy"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                            >
                                <v-card-title>{{marina.name}}</v-card-title>
                            </v-img>
        
                            <v-card-actions>
                                <v-chip class="primary">4 new notifications</v-chip>
                                <v-spacer></v-spacer>
    
                                <v-btn icon @click="toBookings(index)">
                                    <v-icon>{{icons.clipboardList}}</v-icon>
                                </v-btn>
                                <v-btn icon @click="toDashboard(index)">
                                    <v-icon>{{icons.viewDashboard}}</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
               
            </v-col>
            <v-col v-if="boater">
                <v-row>
                    <v-col cols="12"><p class="font-weight-black title">My Boats</p></v-col>
                    <v-col
                            v-for="(ship, index) in ships"
                            :key="index"
                            cols="12" sm="6" md="4" lg="3"
                    >
                        <v-card class="elevation-1">
                            <v-img
                                    :src="ship.photos.length ? toLink(ship.photos[0].fileLink)
                                                             : ship.type==='SAIL'
                                                             ? sailImg
                                                             : powerImg"
                                    :lazy-src="ship.type==='SAIL' ? sailLazy : powerLazy"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                            >
                                <v-card-title>{{ship.name}}</v-card-title>
                            </v-img>
                    
                            <v-card-actions>
                                <v-chip class="primary">4 new notifications</v-chip>
                                <v-spacer></v-spacer>
                        
                                <v-btn icon>
                                    <v-icon>{{icons.arrowRight}}</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {photoLink} from "../../assets/helperFunctions";
    import {mdiArrowRight, mdiCheck, mdiClipboardList, mdiClose, mdiPencil, mdiViewDashboard} from "@mdi/js";
    export default {
        name: "Profile",
        components: {
            EditProfileCard: ()=>import("../../components/ProfileComponents/EditProfileCard"),
        },
        computed: {
            ...mapGetters('User', {
                email: 'getEmail',
                name: 'getName',
                boater: 'boater',
                dockmaster: 'dockmaster',
                firstName: 'getFirstName',
                lastName: 'getLastName',
                moderator: 'isModerator',
                photo: 'getPhoto',
                phone: 'getPhone',
                error: "getError"
            }),
            ...mapGetters('Marina', {
                marinas: 'getAll'
            }),
            ...mapGetters('Ships', {
                ships: 'getShips',
            }),
            type() {
                if (this.boater) return 'Boater profile'
                if (this.dockmaster) return 'Dockmaster profile'
                if (this.moderator) return 'Moderator profile'
                return 'Profile';
            },
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
            subtitle() {
                if (this.dockmaster) {
                    let m = this.marinas.length;
                    let mtext = m===1 ? 'marina' : 'marinas';
                    return `${m} ${mtext}`
                }
                if (this.boater) {
                    let b = this.ships.length;
                    let btext = b===1 ? 'boat' : 'boats';
                    return `${b} ${btext}`
                }
                return 'No boats and marinas'
            }
        },
        data: function () {
            return {
                dialogEditProfile: false,
                disabled: true,
                sailImg: require("../../assets/sailBoat.jpg"),
                powerImg: require("../../assets/powerBoat.jpg"),
                marinaLazy: require("../../assets/marina.webp"),
                marinaImg: require("../../assets/marina.jpg"),
                sailLazy: require("../../assets/sailBoat.webp"),
                powerLazy: require("../../assets/powerBoat.webp"),
                saving: false,
                icons: {
                    arrowRight: mdiArrowRight,
                    check: mdiCheck,
                    pencil: mdiPencil,
                    close: mdiClose,
                    viewDashboard: mdiViewDashboard,
                    clipboardList: mdiClipboardList,
                },
            }
        },
        methods: {
            ...mapActions('User',['updateUserInfo']),
            ...mapActions('Marina',['fetchMyMarinas']),
            ...mapActions('Ships', {
                    updateShips: 'fetchShips',
            }),
            toLink(link) {
                return photoLink(link);
            },
            toBookings(index) {
                this.$store.commit('Marina/SELECT_MARINA', index);
                this.$router.push('/bookings');
            },
            toDashboard(index) {
                this.$store.commit('Marina/SELECT_MARINA', index);
                this.$router.push('/dashboard');
            }
        },
        async mounted() {
            await this.updateUserInfo();
            if (this.dockmaster && !this.marinas.length)
                await this.fetchMyMarinas();
            if (this.boater && !this.ships.length)
                await this.updateShips();
        },
    }
</script>

<style scoped>

</style>