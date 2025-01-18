import connectToDb from "@/configs/db";
import authorModel from "@/models/author";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function PUT(req, { params }) {
  try {
    const authorId = params.id;
    connectToDb();
    await authorModel.findOneAndUpdate({ _id: authorId }, { permission: true });
    
    useRevalidatePage()

    return Response.json({ message: "نویسنده تایید شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
