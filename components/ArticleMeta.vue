<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image"/></a>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | dateFormat }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    dateFormat(val) {
      var date = new Date(val);
      var localeString = date.toLocaleString();
      return localeString;
    },
  },
};
</script>

<style></style>
