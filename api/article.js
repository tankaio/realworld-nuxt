import { request } from "~/plugins/request.js";

export const addActicle = function(data) {
  return request({
    url: "/api/articles",
    method: "POST",
    data,
  });
};

export const getActicleDetails = function(slug) {
  return request({
    url: "/api/articles/" + slug,
    method: "GET",
  });
};

export const addComment = function(slug, data) {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: "POST",
    data,
  });
};

export const getComments = function(slug) {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: "GET",
  });
};

export const deleteComment = function(slug, id) {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: "DELETE",
  });
};

export const addFavoriteArticle = function(slug) {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "POST",
  });
};

export const unfavoriteArticle = function(slug) {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "DELETE",
  });
};

export const favoriteArticle = function(slug) {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: "POST",
  });
};

export const getArticles = function(params) {
  return request({
    url: "/api/articles",
    method: "GET",
    params,
  });
};
