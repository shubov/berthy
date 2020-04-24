<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SignInForm.vue is proprietary and confidential.               -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-form
        ref="form"
        v-model="valid"
    >
        <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.email]"
                type="email"
                v-model="user.email"
        />
        
        <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                v-model="user.password"
                @click:append="show = !show"
        />
        <router-link v-if="restore_password" to="#">
            <p class="caption text-center">Forgotten account?</p>
        </router-link>
    </v-form>
</template>

<script>
    export default {
        name: "SignInForm",
        props: {
            user: {
                type: Object,
                default: function () {
                    return {
                        email: "john@email.com",
                        password: "12345678",
                    }}
            },
            restore_password: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                valid: false,
                show: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Enter valid email',
                },
            }
        }
    }
</script>

<style scoped>

</style>