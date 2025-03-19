<template>
  <div>
    <h3>Contact</h3>
    <form @submit.prevent="submitContact">
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
    </form>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      inputs: {
        email: "",
        message: "",
      },
      isValidForm: true,
    };
  },
  methods: {
    async submitContact() {
      // TODO validation
      const newRequest = {
        coachId: this.$route.params.id,
        email: this.inputs.email,
        message: this.inputs.message,
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
