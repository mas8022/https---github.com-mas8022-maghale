import connectToDb from "@/configs/db";
import userModel from "@/models/user";
import { useRevalidatePage } from "@/utils/useRevalidatePage";


export async function PUT(req, { params }) {
  const userId = params.id;
  try {
    connectToDb();
    await userModel.findOneAndUpdate({ _id: userId }, { roll: "BLOCK" });
    
    useRevalidatePage()

    return Response.json({ message: "کاربر بلاک شد", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
