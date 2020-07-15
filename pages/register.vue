<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link class="nav-link" to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(err, key, index) in errors" :key="index">
              {{ key }} {{ err[0] }}
            </li>
          </ul>

          <form v-on:submit.prevent="onRegister">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.username"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.password"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "~/api/user.js";
export default {
  name: "Register",
  middleware: "notAuthenticated",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async onRegister() {
      try {
        const { data } = await register({ user: this.user });
        console.log("注册成功！");
        console.log(data);
        if (data) this.$router.push("/");
      } catch (e) {
        console.log("注册失败！");
        console.log(e.response);
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>

<style scoped></style>
