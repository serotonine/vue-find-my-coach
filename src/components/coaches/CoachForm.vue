<template>
  <form @submit.prevent="submitForm">
    <p v-if="!formIsValid" class="text-red-800">All fields are required!</p>
    <div class="control-group">
      <label
        for="firstName"
        :class="!inputs.firstName.isValid ? 'text-red-800' : null"
        >First Name</label
      >
      <input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="type your first name"
        v-model.trim="inputs.firstName.val"
        @blur="inputs.firstName.isValid = true"
      />
      <p v-if="!inputs.firstName.isValid" class="text-red-800">
        Please type your first name!
      </p>
    </div>
    <div class="control-group">
      <label
        for="lastName"
        :class="!inputs.lastName.isValid ? 'text-red-800' : null"
        >Last Name</label
      >
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="type your last name"
        v-model.trim="inputs.lastName.val"
        @blur="inputs.lastName.isValid = true"
      />
      <p v-if="!inputs.firstName.isValid" class="text-red-800">
        Please type your last name!
      </p>
    </div>
    <div class="control-group">
      <label
        for="hourlyRate"
        :class="!inputs.hourlyRate.isValid ? 'text-red-800' : null"
        >Rate / hour</label
      >
      <input
        type="number"
        id="hourlyRate"
        name="hourlyRate"
        min="30"
        max="100"
        v-model.number="inputs.hourlyRate.val"
        @blur="inputs.lastName.isValid = true"
      />
      <p v-if="!inputs.hourlyRate.isValid" class="text-red-800">
        You work for free?
      </p>
    </div>
    <div class="control-group-flex mb-6">
      <section class="control-group-flex" v-for="area in getAreas" :key="area">
        <label
          :for="area"
          :class="!inputs.areas.isValid ? 'text-red-800' : null"
          >{{ area }}</label
        >
        <input
          type="checkbox"
          :name="area"
          :id="area"
          :value="area"
          v-model="inputs.areas.val"
          @blur="inputs.areas.isValid = true"
        />
      </section>
      <p v-if="!inputs.areas.isValid" class="text-red-800">
        Please choose at least one area!
      </p>
    </div>
    <div class="mt-2">
      <label
        for="description"
        :class="!inputs.description.isValid ? 'text-red-800' : null"
        >Describe yourself</label
      >
      <textarea
        name="description"
        id="description"
        cols="100"
        rows="5"
        v-model.trim="inputs.description.val"
        @blur="inputs.description.isValid = true"
      ></textarea>
      <p v-if="!inputs.description.isValid" class="text-red-800">
        Please add a description!
      </p>
    </div>
    <button type="submit" class="mt-4">Register</button>
  </form>
</template>

<script>
// Validations libraries.
// Vuelidate.
// https://vueformulate.com

export default {
  data() {
    return {
      inputs: {
        firstName: {
          val: "",
          isValid: true,
        },
        lastName: {
          val: "",
          isValid: true,
        },
        description: {
          val: "",
          isValid: true,
        },
        hourlyRate: {
          val: null,
          isValid: true,
        },
        areas: {
          val: [],
          isValid: true,
        },
      },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      // Reset.

      this.formIsValid = true;

      Object.keys(this.inputs).forEach((input) => {
        const val = this.inputs[input].val;
        if (
          val === "" ||
          (Array.isArray(val) && !val.length) ||
          !val ||
          (!isNaN(val) && val <= 0)
        ) {
          console.log(input + " is invalid");
          this.inputs[input].isValid = false;
          this.formIsValid = false;
        }
      });
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.inputs.firstName.val,
        last: this.inputs.lastName.val,
        desc: this.inputs.description.val,
        rate: this.inputs.hourlyRate.val,
        areas: this.inputs.areas.val,
      };
      //console.log(formData);
      this.$emit("save-contact-data", formData);
    },
    //emits: ["save-contact-data"],
    emits: {
      'save-contact-data': (formData) => {
        return (
          typeof formData === "object" &&
          formData !== null &&
          typeof formData.first === "string" &&
          typeof formData.last === "string" &&
          typeof formData.desc === "string" &&
          typeof formData.rate === "number" &&
          Array.isArray(formData.areas)
        );
      },
    },
  },
  computed: {
    getAreas() {
      return this.$store.getters["_coaches/getAreas"];
    },
  },
};
</script>
