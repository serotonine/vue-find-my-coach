<template>
  <div>
    <h3>Contact</h3>
    <FormKit
      type="form"
      id="contact-form"
      name="contact-form"
      :actions="isCaptchaOk"
      :config="{ validationVisibility: 'submit' }"
      submit-label="Send your message"
      @submit="submitContact"
    >
      <FormKit
        type="text"
        name="name"
        id="name"
        label="Name"
        placeholder="Type your name"
        validation="required|contains_alphanumeric|alpha_spaces:latin"
      />
      <FormKit
        type="email"
        name="email"
        id="email"
        label="Email"
        placeholder="Type your email"
        validation="required"
      />
      <FormKit name="userName" id="userName" type="text"  validation="length:0,0" />

      <FormKit
        class="mt-2 mb-4"
        type="textarea"
        name="message"
        label="Your message"
        value=""
        cols="100"
        rows="4"
        :help="`${message.length} / 250`"
        validation="required|contains_alphanumeric|length:0,250"
        v-model="message"
      />
    </FormKit>
    <!-- <form @submit.prevent="submitContact">
      <div class="control-group">
        <label for="email">Your Email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          v-model="inputs.email"
        />
      </div>
      <div class="control-group">
        <label for="message">Your message</label>
        <textarea
          required
          name="message"
          id="message"
          cols="30"
          rows="10"
          v-model="inputs.message"
        >
        </textarea>
      </div>
      <button class="mt-4" type="submit">Send your message</button>
    </form> -->
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      isCaptchaOk:true,
      message: "",
      inputs: {
        email: "",
        message: "",
      },
      isValidForm: true,
    };
  },
  methods: {
    async submitContact($event) {
      const newRequest = {
        coachId: this.$route.params.id,
        name: $event.name,
        email: $event.email,
        message: $event.message,
      };
      try {
        await this.$store.dispatch("_request/addRequest", newRequest);
        this.$router.replace("/requests");
      } catch (error) {
        console.error("submit contact", error.message);
      }
    },
  },
};
</script>
<style scoped>
input#firstName{ display:none; }
</style>
