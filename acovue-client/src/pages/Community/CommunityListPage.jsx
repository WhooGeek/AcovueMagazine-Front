import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { getPostList } from "../../api/Post.api";
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";
import { formatTime } from "../../components/Util/FormatTime";
import { COMMUNITY_CATEGORIES } from "./communityCategories";
import "./CommunityListPage.css";

export default function CommunityListPage() {
  const [sectionPosts, setSectionPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCommunitySections = async () => {
      try {
        setLoading(true);
        setError(false);

        const responses = await Promise.all(
          COMMUNITY_CATEGORIES.map((section) =>
            getPostList(6, 1, "COMMUNITY", section.value)
          )
        );

        const nextSectionPosts = COMMUNITY_CATEGORIES.reduce((acc, section, index) => {
          const posts = responses[index].data.data || [];
          acc[section.value] = posts.filter((post) => !post.notice).slice(0, 5);
          return acc;
        }, {});

        setSectionPosts(nextSectionPosts);
      } catch (error) {
        console.error("Failed to fetch community sections:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunitySections();
  }, []);

  const hasPosts = COMMUNITY_CATEGORIES.some(
    (section) => sectionPosts[section.value]?.length
  );
  const getCommentCount = (post) => post.commentCount ?? post.comment_count ?? 0;
  const getLikeCount = (post) => post.postLikeCount ?? post.likeCount ?? 0;

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

  if (!hasPosts) {
    return (
      <PageState
        title="등록된 커뮤니티 글이 없습니다"
        description="첫 번째 커뮤니티 글을 등록해보세요."
      />
    );
  }

  return (
    <main className="community-list-page">
      <div className="community-section-list">
        {COMMUNITY_CATEGORIES.map((section) => (
          <section
            key={section.value}
            id={`community-${section.value.toLowerCase()}`}
            className="community-preview-section"
          >
            <div className="community-preview-header">
              <h2 className="community-preview-title">{section.label}</h2>
              <Link
                to={`/community/${section.path}`}
                className="community-section-more"
              >
                더보기
              </Link>
            </div>

            <div className="community-preview-items">
              {(sectionPosts[section.value] || []).map((post) => (
                <Link
                  key={post.postSeq}
                  to={`/community/${post.postSeq}`}
                  className="community-preview-row"
                >
                  <span className="community-preview-post-title">{post.postTitle}</span>
                  <span className="community-preview-meta">
                    <span>{formatTime(post.regDate)}</span>
                  </span>
      
                </Link>
              ))}
            </div>

          </section>
        ))}
      </div>
    </main>
  );
}
