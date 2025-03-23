<template>
  <basic-container class="py-12 2xl:px-[300px] xl:px-60 lg:px-40">
    <cart-container>
      <h2 class="mt-0 mb-2">Register as a coach</h2>
      <coach-form
        v-if="isAuthenticated && !isCoach"
        @save-contact-data="saveContact"
      ></coach-form>
      <section v-if="!isAuthenticated">
        <h6>You must be authenticated in order to register as a coach.</h6>
        <button type="button" class="mt-2"><router-link to="/login?redirect=register">Login or create an account</router-link></button>
      </section>
      <section v-if="isAuthenticated && isCoach">
        <h6>You are already registered as a coach.</h6>
        <button type="button" class="mt-2">
          <router-link :to="'/coaches/' + userID"
            >Check your Coach Profile</router-link
          >
        </button>
      </section>
    </cart-container>
  </basic-container>
</template>
<script>
import CoachForm from "@/components/coaches/CoachForm.vue";
export default {
  components: {
    CoachForm,
  },
  methods: {
    async saveContact(tab) {
      // Due to emits warnings the object is in an array.
      const [data] = tab;
      // console.log('saveContact', data);

      try {
        await this.$store.dispatch("_coaches/registerCoach", data);
      } catch (error) {
        console.error("save Contact", error.message);
      }
      // replace => can't go back to the contact page.
      this.$router.replace("/coaches");
    
   },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isCoach() {
      return this.$store.getters["_coaches/isCoach"];
    },
    userID() {
      return this.$store.getters.userID;
    },
  },
};
</script>
