<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Requests.vue is proprietary and confidential.                 -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

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
            class="py-0"
            v-resize="updateHeight"
    >
        <v-row justify="start" align="start">
            <v-col sm="5" class="py-0" >
                <v-toolbar
                        class="elevation-0"
                        id="toolbar"
                >
                    <v-btn v-if="selected.length"
                           icon
                           :loading="loadingApproveMultiple"
                           @click="onApproveMultiple()">
                        <v-icon color="success">mdi-thumb-up-outline</v-icon>
                    </v-btn>
                    <v-btn v-if="selected.length"
                           icon
                           :loading="loadingRejectMultiple"
                           @click="onRejectMultiple()">
                        <v-icon color="secondary">mdi-thumb-down-outline</v-icon>
                    </v-btn>
                    <v-text-field
                            hide-details
                            :value="search"
                            @input="search=$event"
                            prepend-icon="mdi-magnify"
                            single-line
                            v-else
                    ></v-text-field>
                    <v-toolbar-title>
                        {{ selected.length ? `${selected.length} selected` : '' }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu
                            v-model="filterMenu"
                            :close-on-content-click="false"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon>mdi-filter-variant</v-icon>
                            </v-btn>
                        </template>
                        <ModeratorFilter
                                @close-filter="filterMenu=false"
                                @save-filter="onSaveFilter"
                        ></ModeratorFilter>
                    </v-menu>
                    <v-btn icon v-if="!selected.length" @click="multiple = !multiple">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    <v-btn
                            v-if="selected.length"
                            icon
                            @click="()=>{selected = [];multiple=false;}"
                    >
                        <v-icon>mdi-close</v-icon>
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
                            v-scroll:#list="onScrollList"
                    >
                        <template v-for="(item, index) in (filtered ? filteredApplications : applications)">
                            <v-list-item
                                    :key="item.id"
                                    @click="openApplication(index)"
                            >
                                <template
                                        v-slot:default="{active}"
                                >
                                    <v-list-item-avatar v-if="multiple" dark size="15px">
                                        <v-icon small color="#00000099">
                                            {{
                                            active
                                            ? 'mdi-checkbox-marked-circle-outline'
                                            : 'mdi-checkbox-blank-circle-outline'
                                            }}
                                        </v-icon>
                                    </v-list-item-avatar>
                                
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                        <v-list-item-subtitle class="text--primary" v-text="item.attachments.length+' attachments'"></v-list-item-subtitle>
                                        <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                                    </v-list-item-content>
                                
                                    <v-list-item-action>
                                        <v-list-item-action-text v-text="item.ago"></v-list-item-action-text>
                                        <v-chip
                                                label
                                                dark
                                                :color="statusColor(item.status)"
                                        >{{item.status}}</v-chip>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        
                            <v-divider
                                    v-if="index + 1 < applications.length"
                                    :key="index"
                            ></v-divider>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col class="py-0">
                <MarinaApplicationCard
                        v-if="isComponent"
                        :height="applicationCardHeight"
                ></MarinaApplicationCard>
                <v-dialog
                        v-if="isDialog"
                        v-model="dialog"
                        fullscreen
                        transition="dialog-bottom-transition"
                >
                    <MarinaApplicationCard
                            @close="onDialogClose()"
                            :showClose="dialog"
                    ></MarinaApplicationCard>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import MarinaApplicationCard from "../../components/Cards/MarinaApplicationCard";
    import ModeratorFilter from "../../components/ModeratorFilter";
    export default {
        name: "Requests",
        components: {ModeratorFilter, MarinaApplicationCard},
        watch: {
            filterMenu(value) {
                if (value) {
                    this.onDialogClose();
                }
            },
        },
        computed: {
            ...mapGetters('Moderator', {
                applications: 'getApplications',
            }),
            ...mapGetters('Marina', {
                marina: 'getPublicMarina',
            }),
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
                return this.filteredApplications.length>0;
            },
            search: {
                get() {
                    return this.searchQuery;
                },
                set(value) {
                    let searcStr = value.toString()
                    this.searchQuery = searcStr;
                   
                    if (value.toString().length<1)
                        this.filteredApplications = [];
                    else { console.log(value);
                        this.filteredApplications = this.applications.filter(({title})=>{
                            let res=title.toString().toLowerCase().includes(searcStr.toLowerCase());
                            console.log(res, title);
                            return res;
                        })
                    }
                }
            }
        },
        data: function () {
            return {
                searchQuery: null,
                filteredApplications: [],
                selectedValue: [],
                show: false,
                dialog: false,
                multiple: false,
                listHeight: null,
                applicationCardHeight: null,
                loadingApproveMultiple: false,
                loadingRejectMultiple: false,
                offsetTop: 0,
                filterMenu: false,
            }
        },
        methods: {
            ...mapActions('Moderator', ['fetchApplications', 'updateCurrent', 'approve', 'reject']),
            ...mapActions('Marina', ['fetchMarina']),
            onDialogClose() {
                this.dialog=false;
                this.show=false;
                this.multiple = false;
            },
            async openApplication(id) {
                if (id === this.$store.state.Moderator.current || this.multiple) return;
                let resp1 = await this.updateCurrent(id);
                let resp2 = await this.fetchMarina(this.applications[id].berthId);
                if (resp1 && resp2) {
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
                    case ('IN_PROGRESS'):
                        return 'yellow ';
                }
            },
            onRejectMultiple() {
                this.loadingRejectMultiple = true;
                this.selected.forEach((index)=>{
                    this.reject(this.applications[index].id);
                });
                setTimeout(async ()=>{
                    await this.fetchApplications();
                    this.multiple=false;
                    this.selected=[];
                    this.loadingRejectMultiple = false;
                }, 1000)
            },
            onApproveMultiple() {
                this.loadingApproveMultiple = true;
                this.selected.forEach((index)=>{
                    this.approve(this.applications[index].id)
                });
                setTimeout(async ()=> {
                    await this.fetchApplications();
                    this.multiple=false;
                    this.selected=[];
                    this.loadingApproveMultiple = false;
                },1000);
                
            },
            updateHeight() {
                let h = document.getElementById('toolbar').style.height.substr(0,2);
                this.listHeight = (window.innerHeight - 84 - h) + "px";
                this.applicationCardHeight = (window.innerHeight - 84) + "px";
            },
            onScrollList (e) {
                this.offsetTop = e.target.scrollTop
            },
            async onSaveFilter() {
                try {
                    await this.fetchApplications();
                } catch (e) {
                    console.log(e);
                }
                this.filterMenu = false;
            },
        },
        async created() {
            await this.fetchApplications();
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