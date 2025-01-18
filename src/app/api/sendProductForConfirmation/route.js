import connectToDb from "@/configs/db";
import productModel from "@/models/product";
import CloudStoringFile from "@/utils/cloudStoringFile";
import { useRevalidatePage } from "@/utils/useRevalidatePage";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const productID = formData.get("id");
    connectToDb();

    const product = await productModel.findOne({ _id: productID });

    if (product.status === "wait") {
      await productModel.findOneAndUpdate(
        { _id: productID },
        {
          status: "draft",
        }
      );

      revalidatePath();

      return Response.json({
        message:
          "محصول با موفقیت از فهرست بازبینیه مقاله های مدیر سایت خارج شد",
        status: 200,
      });
    } else if (product.status === "draft") {
      await productModel.findOneAndUpdate(
        { _id: productID },
        {
          status: "wait",
        }
      );

      revalidatePath();

      return Response.json({
        message: "محصول با موفقیت جهت تایید از سمت مدیر سایت فرستاده شد",
        status: 200,
      });
    } else if (product.status === "publish") {
      const id = formData.get("id");
      const group = formData.get("group");
      const title = formData.get("title");
      let price = formData.get("price");
      price = Number(price);

      let articleText = formData.get("articleText");
      const articleVideo = formData.get("articleVideo");
      let tags = formData.get("tags");

      let discount = formData.get("discount");
      discount = Number(discount);
      const cover = formData.get("cover");
      let duration = formData.get("duration");
      duration = Number(duration);

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

      const product = await productModel.findOne({ _id: id }, "-author");

      await productModel.findOneAndUpdate(
        { _id: id },
        {
          group,
          title,
          price: price ? price : 0,
          articleText,
          comments: product ? product.comments : [],
          discount: discount ? discount : 0,
          tags,
          cover: coverSrc,
          articleVideo:
            product.articleVideo && articleVideoSrc
              ? [...product.articleVideo, articleVideoSrc]
              : [],
          duration,
        }
      );

      useRevalidatePage();

      return Response.json({
        message: "محصول با موفقیت ویرایش شد",
        status: 200,
      });
    }
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
