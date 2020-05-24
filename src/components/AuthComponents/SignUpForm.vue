<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in SignUpForm.vue is proprietary and confidential.               -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 5 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-form
            ref="form"
            @change="$emit('input', {
                email: $refs.email.value,
                password: $refs.password.value,
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
                @click:append="show = !show"
                :value="value.password"
                @input="value.password=$event"
        />
        
        <v-text-field
                value=""
                ref="password2"
                label="Repeat password"
                name="password-repeat"
                :prepend-icon="icons.lock"
                :append-icon="show2 ? icons.eyeOff : icons.eye"
                :rules="[rules.required, rules.min, rules.passwordsMatch]"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
        />
    </v-form>
</template>

<script>
    import {mdiEmail, mdiEye, mdiEyeOff, mdiLock} from "@mdi/js";

    export default {
        name: "SignUpForm",
        props: ['value'],
        data: function () {
            return {
                icons: {
                    email: mdiEmail,
                    lock: mdiLock,
                    eyeOff: mdiEyeOff,
                    eye: mdiEye,
                },
                show: false,
                show2: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Enter valid email',
                    passwordsMatch: value => this.value.password === value || "Passwords don't match"
                },
            }
        }
    }
</script>

<style scoped>

</style>