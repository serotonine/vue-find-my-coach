<template>
  <FormKit
    type="form"
    :config="{ validationVisibility: 'submit' }"
    submit-label="Register"
    @submit="submitForm"
  >
    <FormKit
      type="text"
      name="firstName"
      id="firstName"
      label="First Name"
      placeholder="Type your first name"
      validation="required|contains_alphanumeric|alpha_spaces:latin"
    />
    <FormKit
      type="text"
      name="lastName"
      id="lastName"
      label="Last Name"
      placeholder="Type your last name"
      validation="required|contains_alphanumeric|alpha_spaces:latin"
    />
    <FormKit
      type="number"
      name="hourlyRate"
      id="hourlyRate"
      label="Hourly Rate"
      min="30"
      max="100"
      validation="required"
    />
    <FormKit
      type="checkbox"
      name="areas"
      id="areas"
      :options="getAreas"
      validation="required|min:1"
    />
    <FormKit
    class="mt-2 mb-4"
      type="textarea"
      name="description"
      label="Describe yourself"
      value=""
      cols="100"
      rows="5"
      :help="`${description.length} / 500`"
      validation="required|contains_alphanumeric|length:0,500"
      v-model="description"
    />
  </FormKit>
</template>

<script>
export default {
  data(){
    return{
      description:'',
    }
  },
  methods: {
    submitForm($event) {
      // In Vue3 emits must be an array.
      this.$emit("save-contact-data", [$event]);
    },
  },
  computed: {
    getAreas() {
      return this.$store.getters["_coaches/getAreas"];
    },
  },
};
</script>
