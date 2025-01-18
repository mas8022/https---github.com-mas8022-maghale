import connectToDb from "@/configs/db";
import contactUsMessageModel from "@/models/contactUsMessage";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function DELETE(req, { params }) {
  try {
    const commentId = params.id;

    connectToDb();
    await contactUsMessageModel.findOneAndUpdate(
      { _id: commentId },
      { isAnswer: true }
    );
    
    useRevalidatePage()

    return Response.json({ message: "پیام پاک شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
