<template>
  <div class="yourfeed">
    <template v-if="articlesLen">
      <div
        class="article-preview"
        v-for="(article, index) in feedArticles"
        :key="index"
      >
        <div class="article-meta">
          <a href="profile.html"><img :src="article.author.image"/></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.author.createdAt }}</span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i>
            {{ article.favoritesCount }}
          </button>
        </div>
        <a href="" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
        </a>
      </div>
    </template>
    <h5 v-else>No articles are here... yet.</h5>
  </div>
</template>

<script>
import { getFeedArticles } from "~/api/home.js";

export default {
  name: "YourFeed",
  data() {
    return {
      feedArticles: [],
    };
  },
  computed: {
    articlesLen() {
      return this.feedArticles.length > 0;
    },
  },
  async created() {
    const { data } = await getFeedArticles();
    this.feedArticles = data.articles;
  },
};
</script>

<style scoped>
.yourfeed {
  margin-top: 10px;
}
</style>
