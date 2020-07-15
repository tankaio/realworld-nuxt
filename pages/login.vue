<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <nuxt-link class="nav-link" to="/register"
              >Need an account?</nuxt-link
            >
          </p>

          <ul class="error-messages">
            <li v-for="(err, key, index) in errors" :key="index">
              {{ key }} {{ err[0] }}
            </li>
          </ul>

          <form v-on:submit.prevent="onLogin">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "~/api/user.js";
const JSCookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "Login",
  middleware: "notAuthenticated",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async onLogin() {
      try {
        const { data } = await login({ user: this.user });
        console.log("登陆成功！");
        this.$store.commit("setUser", data.user);
        JSCookie.set("user", data.user);
        if (data) this.$router.push("/");
      } catch (e) {
        console.log(e);
        console.log("登陆失败！");
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>

<style scoped></style>
