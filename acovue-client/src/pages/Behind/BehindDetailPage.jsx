import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostDetailView from "../../components/PostDetail/PostDetailView"
import{ getPostDetail } from "../../api/Post.api"
import { getCommentDetail } from "../../api/Comment.api"
import { getLikePost } from "../../api/Like.api"
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";

export default function BehindDetailPage() {
    const { postId } = useParams();
    
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [postLikes, setPostLikes] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        setLoading(true);
        setError(false);
        Promise.all([
            getPostDetail(postId),
            getCommentDetail(postId),
            getLikePost(postId),
        ])
            .then(([postRes, commentRes, likeRes]) => {
                setPost(postRes.data.data);
                setComments(commentRes.data.data || []);
                setPostLikes(likeRes.data.data.postLikeCount || 0);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [postId]);

    if (loading) return <LoadingSkeleton variant="detail" />;

    if (error || !post) {
        return (
            <PageState
                title="게시글을 불러오지 못했습니다"
                description="잠시 후 다시 시도해주세요."
                actionLabel="다시 시도"
                onAction={() => window.location.reload()}
            />
        );
    }

    return(
        <PostDetailView
            post={post}
            comments={comments}
            postLikes={postLikes}
        />
    );
}
