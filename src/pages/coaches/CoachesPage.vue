<template>
  <basic-container class="py-12">
    <header class="flex justify-between items-center mb-6">
      <h1>All Coaches</h1>
      <div class="flex gap-4">
        <button type="button" v-if="!isLoading && isAuthenticated && !isCoach">
          <router-link to="/register">Register as Coach</router-link>
        </button>
        <button type="button" v-if="!isLoading && !isAuthenticated">
          <router-link to="/login?redirect=register">Login to register as Coach</router-link>
        </button>
      </div>
    </header>
    <main>
      <cart-container class="mb-6 filters-container">
        <coach-filter @change-filter="setFilter"></coach-filter>
      </cart-container>
      <section v-if="hasCoaches" class="has-coaches fmc-grid">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :coach="coach"
        ></coach-item>
      </section>
      <section v-else>
        <p class="mt-2">No coaches available for the moment...</p>
      </section>
    </main>
  </basic-container>
</template>
<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachFilter,
    CoachItem,
  },
  data() {
    return {
      coaches: [],
      isLoading: false,
      activeFilters: {},
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  
    filteredCoaches() {
      const coaches = this.$store.getters["_coaches/coaches"];
      const filteredCoaches = coaches.filter((coach) =>
        Object.keys(this.activeFilters).some(
          (filter) => this.activeFilters[filter] && coach.areas.includes(filter)
        )
      );
      return filteredCoaches;
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["_coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["_coaches/isCoach"];
    },
  },
  methods: {
    loadCoaches() {
      this.$store.dispatch("_coaches/loadCoaches");
      const areas = this.$store.getters["_coaches/getAreas"];
      for (const area of areas) {
        this.activeFilters[area] = true;
      }
    },
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>
