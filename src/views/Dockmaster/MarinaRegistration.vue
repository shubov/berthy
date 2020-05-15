<!-----------------------------------------------------------------------------
  - Copyright (c) - 2020 - Mikhail Shubov.                                    -
  - Berthy project. All Rights Reserved.                                      -
  - The code in MarinaRegistration.vue is proprietary and confidential.       -
  - Unauthorized copying of the file and any parts of it                      -
  - as well as the project itself is strictly prohibited.                     -
  - Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                  -
  ----------------------------------------------------------------------------->

<template>
    <v-row align="baseline" justify="center">
        <v-col cols="12" sm="9" xl="7">
            <p class="text-left display-2">Add your marina</p>
            <p class="text-left">Specify the necessary information about your marina to be able to get booking requests from boaters.</p>
        </v-col>
        <v-col cols="12" sm="9" xl="7">
            <v-alert
                    type="info"
                    color="info"
                    outlined
                    dark
            >
                Before being publicly available and displayed in the system your application will be checked by us.
                Only provide the correct information to get approval. We will contact you to verify the information.
            </v-alert>
        </v-col>
        <v-col cols="12" sm="9" xl="7">
            <v-expansion-panels class="mb-6">
                <StringInput
                        key="1"
                        :required="true"
                        title= 'Name'
                        placeholder= 'Puerto Del Paraíso'
                        caption= 'Name of your marina'
                        state= 'name'
                        mutation= 'Application/EDIT_NAME'
                        icon= "mdi-rename-box"
                ></StringInput>
                <TextInput
                        key="2"
                        title= 'Description'
                        placeholder= 'Puerto Del Paraíso is the largest harbour in the world.'
                        caption= 'Detailed description of your marina'
                        state= 'description'
                        mutation= 'Application/EDIT_DESCRIPTION'
                        icon= "mdi-text-subject"
                ></TextInput>
                <StringInput
                        key="3"
                        title= 'Website'
                        placeholder= 'https://puerto-del-paraiso.com/'
                        caption= 'Enter a full URL of the website (if you have one)'
                        state= 'site'
                        mutation= 'Application/EDIT_SITE'
                        icon= "mdi-link-variant"
                ></StringInput>
                <PhoneInput
                        key="4"
                        title= 'Phone'
                        placeholder= '123456789'
                        caption= 'Enter a phone number'
                        code-state= 'phCode'
                        num-state="phNumber"
                        code-mutation= 'Application/EDIT_PH_CODE'
                        num-mutation= 'Application/EDIT_PH_NUMBER'
                ></PhoneInput>
                <StringInput
                        key="5"
                        title= 'VHF Channel'
                        placeholder= 'VHF Channel 11'
                        caption= 'A VHF Channel visitors can use to contact your marina (or radio frequency i.e. "156.550 MHz")'
                        state= 'radio'
                        mutation= 'Application/EDIT_RADIO'
                        icon= "mdi-radio-handheld"
                ></StringInput>
                <DateInput
                        key="6"
                        title="Season dates"
                        caption="Select a start and end dates of current or upcoming season"
                ></DateInput>
                <FileInput
                        key="7"
                        title="Photos"
                        caption="Upload pictures of your marina"
                        placeholder="Select a photo"
                        image
                        accept="image/*"
                        state="photos"
                        upload-action="Application/uploadPhoto"
                        remove-action="Application/onRemovePhoto"
                ></FileInput>
                <SelectAmenities
                        key="8"
                        title="Amenities"
                        caption="Select additional amenities at your marina"
                        placeholder="Select amenities"
                        state="amenities"
                        module="Application"
                        mutation="Application/EDIT_AMENITIES"
                        remove-mutation="Application/REMOVE_AMENITY"
                        getter="Amenities/getAmenities"
                        get-amenities-action="Amenities/availableAmenities"
                ></SelectAmenities>
                <LocationInput
                        key="9"
                        title="Location"
                        caption="Set the precise location of your marina"
                        placeholder="12.3456789"
                ></LocationInput>
                <PlaceInput
                        key="10"
                        title="Places"
                        caption="Sizing and pricing of the places in your marina"
                        mutation="Application/EDIT_PLACES"
                        remove-mutation="Application/REMOVE_PLACE"
                        state="places"
                ></PlaceInput>
            </v-expansion-panels>
            <v-expansion-panels>
                <FileInput
                        key="11"
                        title="Attachments"
                        caption="Upload documents"
                        placeholder="Select a file"
                        image
                        pdf
                        accept="image/*,application/pdf"
                        state="attachments"
                        upload-action="Application/uploadAttachment"
                        remove-action="Application/onRemoveAttachment"
                ></FileInput>
                <TextInput
                        key="12"
                        title= 'Comments'
                        placeholder= 'Any comments or questions?'
                        caption= 'Leave a note to us regarding your application'
                        state= 'message'
                        mutation= 'Application/EDIT_MESSAGE'
                        icon= "mdi-comment-text-outline"
                ></TextInput>
            </v-expansion-panels>
        </v-col>
        <v-col cols="12" align="center">
            <v-btn
                    color="primary"
                    @click="onSubmit()"
                    x-large
                    :loading="submitting"
            >Submit</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    import router from "../../router";
    import StringInput from "../../components/forms/StringInput";
    import DateInput from "../../components/forms/DateInput";
    import FileInput from "../../components/forms/FileInput";
    import SelectAmenities from "../../components/forms/SelectAmenities";
    import LocationInput from "../../components/forms/LocationInput";
    import TextInput from "../../components/forms/TextInput";
    import PlaceInput from "../../components/forms/PlaceInput";
    import PhoneInput from "../../components/forms/PhoneInput";
    
    export default {
        name: "MarinaRegistration",
        components: {
            PhoneInput,
            PlaceInput, TextInput, LocationInput, SelectAmenities, FileInput, DateInput, StringInput},
        data: () => ({
            submitting: false,
        }),
        methods: {
            onSubmit(){
                this.submitting = true;
                setTimeout(async ()=> {
                    if (await this.$store.dispatch('Application/submitApplication'))
                        router.push('/dashboard');
                    this.submitting = false;
                }, 1000);
            }
        },
    }
</script>