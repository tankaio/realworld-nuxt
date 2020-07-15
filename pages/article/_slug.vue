<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div id="articlebody" class="col-md-12" v-html="result">
          <!-- {{ article.body }} -->
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="body"
                v-on:keyup.enter.prevent="addComment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button
                class="btn btn-sm btn-primary"
                v-on:click.prevent="addComment"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author"
                ><img :src="comment.author.image" class="comment-author-img"
              /></a>
              &nbsp;
              <a href="" class="comment-author">{{
                comment.author.username
              }}</a>
              <span class="date-posted">{{
                comment.createdAt | dateFormat
              }}</span>
              <span class="mod-options">
                <!-- <i class="ion-edit"></i> -->
                <i
                  class="ion-trash-a"
                  v-on:click="deleteComment(comment.id)"
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getActicleDetails,
  addComment,
  getComments,
  deleteComment,
} from "~/api/article.js";
import ArticleMeta from "~/components/ArticleMeta.vue";
import "highlight.js/styles/monokai.css";
const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");

const md = new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

export default {
  name: "ArticleSlug",
  components: {
    ArticleMeta,
  },
  async asyncData({ route }) {
    const [articleD, commentsD] = await Promise.all([
      getActicleDetails(route.params.slug),
      getComments(route.params.slug),
    ]);
    const result = md.render(articleD.data.article.body);
    return {
      article: articleD.data.article,
      body: "",
      comments: commentsD.data.comments,
      result,
    };
  },
  filters: {
    dateFormat(val) {
      var date = new Date(val);
      var localeString = date.toLocaleString();
      return localeString;
    },
  },
  methods: {
    async addComment() {
      const slug = this.$route.params.slug;
      const { data } = await addComment(slug, {
        comment: { body: this.body },
      });
      this.body = "";
      const { data: newData } = await getComments(slug);
      this.comments = newData.comments;
    },
    async deleteComment(id) {
      const { data } = await deleteComment(this.$route.params.slug, id);
      this.comments = this.comments.filter((item) => item.id !== id);
    },
  },
};
</script>

<style></style>
