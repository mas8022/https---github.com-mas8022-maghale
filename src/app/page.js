import React from "react";
import MainCategoryFlex from "./_components/template/mainCategoryFlex";
import Hr from "./_components/modules/hr";
import Title from "./_components/template/title";
import Sliders from "./_components/modules/slider";
import Ad from "./_components/template/ad";
import MainSearch from "./_components/template/mainSearch";
import CommentsSlider from "./_components/template/commentsSlider";
import "@/models/author";
import connectToDb from "@/configs/db";
import productModel from "@/models/product";
import siteImprovementCommentsModel from "@/models/siteImprovementComments";

const Home = async () => {
  connectToDb();
  const freeProducts = await productModel
    .find(
      { price: 0, status: "publish" },
      "title cover duration sellCount price discount group"
    )
    .populate("author", "name")
    .sort({ _id: -1 })
    .lean();

  const newProducts = await productModel
    .find(
      { status: "publish" },
      "title cover duration sellCount price discount group"
    )
    .populate("author", "name")
    .sort({ _id: -1 })
    .limit(6)
    .lean();

  const popularProducts = await productModel
    .find(
      { status: "publish" },
      "title cover duration sellCount price discount group"
    )
    .populate("author", "name")
    .sort({ sellCount: -1 })
    .limit(6)
    .lean();

  const siteImprovementComments = await siteImprovementCommentsModel
    .find({ publish: true }, "comment like disLike")
    .populate("user", "fullName profile")
    .sort({ _id: -1 })
    .limit(6)
    .lean();

  return (
    <>
      <div className="w-full pt-14">
        <MainSearch />
        <Hr />
        <MainCategoryFlex />
        <Hr />
        <Title title={"دوره های رایگان"} />
        <Sliders productsData={JSON.parse(JSON.stringify(freeProducts))} />

        <Hr />
        <Title title={"جدید ترین اموزش ها"} />
        <Sliders productsData={JSON.parse(JSON.stringify(newProducts))} />
        <Hr />
        <Title title={" محبوب ترین اموزش ها"} />
        <Sliders productsData={JSON.parse(JSON.stringify(popularProducts))} />
        <Hr />
        <Ad />
        <Hr />
        <Title title={"جدید ترین نظرات"} />
        <CommentsSlider
          comments={JSON.parse(JSON.stringify(siteImprovementComments))}
        />
      </div>
    </>
  );
};

export default Home;
