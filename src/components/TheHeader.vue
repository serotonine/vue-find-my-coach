<template>
  <header class="main-header">
    <basic-container>
      <div class="md:justify-between md:content-center md:flex">
        <h1><router-link to="/">Find a Coach</router-link></h1>
        <menu class="flex gap-4 lg:gap-8 justify-end items-center">
          <li><router-link to="/coaches">All Coaches</router-link></li>
          <li v-if="isAuthenticated && !isCoach">
            <router-link to="/register">Register as Coach</router-link>
          </li>
          <li><router-link to="/requests">Requests</router-link></li>
          <li v-if="!isAuthenticated">
            <button type="button" class="highlighted"><router-link to="/login">Login</router-link></button>
          </li>
          <li v-else><button type="button" class="highlighted" @click="logOut">Logout</button></li>
        </menu>
      </div>
    </basic-container>
  </header>
</template>
<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach(){
      return this.$store.getters['_coaches/isCoach'];
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
  },
};
</script>
