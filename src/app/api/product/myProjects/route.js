import connectToDb from "@/configs/db";
import { GetAuthorId } from "@/utils/author";
import CloudStoringFile from "@/utils/cloudStoringFile";
import productModel from "@/models/product";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function POST(req) {
  try {
    const author = await GetAuthorId();
    if (!author) {
      return Response.json({ message: "لطفا مجددا تلاش فرمایید", status: 400 });
    }

    const formData = await req.formData();

    const id = formData.get("id");
    const group = formData.get("group");
    const title = formData.get("title");
    const price = formData.get("price");
    let tags = formData.get("tags");
    const discount = formData.get("discount");
    const cover = formData.get("cover");
    const articleText = formData.get("articleText");
    const articleVideo = formData.get("articleVideo");
    const duration = formData.get("duration");

    if (typeof tags === "string") {
      tags = JSON.parse(tags);
    }

    let coverSrc = cover;
    if (cover instanceof Blob) {
      coverSrc = await CloudStoringFile(cover);
    }

    let articleVideoSrc = articleVideo;
    if (articleVideo instanceof Blob) {
      articleVideoSrc = await CloudStoringFile(articleVideo);
    }

    connectToDb();
    const product = await productModel.findOne({ _id: id }).lean();

    await productModel.updateOne(
      { _id: id },
      {
        group,
        title,
        price: price ? price : 0,
        author,
        articleText,
        comments: product ? product.comments : [],
        status: "draft",
        sellCount: 0,
        discount: discount ? discount : 0,
        tags,
        cover: coverSrc,
        articleVideo: product?.articleVideo?.includes(articleVideoSrc)
          ? null
          : [...product.articleVideo, articleVideoSrc],
        duration,
      }
    );

    useRevalidatePage()
    
    return Response.json({
      message: "محصول با موفقیت فرستاده ذخیره شد",
      status: 201,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
