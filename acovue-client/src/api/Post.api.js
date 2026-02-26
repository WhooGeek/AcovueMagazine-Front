import client from "./Client";

// 포스트 리스트 조회
export const getPostList = (limit, page, type) =>
  client.get(`/api/post/find/all?limit=${limit}&page=${page}&type=${type}`);

// 포스트 상세 조회
export const getPostDetail = (postId) =>
  client.get(`/api/post/find/${postId}`);

// 포스트 삭제
export const deletePostDetail = (postId) =>
  client.delete(`/api/post/delete/${postId}`);

// 포스트 등록
export const postCreatePost = (postData) => {
  return client.post(`/api/post/create`, postData);
};

// 포스트 수정
export const putUpdatePost = (postId, data) => {
  return client.put(`/api/post/update/${postId}`, data);
};

// 포스트 삭제
export const deletePost = (postId) => {
  return client.delete(`/api/post/delete/${postId}`);
}

// 이미지 업로드(S3)
export const postImageUpload = (formData) => {
  return client.post(`/api/post/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
