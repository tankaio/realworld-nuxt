import { request } from "~/plugins/request.js";

export const register = function(data) {
  return request({
    url: "/api/users",
    method: "POST",
    data,
  });
};

export const login = function(data) {
  return request({
    url: "/api/users/login",
    method: "POST",
    data,
  });
};

export const getProfiles = function(username) {
  return request({
    url: `/api/profiles/${username}`,
    method: "GET",
  });
};

export const followUser = function(username) {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: "POST",
  });
};

export const unfollowUser = function(username) {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: "DELETE",
  });
};
