import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Latest from "@/components/latestItems";

const validTypes = ["stickers", "posters", "coasters", "bookmarks"];

export default function Stickers() {
  const router = useRouter();
  const itype = router.query.itype as string;
  const itypeFixed = itype?.slice(0, -1);
  const [count, setCount] = useState(12);

  useEffect(() => {
    if (!validTypes.includes(itype)) router.push("/shop");
  }, [router, itype]);

  useEffect(() => {
    const getScrollPercent = () => {
      const h = document.documentElement,
        b = document.body,
        st = "scrollTop",
        sh = "scrollHeight";
      return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    };

    const handleScroll = () => {
      if (!validTypes.includes(itype)) return;
      const scrollPercent = getScrollPercent();
      if (scrollPercent > 75) setCount(count + 4);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [count]);

  return (
    <Layout>
      {!validTypes.includes(itype) ? (
        <>invalid item type, redirecting you to shop :3</>
      ) : (
        <>
          <div className="py-10 text-center text-3xl capitalize">
            Browse All {itype}
          </div>
          <div className="grid grid-cols-1 items-center justify-center p-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Latest itype={itypeFixed} limit={count} />
          </div>
        </>
      )}
    </Layout>
  );
}
