<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SearchListCard.vue is proprietary and confidential.           -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-0" tile>
        <v-card-title>Marinas</v-card-title>
        <v-card-subtitle>{{marinas.length? `Sorted by ${getSorting}` : 'Search Results'}}</v-card-subtitle>
        <v-card-text>
            <v-list>
                <v-list-item-group v-model="selected" color="primary">
                    <v-list-item
                            v-for="(marina, index) in marinas"
                            :key="marina.id+'_'+index"
                    >
                        <v-list-item-title>{{marina.name}}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "SearchListCard",
        computed:{
            ...mapGetters('Reservation', {
                marinas: 'getFilteredMarinas',
                getSelected: 'getSelectedIndex',
                getSorting: 'getSortBy',
            }),
            selected: {
                get() {
                    return this.getSelected;
                },
                set(value) {
                    this.$store.commit('Reservation/SELECT_MARINA', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>