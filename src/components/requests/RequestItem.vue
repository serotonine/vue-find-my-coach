<template>
  <cart-container>
    <header class="mb-2">
      
      <h3 v-if="request.name" class="mb-1 text-primary-blue-100">
        {{ capitalizeName }}
      </h3>
      <h4 v-if="getCoach" class="text-neutrals-40">
        To
        <router-link :to="`/coaches/${request.coachId}`">
          {{ getCoach.firstName }}&nbsp;{{ getCoach.lastName }}
        </router-link>
      </h4>
      <p class="text-xs mb-2 text-neutrals-40">{{ getDate }}</p>
    </header>
    <main>
      <p>{{ request.message }}</p>
    </main>
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
          date: 0,
          name: "",
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
    isCoachAuthenticated() {
      return (
        this.$store.getters.isAuthenticated &&
        this.$store.getters.userID == this.request.coachId
      );
    },
    capitalizeName() {
      if (!this.request.name) {
        return "";
      }
      return (
        this.request.name.charAt(0).toUpperCase() + this.request.name.slice(1)
      );
    },
    getDate() {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        weekday: "long",
      };
      const date = new Date(this.request.date);
      console.log(date);
      return Intl.DateTimeFormat("fr-BE", options).format(date);
    },
  },
};
</script>
