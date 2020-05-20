<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Messages.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container
            fluid
            class="py-0"
            v-resize="updateHeight"
    >
        <v-row justify="start" align="start">
            <v-col sm="7" md="5" class="py-0" >
                    <v-toolbar
                            id="toolbar"
                            class="elevation-0"
                    >
                        <v-toolbar-title>Messages</v-toolbar-title>
                    
                        <v-spacer></v-spacer>
                    
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>
                
                    <v-list
                            two-line
                            class="overflow-y-auto py-0"
                            style="overflow: hidden"
                            :max-height="listHeight"
                            id="list"
                    >
                        <template v-for="(item, index) in items">
                            <v-subheader
                                    v-if="item.header"
                                    :key="item.header"
                                    inset
                            >
                                {{ item.header }}
                            </v-subheader>
                        
                            <v-divider
                                    v-else-if="item.divider"
                                    :key="index"
                                    inset
                            ></v-divider>
                        
                            <v-list-item
                                    v-else
                                    :key="item.title"
                                    ripple
                            >
                                <v-list-item-avatar>
                                    <img :src="item.avatar" alt="">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="item.title"></v-list-item-title>
                                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
            </v-col>
            <v-col v-if="!isMobile" class="py-0">
                <v-row  justify="center" align="start">
                    <v-col class="pa-0">
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
                                            :key="i+'message'"
                                    >
                                        {{m}}
                                    </div>
                                </div>
                            </transition-group>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row justify="center" align="end" >
                    <v-col class="pa-0">
                        <v-card tile id="messageInput" class="elevation-0">
                            <v-card-text>
                                <v-text-field
                                        v-model="msg"
                                        @change="addMessage"
                                        hide-details
                                        placeholder="Write a message"
                                        filled
                                        rounded
                                ></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Messages",
        computed: {
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
        },
        data () {
            return {
                msg: null,
                listHeight: 0,
                messagesContainerHeight: 0,
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
                this.listHeight = (window.innerHeight - 84/*footer+appbar*/ - h_toolbar) + "px";
                this.messagesContainerHeight = (window.innerHeight - 84/*footer+appbar*/ - 88) + "px";
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