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
    <v-row>
        <v-col>
            <v-row justify="center">
                <v-subheader>Today</v-subheader>
            
                <v-expansion-panels popout>
                    <v-expansion-panel
                            v-for="(marina, i) in marinas"
                            :key="i"
                    >
                        <v-expansion-panel-header>
                            <v-row
                                    align="center"
                                    class="spacer"
                                    no-gutters
                            >
                                <v-col
                                        sm="5"
                                        md="3"
                                >
                                    <strong v-html="marina.name"></strong>
                                </v-col>
                            
                                <v-col
                                        class="hidden-xs-only text-no-wrap"
                                        cols="5"
                                        sm="3"
                                >
                                    <v-chip
                                            v-if="marina.status"
                                            :color="`yellow lighten-4`"
                                            class="ml-0 mr-2 black--text"
                                            label
                                            small
                                    >
                                        {{ marina.status }}
                                    </v-chip>
                                    <strong v-html="marina.sender"></strong>
                                </v-col>
                                <v-col class="hidden-xs-only">
                                    <v-btn color="yellow">Message</v-btn>
                                </v-col>
                                <v-col class="hidden-sm-and-down">
                                    <v-btn color="green">Approve</v-btn>
                                </v-col>
                                <v-col class="hidden-sm-and-down">
                                    <v-btn color="red">Reject</v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                    
                        <v-expansion-panel-content>
                            <v-divider></v-divider>
                            <v-card-text v-text="marina.description"></v-card-text>
                        </v-expansion-panel-content>
                        
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Requests",
        data: () => ({
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
        }),
    }
</script>

<style scoped>

</style>