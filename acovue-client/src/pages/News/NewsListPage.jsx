import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import PostListView from "../../components/PostList/PostListView"
import { getPostList } from "../../api/Post.api"
import PostWriteButton from "../../components/Common/PostWriteButton";
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";
import "./NewsListPage.css";


export default function NewsListPage(){
    const [searchParams] = useSearchParams();

    const limit = searchParams.get('limit')
    const page = searchParams.get('page')
    const type = searchParams.get('type')
    
    const [postList, setPostList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getPostList(limit, page, type)
            .then(res => setPostList(res.data.data || []))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [limit, page, type]);

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

    if (!postList?.length) {
        return (
            <PageState
                title="등록된 NEWS가 없습니다"
                description="첫 번째 소식을 등록해보세요."
            />
        );
    }

    return(
        <div>
            <div className="news-header">
                <div className="news-listpage-title">NEWS</div> 
                <PostWriteButton/>
            </div>
            <PostListView postList={postList} title="NEWS"/>
        </div>
    );

}
