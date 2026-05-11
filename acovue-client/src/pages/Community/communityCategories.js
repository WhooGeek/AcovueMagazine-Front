export const COMMUNITY_CATEGORIES = [
  { label: "공연 후기", value: "REVIEW", path: "review" },
  { label: "동행 양도", value: "COMPANION", path: "companion" },
  { label: "Q&A", value: "QNA", path: "qna" },
];

export const getCommunityCategoryByPath = (path) =>
  COMMUNITY_CATEGORIES.find((category) => category.path === path);
