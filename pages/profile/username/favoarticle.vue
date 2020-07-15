<template>
  <div>
    <feed
      v-for="(article, index) in favoArticles"
      :key="index"
      :article="article"
    ></feed>
  </div>
</template>

<script>
import { getArticles } from "~/api/article.js";
import Feed from "~/components/Feed.vue";

export default {
  name: "Favoarticle",
  components: {
    Feed,
  },
  data() {
    return {
      favoArticles: [],
    };
  },
  async created() {
    const { data } = await getArticles({
      favorited: this.$route.query.favorited,
    });
    this.favoArticles = data.articles;
  },
};
</script>

<style></style>
