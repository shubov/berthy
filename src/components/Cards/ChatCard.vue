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
                <v-toolbar class="elevation-0" id="toolbar">
                    <v-toolbar-title>Person</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn v-show="isMobile" icon @click="$emit('close')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card
                        id="messagesContainer"
                        :height="messagesContainerHeight"
                        class="overflow-y-auto py-0 elevation-0"
                        style="overflow: hidden"
                        tile
                >
                    <transition-group name="list-complete" tag="v-card-text" class="d-flex flex-column">
                        <div
                                v-for="(m,i) in messages"
                                :key="i+'w'"
                                class="py-1 px-4"
                        >
                            <v-avatar
                                    v-if="i%2===0"
                                    :key="i+'avatar'"
                                    size="30px"
                            >
                                <v-img src="https://picsum.photos/250/300?image=821"></v-img>
                            </v-avatar>
                            <div
                                    :class="i%2===0?'message':'myMessage'"
                                    :style="changeMessageWidth?'max-width: 220px':''"
                                    :key="i+'message'"
                            >
                                {{m}}
                            </div>
                        </div>
                    </transition-group>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" align="end" class="mx-0">
            <v-col class="pa-0">
                <v-card tile id="messageInput" class="elevation-0">
                    <v-card-text>
                        <v-text-field
                                v-model="msg"
                                @change="addMessage"
                                hide-details
                                placeholder="Write a message"
                                append-outer-icon="mdi-send"
                                @click:append-outer="addMessage"
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
    export default {
        name: "ChatCard",
        computed: {
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
        },
        data () {
            return {
                msg: null,
                messagesContainerHeight: 0,
                changeMessageWidth: false,
                messages: ['1Hello', '2Hello', '3Hello', 'Hello', 'Hello', 'Hello', 'Hello', 'Hello', 'https://picsum.photos/250/300?image=660 https://picsum.photos/250/300?image=660 https://picsum.photos/250/300?image=660 https://picsum.photos/250/300?image=660 https://picsum.photos/250/300?image=660', 'Hello', '12Hello', '13Hello', '14Hello', '15Hello'],
                items: [
                    {
                        header: 'Today',
                    },
                    { divider: true },
                    {
                        avatar: 'https://picsum.photos/250/300?image=660',
                        title: 'Meeting @ Noon',
                        subtitle:
                            "<span class='font-weight-bold'>Spike Lee</span> &mdash; I'll be in your neighborhood",
                    },
                    {
                        avatar: 'https://picsum.photos/250/300?image=821',
                        title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
                        subtitle:
                            "<span class='font-weight-bold'>to Operations support</span> &mdash; Wish I could come.",
                    },
                    {
                        avatar: 'https://picsum.photos/250/300?image=783',
                        title: 'Yes yes',
                        subtitle:
                            "<span class='font-weight-bold'>Bella</span> &mdash; Do you have Paris recommendations",
                    },
                    {
                        header: 'Yesterday',
                    },
                    { divider: true },
                    {
                        avatar: 'https://picsum.photos/250/300?image=1006',
                        title: 'Dinner tonight?',
                        subtitle:
                            "<span class='font-weight-bold'>LaToya</span> &mdash; Do you want to hang out?",
                    },
                    {
                        avatar: 'https://picsum.photos/250/300?image=146',
                        title: 'So long',
                        subtitle:
                            "<span class='font-weight-bold'>Nancy</span> &mdash; Do you see what time it is?",
                    },
                    {
                        header: 'Last Week',
                    },
                    { divider: true },
                    {
                        avatar: 'https://picsum.photos/250/300?image=1008',
                        title: 'Breakfast?',
                        subtitle:
                            "<span class='font-weight-bold'>LaToya</span> &mdash; Do you want to hang out?",
                    },
                    {
                        avatar: 'https://picsum.photos/250/300?image=839',
                        title:
                            'Winter Porridge <span class="grey--text text--lighten-1"></span>',
                        subtitle:
                            "<span class='font-weight-bold'>cc: Daniel</span> &mdash; Tell me more...",
                    },
                    {
                        avatar: 'https://picsum.photos/250/300?image=145',
                        title: 'Oui oui',
                        subtitle:
                            "<span class='font-weight-bold'>Nancy</span> &mdash; Do you see what time it is?",
                    },
                ],
            }
        },
        methods: {
            updateHeight() {
                let h_toolbar = document.getElementById('toolbar').style.height.substr(0,2);
                this.messagesContainerHeight =
                    (window.innerHeight - 88 -h_toolbar - (this.isMobile?0:84)) + "px";
                this.changeMessageWidth = !this.isMobile && window.innerWidth < 697;
            },
            addMessage(){
                if (this.msg.trim().length) {
                    this.messages.push(this.msg);
                    setTimeout(()=>{
                        this.scroll();
                        this.msg='';
                    }, 300);
                }
            },
            scroll() {
                document.getElementById('messagesContainer').scrollTop = 200000;
            }
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