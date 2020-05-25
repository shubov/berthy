<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in MarinaApplicationCard.vue is proprietary and confidential.    -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card tile
            :class="!showClose ? 'overflow-y-auto elevation-0' : ''"
            :style="!showClose ? 'overflow: hidden' : ''"
            :max-height="height"
    >
        <v-toolbar class="elevation-0">
            <v-toolbar-title>
                Application №{{application.id}}
            </v-toolbar-title>
            <v-chip
                    class="ml-2"
                    label
                    dark
                    :color="statusColor(application.status)"
            >{{application.status}}</v-chip>
            <v-spacer></v-spacer>
            <v-btn v-show="showClose" icon @click="$emit('close')">
                <v-icon>{{icons.close}}</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-actions>
            <v-row class="mx-1">
                <v-col cols="12" lg="4">
                    <v-btn block large class="info" @click="onStart(application.id)">
                        <v-icon>{{icons.chatPlusOutline}}</v-icon>
                        Start
                    </v-btn>
                </v-col>
                <v-col cols="6" lg="4">
                    <v-btn block large class="success" @click="onApprove(application.id)">
                        <v-icon>{{icons.thumbUpOutline}}</v-icon>
                        Approve
                    </v-btn>
                </v-col>
                <v-col cols="6" lg="4">
                    <v-btn block large class="secondary" @click="onReject(application.id)">
                        <v-icon>{{icons.thumbDownOutline}}</v-icon>
                        Reject
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            label="Decision"
                            :value="decision"
                            @input="decision=$event"
                            outlined
                            hide-details
                            dense
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-actions>
        <v-card-title>{{marina.name}}</v-card-title>
        <v-card-subtitle>Application submitted {{application.ago}}</v-card-subtitle>
        <v-card-text>
            <p class="mb-0"
               @click="showPhotos=!showPhotos"
            >Attachments:
                <b>{{displayArray(application.attachments)}}</b>
            </p>
            <a v-for="file in application.attachments"
               :key="file.fileId"
               :href="'https://egehackbot.cf:8080'+file.fileLink"
               target="_blank">
                <v-chip
                
                        class="mb-1 mr-1"
                >
                    {{ file.fileName }}
                </v-chip></a>
            <p>Comment:
                <b>{{display(application.description)}}</b></p>
            <div class="ml-2">
                <p>Name:
                    <b>{{display(marina.name)}}</b></p>
                <p>Description:
                    <b>{{display(marina.description)}}</b>
                </p>
                <p>Lattitude:
                    <b>{{display(marina.lat)}}</b>
                </p>
                <p>Longitude:
                    <b>{{display(marina.lng)}}</b>
                </p>
                <p>Telephone:
                    <b>{{display(marina.phNumber)}}</b>
                </p>
                <p>Country(phone):
                    <b>{{ display(marina.phCode)}}</b>
                </p>
                <p>Radio:
                    <b>{{ display(marina.radio)}}</b>
                </p>
                <p class="mb-0">
                    Photos:
                    <b>{{displayArray(marina.photos)}}</b>
                </p>
                <a
                   v-for="photo in marina.photos"
                   :key="photo.fileId"
                   :href="'https://egehackbot.cf:8080'+photo.fileLink"
                   target="_blank">
                <v-chip
                        
                        class="mb-1 mr-1"
                >
                    {{ photo.fileName }}
                </v-chip></a>
                <p class="mb-0"><br/>Amenities:
                    <b>{{displayArray(marina.amenities)}} / {{numOfAmenities}}</b>
                </p>
                <v-chip
                        v-for="a in marina.amenities"
                        :key="a.key"
                        class="mb-1 mr-1"
                >
                    <v-avatar left>
                        <v-icon>{{a.icon}}</v-icon>
                    </v-avatar>
                    {{ a.value }}
                </v-chip>
                <p class="mb-0"><br/>
                    Places:
                    <b>{{displayArray(marina.places)}}</b>
                </p>
                <p
                        v-for="(p,i) in marina.places"
                        :key="p.name"
                        class="ml-2"
                >
                    #{{i}} Name: <b>{{p.name}}</b> Price: <b>{{p.price}}</b> <br/>
                    Length: <b>{{p.length}}</b> Draft: <b>{{p.draft}}</b> Width: <b>{{p.width}}</b>
                </p>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {mdiChatPlusOutline, mdiClose, mdiThumbDownOutline, mdiThumbUpOutline} from "@mdi/js";

    export default {
        name: "MarinaApplicationCard",
        props:['showClose', 'height'],
        computed: {
            ...mapGetters('Moderator', {
                application: 'getCurrentApplication',
            }),
            ...mapGetters('Marina', {
                marina: 'getPublicMarina',
            }),
            ...mapGetters('Amenities', {
                numOfAmenities: 'getLength',
            }),
            decision: {
                get()  {
                    return this.$store.state.Moderator.decision;
                },
                set(value) {
                    this.$store.commit("Moderator/UPDATE_DECISION", value);
                }
            }
        },
        data: function() {
            return {
                icons: {
                    close: mdiClose,
                    chatPlusOutline: mdiChatPlusOutline,
                    thumbUpOutline: mdiThumbUpOutline,
                    thumbDownOutline: mdiThumbDownOutline,
                }
            }
        },
        async created() {
            if(this.numOfAmenities === 0) {
                await this.availableAmenities();
            }
        },
        methods: {
            ...mapActions('Moderator', ['approve', 'reject', 'start', 'fetchApplications']),
            ...mapActions('Amenities', ['availableAmenities']),
            display(value) {
                return value? value : '—';
            },
            displayArray(value) {
                return this.isValidArray(value) ? value.length  : "—"
            },
            isValidArray(value) {
                return value ? value.length > 0 : false;
            },
            async onStart(id) {
                 await this.start(id);
                await this.fetchApplications();
            },
            async onReject(id) {
                await this.reject(id);
                await this.fetchApplications();
            },
            async onApprove(id) {
                await this.approve(id);
                await this.fetchApplications();
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
        }
    }
</script>

<style scoped>

</style>