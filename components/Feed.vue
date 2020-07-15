<template>
  <div class="article-preview">
    <div class="article-meta">
      <a v-on:click="toProfile(articleL.author.username)"
        ><img :src="articleL.author.image"
      /></a>
      <div class="info">
        <a class="author" v-on:click="toProfile(articleL.author.username)">{{
          articleL.author.username
        }}</a>
        <span class="date">{{ articleL.author.createdAt }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        v-on:click="favoritedClick(articleL.slug)"
      >
        <i class="ion-heart" :class="{ followed: articleL.favorited }"></i>
        {{ articleL.favoritesCount }}
      </button>
    </div>
    <a class="preview-link">
      <h1>{{ articleL.title }}</h1>
      <p>{{ articleL.description }}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>

<script>
import { addFavoriteArticle, unfavoriteArticle } from "~/api/article.js";

export default {
  name: "Feed",
  props: ["article"],
  data() {
    return {
      articleL: this.article,
    };
  },
  methods: {
    toProfile(username) {
      this.$router.push("/profile/" + username);
    },
    async favoritedClick(slug) {
      const count = this.articleL.favoritesCount;
      const followStatus = this.articleL.favorited;
      if (followStatus) {
        this.$set(this.articleL, "favoritesCount", count - 1);
        await unfavoriteArticle(slug);
      } else {
        this.$set(this.articleL, "favoritesCount", count + 1);
        await addFavoriteArticle(slug);
      }
      this.$set(this.articleL, "favorited", !followStatus);
    },
  },
};
</script>

<style scoped>
.ion-heart {
  vertical-align: middle;
}
.followed {
  color: #cd3333;
  vertical-align: middle;
}
</style>
