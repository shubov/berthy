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
                            <v-icon>{{icons.magnify}}</v-icon>
                        </v-btn>
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
                                        <img :src="item.participants[0].photoLink" alt="">
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{fullName(item.participants[0])}}</v-list-item-title>
                                        <v-list-item-subtitle>{{messagePreview(item.lastMessage)}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
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
            <ChatCard @close="onChatDialogClose"></ChatCard>
        </v-dialog>
    </v-container>
</template>

<script>
    import {mdiMagnify} from "@mdi/js";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Messages",
        components: {
            ChatCard: ()=>import("../../components/ChatComponents/ChatCard"),
        },
        computed: {
            ...mapGetters('Chat', {
                chats: 'getMyChats'
            }),
            selected: {
                get() {
                    return this.selectedChatIndex;
                },
                async set(value) {
                    this.show = value != null;
                    this.$store.commit('Chat/SET_CURRENT', this.chats[value]);
                    if (this.chats[value])
                        await this.getChatMessages(this.chats[value].id)
                    this.selectedChatIndex = value;
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
                },
                selectedChatIndex: null,
                show: false,
                listHeight: 0,
            }
        },
        methods: {
            ...mapActions('Chat', [
                'getAllMyChats',
                'getChatMessages'
            ]),
            updateHeight() {
                let h_toolbar = document.getElementById('toolbar').style.height.substr(0, 2);
                this.listHeight = (window.innerHeight - 84/*footer+appbar*/ - h_toolbar) + "px";
            },
            fullName(person) {
                let res = (person.firstName ? person.firstName+' ' : '') + (person.lastName ? person.lastName : '');
                return (person.firstName || person.lastName) ? res : ('id' + person.id);
            },
            messagePreview(message) {
                return message.type==='TEXT' ? message.text : "not a text message"
            },
            onChatDialogClose() {
                this.show = false;
                this.selected = undefined;
            }
        },
        async created() {
            await this.getAllMyChats();
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