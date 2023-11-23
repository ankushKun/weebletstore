import Layout from "@/components/layout";
import Collections from "@/components/collections";
import Latest from "@/components/latestItems";

export default function Shop() {


    return (
        <Layout>
            <Collections />
            <div className="flex flex-col gap-16">
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Stickers</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <Latest itype="sticker" limit={10} />
                    </div>
                </div>
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Coasters</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <Latest itype="coaster" limit={10} />
                    </div>
                </div>
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Posters</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <Latest itype="poster" limit={10} />
                    </div>
                </div>
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Bookmarks</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <Latest itype="bookmark" limit={10} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
