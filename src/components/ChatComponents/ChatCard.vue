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
                            :photo="current.avatar"
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
                        ref="messagesContainer"
                        id="messagesContainer"
                        :height="messagesContainerHeight"
                        class="overflow-y-auto py-0 elevation-0"
                        style="overflow: hidden"
                        tile
                >
                    <v-card-text class="d-flex flex-column py-0 my-1">
                        <v-btn
                                v-if="messages[0] && messages[0].offset != 1"
                                :disabled="loadingMessages"
                                @click="onLoadMore()"
                                text
                                align="center"
                        >Load more...</v-btn>
                        <div
                                v-for="m in messages"
                                :key="m.id"
                                class="pb-2"
                        >
                            <Avatar
                                    v-if="!isMyMsg(m) && current"
                                    :key="m.id+'avatar'"
                                    :photo="current.avatar"
                                    size="30px"
                                    :name="current.title[0] === 'i' ? null : current.title"
                            ></Avatar>
                            <div
                                    :class="isMyMsg(m)?'myMessage':'message'"
                                    :style="changeMessageWidth?'max-width: 220px':''"
                                    :key="m.id+'message'"
                                    :ref="m.offset"
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
                                @focus="scroll(current.totalOffset)"
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
        data: function () {
            return {
                icons: {
                    close: mdiClose,
                    send: mdiSend,
                },
                numOfMessages: 50,
                msg: null,
                start: null,
                end: null,
                messagesContainerHeight: 0,
                messagesContainerHeightNum: null,
                changeMessageWidth: false,
                loadingMessages: false,
                scrollInterval: null,
            }
        },
        methods: {
            ...mapActions('Chat', {
                sendMessage: 'sendMessage',
                getChatMessages:'getChatMessages',
            }),
            updateHeight() {
                let h_toolbar = document.getElementById('toolbar').style.height.substr(0,2);
                this.messagesContainerHeightNum = window.innerHeight - 88 -h_toolbar - (this.isMobile?0:84);
                this.messagesContainerHeight = this.messagesContainerHeightNum + "px"
                this.changeMessageWidth = !this.isMobile && window.innerWidth < 697;
            },
            async addMessage(){
                if (this.msg && this.msg.trim().length) {
                    await this.sendMessage({
                        id: this.current.id,
                        text: this.msg,
                    });
                    this.msg='';
                    setTimeout(()=>{
                        this.scroll(this.current.accountOffset);
                    }, 0);
                }
            },
            async scroll(offset) {
                let scrollOff = this.$refs[offset][0];
                if (offset+1 < this.current.totalOffset)
                    scrollOff = this.$refs[offset+2][0];

                await this.$vuetify.goTo(scrollOff,{
                    container: this.$refs.messagesContainer,
                    duration: 0,
                });
                if (offset !== this.current.totalOffset)
                    document.getElementById('messagesContainer').scrollTop
                        -= this.messagesContainerHeightNum;
            },
            isMyMsg(message) {
                return message.participantId === this.myID;
            },
            onLoadMore() {
                this.loadingMessages = true;
                setTimeout(async ()=> {
                    let id = this.current.id;
                    this.end = this.start - 1;
                    this.start = this. end - this.numOfMessages;
                    this.start = this.start > 0 ? this.start : 0;
                    await this.getChatMessages({
                        id,
                        start:this.start,
                        end:this.end,
                        append: true
                    });
                    await this.scroll(this.end+1);
                    this.loadingMessages = false;
                },0);
                
            },
        },
        mounted() {
            this.scrollInterval = setInterval(async ()=> {
                if (this.current.accountOffset
                    && this.$refs[this.current.accountOffset]) {
                    await this.scroll(this.current.accountOffset);
                    clearInterval(this.scrollInterval);
                }
            }, 100);
            if (this.messages.length) {
                this.start = this.messages[0].offset;
                this.end = this.messages[this.messages.length-1].offset;
            }
        },
        beforeDestroy() {
            clearInterval(this.scrollInterval);
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