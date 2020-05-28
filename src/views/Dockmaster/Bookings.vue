<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Moderator.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            class="py-0"
            v-resize="updateHeight"
    >
        <v-row justify="start" align="start">
            <v-col cols="12" sm="5" class="py-0" >
                <v-toolbar
                        class="elevation-0"
                        id="toolbar"
                >
                    <v-menu v-if="!selected.length && getAll.length>1">
                        <template v-slot:activator="{ on: menu, attrs }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on: tooltip }">
                                    <v-btn icon v-on="{ ...tooltip, ...menu }" v-bind="attrs">
                                        <v-icon>{{icons.clipboardMultipleOutline}}</v-icon>
                                    </v-btn>
                                </template>
                                <span>Switch to another marina</span>
                            </v-tooltip>
                        </template>
                        <v-list>
                            <v-subheader>My marinas</v-subheader>
                            <v-list-item
                                    v-for="(marina, index) in getAll"
                                    :key="index"
                                    @click="changeMarina(index)"
                            >
                                <v-list-item-title>{{marina.name}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-text-field
                            v-if="!selected.length"
                            hide-details
                            filled
                            dense
                            placeholder="Search..."
                            rounded
                            :value="search"
                            @input="search=$event"
                            single-line
                    ></v-text-field>
                    <v-btn icon v-if="!selected.length" @click="multiple = !multiple">
                        <v-icon>{{icons.dotsVertical}}</v-icon>
                    </v-btn>
                    
                    <v-btn v-if="selected.length"
                           icon
                           :loading="loadingApproveMultiple"
                           @click="onApproveMultiple()">
                        <v-icon color="success">{{icons.thumbUpOutline}}</v-icon>
                    </v-btn>
                    <v-btn v-if="selected.length"
                           icon
                           :loading="loadingRejectMultiple"
                           @click="onRejectMultiple()">
                        <v-icon color="secondary">{{icons.thumbDownOutline}}</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="selected.length">
                        {{`${selected.length} selected`}}
                    </v-toolbar-title>
                    <v-spacer v-if="selected.length"></v-spacer>
                    <v-btn
                            v-if="selected.length"
                            icon
                            @click="()=>{selected = [];multiple=false;}"
                    >
                        <v-icon>{{icons.close}}</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-list
                        two-line
                        tile
                        class="overflow-y-auto py-0"
                        style="overflow: hidden"
                        :max-height="listHeight"
                        id="list"
                >
                    <v-list-item-group
                            v-model="selected"
                            :multiple="multiple"
                    >
                        <template v-for="(item, index) in bookingsToShow">
                            <v-list-item
                                    :key="item.id"
                                    @click="openBooking(index)"
                            >
                                <template
                                        v-slot:default="{active}"
                                >
                                    <v-list-item-avatar v-if="multiple" dark size="15px">
                                        <v-icon small color="#00000099">
                                            {{
                                            active
                                            ? icons.checkboxMarkedCircleOutline
                                            : icons.checkboxBlankCircleOutline
                                            }}
                                        </v-icon>
                                    </v-list-item-avatar>
                                    
                                    <v-list-item-content>
                                        <v-list-item-title >{{item.startDate}}/{{item.endDate}}</v-list-item-title>
                                        <v-list-item-subtitle class="text--primary">Place: {{item.berthPlace.name}}</v-list-item-subtitle>
                                        <v-list-item-subtitle>
                                            {{item.renter.firstName+' '+item.renter.lastName+': '+item.ship.model.producer+' '+item.ship.model.model}}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    
                                    <v-list-item-action>
                                        <v-list-item-action-text>{{item.ago}}</v-list-item-action-text>
                                        <v-chip
                                                label
                                                dark
                                                :color="statusColor(item.status)"
                                        >{{item.status}}</v-chip>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                            
                            <v-divider
                                    v-if="index + 1 < bookings.length"
                                    :key="index"
                            ></v-divider>
                        </template>
                        <v-list-item v-show="bookingsToShow.length<1">
                            <v-list-item-content>
                                <v-list-item-title>
                                    No bookings found...
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols="12" sm="7" class="py-0">
                <BookingCard
                        v-if="isComponent"
                        :height="bookingCardHeight"
                ></BookingCard>
                <v-dialog
                        v-if="isDialog"
                        v-model="dialog"
                        fullscreen
                        transition="dialog-bottom-transition"
                >
                    <BookingCard
                            @close="onDialogClose()"
                            :showClose="dialog"
                    ></BookingCard>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {
        mdiCheckboxBlankCircleOutline,
        mdiCheckboxMarkedCircleOutline, mdiClipboardMultipleOutline,
        mdiClose,
        mdiDotsVertical, mdiMagnify,
        mdiThumbDownOutline,
        mdiThumbUpOutline
    } from "@mdi/js";
    
    export default {
        name: "Bookings",
        components: {
            BookingCard: ()=>import("../../components/MarinaBookingsComponents/BookingCard"),
        },
        computed: {
            ...mapGetters('Marina', ['getCurrent', 'getAll']),
            ...mapGetters('Bookings', {
                bookings: 'getBookings',
                booking:'getCurrentBooking'
            }),
            marina() {
                return this.getAll[this.getCurrent];
            },
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
            selected: {
                get() {
                    return this.selectedValue;
                },
                set(value) {
                    this.selectedValue = value==null ? [] : value;
                }
            },
            isDialog(){
                return this.isMobile && this.dialog;
            },
            isComponent(){
                return !this.isMobile && this.show;
            },
            filtered(){
                return this.filteredBookings.length>0;
            },
            bookingsToShow() {
              return this.filtered ? this.filteredBookings : this.bookings;
            },
            search: {
                get() {
                    return this.searchQuery;
                },
                set(value) {
                    if (value.toString().length<1)
                        this.filteredBookings = [];
                    else {
                        this.filteredBookings = this.bookings.filter(({renter, ship})=>{
                            return this.strIncludes(renter.firstName, value)
                                || this.strIncludes(renter.lastName, value)
                                || this.strIncludes(ship.model.model, value)
                                || this.strIncludes(ship.model.producer, value);
                        })
                    }
                }
            }
        },
        data: function () {
            return {
                searchQuery: null,
                filteredBookings: [],
                selectedValue: [],
                show: false,
                dialog: false,
                multiple: false,
                listHeight: null,
                bookingCardHeight: null,
                loadingApproveMultiple: false,
                loadingRejectMultiple: false,
                offsetTop: 0,
                filterMenu: false,
                icons: {
                    clipboardMultipleOutline: mdiClipboardMultipleOutline,
                    magnify: mdiMagnify,
                    close: mdiClose,
                    dotsVertical: mdiDotsVertical,
                    thumbUpOutline: mdiThumbUpOutline,
                    thumbDownOutline: mdiThumbDownOutline,
                    checkboxMarkedCircleOutline: mdiCheckboxMarkedCircleOutline,
                    checkboxBlankCircleOutline: mdiCheckboxBlankCircleOutline,
                }
            }
        },
        methods: {
            ...mapActions('Bookings', ['fetchBookings', 'updateCurrent', 'approve', 'reject']),
            ...mapActions('Marina', ['fetchMyMarinas']),
            async onDialogClose() {
                this.dialog=false;
                this.show=false;
                this.multiple = false;
                await this.updateCurrent(null);
            },
            async openBooking(id) {
                if (id === this.$store.state.Bookings.current || this.multiple) return;
                if (await this.updateCurrent(id)) {
                    if(this.isMobile) this.dialog = true;
                    else this.show = true;
                }
            },
            statusColor(status) {
                switch (status) {
                    case ('NEW'):
                        return 'blue lighten-3';
                    case ('REJECTED'):
                        return 'red lighten-3';
                    case ('APPROVED'):
                        return 'green lighten-3';
                    case ('PAYED'):
                        return 'primary ';
                }
            },
            onRejectMultiple() {
                this.loadingRejectMultiple = true;
                this.selected.forEach((index)=>{
                    this.reject(this.bookings[index].id);
                });
                setTimeout(async ()=>{
                    await this.fetchBookings(this.marina.id);
                    this.multiple=false;
                    this.selected=[];
                    this.loadingRejectMultiple = false;
                }, 1000)
            },
            onApproveMultiple() {
                this.loadingApproveMultiple = true;
                this.selected.forEach((index)=>{
                    this.approve(this.bookings[index].id)
                });
                setTimeout(async ()=> {
                    await this.fetchBookings(this.marina.id);
                    this.multiple=false;
                    this.selected=[];
                    this.loadingApproveMultiple = false;
                },1000);

            },
            updateHeight() {
                let toolbar = document.getElementById('toolbar');
                if (!toolbar) return;
                let h = toolbar.style.height.substr(0,2);
                this.listHeight = (window.innerHeight - 84 - h) + "px";
                this.bookingCardHeight = (window.innerHeight - 84) + "px";
            },
            async changeMarina(index) {
                this.$store.commit('Marina/SELECT_MARINA', index);
                await this.updateBookings();
            },
            async updateBookings() {
                await this.fetchBookings(this.marina.id);
                if (this.bookings.length === 0) {
                    this.$store.dispatch("snackbar", `No bookings for ${this.marina.name} yet.`)
                }
            },
            strIncludes(value1, value2) {
                return value1.toString().toLowerCase().includes(value2.toString().toLowerCase());
            },
        },
        async created() {
            if (!this.getAll.length)
                await this.fetchMyMarinas();
            if (this.marina.id)
                await this.updateBookings();
            else
                this.$store.dispatch("snackbar", `You have yet no marinas.`)
        },
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: transparent;
    }
</style>