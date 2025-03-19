<template>
  <basic-container class="py-12 2xl:px-80 xl:px-60 lg:px-40">
    <cart-container class="mb-2">
      <header class="mb-4">
        <div class="flex justify-between content-center">
          <h2 class="mt-0" >{{ fullName }}</h2>
          <section>
            <ul class="flex gap-2">
              <li
                v-for="area in badges"
                :key="area"
                class="badge"
                :class="area"
              >
                {{ area }}
              </li>
            </ul>
          </section>
        </div>
        <h5 class="text-neutrals-40">{{ rate }}€&#8239;/&#8239;hour</h5>
      </header>
      <main>
        <section>
          <p>{{ description }}</p>
        </section>
      </main>
      <footer class="mt-4 control-group-flex">
        <button type="button" @click="showContact">
          <router-link :to="`/coaches/${id}/contact`">{{
            contact ? "Hide Contact" : "Interested&#8239;? Reach out now!"
          }}</router-link>
        </button>

      </footer>
    </cart-container>
    <cart-container v-if="contact">
      <router-view></router-view>
    </cart-container>
  </basic-container>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
      contact: false,
    };
  },
  methods: {
    showContact() {
      this.contact = !this.contact;
    },
    loadCoaches(){
      this.$store.dispatch("_coaches/loadCoaches");
    }
   
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    badges() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    const coaches = this.$store.getters["_coaches/coaches"];
    if(coaches.length === 0){this.loadCoaches();}
    this.selectedCoach = this.$store.getters["_coaches/coaches"].find(
      (item) => item.id === this.id
    );
  },
};
</script>
