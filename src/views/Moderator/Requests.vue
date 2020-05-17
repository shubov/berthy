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
    <v-row align="baseline" justify="center" justify-sm="start">
        <v-col cols="12" sm="5">
            <v-list two-line>
                <v-list-item-group
                        v-model="selected"
                        multiple
                        active-class="pink--text"
                >
                    <template v-for="(item, index) in applications">
                        <v-list-item :key="item.title">
                            <template v-slot:default>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                    <v-list-item-subtitle class="text--primary" v-text="item.status"></v-list-item-subtitle>
                                    <v-list-item-subtitle v-text="item.title"></v-list-item-subtitle>
                                </v-list-item-content>
                        
                                <v-list-item-action>
                                    <v-list-item-action-text v-text="date"></v-list-item-action-text>
                                    <v-chip label dark color="green">{{item.status}}</v-chip>
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
    </v-row>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Requests",
        computed: {
            ...mapGetters('Moderator', {
                applications: 'getApplications',
            }),
            date() {
                let now = new Date();//local date
                let date = new Date(this.applications[0].createdAt);//created at local date
                let delta =  now - date;
                let s = Math.floor(delta/1000);
                let m = Math.floor(delta/60000);
                let h = Math.floor(delta/3600000);
                if (s>59) {
                    if (m>59) {
                        if (h>23) {
                            return date.toDateString();
                        } else {
                            return h + "h ago";
                        }
                    } else {
                        return m + "m ago";
                    }
                } else {
                    return s + "s ago";
                }
            }
        },
        data: function () {
            return {
                selected: [],
                marinas: [
                    {
                        name: 'Marina Request 1',
                        description: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
                        location: 'USA',
                        price: 44,
                        amenities: ['Restoraunt', 'Water'],
                        spots: [],
                        photos: [],
                        status: 'New'
                    },
                    {
                        name: 'Marina Request 2',
                        description: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
                        location: 'USA',
                        price: 44,
                        amenities: ['Restoraunt', 'Water'],
                        spots: [],
                        photos: [],
                        status: 'New'
                    },
                    {
                        name: 'Marina Request 3',
                        description: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
                        location: 'USA',
                        price: 44,
                        amenities: ['Restoraunt', 'Water'],
                        spots: [],
                        photos: [],
                        status: 'New'
                    }
                ],
            }
        },
    }
</script>

<style scoped>

</style>