import { useEffect, useRef, useState } from "react";
import { getPostList } from "../../api/Post.api"
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";
import "./GuideListPage.css";
import GuideListView from "../../components/GuideList/GuideListView";


export default function GuideListPage(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const initialFetchRef = useRef(false);
    const fetchingRef = useRef(false);

    const fetchPosts = async () => {
        if (fetchingRef.current || !hasMore) return;

        fetchingRef.current = true;

        try{
            setLoading(true);
            setError(false);

            const res = await getPostList(8, page, "GUIDE");
            const nextPosts = res.data.data || [];

            setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
            setPage((prevPage) => prevPage + 1);

            if(nextPosts.length < 8){
                setHasMore(false);
            }
        } catch(error){
            setError(true);
        } finally {
            setLoading(false);
            fetchingRef.current = false;
        }
    };

    useEffect(() => {
        if (initialFetchRef.current) return;
        
        initialFetchRef.current = true;
        fetchPosts();
    }, []);
    
    useEffect(() => {
        if (!posts.length) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && hasMore){
                fetchPosts();
            }
        });
        
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [loading, hasMore, page, posts.length]);


    if (loading && !posts.length) return <LoadingSkeleton variant="list" />;

    if (error && !posts.length) {
        return (
        <PageState
            title="불러오기에 실패했습니다"
            description="잠시 후 다시 시도해주세요."
            actionLabel="다시 시도"
            onAction={() => window.location.reload()}
        />
        );
    }

    if (!loading && !posts.length) {
        return (
        <PageState
            title="등록된 원정 가이드가 없습니다"
            description="첫 번째 가이드를 등록해보세요."
        />
        );
    }

    return(
        <div className="guide-list-page">
            <GuideListView postList={posts} title="GUIDE"/>

            <div ref={loaderRef} className="guide-loader">
            {loading && "불러오는 중..."}
            {!hasMore && "마지막 원정 가이드입니다."}
            {error && "추가 원정 가이드를 불러오지 못했습니다."}
            </div>

        </div>

        
    );

}
