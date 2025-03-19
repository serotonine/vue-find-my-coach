<template>
  <cart-container>
   <header class="mb-2">
      <h4 v-if="getCoach">
       To
        <router-link :to="`/coaches/${request.coachId}`">
          {{ getCoach.firstName }}&nbsp;{{ getCoach.lastName }}
        </router-link>
      </h4>
   </header>
   <main> <p>{{ request.message }}</p></main>
   <footer class="mt-2" v-if="isCoachAuthenticated">
    <a :href="emailLink" target="_blank">{{ request.email }}</a>
   </footer>
   
  </cart-container>
</template>
<script>
export default {
  props: {
    request: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: "",
          coachId: "",
          email: "",
          message: "",
        };
      },
    },
  },
  computed: {
    emailLink() {
      return `mailto:${this.request.email}`;
    },
    getCoach() {
      return this.$store.getters["_coaches/coaches"].find(
        (item) => item.id === this.request.coachId
      );
    },
    isCoachAuthenticated(){
      return this.$store.getters.isAuthenticated && this.$store.getters.userID == this.request.coachId;
    },
   
  },
};
</script>
