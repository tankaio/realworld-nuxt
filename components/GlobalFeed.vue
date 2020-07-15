<template>
  <div class="globalfeed">
    <!-- <template v-if="articlesLen"> -->
    <feed
      v-for="(article, index) in articles"
      :key="index"
      :article="article"
    ></feed>
    <!-- </template> -->
    <!-- <h5 v-else>No articles are here... yet.</h5> -->
  </div>
</template>

<script>
import Feed from "~/components/Feed.vue";
import { getArticles } from "~/api/article.js";

export default {
  name: "GlobalFeed",
  components: {
    Feed,
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    articlesLen() {
      return this.articles.length > 0;
    },
  },
  async created() {
    const { data } = await getArticles();
    this.articles = data.articles;
  },
};
</script>

<style scoped>
.globalfeed {
  margin-top: 10px;
}
</style>
