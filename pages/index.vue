<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-on:click="comVal = 'your-feed'">
                <a class="nav-link" :class="{ active: comVal === 'your-feed' }"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item" v-on:click="comVal = 'global-feed'">
                <a
                  class="nav-link"
                  :class="{ active: comVal === 'global-feed' }"
                  >Global Feed</a
                >
              </li>
            </ul>
          </div>
          <keep-alive>
            <component :is="comVal"></component>
          </keep-alive>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                href=""
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
                >{{ tag }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags } from "~/api/home.js";
import GlobalFeed from "~/components/GlobalFeed.vue";
import YourFeed from "~/components/YourFeed.vue";

export default {
  name: "Home",
  components: {
    GlobalFeed,
    YourFeed,
  },
  async asyncData() {
    const { data } = await getTags();
    return {
      tags: data.tags,
      comVal: "global-feed",
    };
  },
};
</script>

<style scoped></style>
