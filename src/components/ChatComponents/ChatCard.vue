<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in ChatCard.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-0 pa-0 ma-0" v-resize="updateHeight">
        <v-row justify="center" align="start" class="mx-0">
            <v-col class="pa-0">
                <v-toolbar class="elevation-0" id="toolbar" v-if="current">
                    <Avatar
                            :photo="current.participants[0].photoLink"
                            size="30px"
                            :name="current.title"
                    ></Avatar>
                    <v-toolbar-title class="ml-4">{{current.title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn v-show="isMobile" icon @click="$emit('close')">
                        <v-icon>{{icons.close}}</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card
                        id="messagesContainer"
                        :height="messagesContainerHeight"
                        class="overflow-y-auto py-0 elevation-0"
                        style="overflow: hidden"
                        tile
                >
                    <v-card-text class="d-flex flex-column">
                        <div
                                v-for="(m,i) in messages"
                                :key="i+'w'"
                                class="py-1"
                        >
                            <Avatar
                                    v-if="!isMyMsg(m) && current"
                                    :key="i+'avatar'"
                                    :photo="current.participants[0].photoLink"
                                    size="30px"
                                    :name="current.title"
                            ></Avatar>
                            <div
                                    :class="isMyMsg(m)?'myMessage':'message'"
                                    :style="changeMessageWidth?'max-width: 220px':''"
                                    :key="i+'message'"
                            >
                                {{m.text}}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" align="end" class="mx-0">
            <v-col class="pa-0">
                <v-card tile id="messageInput" class="elevation-0">
                    <v-card-text>
                        <v-text-field
                                @focus="scroll"
                                @input="msg=$event"
                                :value=msg
                                @keyup.enter="addMessage"
                                hide-details
                                placeholder="Write a message"
                                :append-outer-icon="icons.send"
                                @click:append-outer.prevent="addMessage"
                                filled
                                rounded
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import {mdiClose, mdiSend} from "@mdi/js";
    import {mapActions, mapGetters} from "vuex";
    import Avatar from "../Avatar";

    export default {
        name: "ChatCard",
        components: {Avatar},
        computed: {
            ...mapGetters('Chat', {
                current: 'getCurrent',
                messages: 'getMessages'
            }),
            ...mapGetters('User', {
                myID: 'getID'
            }),
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
        },
        data () {
            return {
                icons: {
                    close: mdiClose,
                    send: mdiSend,
                },
                msg: null,
                messagesContainerHeight: 0,
                changeMessageWidth: false,
            }
        },
        methods: {
            ...mapActions('Chat', [
                'getChatMessages',
                'sendMessage'
            ]),
            updateHeight() {
                let h_toolbar = document.getElementById('toolbar').style.height.substr(0,2);
                this.messagesContainerHeight =
                    (window.innerHeight - 88 -h_toolbar - (this.isMobile?0:84)) + "px";
                this.changeMessageWidth = !this.isMobile && window.innerWidth < 697;
            },
            async addMessage(){
                if (this.msg.trim().length) {
                    await this.sendMessage({
                        id: this.current.id,
                        text: this.msg,
                    });
                    await this.getChatMessages(this.current.id);
                    setTimeout(()=>{
                        this.scroll();
                        this.msg='';
                    }, 0);
                }
            },
            scroll() {
                document.getElementById('messagesContainer').scrollTop = 200000;
            },
            isMyMsg(message) {
                return message.participantId === this.myID;
            },
        },
        mounted() {
            this.scroll();
        }
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
    .myMessage {
        float: right;
        background-color: rgba(255, 0, 0, 0.6);
        border-radius: 18px;
        padding: 10px;
        white-space: initial;
        color: white;
        max-width: 300px;
        display: inline-block;
        margin-left: 2px;
    }
    .message {
        background-color: rgba(0, 0, 0, 0.06);
        border-radius: 18px;
        padding: 10px;
        white-space: initial;
        max-width: 300px;
        display: inline-block;
        margin-left: 2px;
    }
</style>