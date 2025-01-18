import connectToDb from "@/configs/db";
import siteImprovementCommentModel from "@/models/siteImprovementComments";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function PUT(req, { params }) {
  try {
    const commentId = params.id;
    connectToDb();
    const comments = await siteImprovementCommentModel.findOneAndUpdate(
      { _id: commentId },
      { publish: true }
    );

    useRevalidatePage()

    return Response.json({ message: "کامنت تایید شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const commentId = params.id;
    connectToDb();
    await siteImprovementCommentModel.findOneAndDelete({
      _id: commentId,
    });

    useRevalidatePage()
    
    return Response.json({ message: "کامنت حذف شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
