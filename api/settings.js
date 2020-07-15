import { request } from "~/plugins/request.js";

export const getCurUser = function() {
  return request({
    url: "/api/user",
    method: "GET",
  });
};

export const updateUser = function(data) {
  return request({
    url: "/api/user",
    method: "PUT",
    data,
  });
};
