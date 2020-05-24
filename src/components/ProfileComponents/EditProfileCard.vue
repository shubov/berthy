<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in EditProfileCard.vue is proprietary and confidential.          -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card tile class="elevation-0">
        <v-card-text>
            <v-text-field
                    class="mt-5"
                    hide-details
                    :placeholder="email"
                    disabled
                    filled
                    rounded
            ></v-text-field>
            <v-text-field
                    class="mt-5"
                    ref="firstName"
                    hide-details
                    @input="userEdit.firstName=$event"
                    :value="userEdit.firstName"
                    :placeholder="firstName ? firstName : 'First name'"
                    filled
                    rounded
            ></v-text-field>
            <v-text-field
                    class="mt-5"
                    ref="lastName"
                    hide-details
                    @input="userEdit.lastName=$event"
                    :value="userEdit.lastName"
                    :placeholder="lastName ? lastName : 'Last name'"
                    filled
                    rounded
            ></v-text-field>
            <v-text-field
                    class="mt-5"
                    ref="phNumber"
                    hide-details
                    @input="userEdit.phNumber=$event"
                    :value="userEdit.phNumber"
                    :placeholder="phone ? phone : 'Phone'"
                    filled
                    rounded
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="onSave()" class="primary" :loading="saving">
                <v-icon>{{icons.check}}</v-icon>Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {mdiCheck} from "@mdi/js";

    export default {
        name: "EditProfileCard",
        computed: {
            ...mapGetters('User', {
                email: 'getEmail',
                name: 'getName',
                firstName: 'getFirstName',
                lastName: 'getLastName',
                phone: 'getPhone',
                error: "getError"
            }),
        },
        data: function () {
            return {
                userEdit: {
                    firstName: null,
                    lastName: null,
                    phNumber: null,
                },
                saving: false,
                icons: {
                    check: mdiCheck,
                },
            }
        },
        methods: {
            ...mapActions('User',['editUserInfo']),
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
                        this.$emit('close-edit-profile');
                        await this.$store.dispatch("Dialog/set", 'Profile changes were saved successfully');
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
            },
        },
    }
</script>

<style scoped>

</style>