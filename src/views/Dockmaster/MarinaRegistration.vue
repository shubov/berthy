<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in MarinaRegistration.vue is proprietary and confidential.       -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row justify="center">
        <v-col cols="12">
            <v-expansion-panels>
                <ExpansionInput
                        v-for="(item, index) in inputFields"
                        v-bind="item"
                        :key="index"
                ></ExpansionInput>
            </v-expansion-panels>
        </v-col>
        <v-col>
            <v-btn color="primary" @click="onSubmit()">Submit</v-btn>
        </v-col>
    </v-row>
<!--                <v-expansion-panel>-->
<!--                    <v-expansion-panel-header v-slot="{ open }">-->
<!--                        <v-row no-gutters>-->
<!--                            <v-col cols="4">Location</v-col>-->
<!--                            <v-col-->
<!--                                    cols="8"-->
<!--                                    class="text&#45;&#45;secondary"-->
<!--                            >-->
<!--                                <v-fade-transition leave-absolute>-->
<!--                                    <span v-if="open">-->
<!--                                        Select marina's location-->
<!--                                    </span>-->
<!--                                    <span v-else>{{ marina.location }}</span>-->
<!--                                </v-fade-transition>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-expansion-panel-header>-->
<!--                    <v-expansion-panel-content>-->
<!--                        <v-row no-gutters>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-col cols="5">-->
<!--                                <l-map-->
<!--                                        :zoom.sync="zoom"-->
<!--                                        :center.sync="center"-->
<!--                                        :options="mapOptions"-->
<!--                                        style="height: 300px; width: 345px"-->
<!--                                >-->
<!--                                    <l-tile-layer-->
<!--                                            :url="url"-->
<!--                                            :attribution="attribution"-->
<!--                                    />-->
<!--                                    <l-marker-->
<!--                                            :lat-lng.sync="marina.location"-->
<!--                                            :draggable="true"-->
<!--                                    >-->
<!--                                    </l-marker>-->
<!--                                </l-map>-->
<!--                            </v-col>-->
<!--                    -->
<!--                            <v-divider-->
<!--                                    vertical-->
<!--                                    class="mx-4"-->
<!--                            ></v-divider>-->
<!--                    -->
<!--                            <v-col cols="3">-->
<!--                                Put the marker at the exact location of your marina-->
<!--                                <br>-->
<!--                                <a href="javascript:void(0)">Learn more</a>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                -->
<!--                        <v-card-actions>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn-->
<!--                                    text-->
<!--                                    color="secondary"-->
<!--                            >-->
<!--                                Cancel-->
<!--                            </v-btn>-->
<!--                            <v-btn-->
<!--                                    text-->
<!--                                    color="primary"-->
<!--                            >-->
<!--                                Save-->
<!--                            </v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-expansion-panel-content>-->
<!--                </v-expansion-panel>-->
<!--    -->
<!--                <v-expansion-panel>-->
<!--                    <v-expansion-panel-header v-slot="{ open }">-->
<!--                        <v-row no-gutters>-->
<!--                            <v-col cols="4">Amenities</v-col>-->
<!--                            <v-col-->
<!--                                    cols="8"-->
<!--                                    class="text&#45;&#45;secondary"-->
<!--                            >-->
<!--                                <v-fade-transition leave-absolute>-->
<!--              <span-->
<!--                      v-if="open"-->
<!--                      key="0"-->
<!--              >-->
<!--                Select additional amenities at your marina-->
<!--              </span>-->
<!--                                    <span-->
<!--                                            v-else-->
<!--                                            key="1"-->
<!--                                    >-->
<!--                {{ marina.amenities }}-->
<!--              </span>-->
<!--                                </v-fade-transition>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-expansion-panel-header>-->
<!--                    <v-expansion-panel-content>-->
<!--                        <v-row no-gutters>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-col cols="5">-->
<!--                                <v-select-->
<!--                                        v-model="marina.amenities"-->
<!--                                        :items="amenitiesList"-->
<!--                                        chips-->
<!--                                        multiple-->
<!--                                        flat-->
<!--                                >{{}}</v-select>-->
<!--                            </v-col>-->
<!--                -->
<!--                            <v-divider-->
<!--                                    vertical-->
<!--                                    class="mx-4"-->
<!--                            ></v-divider>-->
<!--                -->
<!--                            <v-col cols="3">-->
<!--                                Select the amenities you provide-->
<!--                                <br>-->
<!--                                <a href="javascript:void(0)">Learn more</a>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--            -->
<!--                        <v-card-actions>-->
<!--                            <v-spacer></v-spacer>-->
<!--                            <v-btn-->
<!--                                    text-->
<!--                                    color="secondary"-->
<!--                            >-->
<!--                                Cancel-->
<!--                            </v-btn>-->
<!--                            <v-btn-->
<!--                                    text-->
<!--                                    color="primary"-->
<!--                            >-->
<!--                                Save-->
<!--                            </v-btn>-->
<!--                        </v-card-actions>-->
<!--                    </v-expansion-panel-content>-->
<!--                </v-expansion-panel>-->
<!--                -->
<!--                <v-expansion-panel>-->
<!--                    <v-expansion-panel-header v-slot="{ open }">-->
<!--                        <v-row no-gutters>-->
<!--                            <v-col cols="4">Start and end of season</v-col>-->
<!--                            <v-col-->
<!--                                    cols="8"-->
<!--                                    class="text&#45;&#45;secondary"-->
<!--                            >-->
<!--                                <v-fade-transition leave-absolute>-->
<!--                                    <span v-if="open">When do you want to travel?</span>-->
<!--                                    <v-row-->
<!--                                            v-else-->
<!--                                            no-gutters-->
<!--                                            style="width: 100%"-->
<!--                                    >-->
<!--                                        <v-col cols="6">Start date: {{ marina.start || 'Not set' }}</v-col>-->
<!--                                        <v-col cols="6">End date: {{ marina.end || 'Not set' }}</v-col>-->
<!--                                    </v-row>-->
<!--                                </v-fade-transition>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-expansion-panel-header>-->
<!--                    <v-expansion-panel-content>-->
<!--                        <v-row-->
<!--                                justify="space-around"-->
<!--                                no-gutters-->
<!--                        >-->
<!--                            <v-col cols="3">-->
<!--                                <v-menu-->
<!--                                        ref="startMenu"-->
<!--                                        :close-on-content-click="false"-->
<!--                                        :return-value.sync="marina.start"-->
<!--                                        offset-y-->
<!--                                        min-width="290px"-->
<!--                                >-->
<!--                                    <template v-slot:activator="{ on }">-->
<!--                                        <v-text-field-->
<!--                                                v-model="marina.start"-->
<!--                                                label="Start date"-->
<!--                                                prepend-icon="mdi-calendar"-->
<!--                                                readonly-->
<!--                                                v-on="on"-->
<!--                                        ></v-text-field>-->
<!--                                    </template>-->
<!--                                    <v-date-picker-->
<!--                                            v-model="date"-->
<!--                                            no-title-->
<!--                                            scrollable-->
<!--                                    >-->
<!--                                        <v-spacer></v-spacer>-->
<!--                                        <v-btn-->
<!--                                                text-->
<!--                                                color="primary"-->
<!--                                                @click="$refs.startMenu.isActive = false"-->
<!--                                        >Cancel</v-btn>-->
<!--                                        <v-btn-->
<!--                                                text-->
<!--                                                color="primary"-->
<!--                                                @click="$refs.startMenu.save(date)"-->
<!--                                        >OK</v-btn>-->
<!--                                    </v-date-picker>-->
<!--                                </v-menu>-->
<!--                            </v-col>-->
<!--                    -->
<!--                            <v-col cols="3">-->
<!--                                <v-menu-->
<!--                                        ref="endMenu"-->
<!--                                        :close-on-content-click="false"-->
<!--                                        :return-value.sync="marina.end"-->
<!--                                        offset-y-->
<!--                                        min-width="290px"-->
<!--                                >-->
<!--                                    <template v-slot:activator="{ on }">-->
<!--                                        <v-text-field-->
<!--                                                v-model="marina.end"-->
<!--                                                label="End date"-->
<!--                                                prepend-icon="mdi-calendar"-->
<!--                                                readonly-->
<!--                                                v-on="on"-->
<!--                                        ></v-text-field>-->
<!--                                    </template>-->
<!--                                    <v-date-picker-->
<!--                                            v-model="date"-->
<!--                                            no-title-->
<!--                                            scrollable-->
<!--                                    >-->
<!--                                        <v-spacer></v-spacer>-->
<!--                                        <v-btn-->
<!--                                                text-->
<!--                                                color="primary"-->
<!--                                                @click="$refs.endMenu.isActive = false"-->
<!--                                        >-->
<!--                                            Cancel-->
<!--                                        </v-btn>-->
<!--                                        <v-btn-->
<!--                                                text-->
<!--                                                color="primary"-->
<!--                                                @click="$refs.endMenu.save(date)"-->
<!--                                        >-->
<!--                                            OK-->
<!--                                        </v-btn>-->
<!--                                    </v-date-picker>-->
<!--                                </v-menu>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-expansion-panel-content>-->
<!--                </v-expansion-panel>-->
</template>

<script>
    import router from "../../router";
    import ExpansionInput from "../../components/forms/ExpansionInput";
    
    export default {
        name: "MarinaRegistration",
        components: {ExpansionInput},
        data: () => ({
            inputFields: [
                {
                    title: 'Name',
                    placeholder: 'Puerto Del Paraíso',
                    caption: 'Name of your marina',
                    state: 'name',
                    mutation: 'Application/EDIT_NAME',
                },
                {
                    title: 'Description',
                    placeholder: 'Puerto Del Paraíso is the largest harbour in the world.',
                    caption: 'Detailed description of your marina',
                    state: 'description',
                    mutation: 'Application/EDIT_DESCRIPTION',
                },
                {
                    title: 'Website',
                    placeholder: 'https://puerto-del-paraiso.com/',
                    caption: 'Enter a full URL of the website (if you have one)',
                    state: 'site',
                    mutation: 'Application/EDIT_SITE',
                },
                {
                    title: 'VHF Channel',
                    placeholder: 'VHF Channel 11',
                    caption: 'A VHF Channel visitors can use to contact your marina (or radio frequency i.e. "156.550 MHz")',
                    state: 'radio',
                    mutation: 'Application/EDIT_RADIO',
                },
            ],
        }),
        methods: {
            onSubmit(){
                router.push('/dashboard');
            }
        },
    }
</script>