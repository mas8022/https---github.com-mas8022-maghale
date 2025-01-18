import { useRevalidatePage } from "@/utils/useRevalidatePage";
import likeModel from "@/models/like";
import disLikeModel from "@/models/disLike";

export async function GET(req, { params }) {
  try {
    const commentID = params.id;

    const like = await likeModel.countDocuments({
      siteImprovementComment: commentID,
    });

    const disLike = await disLikeModel.countDocuments({
      siteImprovementComment: commentID,
    });

    useRevalidatePage();
    return Response.json({ like, disLike });
  } catch (error) {
    return Response.json(
      { message: "اینترنت خود را چک کنید" },
      { status: 500 }
    );
  }
}
