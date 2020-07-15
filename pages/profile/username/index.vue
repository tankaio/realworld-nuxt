<template>
  <div>
    <feed
      v-for="(article, index) in articles"
      :key="index"
      :article="article"
    ></feed>
  </div>
</template>

<script>
import { getArticles } from "~/api/article.js";
import Feed from "~/components/Feed.vue";

export default {
  name: "MyArticle",
  components: { Feed },
  data() {
    return { articles: [] };
  },
  async created() {
    const { data } = await getArticles({
      author: this.$store.state.user.username,
    });
    this.articles = data.articles;
  },
};
</script>

<style></style>
