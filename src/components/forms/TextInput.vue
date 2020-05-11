<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in StringInput.vue is proprietary and confidential.           -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <template v-slot:default="{ open }">
                <v-row no-gutters>
                    <v-col cols="4">{{title}}</v-col>
                    <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                            <span v-if="open" key="0">{{caption}}</span>
                            <span v-else key="1">{{ model }}</span>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-textarea
                    v-model="model"
                    :placeholder="placeholder"
                    auto-grow
                    clearable
                    :prepend-inner-icon="icon"
            ></v-textarea>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    export default {
        name: "TextInput",
        props: {
            title: String,
            placeholder: String,
            caption: String,
            state: String,
            mutation: String,
            icon: String,
        },
        computed: {
            model: {
                get() {
                    return this.$store.state.Application[this.state];
                },
                set(value) {
                    this.$store.commit(this.mutation, value)
                }
            }
        }
    }
</script>