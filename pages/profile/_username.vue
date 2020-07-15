<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="avatar" :src="profile.image" />
            <h4>{{ profile.username }}</h4>
            <p v-text="profile.bio || '暂无简介...'"></p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-show="!isSelf"
              v-on:click="followClick"
            >
              <span v-if="!followStatus">
                <i class="ion-plus-round"></i>
                <span>&nbsp;Follow</span>
              </span>
              <span v-else>
                <span>Followed</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <nuxt-link
                :to="{ path: `/profile/${username}` }"
                class="nuxtlink"
              >
                <li class="nav-item" v-on:click="childUrl = ''">
                  <span :class="['nav-link', { active: childUrl === '' }]"
                    >My Articles</span
                  >
                </li>
              </nuxt-link>
              <nuxt-link
                :to="{
                  path: `/profile/${username}/favoarticle`,
                  query: { favorited: username },
                }"
                class="nuxtlink"
              >
                <li class="nav-item" v-on:click="childUrl = 'favoarticle'">
                  <span
                    :class="[
                      'nav-link',
                      { active: childUrl === 'favoarticle' },
                    ]"
                    >Favorited Articles</span
                  >
                </li>
              </nuxt-link>
            </ul>
          </div>
          <!-- <keep-alive> -->
          <Nuxt />
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfiles, followUser, unfollowUser } from "~/api/user.js";

export default {
  name: "ProfileUsername",
  middleware: "authenticated",
  data() {
    return {
      profile: {},
      childUrl: "",
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    isSelf() {
      const storeUname = this.$store.state.user.username;
      return this.username === storeUname;
    },
    followStatus() {
      return this.profile.following;
    },
  },
  methods: {
    async followClick() {
      if (this.followStatus) {
        await unfollowUser(this.username);
      } else {
        await followUser(this.username);
      }
      this.$set(this.profile, "following", !this.followStatus);
    },
  },
  async created() {
    this.$router.push(`/profile/${this.username}`);
    const { data } = await getProfiles(this.$route.params.username);
    this.profile = data.profile;
  },
};
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.nuxtlink {
  text-decoration: none;
}
</style>
