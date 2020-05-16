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
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.email]"
                type="email"
                v-model="value.email"
        />
        
        <v-text-field
                ref="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                v-model="value.password"
                @click:append="show = !show"
        />
        
        <v-text-field
                ref="password2"
                label="Repeat password"
                name="password-repeat"
                prepend-icon="mdi-lock"
                :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[rules.required, rules.min, rules.passwordsMatch]"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
        />
    </v-form>
</template>

<script>
    export default {
        name: "SignUpForm",
        props: ['value'],
        data: function () {
            return {
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