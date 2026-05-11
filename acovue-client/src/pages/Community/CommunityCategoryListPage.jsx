import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostList } from "../../api/Post.api";
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";
import { formatTime } from "../../components/Util/FormatTime";
import {
  COMMUNITY_CATEGORIES,
  getCommunityCategoryByPath,
} from "./communityCategories";
import "./CommunityListPage.css";

export default function CommunityCategoryListPage() {
  const location = useLocation();
  const categoryPath = location.pathname.split("/").filter(Boolean).at(-1);
  const currentCategory = getCommunityCategoryByPath(categoryPath);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isNoticePost = (post) => post.notice === true || post.isNotice === true;

  useEffect(() => {
    if (!currentCategory) return;

    setLoading(true);
    setError(false);

    getPostList(20, 1, "COMMUNITY", currentCategory.value)
      .then((res) => {
        const nextPosts = res.data.data || [];
        setPosts(nextPosts);
      })
      .catch((error) => {
        console.error("Failed to fetch community category:", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [currentCategory]);

  if (!currentCategory) {
    return <Navigate to="/community" replace />;
  }

  if (loading) return <LoadingSkeleton variant="list" />;

  if (error) {
    return (
      <PageState
        title="불러오기에 실패했습니다"
        description="잠시 후 다시 시도해주세요."
        actionLabel="다시 시도"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <main className="community-list-page">
      <nav className="community-category-tabs" aria-label="커뮤니티 카테고리">
        {COMMUNITY_CATEGORIES.map((category) => (
          <NavLink
            key={category.value}
            to={`/community/${category.path}`}
            className={({ isActive }) =>
              `community-category-tab ${isActive ? "is-active" : ""}`
            }
          >
            {category.label}
          </NavLink>
        ))}
      </nav>

      <section className="community-category-section">
        <h1 className="community-preview-title">{currentCategory.label}</h1>

        {!posts.length ? (
          <PageState
            title={`등록된 ${currentCategory.label} 글이 없습니다`}
            description="첫 번째 글을 등록해보세요."
          />
        ) : (
          <div className="community-category-posts">
            {posts.filter(isNoticePost).map((post) => (
              <Link
                key={post.postSeq}
                to={`/community/${post.postSeq}`}
                className="community-category-notice"
              >
                <div className="community-category-post-title">
                  <span className="community-notice-badge">공지</span>
                  {post.postTitle}
                </div>
                <div className="community-category-post-meta">
                  <span>{post.memberNickname}</span>
                  <span>{formatTime(post.regDate)}</span>
                </div>
              </Link>
            ))}

            {posts.filter((post) => !isNoticePost(post)).map((post) => (
              <Link
                key={post.postSeq}
                to={`/community/${post.postSeq}`}
                className={`community-category-post ${post.thumbnailUrl ? "has-thumbnail" : ""}`}
              >
                {post.thumbnailUrl && (
                  <div className="community-category-thumbnail">
                    <img src={post.thumbnailUrl} alt={post.postTitle} />
                  </div>
                )}
                <div className="community-category-post-body">
                  <div className="community-category-post-title">{post.postTitle}</div>
                  <div className="community-category-post-meta">
                    <span>{post.memberNickname}</span>
                    <span>{formatTime(post.regDate)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
