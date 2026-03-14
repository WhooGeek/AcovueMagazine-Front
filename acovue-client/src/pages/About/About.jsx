import { useEffect, useState } from "react";
import { getAboutMeContent } from "../../api/AboutMe.api";
import AboutMeDetail from "../../components/AboutMe/AboutMeDetail";
import AboutMeFooter from "../../components/AboutMe/AboutMeFooter";
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";

export default function About() {

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getAboutMeContent()
    .then((res) => {
      setPost(res.data.data);
    })
    .catch(() => {
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  },[]);

  if (loading) return <LoadingSkeleton variant="detail" />;

  if (error || !post) {
    return (
      <PageState
        title="페이지를 불러오지 못했습니다"
        description="잠시 후 다시 시도해주세요."
        actionLabel="다시 시도"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <AboutMeDetail post={post}/>
      <AboutMeFooter />
    </div>
  );
}
