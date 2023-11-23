import Layout from "@/components/layout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "@/components/productCard";
import newArrivals from "@/assets/banners/new-arrivals.png";
import stickers from "@/assets/collection/stickers.png";
import coasters from "@/assets/collection/coasters.png";
import posters from "@/assets/collection/posters.png";
import bookmarks from "@/assets/collection/bookmarks.png";
import CollectionItem from "@/components/collectionItem";

export default function Shop() {
    return (
        <Layout>

            <div className="py-10">
                <div className="text-center text-3xl">COLLECTIONS</div>
                <div className="my-10 grid grid-cols-2 p-5 items-center justify-center gap-7 lg:grid-cols-4">
                    <CollectionItem url="/shop/stickers" alt="stickers" src={stickers} />
                    <CollectionItem url="/shop/coasters" alt="coasters" src={coasters} />
                    <CollectionItem url="/shop/posters" alt="posters" src={posters} />
                    <CollectionItem url="/shop/bookmarks" alt="bookmarks" src={bookmarks} />
                </div>
            </div>
            <div className="flex flex-col gap-16">
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Stickers</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <ProductCard
                            src={stickers}
                            alt="sticker"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="sticker"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="sticker"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="sticker"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Coasters</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <ProductCard
                            src={stickers}
                            alt="coaster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="coaster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="coaster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="coaster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Posters</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <ProductCard
                            src={stickers}
                            alt="poster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="poster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="poster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="poster"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-5 pl-20 text-3xl">Latest Bookmarks</div>
                    <div className="flex overflow-scroll p-0.5 gap-4 px-2">
                        <ProductCard
                            src={stickers}
                            alt="bookmark"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="bookmark"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="bookmark"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                        <ProductCard
                            src={stickers}
                            alt="bookmark"
                            title="Gojo Satoru Jujustu Kaisen sticker"
                            price={5}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
