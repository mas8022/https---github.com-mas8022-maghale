import { useRevalidatePage } from "@/utils/useRevalidatePage";
import likeModel from "@/models/like";
import { MeId } from "@/utils/me";

export async function POST(req, { params }) {
  try {
    const commentId = params.id;
    const meId = await MeId();

    if (!meId) {
      return Response.json({
        message: "ابتدا در سایت ثبت نام کنید",
        status: 400,
      });
    }

    const likeBefore = await likeModel.findOne(
      {
        userLiked: meId,
        siteImprovementComment: commentId,
      },
      "_id"
    );
    console.log(likeBefore);

    if (!!likeBefore) {
      return Response.json({ message: "لایک کرده بودید", status: 400 });
    }

    await likeModel.create({
      userLiked: meId,
      siteImprovementComment: commentId,
    });

    useRevalidatePage();
    return Response.json({ message: "با موفقیت لایک شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
