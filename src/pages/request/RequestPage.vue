<template>
  <basic-container class="py-12">
    <h1 class="mb-6">Requests</h1>
    <form ref="requestForm" class="mb-6 filters-container">
      <select
        @change="filterRequests($event.target.value)"
        class="w-full sm:w-60"
      >
        <option value="">Choose a coach</option>
        <option
          v-for="optie in coachesOpties"
          :key="optie.id"
          :value="optie.id"
          :selected="optie.isAuth ? 'selected' : null"
        >
          {{ optie.name }}
        </option>
      </select>
    </form>
    <section v-if="requests.length > 0" class="fmc-grid">
      <request-item
        v-for="request in requests"
        :key="request.id"
        :request="request"
      >
      </request-item>
    </section>
    <cart-container v-else>
      <h6>No request available for the moment.</h6>
    </cart-container>
  </basic-container>
</template>
<script>
import RequestItem from "@/components/requests/RequestItem.vue";
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      coaches: null,
      filteredRequests: [],
      isFilteredRequests: true,
      isVal: true,
    };
  },
  methods: {
    loadRequests() {
      this.$store.dispatch("_request/loadRequests");
    },
    loadCoachs() {
      if (!this.$store.getters["_coaches/hasCoaches"]) {
        this.$store.dispatch("_coaches/loadCoaches");
      }
      this.coaches = this.$store.getters["_coaches/coaches"];
    },

    filterRequests(val) {
      // Display all requests if select > option === '' (isVal = false).
      this.isVal = !val ? false : true;
      // Commit in any case to trigger the computed request().
      this.$store.commit("_request/getRequests", val);
      this.filteredRequests =
        this.$store.getters["_request/getFilteredRequests"];
      this.isFilteredRequests =
        val && this.filteredRequests.length === 0 ? false : true;
    },
  },
  computed: {
    requests() {
      const allRequests = this.$store.getters["_request/getRequests"];
      if (this.filteredRequests.length === 0 && this.isFilteredRequests) {
        if (this.$store.getters.isAuthenticated && this.isVal) {
          const userRequests = this.filterRequests(this.$store.getters.userID);
          if (!userRequests) {
            return allRequests;
          }
        }
        return allRequests;
      }
      return this.filteredRequests;
    },
    coachesOpties() {
      const _coachesOpties = [];
      const coaches = this.coaches;
      for (const key in coaches) {
        const name = `${coaches[key].firstName} ${coaches[key].lastName}`;
        const isAuth =
          this.$store.getters.isAuthenticated &&
          this.$store.getters.userID == coaches[key].id;

        _coachesOpties.push({
          id: coaches[key].id,
          name,
          isAuth: isAuth,
        });
      }
      return _coachesOpties;
    },
  },
  created() {
    this.loadRequests();
    this.loadCoachs();
  },
};
</script>
