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
                        <v-text-field
                                hide-details
                                filled
                                dense
                                placeholder="Search..."
                                rounded
                                single-line
                        ></v-text-field>
                    </v-toolbar>
                
                    <v-list
                            two-line
                            class="overflow-y-auto py-0"
                            style="overflow: hidden"
                            :max-height="listHeight"
                            id="list"
                    >
                        <v-list-item-group
                                v-if="chats.length>0"
                                v-model="selected"
                        >
                            <template v-for="(item, index) in chats">
                                <v-list-item
                                        :key="index"
                                        ripple
                                >
                                    <v-list-item-avatar>
                                        <v-img
                                                v-if="item.avatar"
                                                :src="avatarLink(item.avatar)"/>
                                        <span
                                                v-else-if="item.title"
                                                class="display-3 white--text">
                                            {{item.title.substr(0,1)}}
                                        </span>
                                        <v-icon v-else dark>{{icons.accountCircle}}</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{item.title}}</v-list-item-title>
                                        <v-list-item-subtitle>{{messagePreview(item.lastMessage)}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-chip color="primary" small v-if="item.totalOffset - item.accountOffset > 0">
                                            {{item.totalOffset - item.accountOffset}}
                                        </v-chip>
                                        <v-list-item-action-text>
                                            {{item.ago}}
                                        </v-list-item-action-text>
                                    </v-list-item-action>
                                </v-list-item>
                            </template>
                        </v-list-item-group>
                        <v-list-item v-else>
                            <v-list-item-title>
                                No chats yet...
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
            </v-col>
            <v-col cols="0" sm="7" md="8" class="py-0">
                <ChatCard v-if="chatCard"></ChatCard>
            </v-col>
        </v-row>
        <v-dialog fullscreen v-model="chatDialog">
            <ChatCard
                    v-if="show"
                    @close="onChatDialogClose"
            ></ChatCard>
        </v-dialog>
    </v-container>
</template>

<script>
    import {mdiAccountCircle, mdiMagnify} from "@mdi/js";
    import {mapActions, mapGetters} from "vuex";
    import BerthyAPI from "../../services/berthy-api";

    export default {
        name: "Messages",
        components: {
            ChatCard: ()=>import("../../components/ChatComponents/ChatCard"),
        },
        computed: {
            ...mapGetters('Chat', {
                chats: 'getMyChats',
                current: "getCurrent"
            }),
            selected: {
                get() {
                    return this.selectedChatIndex;
                },
                async set(value) {
                    this.$store.commit('Chat/SET_CURRENT', this.chats[value]);
                    if (this.chats[value])
                        await this.getChatMessages({
                            id: this.chats[value].id,
                            start: this.chats[value].totalOffset - 50,
                            end: this.chats[value].totalOffset,
                            
                        });
                    this.selectedChatIndex = value;
                    this.show = value != null;
                }
            },
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
                icons: {
                    magnify: mdiMagnify,
                    accountCircle: mdiAccountCircle,
                },
                selectedChatIndex: null,
                show: false,
                listHeight: 0,
                interval: null,
            }
        },
        methods: {
            ...mapActions('Chat', [
                'getAllMyChats',
                'getChatMessages'
            ]),
            ...mapActions('Sockets', {
                initWebSocket:  'init',
            }),
            updateHeight() {
                let h_toolbar = document.getElementById('toolbar').style.height.substr(0, 2);
                this.listHeight = (window.innerHeight - 84/*footer+appbar*/ - h_toolbar) + "px";
            },
            messagePreview(message) {
                return message.type==='TEXT' ? message.text : "not a text message"
            },
            onChatDialogClose() {
                this.show = false;
                this.selected = undefined;
            },
            avatarLink(link) {
                if (link.substr(0,10)==='/api/files') {
                    return BerthyAPI.defaults.baseURL.slice(0, -5) + '' + link;
                } else {
                    return link;
                }
            }
        },
        async mounted() {
            this.interval = setInterval(async ()=>{
                if (this.$store.getters['User/getID']) {
                    clearInterval(this.interval);
                    await this.getAllMyChats();
                    this.initWebSocket();
                }
            },50);
        },
        beforeDestroy() {
            clearInterval(this.interval);
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