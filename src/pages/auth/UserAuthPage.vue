<template>
  <basic-container class="h-screen flex items-center justify-center">
    <base-dialog :show="!!error" title="Error" @close="closeErrorDialog">
      {{ error }}
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <cart-container>
      <h3>{{ submitButtonCaption }}</h3>
      <form @submit.prevent="submit()">
        <div class="control-group">
          <label for="">Email</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <FormKit
          :type="isPwdVisible ? 'text' : 'password'"
          label="Password"
          :suffix-icon="passwordIcon"
          @suffix-icon-click="togglePwdVisibility"
          suffix-icon-class="hover:text-blue-500"
          v-model.trim="pwd"
        />
        <div class="control-group-flex">
          <button type="submit">{{ submitButtonCaption }}</button>
          <button type="text" class="flat" @click.prevent="switchAuthMode">
            {{ switchButtonAuthMode }}
          </button>
        </div>
      </form>
    </cart-container>
  </basic-container>
</template>

<script>
import CartContainer from "@/components/UI/CartContainer.vue";
import BasicContainer from "@/components/UI/BasicContainer.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
export default {
  components: { BasicContainer, CartContainer, BaseDialog, BaseSpinner },
  data() {
    return {
      email: "",
      pwd: "",
      mode: "login",
      isLoading: false,
      error: null,
      isPwdVisible: false,
    };
  },
  methods: {
    togglePwdVisibility() {
      this.isPwdVisible = !this.isPwdVisible;
    },
    async submit() {
      //TODO validation.
      const payload = {
        email: this.email,
        password: this.pwd,
      };
      this.isLoading = true;
      if (this.mode === "signup") {
        try {
          await this.$store.dispatch("signup", payload);
          this.isLoading = false;
          this.$router.replace("/coaches");
        } catch (error) {
          switch (error.message) {
            case "EMAIL_EXISTS":
              this.error = `ERROR : ${this.email} is already used. Did you forgot your password?`;
              break;
            case "API key not valid. Please pass a valid API key.":
              this.error = error.message;
              break;
            default:
              this.error = error.message;
          }
        }
        this.isLoading = false;
      } else if (this.mode === "login") {
        try {
          await this.$store.dispatch("login", payload);
          this.isLoading = false;
          const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
          this.$router.replace(redirectUrl);
        } catch (error) {
          this.isLoading = false;
          this.error = error.message;
          switch (error.message) {
            case "INVALID_LOGIN_CREDENTIALS":
              this.error = `ERROR : Email or password is not good. Did you forgot your password?`;
              break;
            default:
              this.error = error.message;
          }
        }
      } else {
        return;
      }
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    closeErrorDialog() {
      this.error = null;
    },
  },
  computed: {
    passwordIcon() {
      return this.isPwdVisible ? "eyeClosed" :"eye" ;
    },
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchButtonAuthMode() {
      if (this.mode === "login") {
        return "SignUp instead";
      } else {
        return "Login instead";
      }
    },
  },
};
</script>
