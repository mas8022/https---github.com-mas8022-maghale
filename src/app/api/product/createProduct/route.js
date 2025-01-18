import { GetAuthorId } from "@/utils/author";
import connectToDb from "@/configs/db";
import productModel from "@/models/product";
import CloudStoringFile from "@/utils/cloudStoringFile";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

export async function POST(req) {
  try {
    const author = await GetAuthorId();
    if (!!!author) {
      return Response.json({ message: "لطفا مجددا تلاش فرمایید", status: 400 });
    }

    const formData = await req.formData();

    const group = formData.get("group");
    const title = formData.get("title");
    const price = formData.get("price");
    let tags = formData.get("tags");
    const discount = formData.get("discount");
    const cover = formData.get("cover");
    const articleText = formData.get("articleText");
    const articleVideo = formData.get("articleVideo");
    const duration = formData.get("duration");

    tags = JSON.parse(tags);

    const coverSrc = await CloudStoringFile(cover);

    const articleVideoSrc = await CloudStoringFile(articleVideo);

    connectToDb();
    await productModel.create({
      group,
      title,
      price: price ? price : 0,
      author,
      articleText,
      comments: [],
      status: "draft",
      sellCount: 0,
      discount: discount ? discount : 0,
      tags,
      cover: coverSrc,
      articleVideo: articleVideoSrc,
      duration,
    });

    useRevalidatePage()

    return Response.json({
      message:
        "محصول با موفقیت فرستاده شد در صورت تایید مقاله از سمت سایت بعد از یک الی دو روز به شما از طریق ایمیل اطلاع داده خواهد شد",
      status: 201,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
