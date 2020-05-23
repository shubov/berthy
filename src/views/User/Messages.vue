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
            <v-col cols="12" sm="5" md="4" class="py-0" >
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
                                    @click="show=true"
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
            <v-col cols="0" sm="7" md="8" class="py-0">
                <ChatCard v-if="chatCard"></ChatCard>
            </v-col>
        </v-row>
        <v-dialog fullscreen v-model="chatDialog">
            <ChatCard @close="show=false"></ChatCard>
        </v-dialog>
    </v-container>
</template>

<script>
    import ChatCard from "../../components/ChatComponents/ChatCard";
    export default {
        name: "Messages",
        components: {ChatCard},
        computed: {
            isMobile() {
                return !this.$vuetify.breakpoint.smAndUp;
            },
            chatDialog() {
                return this.show && this.isMobile;
            },
            chatCard() {
                return this.show && !this.isMobile;
            }
        },
        data () {
            return {
                show: false,
                listHeight: 0,
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
                let h_toolbar = document.getElementById('toolbar').style.height.substr(0, 2);
                this.listHeight = (window.innerHeight - 84/*footer+appbar*/ - h_toolbar) + "px";
            },
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
</style>