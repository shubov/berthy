<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in FileInput.vue is proprietary and confidential.                -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-expansion-panel>
        <v-expansion-panel-header  :disable-icon-rotate="valid != null">
            <template v-slot:default="{ open }">
                <v-row no-gutters>
                    <v-col cols="4">{{title}}</v-col>
                    <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                            <span v-if="open" key="0">{{caption}}</span>
                            <span v-else key="1">{{ model.length }} {{state}}</span>
                        </v-fade-transition>
                    </v-col>
                </v-row>
            </template>
            <template v-if="valid != null" v-slot:actions>
                <v-icon v-if="valid" color="teal">{{icons.checkCircle}}</v-icon>
                <v-icon v-else color="warning">{{icons.alertCircle}}</v-icon>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-file-input
                    v-model="model"
                    :placeholder="placeholder"
                    multiple
                    :prepend-icon="icon"
                    :clearable="false"
                    :accept="accept"
                    :loading="loading"
            >
                <template v-slot:selection="{ index }">
                    <v-chip
                            class="ma-2"
                            close
                            v-if="model[index]"
                            :key="index"
                            @click:close="onRemoveFile(index)"
                    >
                        {{model[index].fileName}}
                    </v-chip>
                </template>
            </v-file-input>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    import {mdiAlertCircle, mdiCheckCircle, mdiFileImage, mdiPaperclip} from "@mdi/js";

    export default {
        name: "FileInput",
        props: {
            required: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                required: true,
            },
            caption: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            removeAction: {
                type: String,
                required: true,
            },
            uploadAction: {
                type: String,
                required: true,
            },
            pdf: {
                type: Boolean,
                required: false,
                default: false
            },
            image: {
                type: Boolean,
                required: false,
                default: false
            },
            accept: {
                type: String,
                required: true,
            }
        },
        computed: {
            icon: function () {
                return (this.image && !this.pdf)? this.icons.fileImage : this.icons.paperclip;
            },
            model: {
                get() {
                    return this.$store.state.Application[this.state];
                },
                async set(files) {
                    this.loading = true;
                    for(let i=0;i<files.length;i++) {
                        if (files[i] instanceof File && ((this.image && this.isImage(files[i])) || (this.pdf && this.isPdf(files[i]))))
                            await this.$store.dispatch(this.uploadAction, files[i]);
                    }
                    this.loading = false;
                }
            },
            valid() {
                return this.model.length === 0 ? null: true;
            }
        },
        data: () => ({
            loading: false,
            icons: {
                checkCircle: mdiCheckCircle,
                alertCircle: mdiAlertCircle,
                fileImage: mdiFileImage,
                paperclip: mdiPaperclip,
            }
        }),
        methods: {
            onRemoveFile(index){
                this.$store.dispatch(this.removeAction, index)
            },
            isImage(file) {
                return !!file.type.match('image.*');
            },
            isPdf(file) {
                console.log(file.type);
                return file.type==='application/pdf';
            },
        }
    }
</script>