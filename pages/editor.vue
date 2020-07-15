<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-on:keyup.enter="addTag"
                />
                <div class="tag-list">
                  <transition-group name="tag" tag="div">
                    <p
                      class="tag"
                      v-for="(tag, index) in article.tagList"
                      :key="index + ''"
                    >
                      <span>{{ tag }}</span>
                      <span class="tag-remove" v-on:click="tagRemove(index)"
                        >x</span
                      >
                    </p>
                  </transition-group>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                v-on:click.prevent="onAddArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addActicle } from "~/api/article.js";
export default {
  name: "Editor",
  middleware: "authenticated",
  asyncData() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tag: "",
    };
  },
  methods: {
    async onAddArticle() {
      try {
        const { data } = await addActicle({ article: this.article });
        this.$router.push("/article/" + data.article.slug);
      } catch (err) {
        console.log(err);
      }
    },
    addTag() {
      const tagList = this.article.tagList;
      if (!this.tag) return;
      if (tagList.includes(this.tag)) {
        this.tag = "";
        return;
      }
      this.article.tagList.push(this.tag);
      this.tag = "";
    },
    tagRemove(index) {
      this.article.tagList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.tag {
  display: inline-block;
  background-color: darkgray;
  margin: 3px;
  font-size: 14px;
  font-weight: normal;
}
.tag-remove {
  display: inline-block;
  width: 12px;
  margin-left: 6px;
  font-size: 12px;
  background-color: gainsboro;
  border-radius: 6px;
  color: darkgray;
  cursor: pointer;
}
.tag-enter,
.tag-leave-to {
  transform: translateY(55px);
  opacity: 0;
}
.tag-enter-active,
.tag-leave-active,
.tag-move {
  transition: all 0.4s;
}
</style>
