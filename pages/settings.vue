<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="profile.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="profile.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="profile.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="profile.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                v-on:click.prevent="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <button class="btn btn-outline-danger" v-on:click="onLogout">
        click here to logout.
      </button>
    </div>
  </div>
</template>

<script>
import { getCurUser, updateUser } from "~/api/settings.js";
const JSCookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "Settings",
  middleware: "authenticated",
  async asyncData() {
    let data = null;
    try {
      data = await getCurUser();
    } catch (err) {
      console.log(err);
    }
    return { profile: data.data.user };
  },
  methods: {
    onLogout() {
      this.$store.commit("setUser", null);
      JSCookie.remove("user");
      this.$router.push("/");
    },
    async updateUser() {
      try {
        const { data } = await updateUser(this.profile);
        console.log(data);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
