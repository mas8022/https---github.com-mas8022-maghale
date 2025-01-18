import connectToDb from "@/configs/db";
import siteImprovementCommentModel from "@/models/siteImprovementComments";
import { useRevalidatePage } from "@/utils/useRevalidatePage";

export async function GET() {
  try {
    connectToDb();
    const comments = await siteImprovementCommentModel
      .find({ publish: false }, "comment")
      .populate("user", "fullName email")
      .lean();

      useRevalidatePage();


    return Response.json(comments);
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}

