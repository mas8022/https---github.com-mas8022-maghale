import connectToDb from "@/configs/db";
import authorModel from "@/models/author";
import AuthorReceiveMessage from "@/models/AuthorReceiveMessage";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function POST(req, { params }) {
  try {
    const { message } = await req.json();

    const authorId = params.id;

    connectToDb();

    await AuthorReceiveMessage.create({
      author: authorId,
      message,
      seen: false,
    });

    useRevalidatePage()

    return Response.json({ message: "پیام ارسال شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authorId = params.id;
    connectToDb();
    await authorModel.findOneAndDelete({ _id: authorId });

    useRevalidatePage()
    
    return Response.json({ message: "نویسنده حذف شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
