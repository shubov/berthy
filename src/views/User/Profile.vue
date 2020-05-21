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
    >
        <v-row align="start" justify="center">
            <v-col>
                <v-card tile class="elevation-0">
                    <v-card-text>
                        <v-row align="start" justify="start" no-gutters>
                            <v-col>
                                <v-avatar
                                        class="mt-2"
                                        style="float: right"
                                        size="115px"
                                >
                                    <v-img :src="photo ? photo : ''"/>
                                </v-avatar>
                                <p class="pl-0 subtitle-1 font-weight-bold">
                                    {{type}}
                                </p>
                                <p class="display-3 font-weight-black my-0">
                                    {{name}}
                                </p>
                                <p class="pl-0 subtitle-1 font-weight-bold">
                                    1 marina, 2 boats
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="disabled" @click="disabled=false">
                            <v-icon>mdi-pencil</v-icon>Edit Account
                        </v-btn>
                        <v-btn v-if="!disabled" @click="onSave()" :loading="saving">
                            <v-icon>mdi-check</v-icon>Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-card tile class="elevation-0">
                    <v-card-text>
                        <v-text-field
                                hide-details
                                :placeholder="email"
                                disabled
                                filled
                                rounded
                        ></v-text-field>
                    </v-card-text>
                </v-card>
                <v-card-text>
                    <v-text-field
                            ref="firstName"
                            hide-details
                            @input="userEdit.firstName=$event"
                            :value="userEdit.firstName"
                            :placeholder="firstName ? firstName : 'First name'"
                            :disabled="disabled"
                            :append-outer-icon="disabled?'':'mdi-pencil'"
                            filled
                            rounded
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-text-field
                            ref="lastName"
                            hide-details
                            @input="userEdit.lastName=$event"
                            :value="userEdit.lastName"
                            :placeholder="lastName ? lastName : 'Last name'"
                            :disabled="disabled"
                            :append-outer-icon="disabled?'':'mdi-pencil'"
                            filled
                            rounded
                    ></v-text-field>
                </v-card-text>
                <v-card tile class="elevation-0">
                    <v-card-text>
                        <v-text-field
                                ref="phNumber"
                                hide-details
                                @input="userEdit.phNumber=$event"
                                :value="userEdit.phNumber"
                                :placeholder="phone ? phone : 'Phone'"
                                :disabled="disabled"
                                :append-outer-icon="disabled?'':'mdi-pencil'"
                                filled
                                rounded
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-row>
                    <v-col
                            v-for="(marina, index) in marinas"
                            :key="index"
                            cols="6"
                    >
                        <v-card class="elevation-1">
                            <v-img
                                    :src="marina.photos.length ? marina.photos[0].fileLink : marinaImg"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                            >
                                <v-card-title>{{marina.name}}</v-card-title>
                            </v-img>
        
                            <v-card-actions>
                                <v-chip class="primary">4 new notifications</v-chip>
                                <v-spacer></v-spacer>
            
                                <v-btn icon>
                                    <v-icon>mdi-arrow-right</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
               
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: "Profile",
        computed: {
            ...mapGetters('User', {
                email: 'getEmail',
                name: 'getName',
                user: 'isUser',
                firstName: 'getFirstName',
                lastName: 'getLastName',
                moderator: 'isModerator',
                photo: 'getPhoto',
                phone: 'getPhone',
                error: "getError"
            }),
            ...mapGetters('Marina', {
                marinas: 'getAll'
            }),
            type() {
                if (this.user) return 'User profile'
                if (this.moderator) return 'Moderator profile'
                return 'Profile';
            }
        },
        data: function () {
            return {
                disabled: true,
                marinaImg: require("../../assets/marina.jpg"),
                saving: false,
                userEdit: {
                    firstName: null,
                    lastName: null,
                    phNumber: null,
                }
            }
        },
        methods: {
            ...mapActions('User',['updateUserInfo','editUserInfo']),
            ...mapActions('Marina',['fetchMyMarinas']),
            onSave() {
                this.saving = true;
                setTimeout(async ()=>{
                    if (await this.editUserInfo({
                        firstName: this.userEdit.firstName ? this.userEdit.firstName : this.firstName,
                        lastName: this.userEdit.lastName ? this.userEdit.lastName : this.lastName,
                        phNumber: this.userEdit.phNumber ? this.userEdit.phNumber : this.phNumber,
                    })) {
                        this.userEdit = {
                            firstName: null,
                            lastName: null,
                            phNumber: null,
                        };
                        this.disabled=true;
                    } else {
                        await this.$store.dispatch("snackbar", this.error);
                    }
                    this.saving = false;
                },0)
                
            },
            clean(obj) {
                let res = obj;
                for (let propName in res) {
                    if (res[propName] === null || res[propName] === undefined) {
                        delete res[propName];
                    }
                }
                return res;
            }
        },
        async mounted() {
            await this.updateUserInfo();
            await this.fetchMyMarinas();
        },
    }
</script>

<style scoped>

</style>