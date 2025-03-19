<template>
  <cart-container class="cart-grid">
    <header class="mb-2">
      <h3 class="mb-0">{{ fullName }}</h3>
      <h5 class="text-neutrals-40">{{ coach.hourlyRate }}€&#8239;/&#8239;hour</h5>
    </header>
    <main>
      <section class="mt-4 mb-6">
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="area in coach.areas"
            :key="area"
            class="badge"
            :class="area"
          >
            {{ area }}
          </li>
        </ul>
      </section>
    </main>
    <footer class="mt-2 coach-item-footer-end">
      <button type="button">
        <router-link :to="`/coaches/${coach.id}`">
         <div class="flex items-center flex-wrap">
            <span>Discover</span>
            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 ml-2 icon-cheveron-right-circle"><circle cx="12" cy="12" r="10" fill="hsl(122, 42%, 75%)"></circle><path fill="#fff" d="M10.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"></path></svg></span>
         </div>
        </router-link>
      </button>
    </footer>
  </cart-container>
</template>
<script>
export default {
  props: {
    coach: {
      type: Object,
      required: false,
      default: function () {
        return {
          id: "",
          firstName: "",
          lastName: "",
          areas: [],
          description: "",
          hourlyRate: 0,
        };
      },
    },
  },
  computed: {
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
  },
};
</script>
