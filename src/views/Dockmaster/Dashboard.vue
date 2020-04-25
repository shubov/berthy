<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in Dashboard.vue is proprietary and confidential.                -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-container fill-height>
        <v-row
        >
            <v-col cols="12">
                <v-row
                        align="start"
                        justify="space-between"
                        no-gutters
                >
                    <HighlightCard
                            v-for="n in 5"
                            :key="n"
                            colour="red"
                            text="146%"
                            class="mb-1"
                    ></HighlightCard>
                </v-row>
            </v-col>
            <v-col
                    cols="6"
                    class="overflow-x-auto"
                    style="overflow: hidden"
            >
                <v-row
                        align="start"
                        justify="start"
                        :style="'width: ' + cardRowWidth + 'px'"
                        no-gutters
                >
                        <LocoDashboardCard
                                :width=cardWidth
                                :colour="i === index ? 'primary lighten-5':''"
                                class="mb-1 mr-1"
                                v-for="(item, i) in this.fleet"
                                :key="i"
                                :loco-info="{
                                    index: i,
                                    number: item.message.locoNo,
                                    mileage: item.message.mileage,
                                    sofis: item.message.falarm,
                                    speed: item.message.speed,
                                    device: item.device
                                }"
                                @select-loco="selectLoco(i)"
                        ></LocoDashboardCard>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row
                        align="start"
                        justify="start"
                        no-gutters
                        style="width: inherit"
                >
                    <MapCard :loco="loco" :zoom="zoom"></MapCard>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-row
                        align="start"
                        no-gutters
                >
                    <Table></Table>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import HighlightCard from "../../components/Cards/HighlightCard";
    import {mapGetters} from "vuex";
    import LocoDashboardCard from "../../components/Cards/LocoDashboardCard";
    import MapCard from "../../components/Cards/MapCard";
    import Table from "../../components/Table";

    export default {
        name: "Dashboard",
        components: {Table, MapCard, HighlightCard, LocoDashboardCard},
        computed: {
            ...mapGetters({
                fleet: 'Fleet/getFleet',
                length: 'Fleet/getLength',
            }),
            cardRowWidth: function () {
                let l = this.length;
                if (l<=3) {
                    return l * this.cardWidthMargin;
                }
                if (l>3 && l<=6) {
                    return 3 * this.cardWidthMargin;
                }
                if (l>6) {
                    return Math.floor((l+1)/2) * this.cardWidthMargin;
                }
                return 600;
            },
            cardWidthMargin: function () {
                return this.cardWidth + 4;
            }
        },
        data: function() {
            return {
                cardWidth: 135,
                loco: null,
                index: null,
                setIntervalID: null,
                zoom: 7,
            }
        },
        methods: {
            selectLoco: function (index) {
                clearInterval(this.setIntervalID);
                this.index = index;
                this.loco=this.fleet[index];
                this.zoom = 18;
                this.setIntervalID = setInterval( () => {
                    this.loco=this.fleet[index];
                }, 3000);
            }
        },
        beforeDestroy () {
            clearInterval(this.setIntervalID);
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