<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in ReviewForm.vue is proprietary and confidential.               -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-card class="elevation-0" tile>
        <v-card-text class="pt-6">
            <v-row align="center" justify="center">
                <v-col>
                    <v-subheader class="text-center">What do you think?</v-subheader>
                    <v-textarea
                            placeholder="Write something..."
                            dense
                            v-model="text"
                            rounded
                            filled
                            height="40vh"
                    ></v-textarea>
                    <v-rating
                            class="text-center"
                            style="margin-left: -9px;padding-bottom: 18px;"
                            x-large
                            v-model="rating"
                            hover
                    ></v-rating>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    :disabled="!text || !rating"
                    :block="isMobile"
                    color="primary"
                    @click="onSubmit()"
                    x-large
                    :loading="submitting"
            >Send</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "ReviewForm",
        props: ['id'],
        computed: {
            isMobile() {
                return !this.$vuetify.breakpoint.mdAndUp;
            },
        },
        data: function () {
            return {
                text: null,
                rating: null,
                submitting: false,
            }
        },
        methods: {
            onSubmit() {
                this.submitting = true;
                setTimeout(async ()=> {
                    if(await this.$store.dispatch('Marina/sendReview', {
                        id: this.id,
                        text: this.text,
                        rating: this.rating
                    })) {
                        this.$emit('close-review-form');
                        this.$nextTick(()=>{
                            this.$store.dispatch('Dialog/set', 'Thank you for your opinion!');
                        });
                    } else {
                        this.$store.dispatch('Snackbar/set','Something went wrong. Try again.');
                    }
                    this.submitting = false;
                }, 0);
            },
        }
    }
</script>

<style scoped>

</style>