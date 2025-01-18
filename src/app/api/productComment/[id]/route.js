import productCommentModel from "@/models/productComment";
import { Me } from "@/utils/me";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function POST(req) {
  try {
    const me = await Me();

    if (!me) {
      return Response.json({
        message: "برای ارسال نظر ابتدا در سایت ثبت نام کنید",
        status: 404,
      });
    }

    const { comment, productId } = await req.json();

    await productCommentModel.create({
      productId,
      commenter: me._id,
      commenterText: comment,
      publish: false,
    });

    useRevalidatePage()
    
    return Response.json({
      message:
        "پیام شما دریافت شد و پس از بررسی ثبت خواهد شد. از اینکه دیدگاه خود را با ما به اشتراک گذاشتید سپاسگزاریم.",
      status: 201,
    });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const comments = await productCommentModel
      .find(
        {
          productId: params.id,
          publish: true,
        },
        "commenterText createdAt"
      )
      .populate("commenter", "email profile");
      
      useRevalidatePage();

    return Response.json(comments);
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
