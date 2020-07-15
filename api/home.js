import { request } from "~/plugins/request.js";

export const getFeedArticles = function() {
  return request({
    url: "/api/articles/feed",
    method: "GET",
  });
};

export const getTags = function() {
  return request({
    url: "/api/tags",
    method: "GET",
  });
};
