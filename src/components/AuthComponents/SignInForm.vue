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
            @input="$emit('input', {
                email: $refs.email ? $refs.email.value : '',
                password: $refs.password ? $refs.password.value : '',
            })"
    >
        <v-text-field
                ref="email"
                label="Email"
                name="email"
                :prepend-icon="icons.email"
                :rules="[rules.required, rules.email]"
                type="email"
                :value="value.email"
                @input="value.email=$event"
        />
        
        <v-text-field
                ref="password"
                label="Password"
                name="password"
                :prepend-icon="icons.lock"
                :append-icon="show ? icons.eyeOff : icons.eye"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                :value="value.password"
                @input="value.password=$event"
                @click:append="show = !show"
        />
        <router-link to="/recovery">
            <p class="caption text-center">{{resetPassword}}</p>
        </router-link>
    </v-form>
</template>

<script>
    import {mdiEmail, mdiEye, mdiEyeOff, mdiLock} from "@mdi/js";

    export default {
        name: "SignInForm",
        props: ['value', 'resetPassword'],
        data: function () {
            return {
                icons: {
                    email: mdiEmail,
                    lock: mdiLock,
                    eyeOff: mdiEyeOff,
                    eye: mdiEye,
                },
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