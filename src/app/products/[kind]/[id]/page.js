import React from "react";
import Hr from "../../../_components/modules/hr";
import AuthorBox from "../../../_components/template/authorBox";
import CommentsBox from "../../../_components/template/commentsBox";
import ContentArticle from "../../../_components/modules/contentArticle";
import Title from "../../../_components/template/title";
import dynamic from "next/dynamic";
import productModel from "@/models/product";
import productCommentModel from "@/models/productComment";
import BuyProductBtn from "@/src/app/_components/template/buyProductBtn";
import { MeId } from "@/utils/me";
import userModel from "@/models/user";
const Player = dynamic(() => import("../../../_components/modules/player"), {
  ssr: false,
});

export default async function page({ params }) {
  const product = await productModel
    .findOne({ _id: params.id }, "title author articleText articleVideo tags")
    .populate("comments")
    .lean();
    
  const { _id, title, author, articleText, articleVideo, tags } = product;

  const comments = await productCommentModel
    .find({
      productId: _id,
      publish: true,
    })
    .populate("commenter", "email profile")
    .lean();

  const meId = await MeId();

  let isBuy = false;

  if (meId) {
    isBuy = await userModel.findOne({
      _id: meId,
      myProducts: { $in: [_id] },
    });
  }

  return (
    <>
      <div>
        <Hr />
        <Title title={title} />
        {isBuy ? (
          <Player videoSRCes={JSON.parse(JSON.stringify(articleVideo))} />
        ) : (
          <BuyProductBtn productId={JSON.parse(JSON.stringify(_id))} />
        )}

        <Hr />
        <ContentArticle content={JSON.parse(JSON.stringify(articleText))} />
        <Hr />

        {author?.profile && author?.bio && <AuthorBox {...author} />}
        <Hr />
        <CommentsBox
          productId={JSON.parse(JSON.stringify(_id))}
          comments={JSON.parse(JSON.stringify(comments))}
          tags={JSON.parse(JSON.stringify(tags))}
        />

        <Hr />
      </div>
      <Hr />
    </>
  );
}
