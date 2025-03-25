<template>
  <div>
    <!-- 2 !! convert a string to a boolean!! -->
    <base-dialog :show="!!error" title="An error occured" @close="closeDialog">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="contentLoaded">
      <the-header></the-header>
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
// import BaseDialog from "@/components/UI/BaseDialog.vue";

export default {
  name: "App",
  components: {
    TheHeader,
   // BaseDialog,
  },
  data() {
    return {
      contentLoaded: false,
      error: null,
    };
  },
  methods: {
    async loadFindMyCoach() {
      try {
        await this.$store.dispatch("_loader/loadfindMyCoach");
        this.contentLoaded = true;
      } catch (error) {
        this.error = error.message || "error";
      }
    },
    closeDialog() {
      this.error = null;
    },
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.loadFindMyCoach();
    this.$store.dispatch("autoLogin");
  },
  watch: {
    didAutoLogout(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue) {
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>
<style>
/* TRANSITION */
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
